import apiRoutes from './routes/version.js';
import express from 'express';
import 'dotenv/config.js';

const app =express();
const port = process.env.PORT || 8000;
app.use('/api', apiRoutes);



app.listen(port, '127.0.0.1',()=>{
    console.log(`SERVER RUNNING ON ${port}`);
})