const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User,Course } = require('../db/index');
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    //get the username 
    const username = req.body.username;
    const password = req.body.password;

    //check if the user already exists  but here i assume that its a new user
    await Admin.create({
        username: username,
        password: password
    });
    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    //create a new course
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    //Course creation
    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    console.log(newCourse);
    res.json({
        message: 'Course created successfully',
        courseId:newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    //the authentication logic is done by the middleware here so no need for me to worry about this
    const allCourses = await Admin.find({});
    res.json({
        courses:allCourses
    })
});

module.exports = router;