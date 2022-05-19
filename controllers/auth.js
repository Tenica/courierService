const mongoose = require("mongoose");

const { validationResult } = require('express-validator')
const Admin = require("../models/admin");


exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render('admin/Login', {
    path: '/Login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',

    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/login", {
      pageTitle: "Login",
      title: "Login ",
      path: "/Login",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      validationErrors : errors.array(),
      oldInput: {
        email: email, 
        password:password,
       
      }
    });
  }
  Admin.findOne({ email: email })
    .then((user) => {
      if (!user) {
       
        return res.redirect("/admin/login",  {
          pageTitle: "Login",
          title: "Login ",
          path: "/Login",
          isAuthenticated: false,
          errorMessage: 'Invalid email or Password',
          oldInput: {
            email: email, 
            password:password,
           
          },  
          validationErrors : []
        })
      } else {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
           res.redirect("/admin/dashboard");
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};

exports.postLogout = (req, res, next) => {

    req.session.destroy((err) => {
        console.log(err)
      res.redirect('login')
    })
   
  };

  exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0]
    } else {
      message = null
    }
    res.status(200).render("admin/register", {
        pageTitle: "Register",
        title: "Admin Register",
        path: "/Register",
        isAuthenticated: false,
        errorMessage: message,
        oldInput: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        validationErrors: []
      });
    };
  

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password  = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/register", {
      pageTitle: "Register",
      title: "Admin Register",
      path: "/Register",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email, 
        password:password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors : errors.array()
    });
  }
     const admin = new Admin({
         email: email,
         password: password,
         tracks: { items:[] }
         
     });
    
      return admin.save().then(result => {
        res.redirect('/admin/login')
    
  }).catch(err => {
      console.log(err)
  })
}

