import bookBorrowingModel from "../models/bookBorrowing";
import { ROLES, LIMIT_OF_BOOKS } from "../utillis/ROLE";
export const borrow_books = async(req,res)=>{
    const  userId = req.body.userId;
    const bookId = req.body.bookId;
    if(!userId){
        //! user id not found
        return res.status().json({})
    }
    else if(!bookId){
        //! book details not found
        return res.status().json({})
    }
    const userBorrowingData = await bookBorrowingModel.find({userId: userId}).populate("userId").populate("borrowed_books");

    if(!userBorrowingData){
        //! details not found
    }

    if(userBorrowingData.userId.role == ROLES.User && userBorrowingData.no_of_borrowed_books >= LIMIT_OF_BOOKS.$`userBorrowingData.userId.role`){
            //! user is trying to borrrow more books than have permission
    }
    else if(userBorrowingData.fine_amount > 500){
          //! please pay find befor borrowing books
    }

    userBorrowingData.borrowed_books.push({id: bookId, date: new Date()});
    userBorrowingData.no_of_borrowed_books +=1;
    userBorrowingData.save();
    //! details succesfully updated
    //! user succesfully get book

}

export const payFind = async(req,res)=>{
    const  userId = req.body.userId;
    const amountPaid = req.body.amountPaid;
   
    if(!userId){
        //! user id not found
        return res.status().json({})
    }
    else if(!amountPaid){
        //! how much user paid is not found
    }
    const userBorrowingData = await bookBorrowingModel.find({userId: userId}).populate("userId").populate("borrowed_books");
    if(!userBorrowingData){
        //! details not found
    }
    else if(userBorrowingData.fine_amount ==0){
        //! user does not have any find
    }

    if(userBorrowingData.fine_amount < amountPaid){
        const totalDebt = userBorrowingData.fine_amount;
        userBorrowingData.fine_amount = 0;
        userBorrowingData.save();
        //! user paid = amountPaid = totalDebt;

    }
    else{
         userBorrowingData.fine_amount =- amountPaid;
        //! user now have total _ debt;
    }

}

//! when user lost books, than update find and count
//! when user return books, than update count and count fine if applicable

//! find details