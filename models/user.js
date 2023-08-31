import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    },
    password: {
        type: String,
        require: true,

    },
    role: {
        type: String,
        default: "USER"
    }

});

//  validate schema

const userModel = new mongoose.model("user", userSchema);

export default userModel;