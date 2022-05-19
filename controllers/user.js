const mongoose = require('mongoose');

const Tracker = require('../models/tracker')

const Helper = require('../util/helper')




exports.getIndexPage = (req, res, next) => {
    res.status(200).render('index', {
       pageTitle: 'Home',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/',
       support: Helper.support
 
 
    })
 }

 exports.getAboutPage = (req, res, next) => {
    res.status(200).render('about-us', {
       pageTitle: 'About',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/About',
       support: Helper.support
 })
 }

 exports.getContactPage = (req, res, next) => {
    res.status(200).render('contact', {
       pageTitle: 'Contact',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Contact',
       support: Helper.support
 
 })
 }


 exports.getServicePage = (req, res, next) => {
    res.status(200).render('services', {
       pageTitle: 'Services' ,
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Services',
       support: Helper.support
    })
 }

 exports.getTestimonial = (req, res, next) => {
    res.status(200).render('testimonials', {
      pageTitle: 'testimonials',
      title: Helper.title,
      description: Helper.description,
      location: Helper.location,
      address: Helper.address,
      phoneNumber: Helper.phoneNumber,
      path: '/Testimonials',
      support: Helper.support
    })
 }

 exports.getTrack = (req, res, next) => {
    res.status(200).render('track-your-shipment', {
       pageTitle: 'Tracking Page',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Track',
       support: Helper.support
    })
 }

 
 exports.getTrackDetails = (req, res, next) => {
   res.status(200).render('tracks', {
      pageTitle: 'Your Tracking details',
      title: Helper.title,
      description: Helper.description,
      location: Helper.location,
      address: Helper.address,
      phoneNumber: Helper.phoneNumber,
      path: '',
      support: Helper.support,
    
   })
}

 exports.getAirFreight = (req, res, next) => {
    res.status(200).render('service/air-freight-forwarding', {
         pageTitle: 'Air-freight-forward',
         title: Helper.title,
         description: Helper.description,
         location: Helper.location,
         address: Helper.address,
         phoneNumber: Helper.phoneNumber,
         path: '/Air-freight',
         support: Helper.support
       
    })
 }


 exports.getCargoPage = (req,res,next) => {
    res.status(200).render('service/cargo-service', {
       pageTitle: 'Cargo Service',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Cargo-Service',
       support: Helper.support
    })
 }

 exports.getDoorPage = (req,res,next) => {
    res.status(200).render('service/door-to-door-delivery', {
       pageTitle: 'Door-to-Door Delivery',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Door-to-Door',
       support: Helper.support
    })
 }


 exports.getOceanPage =  (req,res,next) => {
    res.status(200).render('service/ocean-freight-forwarding', {
       pageTitle: 'Ocean-Freight-Forwarding',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Ocean-freight',
       support: Helper.support
    })
 }


 exports.getRoadPage =  (req, res, next) => {
    res.status(200).render('service/road-freight-forwarding', {
       pageTitle: 'Road-Freight-Forwarding',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Road-Freight',
       support: Helper.support
    })
 }


 exports.getWarehousePage  = (req, res, next) => {
    res.status(200).render('service/warehousing', {
       pageTitle: 'Warehousing',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Warehousing',
       support: Helper.support
    })
 }

 exports.getWorldwidePage = (req, res, next) => {
    res.status(200).render('service/worldwide-transport', {
       pageTitle:  'Worldwide-Transport',
       title: Helper.title,
       description: Helper.description,
       location: Helper.location,
       address: Helper.address,
       phoneNumber: Helper.phoneNumber,
       path: '/Worldwide-Transport',
       support: Helper.support
    })
 }



 
 exports.getTrackDetail = (req, res, next) => {
   const trackCode = req.body.track_code
   
   Tracker.find({ track_code: trackCode }, function (err, result) {
      res.status(301).render('tracks', {
         pageTitle: 'Your Tracking details',
         title: Helper.title,
         description: Helper.description,
         location: Helper.location,
         address: Helper.address,
         phoneNumber: Helper.phoneNumber,
         path: '/',
         support: Helper.support,
         result: result
      })
      console.log(result)
   }) 
     
   
 };


 
 
 
       

