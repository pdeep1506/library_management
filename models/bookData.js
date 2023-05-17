// // no_of_total_copy
// // :- no_of_available_book
// // :- userID who borrowed book
// // :- no_of_lost_book
 
// // :- user_requested_book ( array )

// import { number } from "joi";
// import mongoose from "mongoose";

// const bookDataSchema = new mongoose.Schema({
//     no_of_total_copy:{
//         type: Number,
//         required:true
//     },
//     no_of_available_book:{
//         type: Number,
//         required:true
//     },  
//     user_ids :{
//         type:[String],
//         required: true
//     },
//     no_of_lost_book:{
//         type: Number,
//         required:true
//     },
//     user_requested_books:{
//         type:[String],
//         required: true
//     }


// });

// const bookDataModel = new mongoose.model("bookData", bookDataSchema);

// export default bookDataModel;