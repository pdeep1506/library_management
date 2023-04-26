import apiRoutes from './routes/version.js';
import express from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import YAML from 'yamljs'
// import swagerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors';

const app =express();
const port = process.env.PORT || 8000;
const MONGODB_URI = `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@atlascluster.bve4ouc.mongodb.net/test`;
// const MONGODB_URI = process.env.MONGOOSE_URL;
const swaggerSpec = YAML.load('./api.yaml')

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.json())
app.use(cookieParser())
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