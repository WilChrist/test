const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

// Default Elements
  function defaultElement(){
    //super
    Schema.apply(this, arguments);

    //add defaults elements
    this.add({
        id:{type: String, required : true},
        author:{type: String, required : true},
        name:{type: String,required: true},
        type:{type: String, required: true},
        registering_date:{type: Date,Default: Date.now}, 
        id_diagram:{type: String, required: false} 
    });
};
util.inherits(defaultElement, Schema);
// Citizen Schema
const ProjectSchema = new defaultElement();
 ProjectSchema.add({

 });
 const Project = module.exports = mongoose.model('Project', ProjectSchema);
