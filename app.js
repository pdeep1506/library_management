import apiRoutes from './routes/version.js';
import express from 'express';
import 'dotenv/config.js';

const app =express();
const port = process.env.PORT || 8000;
app.use('/api', apiRoutes);


app.use((error, req, res, next) => {
    console.log("error    ",error, req.body);
    const status = error.statusCode || error.httpStatusCode || 500;
    if (req.url.includes('/api/')) {
        const message = error.message;
        return res.status(200).json({ error: true, message: message });
    }
    res.redirect('/500');
});


app.listen(port, '127.0.0.1',()=>{
    console.log(`SERVER RUNNING ON ${port}`);
})