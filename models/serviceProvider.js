const mongoose = require('mongoose');
let CITIZEN= require('../models/citizen');

const ServiceProviderSchema=CITIZEN.schema;
ServiceProviderSchema.add({
    company:{
        type: String,
        required: false
      }
});


const ServiceProvider = module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
//const ServiceProvider = module.exports = CITIZEN.discriminator('ServiceProvider',ServiceProviderSchema);
