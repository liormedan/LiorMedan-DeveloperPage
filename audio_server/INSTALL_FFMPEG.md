# הורדת FFmpeg מובנה

אם הסקריפט האוטומטי לא עובד, הורד ידנית:

## Windows

1. **הורד מ:**
   https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip

2. **חלץ את ה-ZIP**

3. **מצא את `ffmpeg.exe` בתיקיית `bin/`**

4. **צור תיקייה:**
   ```
   audio_server/ffmpeg/bin/
   ```

5. **העתק את `ffmpeg.exe` ל:**
   ```
   audio_server/ffmpeg/bin/ffmpeg.exe
   ```

## macOS

1. **הורד מ:**
   https://evermeet.cx/ffmpeg/ffmpeg-7.0.zip

2. **חלץ את ה-ZIP**

3. **צור תיקייה:**
   ```
   audio_server/ffmpeg/bin/
   ```

4. **העתק את `ffmpeg` ל:**
   ```
   audio_server/ffmpeg/bin/ffmpeg
   ```

## Linux

1. **הורד מ:**
   https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz

2. **חלץ:**
   ```bash
   tar xf ffmpeg-release-amd64-static.tar.xz
   ```

3. **צור תיקייה:**
   ```bash
   mkdir -p audio_server/ffmpeg/bin
   ```

4. **העתק:**
   ```bash
   cp ffmpeg-release-amd64-static/ffmpeg audio_server/ffmpeg/bin/ffmpeg
   chmod +x audio_server/ffmpeg/bin/ffmpeg
   ```

## בדיקה

לאחר ההורדה, השרת אמור לזהות את FFmpeg אוטומטית. אם לא, השרת ינסה להשתמש ב-system FFmpeg.

