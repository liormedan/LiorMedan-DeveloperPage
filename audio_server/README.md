# Audio Server (Python/FastAPI)

שרת Python להמרת אודיו וזרימת אודיו עם FFmpeg מובנה.

## התקנה מהירה

### 1. התקן חבילות Python

```bash
cd audio_server
pip install -r requirements.txt
```

### 2. הורד FFmpeg מובנה (אוטומטי)

```bash
python download_ffmpeg.py
```

זה יוריד ויתקין את FFmpeg אוטומטית בתיקיית `ffmpeg/bin/`.

**או הורד ידנית:**

**Windows:**
1. הורד מ: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip
2. חלץ את `ffmpeg.exe` מ-`bin/` בתוך ה-ZIP
3. שמור ב: `audio_server/ffmpeg/bin/ffmpeg.exe`

**macOS:**
1. הורד מ: https://evermeet.cx/ffmpeg/ffmpeg-7.0.zip
2. שמור ב: `audio_server/ffmpeg/bin/ffmpeg`

**Linux:**
1. הורד מ: https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
2. חלץ את `ffmpeg` מ-`bin/` בתוך ה-TAR
3. שמור ב: `audio_server/ffmpeg/bin/ffmpeg`

## הפעלה

```bash
# Development (עם auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000

# או Windows:
start.bat
```

## API Endpoints

### `POST /convert`
המרת קובץ אודיו ל-MP3
- **Input**: `multipart/form-data` עם `file`
- **Output**: קובץ MP3

### `POST /stream`
זרימת אודיו (streaming) עם המרה אוטומטית
- **Input**: `multipart/form-data` עם `file`, `start` (אופציונלי)
- **Output**: Streaming response של MP3

### `POST /info`
קבלת מידע על קובץ אודיו
- **Input**: `multipart/form-data` עם `file`
- **Output**: JSON עם metadata

### `GET /health`
בדיקת סטטוס השרת

## מבנה תיקיות

```
audio_server/
├── main.py              # שרת FastAPI
├── download_ffmpeg.py   # סקריפט להורדת FFmpeg
├── requirements.txt     # חבילות Python
├── ffmpeg/             # FFmpeg מובנה (נוצר אוטומטית)
│   └── bin/
│       └── ffmpeg.exe  # או ffmpeg (Linux/macOS)
└── README.md
```

## הערות

- FFmpeg מובנה בתיקיית הפרויקט - לא צריך התקנה נפרדת
- אם FFmpeg לא נמצא, השרת ינסה להשתמש ב-system FFmpeg
- קבצים זמניים נמחקים אוטומטית
- CORS מופעל לכל המקורות (תוכל להגביל ב-production)
