import mongoose, { Schema } from "mongoose";

const borrowingSchema = new mongoose.Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref:"userModel"
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "bookModel",
        required: true,
      },
      borrowDate: {
        type: Date,
        default: Date.now,
        required: true,
      },                        
      returnDate: {
        type: Date,
      },
    returned: {
        type: Boolean,
        default: false,
      },
    
},{timestamps:true});

const borrowingModel = new mongoose.model("borrowingSchema", borrowingSchema);

export default borrowingModel;
