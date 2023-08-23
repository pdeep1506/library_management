import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    fName:{
        type: String,
        trim: true,
        required: true 
    },
    lName :{
        type:String,
        trim: true,
        required: true
    },
    cNumber:{
        type: Number
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    nationality:{
        type: String, 
        required: true
    }
},{
     timestamps: true
})
const authorModel = new mongoose.model("author", authorSchema);

export default authorModel;