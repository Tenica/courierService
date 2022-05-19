const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    receivers_name: {
        type: String,
        required: true,
    },
    receivers_address: {
        type: String,
        required: true,
    },
    receivers_country: {
        type: String,
        required: true,
    },
    senders_name: {
        type: String,
        required: true,
    },
    item_type: {
        type: String,
        required: true,
    },
    item_weight: {
        type: String,
        required: true,
    },
    parcel_color: {
        type: String,
        required: true,
    },
    package_status: {
        type: String,
        required: true,
    },
    package_content: {
        type: String,
    },
    dispatch_date: {
        type: String,
        required: true,
    },
    arrival_country: {
        type: String,
        required: true,
    },
    logistic_detail: {
        type: String,
        required: true,
    },
    checkpoints: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    track_code: {
        type:String,
        required: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref:'Admin',
        required: true
      }

      
});






  

module.exports = mongoose.model('Tracker', trackerSchema);