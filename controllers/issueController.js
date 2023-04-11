const Issue = require("../models/issues");
const Book = require("../models/books");
const Student= require("../models/students");
const async= require("async");

exports.index = (req,res) =>{
    async.parallel(
        {
            book_count(callback){
                Book.countDocuments({},callback);
            },
            student_count(callback){
                Student.countDocuments({},callback);
            },
        },
        (err,results)=> {
            res.render("index",{
                title: "Home",
                error:err,
                data: results,
            });
        }
    );
}

exports.issue_book_post =async(req,res,next)=>{
    const action= req.body.action;
    const studentId = req.body.studentId;
    if(action==='book issue'){
        //console.log(req.body);
        async.parallel({
            bookId(callback){
                Book.findOne({id:req.body.bookId},"_id",callback);
            },
            studentId(callback){
                Student.findOne({id: studentId},"_id",callback);
            },
        },
        async (err,results)=>{
            if(err){
                return next(err);
            }
            await Student.updateOne({id:studentId},{
                $push:{issued_books: results.bookId}
            });
            const issue = new Issue({
                studentId: results.studentId,
                bookId: results.bookId,
                date_of_issue: Date.now()
        
            });
            issue.save((err)=>{
                if(err){
                    return next(err);
                }
                res.redirect("/")
            });
        }
        )
    
    }
    else if(action==='student details') {
    Student.findOne({id:studentId},"name class")
        .populate('issued_books')
        .exec(function(err, studentData){
            if(err){
                return next(err);
            }
            res.render("index",{
                title:"Home",
                studentId:  studentId,
                studentName: studentData.name,
                studentClass: studentData.class,
                studentBooks: studentData.issued_books
            });
        });
        
    }
    else if(action==='book return'){
        console.log(req.body);
         Student.updateOne({id:req.body.studentId},{
            $pullAll:{
                issued_books: req.body.books
            }
        }).exec(function(err){
            if(err){
                return next(err);
            }
            res.redirect('/');
        });
    }
}

exports.get_details= (req,res)=>{
    Student.find({id: req.studentId},"name class")
        .exec(function(err, studentData){
            if(err){
                return next(err);
            }
            res.render("index",{title:"Home",studentData: studentData});
        })
};


exports.return_book_post= async (req,res,next)=>{
    await Student.updateOne({id:req.body.studentId},{
        $pullAll:{
            id: req.body.books
        }
    });

    console.log(req.body);
};