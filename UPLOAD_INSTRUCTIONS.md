# 🚀 دستورالعمل آپلود به GitHub

## مرحله 1: نصب Git
1. از لینک زیر Git را دانلود کنید:
   https://git-scm.com/download/win
2. Git را نصب کنید (تمام تنظیمات پیشفرض را قبول کنید)
3. کامپیوتر را restart کنید

## مرحله 2: آپلود پروژه
دو روش برای آپلود:

### روش 1: استفاده از فایل Batch (آسان)
فایل `upload-complete.bat` را double-click کنید

### روش 2: دستی (Git Bash)
```bash
# باز کردن Git Bash در پوشه پروژه
git config --global user.email "ghazalhosseinni@gmail.com"
git config --global user.name "Ghazal Hosseini"
git add .
git commit -m "Initial commit: Vue 3 Todo App"
git branch -M main
git push -u origin main
```

## ✅ پس از آپلود موفق
پروژه شما در آدرس زیر قابل مشاهده خواهد بود:
https://github.com/ghazalhosseinni/todo-app

## 🔧 در صورت بروز مشکل
اگر repository قبلاً فایل دارد:
```bash
git push -f origin main
```

## 📞 پشتیبانی
در صورت بروز مشکل، خطاها را کپی کرده و ارسال کنید.