import mongoose  from "mongoose";

const publicationSchema = new mongoose.Schema({
    Name:{
        type:String, required: true
    },
    email:{ 
        type: String, required: true
    },cNumber: {
            type: Number
    },nationality:{
        type: String
    },
}, 
{timestamps: true});


const publicationModel = new mongoose.model("publication", publicationModel);

// [ name, email, country , contact number]
export default publicationModel;