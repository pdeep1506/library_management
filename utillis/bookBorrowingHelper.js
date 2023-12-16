import moment from "moment"; 

import { ROLES, LIMIT_OF_BOOKS, FINE } from './ROLE'

const canBorrowBook = (userRole, borrowedBooks, currentDate) => {
  // Check if the user has reached the limit of allowed books

  if (borrowedBooks.length >= LIMIT_OF_BOOKS[ROLES.userRole]) {
    return { canBorrow: false, fine: false,message: "User has reached the limit of borrowed books." };
  }

  
  const overdueBooks = borrowedBooks.filter((book) => {
    return book.returnDate && moment(book.returnDate).isBefore(currentDate);
  });

 
  if (overdueBooks.length > 0) {
    const fineAmount = FINE[ROLES.userRole] * overdueBooks.length;
    return {
      canBorrow: false,
      fine: true,
      message: `User has overdue books. Fine amount: $${fineAmount}`,
    };
  }

  // User is allowed to borrow a book
  return { canBorrow: true, fine:false,message: "User is allowed to borrow a book." };
};

export default canBorrowBook;
