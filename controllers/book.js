import bookModel from "../models/book.js";
import authorModel from "../models/author.js";
import publicationModel from "../models/publication.js";
import date from 'date-and-time';


// save book

export const saveBooks = async(req,res,next)=>{
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const price = req.body.price;
    const authorEmail = req.body.authorEmail;
    const publicationDate = req.body.publicationDate;
    const publisherEmail = req.body.publisherEmail;
    const language = req.body.language;
    const pageCount = req.body.pageCount;
    const hardCopy = req.body.hardCopy;
    const ISBN = req.body.ISBN;

    const findAuthor = await authorModel.findOne({email:authorEmail});
    const findPublisher = await publicationModel.findOne({email: publisherEmail});
    const findBook  = await bookModel.find({title:title, subtitle: subtitle, language:language})

    const checkDateIsValid = date.isValid(publicationDate, "DD/MM/YYYY");
    
    
    let dateNow = new Date();
    
   let newPublicationDate = new Date(publicationDate);



    // comparing two dates
    // if publication date 1 is  greater than current date
    if(findBook.length>0){
        return res.status(400).json({error: false, data:{success:false, message:"Title,Subtitle and language is already in  database."}})
    }
    else if(!checkDateIsValid){
        return res.status(400).json({error: false, data:{success:false, message:"Invalid date formate.Please pass date in DD/MM/YYYY Formate."}})
    }
    else if (newPublicationDate > dateNow){
        return res.status(400).json({error: false, data:{success:false, message:"Please check your date."}})
    }
    else if(!findAuthor){
        return res.status(400).json({error: false, data:{success:false, message:"Did not find author with email.Please check email for author"}})
    }
    else if(!findPublisher){
        return res.status(400).json({error: false, data:{success:false, message:"Did not find publisher with email.Please check email for publisher"}})
    }
    else{
        const saveBook = await bookModel.create({title:title,subtitle:subtitle,price:price, authorEmail:authorEmail,publisherEmail:publisherEmail,
        publicationDate:publicationDate, language:language,pageCount:pageCount,hardCopy:hardCopy,ISBN:ISBN});
        if(saveBook){
            return res.status(201).json({error: false, data:{success:true, message:"Successfully added book.", data: saveBook}})
        }
        else{
            return res.status(400).json({error: false, data:{success:false, message:"Error while inserting data."}})
        }
    }

    

}

// get all book

export const getAllBooks = async(req,res)=>{
    const findAllBook = await bookModel.find({});
    return res.status(200).json({error:false, data:{ success: true, messsage: "Get all books", date: findAllBook}})
}

// sorting by price

export const sortByPrice = async(req,res)=>{
    bookModel.find({}).sort(req.query.sort)
    .then((respo)=>{

        return res.status(200).json({error:false, data:{ success: true, messsage: "Get all books by sorting price", date: respo}})
    })
    .catch((err)=>{
        return res.status(404).json({error:false, data:{ success: false, messsage: err}})

    })
  
}

// get book

// delete book


// edit book