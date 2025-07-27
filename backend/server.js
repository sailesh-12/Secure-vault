const express=require('express');
require('dotenv').config();
const cors=require('cors');
const cookie_parser=require('cookie-parser');
const app=express();
const connectDB=require('./config/connectDb');
const PORT=process.env.PORT||3000;

const allowedOrigins = [
    'http://localhost:5173',
    'https://secure-vault-cldu.vercel.app',
    'https://secure-vault-kcu8.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/vault', require('./routes/vaultRoutes.js'));
app.listen(PORT,()=>{
	console.log(`Server is running on https://secure-vault-ok7k.onrender.com`);
})