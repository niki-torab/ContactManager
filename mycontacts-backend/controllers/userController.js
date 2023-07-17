// @desc Register a user
// @route POST /api/users/register
// @access public
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist");





const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password}  = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");

    }
    const userAvailable = await User.findOne({email})
    if (userAvailable){
        res.status(402);
        throw new Error("Email already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword, // Assuming you have the hashed password available
      });
    console.log(`User created ${user}`)
    if (user){
        res.status(201).json({_id: user.id,email: user.email });
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json(user)
});

// @desc Login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async(req, res) => {
    console.log("hihihihiihi")
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email })
    console.log(user)
    console.log("this is what im doing", req.cookies.accessToken)

    if (user && (await bcrypt.compare(password, user.password))){
        const checkIfBlacklisted = await Blacklist.findOne({ token: req.cookies.accessToken });
        if (checkIfBlacklisted) {
        res.status(401);
        throw new Error("Token is blacklisted");
        }
        console.log("here???");
        const accessToken = jwt.sign({
            user:{
                email: user.email,
                id: user.id,
            },
        }, "niki123",
        {expiresIn : "15m"}
        );
        res.cookie('accessToken', accessToken, { httpOnly: true });

        res.status(200).json({ accessToken: accessToken, userId: user.id });
 
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }

    res.json({message: "Login the user"})
});

    const logoutUser = asyncHandler(async(req, res) => {
        try {

            const { accessToken } = req.body;
            console.log(accessToken)

            // Blacklist the access token by storing it in the blacklist collection
            const blacklistedToken = new Blacklist({ token: accessToken });
            await blacklistedToken.save();

            // Clear the access token cookie
            res.clearCookie('accessToken');

            // Send a success response
            res.status(200).json({ message: 'Logout successful' });


            // Respond with a success status code
            // res.status(200).json({ message: 'User logged out successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



// @desc Display current user
// @route GET /api/users/current
// @access public
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
});


module.exports = {registerUser, loginUser, currentUser, logoutUser}