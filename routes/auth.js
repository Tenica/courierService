const path = require('path');
const { check, body } = require('express-validator');
const express = require('express');
const AuthController = require('../controllers/auth');

const Admin = require('../models/admin');

const router =  express.Router();




router.get('/Register', AuthController.getSignup)

router.get('/Login', AuthController.getLogin)

router.post('/Register', 
[
    check('email')
    .isEmail()
    .withMessage('Please enter a valid Email')
    .normalizeEmail().trim()
    .custom((value, {req}) => {
        // if (value === 'test@test.com') {
        //    throw new Error ('This email address is forbidden')
        // }
        // return true;
       return Admin.findOne({email: value})
        .then(admin => {
            if(admin) {
                return Promise.reject('E-mail exists already, please pick a different one.')
            }
        })
    }),
    body('password',
    'Please enter a password with only numbers and text '
    )
    .isLength({min: 5})
    .isAlphanumeric()
    .trim(),
    body('confirmPassword').custom((value, {req}) => {
             if (value !== req.body.password) {
                 throw new Error('Password have to match!')
             }
             return true;
    })
],
AuthController.postSignup)



router.post('/Login', 

[
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password', 'Password has to be valid.')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()
],
AuthController.postLogin)

router.post('/Logout', AuthController.postLogout)


module.exports = router;