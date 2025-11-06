# הפעלת שרת אודיו ב-Vercel

## הבעיה

Vercel Serverless Functions יש להם מגבלות:
- **Time limit**: 10 שניות (Hobby) או 60 שניות (Pro)
- **Size limit**: 50MB (Hobby) או 250MB (Pro)
- **FFmpeg binary**: FFmpeg הוא ~50-100MB - גדול מדי ל-Vercel
- **Memory**: מוגבל

## פתרונות

### פתרון 1: FFmpeg.wasm בצד הלקוח (מומלץ) ✅

הקוד כבר מוכן! `@ffmpeg/ffmpeg` עובד בצד הלקוח:

```typescript
// src/lib/audio-converter.ts (צריך לחזור ליצור)
// או להשתמש ב-FFmpeg.wasm ישירות ב-Playground3D.tsx
```

**יתרונות:**
- ✅ עובד ב-Vercel ללא בעיות
- ✅ לא צריך שרת
- ✅ אין מגבלות זמן

**חסרונות:**
- ⚠️ קובץ גדול לטעינה (FFmpeg.wasm ~20-30MB)
- ⚠️ המרה איטית יותר

### פתרון 2: שירות Cloud חיצוני

השתמש בשירותים כמו:
- **CloudConvert API** - https://cloudconvert.com/api
- **AWS Lambda** - עם FFmpeg layer
- **Google Cloud Functions** - עם FFmpeg
- **Railway/Render** - שרת Python נפרד

### פתרון 3: שרת Python נפרד (Railway/Render)

1. **העלה את `audio_server/` ל-Railway או Render**
2. **קבל URL של השרת**
3. **עדכן את `.env.local`:**

```env
NEXT_PUBLIC_AUDIO_SERVER=https://your-audio-server.railway.app
```

**יתרונות:**
- ✅ FFmpeg עובד
- ✅ אין מגבלות זמן
- ✅ ביצועים טובים

**חסרונות:**
- ⚠️ צריך שירות נוסף (עלות)
- ⚠️ יותר מורכב

## המלצה

**להשתמש ב-FFmpeg.wasm בצד הלקוח** - זה הפתרון הכי פשוט וזול ל-Vercel.

אם אתה רוצה ביצועים טובים יותר, השתמש ב-Railway או Render לשרת Python נפרד.

## איך להפעיל

### אופציה A: FFmpeg.wasm (מומלץ)

1. החזר את `src/lib/audio-converter.ts` עם FFmpeg.wasm
2. עדכן את `Playground3D.tsx` להשתמש בו
3. Deploy ל-Vercel - הכל יעבוד!

### אופציה B: Railway/Render

1. צור חשבון ב-Railway או Render
2. העלה את `audio_server/` כפרויקט חדש
3. הוסף משתנה סביבה: `PORT=8000`
4. קבל URL של השרת
5. עדכן את `.env.production` ב-Vercel:

```env
NEXT_PUBLIC_AUDIO_SERVER=https://your-server.railway.app
```

6. Deploy!

