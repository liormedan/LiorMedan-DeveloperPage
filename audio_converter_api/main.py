"""
FastAPI backend for audio conversion
Install: pip install fastapi uvicorn python-multipart ffmpeg-python
Run: uvicorn main:app --host 0.0.0.0 --port 8000
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import ffmpeg
import tempfile
import os
from pathlib import Path
import uuid

app = FastAPI(title="Audio Converter API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3003", "*"],  # Add your production domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Audio Converter API", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


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
        
        with open(input_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Convert to MP3 using ffmpeg-python
        try:
            (
                ffmpeg
                .input(input_path)
                .output(
                    output_path,
                    vn=None,  # No video
                    acodec="libmp3lame",
                    audio_bitrate="192k",
                    q=2  # High quality
                )
                .overwrite_output()
                .run(quiet=True)
            )
        except ffmpeg.Error as e:
            raise HTTPException(
                status_code=500,
                detail=f"FFmpeg conversion failed: {str(e)}"
            )
        
        # Read converted file
        with open(output_path, "rb") as f:
            converted_data = f.read()
        
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

