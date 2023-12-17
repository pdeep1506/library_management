import bookModel from "../models/book.js";
import authorModel from "../models/author.js";
import publicationModel from "../models/publication.js";
import date from 'date-and-time';

const generateISBN = ()=>{
    //! ISBN sample = 978 - 0 - 446 - 31708 - 9
     //? 0 = country  or language group
     //? 446  = identifier for publisher
     //? 31708 = identifer the title, edition or formate
     //? 9 = identify the checklist digit
}
// save book

export const addBook = async(req,res,next)=>{
   
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const price = req.body.price;
    const authorId = req.body.authorId;
    const publicationDate = req.body.publicationDate;
    const publisherId = req.body.publisherId;
    const language = req.body.language;
    const pageCount = req.body.pageCount;
    const hardCopy = req.body.hardCopy;
    const ISBN = req.body.ISBN;

    const findAuthor = await authorModel.findOne({_id:authorId});
    const findPublisher = await publicationModel.findOne({_id: publisherId});
    const findBook  = await bookModel.find({title:title, subtitle: subtitle, language:language})
    const finISBM = await bookModel.find({ISBN: ISBN});

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
    else if(finISBM.length >0){
        return res.status(400).json({error: false, data:{success:false, message:"Book with this ISBN is already in database."}})
    }
    else{
        const saveBook = await bookModel.create({title:title,subtitle:subtitle,price:price, authorId:authorId,publisherId:publisherId,
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
    const findAllBook = await bookModel.find({})
    .populate('authorId') 
    .populate('publisherId'); 
    if(findAllBook.length >0){
        return res.status(200).json({error:false, data:{ success: true, messsage: "Get all books", date: findAllBook}})
    }
    else{
        return res.json({error:false, date:{ success: false, message:"Did not  find any book"}});
    }
   
}

// sorting by price

export const sortBook = async(req,res)=>{
    bookModel.find({}).populate('authorId') 
    .populate('publisherId').sort(req.query.sort)
    .then((respo)=>{

        return res.status(200).json({error:false, data:{ success: true, messsage: "Get all books by sorting price", date: respo}})
    })
    .catch((err)=>{
        return res.status(404).json({error:false, data:{ success: false, messsage: err}})

    })
  
}

// get book
export const getBook = async(req,res,next)=>{
    
    let query = {};
    if(req.body.id){
        query.id = req.body.id;
    }
    else if(req.body.ISBN){
        query.ISBN = req.body.ISBN;
    }
    const findBook = await bookModel.find(query).populate('authorId') 
    .populate('publisherId'); 
    if(findBook.length >0){
        return res.json({error:false, date:{ success: true, message:"Successfully find book", date: findBook}});
    }
    else{
        return res.json({error:false, date:{ success: false, message:"Did not  find any book"}});
    }

    
}


// edit book

export const updateBook = async(req,res,next)=>{
   

    let query = {};
    if(req.body.id){
        query.id = req.body.id;
    }
    else if(req.body.ISBN){
        query.ISBN = req.body.ISBN;
    }

    const findBookAndUpdate = await bookModel.findOneAndUpdate(query, req.body);
    if(findBookAndUpdate){
        return res.status(201).json({error:false, date:{success:true, message:"Successfully updated"}})
    }
    else{
        return res.status(401).json({error: false, date:{success:false, message:"Error while updating book"}})
    }

}


// search book

export const searchBook = async(req,res)=>{
    let query = {};
   const {title, subtitle} = req.query
   if(title){
    query.title = {$regex: title, $options:"i"}
   }
   if(subtitle){
    query.subtitle = {$regex: subtitle, $options:"i"};
   }
    const result = await bookModel.find(query).populate('authorId') 
    .populate('publisherId'); 
    // console.log(query)
    // console.log(result)
    if(result.length > 0){
        return res.status(200).json({error:false, data:{success:true, date:result}})
    }
    else{
        return res.status(500).json({error:false, data:{success:false, message:"Not a Valid Search"}})
    }
    
}