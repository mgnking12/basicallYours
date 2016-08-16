var express = require('express');
var homeRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var router = function(nav) {

    homeRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/basicallYoursApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function(err, results) {
                        res.render('index', {
                            title: 'BasicallYours',
                            nav: nav,
                            books: results
                        });
                    }
                );
            });
        });
    // homeRouter.route('/:id')
    //     .get(function(req, res) {
    //         var id = new ObjectId(req.params.id);
    //         var url = 'mongodb://localhost:27017/libraryApp';
    //         mongodb.connect(url, function(err, db) {
    //             var collection = db.collection('books');
    //             collection.findOne({
    //                     _id: id
    //                 },
    //                 function(err, results) {
    //                     res.render('bookView', {
    //                         title: 'Books',
    //                         nav: nav,
    //                         book: results
    //                     });
    //                 }
    //             );
    //         });
    //     });

    return homeRouter;
};

module.exports = router;