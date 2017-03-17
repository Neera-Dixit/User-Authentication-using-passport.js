var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  displayName : String,
  image : String,
  email : String,
  facebook : Object,
  twitter : Object,
  google : Object,
  github : Object,
  instagram : Object,
  linkedin : Object
});

module.exports = mongoose.model('user',userSchema);



