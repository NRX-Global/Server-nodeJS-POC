//Ext.require( 'Ext.ux.GridSocketIO');

Ext.define('EntityClient.view.EntityGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.entitygrid',
    id: 'entitygrid',
    layout: 'fit',
    border: false,
    header: false,
    loadMask: true,
    stateful: true,
    stateId: 'entitygrid',

    store: 'Entities',

    plugins: Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false,
        pluginId: 'rowEditor'
    }),

//    plugins: Ext.create('Ext.ux.GridSocketIO', {
//            host: 'localhost',
//            port: 8888
//    }),

    columns: [
        {
            text: 'ERP Code',
            sortable: true,
            dataIndex: 'erpCode',
            hideable : false,
            width: 100,
            editor: 'textfield'
        }, {
            header: 'Name',
            sortable: true,
            dataIndex: 'name',
            flex: 1,
            editor: 'textfield'
        }, {
            text: 'Tag',
            dataIndex: 'tag',
            width: 50,
            editor: 'textfield'
        }, {
            text: 'Serial Number',
            dataIndex: 'serialNumber',
            width: 100,
            editor: 'textfield'
        }
    ],

    tbar: [
        {
            itemId: 'add',
            text: 'Add',
            iconCls: 'icon-add'
        },
        {
            itemId: 'delete',
            text: 'Delete',
            iconCls: 'icon-delete',
            disabled: true
        },
       '->',
        {
            itemId: 'reload',
            iconCls: 'icon-reload'
        }
    ]

});
