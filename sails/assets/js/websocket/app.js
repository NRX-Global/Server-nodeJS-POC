Ext.require('Ext.container.Viewport');

Ext.onReady(function() {
    Ext.Loader.setConfig({
        enabled: true,
        paths:{
            'Ext.ux': '/extjs/ux'
        },
        disableCaching: false
    });
    Ext.QuickTips.init();

    Ext.require( ['Ext.ux.data.proxy.WebSocket']);
});

Ext.application({
    name: 'EntityClient',
    appFolder: '/js/websocket/app',

    controllers: ['EntityController'],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            title: 'Entities',
            layout: {
                type: 'fit',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Entities',
                    layout: 'fit',
                    items: [{
                        xtype: 'entitygrid'
                    }]
                }
            ]
        });
    }
});
