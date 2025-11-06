# Audio Converter API (Python/FastAPI)

Backend service for converting audio files to MP3 format.

## Installation

1. Install Python 3.8+ and FFmpeg:
   ```bash
   # Windows (using chocolatey)
   choco install ffmpeg
   
   # macOS
   brew install ffmpeg
   
   # Linux (Ubuntu/Debian)
   sudo apt-get install ffmpeg
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running

```bash
# Development
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - Health check
- `GET /health` - Health status
- `POST /convert` - Convert audio file to MP3
  - Accepts: multipart/form-data with `file` field
  - Returns: MP3 file

## Integration with Next.js

Update `src/components/Playground3D.tsx` to use the Python backend:

```typescript
const response = await fetch('http://localhost:8000/convert', {
  method: 'POST',
  body: formData,
});
```

Or set an environment variable:
```env
NEXT_PUBLIC_AUDIO_CONVERTER_API=http://localhost:8000
```

