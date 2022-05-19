const mongoose = require("mongoose");
const Tracker = require("../models/tracker");
const Admin = require("../models/admin");








exports.getAddTrack = (req, res, next) => {
    res.status(200).render("admin/add-track", {
        pageTitle: "Create New Tracker" ,
        path: "/AddTrack",
        editing: false,
        
    })
}



exports.postTrack = (req, res, next) => {
  const receivers_name = req.body.receivers_name;
  const receivers_address = req.body.receivers_address;
  const receivers_country = req.body.receivers_country;
  const senders_name = req.body.senders_name;
  const item_type = req.body.item_type;
  const item_weight = req.body.item_weight;
  const parcel_color = req.body.parcel_color;
  const package_status = req.body.package_status;
  const package_content = req.body.package_content;
  const dispatch_date = req.body.dispatch_date;
  const arrival_country = req.body.arrival_country;
  const logistic_detail = req.body.logistic_detail;
  const checkpoints = req.body.checkpoints;
  const created_at = req.body.created_at;
  const updated_at = req.body.updated_at;
  const track_code = req.body.track_code;

  const tracker = new Tracker({
    receivers_name: receivers_name,
    receivers_address: receivers_address,
    receivers_country: receivers_country,
    senders_name: senders_name,
    item_type: item_type,
    item_weight: item_weight,
    parcel_color: parcel_color,
    package_status: package_status,
    package_content: package_content,
    dispatch_date: dispatch_date,
    arrival_country: arrival_country,
    logistic_detail: logistic_detail,
    checkpoints: checkpoints,
    created_at: created_at,
    updated_at: updated_at,
    track_code: track_code,
    adminId: req.user
  });
  console.log(tracker);
  tracker
    .save()
    .then((result) => {
      console.log(result);
      console.log("Created Product");
      res.redirect("dashboard");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//find by our hash!





exports.getTrackers = (req, res, next) => {
    Tracker.find()
      .then((trackers) => {
        res.status(200).render("admin/dashboard", {
          tracks: trackers,
          pageTitle: "Admin Dashboard",
          path: "/dashboard",
          editing: false,
        
        
        });
      })
      .catch((err) => {
        const error = new Error(err);
        console.log(error)
        error.httpStatusCode = 500;
        return next(error);
      
      });
  };

  exports.getEditTrack = (req, res, next) => {
      const editMode = req.query.edit;
        if (!editMode) {
           return  res.redirect('/')
        }
      const trackerId = req.params.trackerId;
      console.log(trackerId)
      Tracker.findById(trackerId, (error, tracker) => {
           if(error) {
               console.log(error)
           } else {
            res.status(200).render("admin/editTrack", {
                    pageTitle: "Edit Track",
                    title: "Edit Page",
                    path: "/admin/edit",
                    editing: editMode,
                    tracker: tracker,
                  
                    
                  });   
            console.log(trackerId, tracker)
           } 
      })
   
  };

  

  exports.postEditTracker = (req, res, next) => {
    const trackerId = req.body.trackId
    const updatedReceivers_name = req.body.receivers_name;
    const updatedReceivers_address = req.body.receivers_address;
    const updatedReceivers_country = req.body.receivers_country;
    const updatedSenders_name = req.body.senders_name;
    const updateItem_type = req.body.item_type;
    const updatedItem_weight = req.body.item_weight;
    const updatedParcel_color = req.body.parcel_color;
    const updatedPackage_status = req.body.package_status;
    const updatedPackage_content = req.body.package_content;
    const updatedDispatch_date = req.body.dispatch_date;
    const updatedArrival_country = req.body.arrival_country;
    const updatedLogistic_detail = req.body.logistic_detail;
    const updatedCheckpoints = req.body.checkpoints;
    const updatedCreated_at = req.body.created_at;
    const updatedUpdated_at = req.body.updated_at;
    const updatedTrack_code = req.body.track_code;


    Tracker.findOneAndUpdate(trackerId)
    .then(tracker => {
      tracker.receivers_name = updatedReceivers_name;
      tracker.receivers_address = updatedReceivers_address;
      tracker.receivers_country = updatedReceivers_country;
      tracker.senders_name = updatedSenders_name;
      tracker.item_type = updateItem_type;
      tracker.item_weight = updatedItem_weight;
      tracker.parcel_color = updatedParcel_color;
      tracker.package_status = updatedPackage_status;
      tracker.package_content = updatedPackage_content;
      tracker.dispatch_date = updatedDispatch_date;
      tracker.arrival_country = updatedArrival_country;
      tracker.logistic_detail =  updatedLogistic_detail;
      tracker.checkpoints = updatedCheckpoints;
      tracker.created_at = updatedCreated_at;
      tracker.updated_at =  updatedUpdated_at;
      tracker.track_code = updatedTrack_code;
      console.log(tracker)
      return tracker.save().then(result => {
        console.log(tracker);
        res.redirect('dashboard');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  }


  
  





exports.postDeleteTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    Tracker.findById(trackId)
      .then(track => {
        console.log(track)
        if (!track) {
          return next(new Error('Track not found.'));
        }
        return Tracker.deleteOne({ _id: trackId });
      })
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.status(200).json({ message: 'Success!' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Deleting track failed.' });
      });
  };
  
