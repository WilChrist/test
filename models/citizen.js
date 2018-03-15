const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

// Default Elements
  function defaultElement(){
    //super
    Schema.apply(this, arguments);

    //add defaults elements
    this.add({
        first_name:{type: String,required: true},
        last_name:{type: String, required: true},
          email:{
            type: String,
            required: true
          },
          username:{
            type: String,
            required: true
          },
          password:{
            type: String,
            required: true
          },
          birth_date:{
            type: Date,
            required: true
          },
          gender:{
            type: String,
            required: true
          },
          location:{
            type: String,
            required: true
          },
          registering_date:{
            type: Date,
            Default: Date.now
          }
    });
};
util.inherits(defaultElement, Schema);
// Citizen Schema
const CitizenSchema = new defaultElement();
 CitizenSchema.add({

 });

/*const ServiceProviderSchema=new defaultElement();
ServiceProviderSchema.add({
    company:{
        type: String,
        required: true
      }
});/*
const AdministratorSchema=new defaultElement();
AdministratorSchema.add({
    id:{
        type: Number,
        required: true
      }
});*/

const Citizen = module.exports = mongoose.model('Citizen', CitizenSchema);
//const ServiceProvider = module.exports = Citizen.discriminator('ServiceProvider',ServiceProviderSchema);
//const Administrator = module.exports = Citizen.discriminator('Administrator',AdministratorSchema);
//const ServiceProvider = module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
//const Administrator = module.exports = mongoose.model('Administrator', AdministratorSchema);