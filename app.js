import apiRoutes from './routes/version.js';
import express from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
// import 


const app =express();
const port = process.env.PORT || 8000;

const MONGODB_URI = `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@atlascluster.bve4ouc.mongodb.net/test`;

app.use(express.json())

//  route
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


// app.listen(port, '127.0.0.1',()=>{
//     console.log(`SERVER RUNNING ON ${port}`);
// })

mongoose.connect(MONGODB_URI)
    .then(result => {
        
        app.listen(port, () => {
            console.log('SERVER RUNNING ON PORT', port);
        });
    })
    .catch(err => {
        console.log(err);
    });