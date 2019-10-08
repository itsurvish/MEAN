var express = require('express');
var router = express.Router();

const ctrlMain = require("../controllers/main");
const ctrlBook = require("../controllers/book");
const ctrlAbout = require("../controllers/about");

/* GET home page. */

router.get('/',ctrlMain.index);
router.get('/book/:bookid',ctrlBook.bookInfo);
router.get('/list',ctrlBook.homelist);
router.get('/about', ctrlAbout.about);

router.get('/new',ctrlBook.addNewBook);
router.post('/new',ctrlBook.doAddNewBook);
module.exports = router;
