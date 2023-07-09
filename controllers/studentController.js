const Student = require("../models/students");
const{ body, validationResult} = require("express-validator");
const async= require("async");


exports.student_list = (req,res) => {
    Student.find({},"id name")
        .exec(function (err,list_students){
            if(err){
                return next(err);
            }
            res.render("student_list", {title: "STUDENT LIST", student_list: list_students, activePage: "student_list"});
        })
};

exports.student_create_get = (req,res) => {
    res.render("student_form",{title: "ADD STUDENT",activePage: "new_student"});
};
exports.student_create_post = [
    body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name must be specified"),
    body("id")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("ID must be specified"),
    body("fathers_name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Father's Name must be specified"),
    body("contact_no")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Contact Number must be specified"),
    body("address")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Address must be specified"),
    body("class")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Class must be specified"),
    body("gender")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Gender must be specified"),
    (req,res,next) => {
        const errors = validationResult(req);

        
        const student = new Student({
            id : req.body.id,
            name: req.body.name,
            fathers_name: req.body.fathers_name,
            contact_no: req.body.contact_no,
            address: req.body.address,
            class: req.body.class,
            gender: req.body.gender,
        });
        if(!errors.isEmpty()){
            res.render("student_form",{
                title:"ADD STUDENT",
                activePage: "new_student",
                });
                return;
        }
        student.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/catalog/student/create");
    });
    }
];
exports.student_delete_get = (req,res)=> {
    res.send("Not implemented: student delete get");
};
exports.student_delete_post = (req,res)=> {
    res.send("Not implemented: student delete post");
};
