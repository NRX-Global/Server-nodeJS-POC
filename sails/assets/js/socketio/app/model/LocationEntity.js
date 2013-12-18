Ext.define('EntityClient.model.LocationEntity', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'erpCode',
        'name',
        'tag',
        'serialNumber',
        {
            name: 'updatedAt',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'createdAt',
            type: 'date',
            dateFormat: 'c'
        }
    ],
    idProperty: 'id'

});
