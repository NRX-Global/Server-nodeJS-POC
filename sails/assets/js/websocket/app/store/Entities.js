Ext.define('EntityClient.store.Entities', {
    extend: 'Ext.data.Store',
    model: 'EntityClient.model.LocationEntity',
    alias: 'store.Entities',
    storeId: 'Entities',
    remoteSort: true,
    autoLoad: true,
    sorters: [{ property: 'erpCode'}],

    proxy: {
        type: 'websocket',
        url: 'ws://localhost:8888/locationEntity',
        storeId: 'Entities',
        reader: {
            type: 'json',
            root: 'user'
        }
    }
});