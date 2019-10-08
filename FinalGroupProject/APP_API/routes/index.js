const express = require('express');
const router = express.Router();
const ctrlBook = require('../controllers/books');
//const ctrlReviews = require('../controllers/reviews');


// book
router
    .route('/book')
    .get(ctrlBook.getBooks)
    .post(ctrlBook.createBook);
router
    .route('/book/:bookid')
    .get(ctrlBook.getSingleBook)
    .put(ctrlBook.updateBook)
    .delete(ctrlBook.deleteBook);

//// reviews
//router
//    .route('/book/:bookid/reviews')
//    .post(ctrlReviews.reviewsCreate);
//router
//    .route('/book/:bookid/reviews/:reviewid')
//    .get(ctrlReviews.reviewsReadOne)
//    .put(ctrlReviews.reviewsUpdateOne)
//    .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
