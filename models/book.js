
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type: String, required: true
    },
    subtitle:{ 
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    authorEmail:{
        type: String, required: true
    },
    publicationDate:{
        type: Date, required: true
    },
    publisherEmail:{
        type: String, required: true
    },
    language:{
        type: String, required: true
    },
    pageCount:{
        type: Number
    },
    hardCopy:{
        type: Boolean, required: true
    },
    ISBN:{
        type: String, required: true
    }

},{
    timestamps:true
});

const bookModel = new mongoose.model("book", bookSchema);



// title
// subtitle
// price
// author email
// publication date
// publisher  email   [ name, email, country , contact number]
// isbn
// language
// Page Count 
// soft or hard copy

export default bookModel;