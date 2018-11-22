import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)
import addReader from '../components/reader/addReader.vue'
import cancelReader from '../components/reader/cancelReader.vue'
import searchReader from '../components/reader/searchReader.vue'
import addBook from '../components/book/addBook.vue'
import searchBookInfo from '../components/book/searchBookInfo.vue'
import searchBookLoan from '../components/book/searchBookLoan.vue'
import borrowBook from '../components/loan/borrowBook.vue'
import feePaying from '../components/loan/feePaying.vue'
import returnBook from '../components/loan/returnBook.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/reader/addReader', 
          component: addReader
        },
        {
          path: '/reader/cancelReader',
          component: cancelReader
        },
        {
          path: '/reader/searchReader',
          component: searchReader
        },
        {
          path: '/book/searchBookInfo',
          component: searchBookInfo
        },
        {
          path: '/book/addBook',
          component: addBook
        },
        {
          path: '/book/searchBookLoan',
          component: searchBookLoan
        },
        {
          path: '/loan/borrowBook',
          component: borrowBook
        },
        {
          path: '/loan/returnBook',
          component: returnBook
        },
        {
          path: '/loan/feePaying',
          component: feePaying
        }
      ]
    }
  ]
})
