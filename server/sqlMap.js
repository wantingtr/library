var sqlMap = {
  // 用户
  reader: {
    add: 'insert into reader(readerName) values (?)',
    delete: 'delete from reader where readerName = ?',
    search: 'select * from reader where readerName = ?',
    borrowBook: 'update reader set borrowNum = borrowNum +1 where readerName = ?',
    searchID: 'select readerID from reader where readerName = ?'
  },
  book: {
    add: 'insert into book(bookName, author, stock) values (?, ?, ?)',
    search: 'select * from book where bookName = ?',
    lendBook: 'update book set stock = stock - 1 , lendNum = lendNum + 1 where bookName = ?',//更新书籍表中的库存
    searchBookID: 'select bookID from book where bookName = ?',
    updateStock: 'update book set stock = stock + 1 where bookName = ?'
  },
  borrow: {
    addBorrow: 'insert into borrow(readerID, bookID, borrowDate, expectReturnDate) values (?, ?, ?, ?)',
    getexpectDate: 'select expectReturnDate from borrow where bookID = ?',
    returnBook: 'insert into return(readerID, bookID, expectReturnDate, returnDate, feePaying) values (?, ?, ?, ?)'
  }
}

module.exports = sqlMap;