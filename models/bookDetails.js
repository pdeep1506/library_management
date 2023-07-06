import mongoose from "mongoose";

const bookDetailsSchema  = new mongoose.Schema({

    // :- no_of_total_copy
    // :- no_of_available_book
    // :- userID who borrowed book
    // :- no_of_lost_book
    bookId:{

    },
    totalBookCopy:{
        
    },
    totalAvailableCopy:{

    },
    totalLostBookCopy:{

    }

});

const bookDetailsModel = new mongoose.model("bookDetails", bookDetailsSchema)

export default bookDetailsModel