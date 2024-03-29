
import mongoose, { Schema} from "mongoose";

const bookDetailsSchema  = new mongoose.Schema({

    // :- no_of_total_copy
    // :- no_of_available_book
    // :- userID who borrowed book
    // :- no_of_lost_book
    bookId:{
        type: Schema.Types.ObjectId,
        ref:"bookModel"

    },

    totalBookCopy:{
        type: Number
    },
    totalAvailableCopy:{
        type: Number
    },
    totalLostBookCopy:{
        type: Number
    }

    


});

const bookDetailsModel = new mongoose.model("bookDetails", bookDetailsSchema)

export default bookDetailsModel