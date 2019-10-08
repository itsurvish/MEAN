const mongoose = require('mongoose');

//const reviewSchema = new mongoose.Schema({
//
//    author: String,
//    rating: {
//        type: Number,
//       // required: true
////        min: 0,
////        max: 5
//    }
//});

const bookSchema = new mongoose.Schema({


    Title: {
        type: String,
//        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String

    },
    Reviews: {
        type: String
    },
    language: {
        type: String
    }    
});

mongoose.model('Book',bookSchema);
