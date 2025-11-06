@echo off
echo Starting Audio Server...
echo.
echo Make sure FFmpeg is installed and in your PATH
echo.
uvicorn main:app --reload --host 0.0.0.0 --port 8000
pause

