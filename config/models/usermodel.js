var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
  displayName : String,
  image : String,
  email : String,
  facebook : Object,
  twitter : Object,
  google : Object,
  github : Object,
  instagram : Object,
  linkedin : Object,
  local : Object
});

userSchema.methods.hashPassword= function(password){
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePassword= function(password){
    return bcrypt.compareSync(password, this.local.password);
}
module.exports = mongoose.model('user',userSchema);



