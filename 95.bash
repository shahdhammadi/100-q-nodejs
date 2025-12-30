# تشغيل التطبيق بوضع الكلستر
pm2 start app.js -i max

# إعادة التشغيل بدون توقف
pm2 reload app

# مراقبة العمليات
pm2 monit

# حفظ الإعدادات
pm2 save
pm2 startup