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
    const checkDateIsValid = date.isValid(publicationDate, "DD/MM/YYYY");
    
    let dateNow = new Date();
    
   let newPublicationDate = new Date(publicationDate);
    

    // comparing two dates
    // if publication date 1 is  greater than current date
    if(!checkDateIsValid){
        return res.json({error: false, data:{success:false, message:"Invalid date formate.Please pass date in DD/MM/YYYY Formate."}})
    }
    else if (newPublicationDate > dateNow){
        return res.json({error: false, data:{success:false, message:"Please check your date."}})
    }
    else if(!findAuthor){
        return res.json({error: false, data:{success:false, message:"Did not find author with email.Please check email for author"}})
    }
    else if(!findPublisher){
        return res.json({error: false, data:{success:false, message:"Did not find publisher with email.Please check email for publisher"}})
    }

    return res.json({data:"dms"})

}

// get all book



// get book

// delete book


// edit book