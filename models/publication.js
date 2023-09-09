import mongoose, {Schema}  from "mongoose";

const publicationSchema = new mongoose.Schema({
    name:{
        type:String, required: true
    },
    email:{ 
        type: String, required: true
    },cNumber: {
            type: Number
    },nationality:{
        type: String
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref:"user"
    }
}, 
{timestamps: true});


const publicationModel = new mongoose.model("publication", publicationSchema);

// [ name, email, country , contact number]
export default publicationModel;