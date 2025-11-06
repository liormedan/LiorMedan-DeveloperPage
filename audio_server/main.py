"""
FastAPI audio server for audio conversion and streaming
Install: pip install fastapi uvicorn python-multipart ffmpeg-python aiofiles
Run: uvicorn main:app --host 0.0.0.0 --port 8000
"""

from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.responses import StreamingResponse, Response
from fastapi.middleware.cors import CORSMiddleware
import ffmpeg
import tempfile
import os
import sys
import platform
from pathlib import Path
import uuid
import mimetypes
from typing import Optional
import aiofiles
import asyncio

# Set FFmpeg path to bundled executable
def get_ffmpeg_path():
    """Get path to bundled FFmpeg executable"""
    base_dir = Path(__file__).parent
    system = platform.system().lower()
    
    if system == "windows":
        ffmpeg_exe = base_dir / "ffmpeg" / "bin" / "ffmpeg.exe"
    elif system == "darwin":  # macOS
        ffmpeg_exe = base_dir / "ffmpeg" / "bin" / "ffmpeg"
    else:  # Linux
        ffmpeg_exe = base_dir / "ffmpeg" / "bin" / "ffmpeg"
    
    # If bundled FFmpeg exists, use it
    if ffmpeg_exe.exists():
        return str(ffmpeg_exe.absolute())
    
    # Otherwise, try system FFmpeg
    return "ffmpeg"

# Set FFmpeg path
FFMPEG_PATH = get_ffmpeg_path()

# Override ffmpeg executable path for ffmpeg-python
if os.path.exists(FFMPEG_PATH):
    os.environ["FFMPEG_BINARY"] = FFMPEG_PATH
    print(f"Using bundled FFmpeg: {FFMPEG_PATH}")
else:
    print(f"Warning: Bundled FFmpeg not found at {FFMPEG_PATH}, using system FFmpeg if available")

# Helper function to run ffmpeg with correct path
def run_ffmpeg(input_path, output_path, **kwargs):
    """Run FFmpeg with bundled or system executable"""
    if os.path.exists(FFMPEG_PATH):
        # Use bundled FFmpeg
        return (
            ffmpeg
            .input(input_path)
            .output(output_path, **kwargs)
            .overwrite_output()
            .run(cmd=FFMPEG_PATH, quiet=True)
        )
    else:
        # Use system FFmpeg
        return (
            ffmpeg
            .input(input_path)
            .output(output_path, **kwargs)
            .overwrite_output()
            .run(quiet=True)
        )

app = FastAPI(title="Audio Server API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3003", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Audio Server API", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy", "ffmpeg": "available"}


@app.post("/convert")
async def convert_audio(file: UploadFile = File(...)):
    """
    Convert audio file to MP3 format
    Accepts: Any audio format (WAV, M4A, AAC, FLAC, etc.)
    Returns: MP3 file
    """
    if not file.content_type or not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=400,
            detail="File is not an audio file"
        )

    # Create temporary directory
    temp_dir = tempfile.mkdtemp(prefix="audio-convert-")
    
    try:
        # Save uploaded file
        input_path = os.path.join(temp_dir, f"input_{uuid.uuid4().hex}{Path(file.filename).suffix}")
        output_path = os.path.join(temp_dir, f"output_{uuid.uuid4().hex}.mp3")
        
        # Write uploaded file
        async with aiofiles.open(input_path, "wb") as f:
            content = await file.read()
            await f.write(content)
        
        # Convert to MP3 using bundled FFmpeg
        try:
            run_ffmpeg(
                input_path,
                output_path,
                vn=None,  # No video
                acodec="libmp3lame",
                audio_bitrate="192k",
                q=2  # High quality
            )
        except ffmpeg.Error as e:
            raise HTTPException(
                status_code=500,
                detail=f"FFmpeg conversion failed: {str(e)}"
            )
        
        # Read converted file
        async with aiofiles.open(output_path, "rb") as f:
            converted_data = await f.read()
        
        # Clean up
        os.unlink(input_path)
        os.unlink(output_path)
        
        # Return MP3 file
        output_filename = Path(file.filename).stem + ".mp3"
        return Response(
            content=converted_data,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": f'attachment; filename="{output_filename}"'
            }
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Conversion failed: {str(e)}"
        )
    
    finally:
        # Clean up temp directory
        try:
            os.rmdir(temp_dir)
        except:
            pass


