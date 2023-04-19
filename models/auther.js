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
        require: true
    }
},{
    timeseries: true, timestamps: true
})
const authorModel = new mongoose.model("author", authorModel);

export default authorModel;