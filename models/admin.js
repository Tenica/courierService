const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
      },
      password: {
       type: String,
       required: true
      },
      tracks: {
        item: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Tracker',
            required: true
          }
        ]
      }
     
})




module.exports =  mongoose.model('Admin', adminSchema)

