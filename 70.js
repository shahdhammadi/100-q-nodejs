let server;
let dbConnection;

const startServer = async () => {
    // تشغيل الخادم
    server = app.listen(3000, () => {
        console.log('الخادم يعمل على المنفذ 3000');
    });
    
    // الاتصال بقاعدة البيانات
    dbConnection = await mongoose.connect(process.env.DB_URL);
};

const gracefulShutdown = async () => {
    console.log('بدء الإغلاق الآمن...');
    
    // إيقاف قبول طلبات جديدة
    server.close(() => {
        console.log('تم إغلاق خادم HTTP');
    });
    
    // إغلاق اتصالات قاعدة البيانات
    if (dbConnection) {
        await dbConnection.disconnect();
        console.log('تم إغلاق اتصال قاعدة البيانات');
    }
    
    setTimeout(() => {
        console.log('إنهاء العملية');
        process.exit(0);
    }, 5000);
};

// معالجة إشارات الإغلاق
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);