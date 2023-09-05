import mongoose, { Schema } from "mongoose";

const bookBorrowingSchema = new mongoose.Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref:"userModel"
    },
    no_of_borrowed_books:{
        type: Number,
        required: true
    },
    no_of_returned_books:{
        type: Number, required: true
    },
    no_of_lost_books:{
        type: Number, required: true
    },
    
    fine_amount:{
        type: Number, required: true, default:0
    },
    borrowed_books:[{id:{type: Schema.Types.ObjectId, ref:"bookModel", date: Date }}]
    
},{timestamps:true});

const bookBorrowingModel = new mongoose.model("bookBoeeowingModel", bookBorrowingSchema);

export default bookBorrowingModel;
