'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeasureModelSchema =new Schema({
    id: mongoose.ObjectId,
    name: String,
    dev: Number,
    devOut: Number,
    controlColor: String
});

const ControlModelSchema = new Schema({
    measure: { type: [MeasureModelSchema],
        ref: 'Measure' }
});

const FeatureModelSchema = new Schema({ 
    id: mongoose.ObjectId,
    name: String,
    control: { type: [ControlModelSchema],
        ref: 'Control' }
 });

const FactoryModelSchema = Schema( {
    id: mongoose.ObjectId,
    name: String,
    features: [{ 
        id: mongoose.ObjectId,
        name: String,
        active: Boolean,
        control: [{
            measure: [{
                id: mongoose.ObjectId,
                name: String,
                dev: Number,
                devOut: Number,
                controlColor: String
            }]
        }]
     }]
});
module.exports = mongoose.model('Factory', FactoryModelSchema);
