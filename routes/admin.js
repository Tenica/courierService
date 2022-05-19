const path = require('path');
const express = require('express');
const { body, check } = require('express-validator')
const AdminController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth');
const router =  express.Router();





 //addtrack 
 router.get('/AddTrack', isAuth, AdminController.getAddTrack)


//create a client-detail
router.post('/dashboard', isAuth, AdminController.postTrack)




//Get all clients-detail
router.get('/dashboard', isAuth, AdminController.getTrackers);


//post edited input to db
router.post('/edit', isAuth, AdminController.postEditTracker);


//delete tracker detail
router.delete('/deleteTrack/:trackId', isAuth, AdminController.postDeleteTrack)
      
    
//edit tracker detail
router.get('/edit/:trackerId', isAuth, AdminController.getEditTrack)    


  
module.exports = router