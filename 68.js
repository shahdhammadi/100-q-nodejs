require('dotenv').config();

const allowedEnvs = ['dev', 'test', 'prod'];
const nodeEnv = process.env.NODE_ENV;

if (!allowedEnvs.includes(nodeEnv)) {
    throw new Error(`NODE_ENV يجب أن يكون أحد: ${allowedEnvs.join(', ')}`);
}

const config = {
    dev: {
        port: 3000,
        dbUrl: 'mongodb://localhost:27017/dev'
    },
    test: {
        port: 3001,
        dbUrl: 'mongodb://localhost:27017/test'
    },
    prod: {
        port: process.env.PORT || 80,
        dbUrl: process.env.DB_URL
    }
};

module.exports = config[nodeEnv];