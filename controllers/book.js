import bookModel from "../models/book";
import authorModel from "../models/author";
import publicationModel from "../models/publication";



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

}