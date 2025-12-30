const cors = require('cors');

app.use(cors({
    origin: 'https://app.example.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));