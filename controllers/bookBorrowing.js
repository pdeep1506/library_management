import bookModel from "../models/book";
import bookDetailsModel from "../models/bookDetails";
import borrowingModel from "../models/borrowingSchema";
import userModel from "../models/user";

import canBorrowBook from "../utillis/bookBorrowingHelper";

import { ROLES, LIMIT_OF_BOOKS } from "../utillis/ROLE";



export const borrowBook = async(req,res,next)=>{

    const userId = req.body.userId;
    const bookId = req.body.bookId;
    
    const userDeatils = await userModel.findById({userId});
    const userBorrowingHistory = await borrowingModel.findById({userId:userId});
    const findBookDetials = await bookDetailsModel.findById(bookId);
    const checkEligibility = canBorrowBook(userDeatils.ROLES, userBorrowingHistory, Date.now());


    if (findBookDetials.length <= 0) {
        //! no book of that id
        return res.status(400).json({ error: false, data: { success: false, message: "No book found with that ID." } });
    } else if (findBookDetials.totalAvailableCopy !== 1) {
        //! no book available
        return res.status(400).json({ error: false, data: { success: false, message: "No available copies of the book." } });
    }
    
    else{

    
    if (checkEligibility.canBorrow === true) {
        //! can borrow

        const saveBorrowedBook = await borrowingModel.create({userId:userId, bookId:bookId,borrowDate: Date.now()});
        const updateBookDetails = await bookDetailsModel.findOneAndUpdate({bookId:bookId}, {totalAvailableCopy : findBookDetials.totalAvailableCopy-1});

        const borrowedBook = await bookModel.findById(bookId, { title: 1 }); 

        return res.status(200).json({ error: false, data: { success: true, message: `You successfully borrowed book: ${borrowedBook.title}` } });


    } else if (checkEligibility.canBorrow === false && fine === true) {
        //! fine
        return res.status(400).json({ error: true, data: { message: "Fine is applicable. Please clear your fines before borrowing.", fine: checkEligibility.fine } });
    } else if (checkEligibility.canBorrow === false && fine === false) {
        //! return book
        return res.status(400).json({ error: false, data: { success: false, message: "You have reached your borrowing limit. Please return a book before borrowing another one." } });
    }
    

    
}   
}