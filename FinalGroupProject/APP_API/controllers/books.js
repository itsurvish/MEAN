const mongoose = require('mongoose');
const Book = mongoose.model('Book');
//const review = mongoose.model('review');

const getBooks = function (req, res) {
    Book.find().exec(function (err, bookdata) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }

        res
            .status(200)
            .json(bookdata);
    });
};
const createBook = function (req, res) {
    Book.create({
        Title: req.body.Title,
        author: req.body.author,
        category: req.body.category,
        Reviews: req.body.Reviews,
        language: req.body.language,
    }, (err, bookdata) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(bookdata);
        }
    });

};


const getSingleBook = function (req, res) {
    if (req.params && req.params.bookid) {
        Book
            .findById(req.params.bookid)
            .exec((err, book) => {
                if (!book) {
                    return res
                        .status(404)
                        .json({
                            "message": "book not found"
                        });
                } else if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(200)
                    .json(book);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No locationid in request"
            });
    }
};

const updateBook = function (req, res) {
    if (!req.params.bookid) {
        res
            .status(404)
            .json({
                "message": "Not found, bookid is required"
            });
        return;
    }
    Book.findById(req.params.bookid)
        .exec((err, bookdata) => {
            if (!bookdata) {
                res
                    .json(404)
                    .status({
                        "message": "bookid Not found"
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            bookdata.Title = req.body.Title,
                bookdata.author = req.body.author,
                bookdata.category = req.body.category,
                bookdata.Reviews = req.body.Reviews,
                bookdata.language = req.body.language;
            bookdata.save((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(bookdata);
                }
            });
        });
};

const deleteBook = function (req, res) {
    const bookid = req.params.bookid;
    if (bookid) {
        Book
            .findByIdAndRemove(bookid)
            .exec((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }

                res
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No bookid"
            });
    }
};

module.exports = {
    getBooks,
    createBook,
    getSingleBook,
    updateBook,
    deleteBook
};
