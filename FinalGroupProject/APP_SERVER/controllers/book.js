const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

const _renderHomepage = function(req,res,responseBody){
    res.render('list-display',{books: responseBody});
};

const _renderCreatePage = function(req, res){
    res.render('create', {
       title: "Create a New Book"
    });
};

module.exports.addNewBook = function(req, res){
    _renderCreatePage(req, res);
};

module.exports.doAddNewBook = function(req, res){
    const path = '/api/book';
    const postdata = {
      	Title: req.body.Title,
        author: req.body.author,
	  	category: req.body.category,
	    Reviews: req.body.Reviews,
        language: req.body.language	   
    };
    const requestOptions = {
        url: apiOptions.server+path,
        method: 'POST',
        json:postdata
    };
    request(
        requestOptions,
		(err, response, body) => {
            if (response.statusCode === 201){
                res.redirect('/list');
            }
        }
    );
};


module.exports.homelist = function(req,res){
    const path = '/api/book';
    const requestOptions = {
        url: apiOptions.server + path,
        method : 'GET',
        json : {}
    };
    request(
    requestOptions,
    (err,response,body)=>{
        _renderHomepage(req,res,body);
    });
};

const _renderDetailpage = function (req,res,responseBody){
    res.render('details',{
        currentBook: responseBody
    });
};
module.exports.bookInfo = function(req,res){
    const path = `/api/book/${req.params.bookid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method : 'GET',
        json : {}
    };
    request(
    requestOptions,
    (err,response,body)=>{
        _renderDetailpage(req,res,body);
    });
};

/*module.exports = {
    _renderDetailpage,
	_renderCreatePage,
	_renderHomepage	
};*/