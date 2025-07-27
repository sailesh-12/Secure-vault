const express=require('express');
require('dotenv').config();
const cors=require('cors');
const cookie_parser=require('cookie-parser');
const app=express();
const connectDB=require('./config/connectDb');
const PORT=process.env.PORT||3000;

app.use(cors({
    origin: `https://secure-vault-cldu.vercel.app/`,  // your React frontend
  credentials: true                 // 🔥 this allows cookies to be sent
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