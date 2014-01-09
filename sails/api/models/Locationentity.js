/**
 * Locationentity
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
  tableName: 'locationentities',

  attributes: {

      erpCode: { type: 'string', required: true},
      name:'string',
      tag: 'string',
      serialNumber: 'string',
      status: 'string',
      attributes: 'array'

  }

};