@app.post("/stream")
async def stream_audio(file: UploadFile = File(...), start: Optional[float] = None):
    """
    Stream audio file with optional seeking
    Accepts: Any audio format (will convert on-the-fly if needed)
    Returns: Streaming audio response
    """
    if not file.content_type or not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=400,
            detail="File is not an audio file"
        )

    temp_dir = tempfile.mkdtemp(prefix="audio-stream-")
    
    try:
        # Save uploaded file
        input_path = os.path.join(temp_dir, f"input_{uuid.uuid4().hex}{Path(file.filename).suffix}")
        
        # Write uploaded file
        async with aiofiles.open(input_path, "wb") as f:
            content = await file.read()
            await f.write(content)
        
        # Check if file is MP3
        is_mp3 = file.content_type == "audio/mpeg" or Path(file.filename).suffix.lower() == ".mp3"
        
        if is_mp3:
            # Stream MP3 directly
            async def generate():
                async with aiofiles.open(input_path, "rb") as f:
                    while True:
                        chunk = await f.read(8192)  # 8KB chunks
                        if not chunk:
                            break
                        yield chunk
                    # Clean up
                    os.unlink(input_path)
                    os.rmdir(temp_dir)
            
            return StreamingResponse(
                generate(),
                media_type="audio/mpeg",
                headers={
                    "Accept-Ranges": "bytes",
                    "Content-Disposition": f'inline; filename="{file.filename}"'
                }
            )
        else:
            # Convert to MP3 and stream
            output_path = os.path.join(temp_dir, f"output_{uuid.uuid4().hex}.mp3")
            
            try:
                # Use bundled or system FFmpeg
                ffmpeg_cmd = FFMPEG_PATH if os.path.exists(FFMPEG_PATH) else "ffmpeg"
                
                if start:
                    input_stream = ffmpeg.input(input_path, ss=start)
                else:
                    input_stream = ffmpeg.input(input_path)
                
                (
                    input_stream
                    .output(
                        output_path,
                        vn=None,
                        acodec="libmp3lame",
                        audio_bitrate="192k",
                        q=2,
                        format="mp3"
                    )
                    .overwrite_output()
                    .run(cmd=ffmpeg_cmd, quiet=True)
                )
            except ffmpeg.Error as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"FFmpeg conversion failed: {str(e)}"
                )
            
            async def generate():
                async with aiofiles.open(output_path, "rb") as f:
                    while True:
                        chunk = await f.read(8192)
                        if not chunk:
                            break
                        yield chunk
                    # Clean up
                    os.unlink(input_path)
                    os.unlink(output_path)
                    os.rmdir(temp_dir)
            
            return StreamingResponse(
                generate(),
                media_type="audio/mpeg",
                headers={
                    "Accept-Ranges": "bytes",
                    "Content-Disposition": f'inline; filename="{Path(file.filename).stem}.mp3"'
                }
            )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Streaming failed: {str(e)}"
        )


@app.post("/info")
async def get_audio_info(file: UploadFile = File(...)):
    """
    Get audio file information (duration, format, etc.)
    Returns: JSON with audio metadata
    """
    if not file.content_type or not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=400,
            detail="File is not an audio file"
        )

    temp_dir = tempfile.mkdtemp(prefix="audio-info-")
    
    try:
        input_path = os.path.join(temp_dir, f"input_{uuid.uuid4().hex}{Path(file.filename).suffix}")
        
        async with aiofiles.open(input_path, "wb") as f:
            content = await file.read()
            await f.write(content)
        
        try:
            # Use bundled or system FFmpeg for probing
            ffmpeg_cmd = FFMPEG_PATH if os.path.exists(FFMPEG_PATH) else "ffmpeg"
            probe = ffmpeg.probe(input_path, cmd=ffmpeg_cmd)
            audio_stream = next((s for s in probe["streams"] if s["codec_type"] == "audio"), None)
            
            if not audio_stream:
                raise HTTPException(status_code=400, detail="No audio stream found")
            
            duration = float(probe.get("format", {}).get("duration", 0))
            
            return {
                "duration": duration,
                "format": probe.get("format", {}).get("format_name", "unknown"),
                "codec": audio_stream.get("codec_name", "unknown"),
                "bitrate": audio_stream.get("bit_rate", "unknown"),
                "sample_rate": audio_stream.get("sample_rate", "unknown"),
                "channels": audio_stream.get("channels", "unknown"),
            }
        except ffmpeg.Error as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to probe audio: {str(e)}"
            )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Info extraction failed: {str(e)}"
        )
    
    finally:
        try:
            os.unlink(input_path)
            os.rmdir(temp_dir)
        except:
            pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

