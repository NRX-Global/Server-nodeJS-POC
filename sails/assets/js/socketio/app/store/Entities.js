Ext.define('EntityClient.store.Entities', {
    extend: 'Ext.data.Store',
    model: 'EntityClient.model.LocationEntity',
    alias: 'store.Entities',
    storeId: 'Entities',
    remoteSort: false,
    autoLoad: false,
    sorters: [{ property: 'erpCode'}]
});