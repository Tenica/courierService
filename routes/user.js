const express = require('express');
const userController = require('../controllers/user')


const router = express.Router();

router.get('/', userController.getIndexPage)

router.get('/About', userController.getAboutPage)

router.get('/Contact', userController.getContactPage)

router.get('/Services', userController.getServicePage)

router.get('/Testimonials', userController.getTestimonial)

router.get('/Track', userController.getTrack)

router.post('/Track', userController.getTrackDetail)

router.get('/tracks',userController.getTrackDetails)

//Service sub pages

router.get('/Air-freight', userController.getAirFreight)

router.get('/Cargo-Service', userController.getCargoPage)

router.get('/Door-to-Door', userController.getDoorPage)

router.get('/Ocean-freight', userController.getOceanPage)

router.get('/Road-Freight', userController.getRoadPage)

router.get('/Warehousing', userController.getWarehousePage)

router.get('/Worldwide-Transport', userController.getWorldwidePage)



module.exports = router