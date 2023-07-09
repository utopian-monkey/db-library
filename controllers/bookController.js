const Book = require("../models/books");
const Student= require("../models/students");

const async= require("async");
const {body, validationResult } = require("express-validator");


exports.book_list =(req,res)=>{
    Book.find({},"id name")
        .exec(function (err,list_books){
            if(err){
                return next(err);
            }
            res.render("book_list", {title: "BOOK LIST", book_list: list_books, activePage: "book_list"});
        })
};
exports.book_create_get =(req,res)=>{
    res.render("book_form",{
        title: "ADD BOOK",
        activePage: "new_book"
    });
};
exports.book_create_post =[
    
    body("name","Title must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
    body("id","ID must not be empty")
    .trim()
    .isLength({min :1})
    .escape(),
    (req,res,next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render("book_form",{
                title: "ADD BOOK",
                activePage: "new_book"
            });
            return;
        }

        const book = new Book({
            name: req.body.name,
            id: req.body.id,
            author: req.body.author,
            language:req.body.language,
            publication: req.body.publication,
        });

        book.save((err) => {
            if(err) {
                return next(err);
            }
            res.redirect("/catalog/book/create");


        })
    }
];
exports.book_delete_get =(req,res)=>{
    res.send("Not implemented:Book delete post");
};

exports.book_delete_post =(req,res)=>{
    res.send("Not implemented:Book delete post");
};