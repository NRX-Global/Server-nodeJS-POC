var mongoose = require('mongoose');

var locationAttributeSchema = mongoose.Schema({
        // fields
        name: String,
        value: mongoose.Schema.Types.Mixed
    },
    {   // options
        _id: false,
        'versionKey': false
    }
);

var locationEntitySchema = mongoose.Schema({
    erpCode: { type: String, unique: true },
    name: String,
    tag: String,
    serialNumber: String,
    status: { type: String, enum: ['design','active','inactive'] },
    attributes: { type: [locationAttributeSchema]},
    creationDate: { type: Date, default: Date.now },
    modificationDate: { type: Date, default: Date.now }
});

locationEntitySchema.index({ erpCode: 1});

// automatically update all fields
// TODO throw a validation error when setting an unknown field
locationEntitySchema.methods.updateFrom = function(src) {
    var self = this;
    Object.keys(src).forEach( function(field) {
        if( field !== '_id' && field !== '__v') {
            self[field] = src[field];
        }
    });
    this.modificationDate = Date.now();

    return this;
};

// hide/rename internal fields
if (!locationEntitySchema.options.toObject) {
    locationEntitySchema.options.toObject = {};
}
locationEntitySchema.options.toObject.transform = function (doc, ret, options) {
    ret.code = ret._id;
    delete ret._id;
    delete ret.__v;
};

var locationEntity = mongoose.model('LocationEntity', locationEntitySchema);

module.exports = locationEntity;