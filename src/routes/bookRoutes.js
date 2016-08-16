var express = require('express');
var shopRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var router = function(nav) {

    shopRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function(err, results) {
                        res.render('booksListView', {
                            title: 'Books',
                            nav: nav,
                            books: results
                        });
                    }
                );
            });
        });
    shopRouter.route('/:id')
        .get(function(req, res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({
                        _id: id
                    },
                    function(err, results) {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    }
                );
            });
        });

    return shopRouter;
};

module.exports = router;