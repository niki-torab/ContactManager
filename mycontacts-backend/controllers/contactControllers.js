const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const Blacklist = require("../models/blacklist");



// const isTokenBlacklisted = async (token) => {
//     const blacklistedToken = await Blacklist.findOne({ token });
//     return !!blacklistedToken;
//   };
// @desc Get all contacts
// @route GET /api/contacts
// @access private



const getContacts = asyncHandler(async(req, res) => {
    // const isBlacklisted = await isTokenBlacklisted(req.cookies.jwt);

    // if (isBlacklisted) {
    //     res.status(401);
    //     throw new Error("Unauthorized");
    //   }
      
      const contacts = await Contact.find({ user_id: req.user.id });
      return res.status(200).json(contacts);
});

// @desc Create new contacts
// @route POST /api/contacts
// @access private

const createContact = asyncHandler(async(req, res) => {
    // const isBlacklisted = await isTokenBlacklisted(req.cookies.jwt);
    // if (isBlacklisted) {
    //     res.status(401);
    //     throw new Error("Unauthorized");
    //   }
    const {name, email, phone, userId} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        user_id: userId,
        name,
        email,
        phone,
        
    })
    console.log({contact});
    return res.status(201).json(contact);
});

// @desc Get new contact
// @route PUT /api/contacts/:id
// @access private

const getContact = asyncHandler(async(req, res) =>{
    // const isBlacklisted = await isTokenBlacklisted(req.cookies.jwt);
    // if (isBlacklisted) {
    //   res.status(401);
    //   throw new Error("Unauthorized");
    // }
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    return res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
   
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User can't update update another person's contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    return res.status(200).json(updatedContact);
});


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async(req, res) =>{
    // const isBlacklisted = await isTokenBlacklisted(req.cookies.jwt);
    // if (isBlacklisted) {
    //     res.status(401);
    //     throw new Error("Unauthorized");
    // }
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(400);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User can't delete another person's contact")
    }
    await Contact.findByIdAndRemove(req.params.id);

    return res.status(200).json(contact);

    
});


module.exports = {
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact
};