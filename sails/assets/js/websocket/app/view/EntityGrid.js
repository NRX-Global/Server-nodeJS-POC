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

    columns: [
        {
            text: 'ERP Code',
            sortable: true,
            dataIndex: 'erpCode',
            hideable : false,
            width: 100
        }, {
            header: 'Name',
            sortable: true,
            dataIndex: 'name',
            width: 100
        }, {
            text: 'Tag',
            dataIndex: 'tag',
            flex: 1
        }, {
            text: 'Serial Number',
            dataIndex: 'serialNumber'
        }
    ],

    tbar: [
        '->',
        {
            id: 'reload',
            iconCls: 'icon-reload'
        }
    ],

    bbar: [
        '->',
        {
            itemId: 'count',
            xtype: 'tbtext',
            text: 'Total count: counting...'
        }
    ]

});
