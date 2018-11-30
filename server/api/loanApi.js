var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}


router.post('/borrowBookr', (req, res) => {
  var sql = $sql.reader.borrowBook
  var params = req.body
  console.log(params)
  conn.query(sql, [params.readerName], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.post('/borrowBookb', (req, res) => {
  var sql = $sql.book.lendBook
  var params = req.body
  console.log(params)
  conn.query(sql, [params.bookName], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.post('/borrowBook', (req, res) => {
  var sql = $sql.borrow.addBorrow
  var params = req.body
  console.log(params)
  conn.query(sql, [params.readerID, params.bookID, params.borrowDate, params.expectReturnDate], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.get('/getexpectDate', (req, res) => {
  var sql = $sql.borrow.getexpectDate
  var params = req.query
  console.log(params)
  conn.query(sql, [params.bookID], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      res.send(result)
    }
  })
})

router.post('/returnBook', (req, res) => {
  var sql = $sql.borrow.returnBook
  var params = req.body
  console.log(params)
  conn.query(sql, [params.readerID, params.bookID, params.expectReturnDate, params.returnDate, params.feePaying], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router