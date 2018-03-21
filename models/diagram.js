const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

// Default Elements
  function defaultElement(){
    //super
    Schema.apply(this, arguments);

    //add defaults elements
    this.add({
        id:{type: String, required: true},
        name:{type: String,required: true},
        type:{type: String, required: true},
          
    });
};
util.inherits(defaultElement, Schema);
// Citizen Schema
const DiagramSchema = new defaultElement();
 DiagramSchema.add({

 });
 const Diagram = module.exports = mongoose.model('Diagram', DiagramSchema);
