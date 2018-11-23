var sqlMap = {
  // 用户
  reader: {
    add: 'insert into reader(name) values (?)',
    delete: 'delete from reader where name = ?',
    search: 'select * from reader where name = ?'
  },
  book: {
    add: 'insert into book(name, author, stock) values (?, ?, ?)',
    search: 'select * from book where name = ?'
  }
}

module.exports = sqlMap;