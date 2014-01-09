Ext.define('EntityClient.model.LocationEntity', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'instance', defaultValue : { type: '#task'}},
        'code',
        'type',
        'status',
        'totalUnits',
        'completedUnits',
        'message',
        'details',
        'parameters',
        'result',
        {
            name: 'creationTime',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'startTime',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'stopTime',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'lastModificationTime',
            type: 'date',
            dateFormat: 'c'
        }
    ],
    idProperty: 'code'

});
