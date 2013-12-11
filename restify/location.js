var mongoose = require('mongoose');

var locationEntitySchema = mongoose.Schema({
    erpCode: String,
    name: String,
    tag: String,
    serialNumber: String,
    creationDate: Date,
    modificationDate: Date
});

locationEntitySchema.index({ erpCode: 1});

var locationEntity = mongoose.model('LocationEntity', locationEntitySchema);

module.exports = locationEntity;