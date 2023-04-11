const express =require("express");
const router = express.Router();

const book_controller= require("../controllers/bookController");
const student_controller= require("../controllers/studentController");
const issue_controller = require("../controllers/issueController");

router.get("/",issue_controller.index);
router.post("/", issue_controller.issue_book_post);

router.get("/book/create",book_controller.book_create_get);
router.post("/book/create",book_controller.book_create_post);
router.get("/book/:id/delete",book_controller.book_delete_get);
router.post("/book/:id/delete",book_controller.book_delete_post);
router.get("/books",book_controller.book_list);

router.get("/student/create",student_controller.student_create_get);
router.post("/student/create",student_controller.student_create_post);
router.get("/student/:id/delete",student_controller.student_delete_get);
router.post("/student/:id/delete",student_controller.student_delete_post);
router.get("/students",student_controller.student_list);

module.exports =router;