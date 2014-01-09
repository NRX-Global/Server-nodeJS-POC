Ext.define('EntityClient.controller.EntityController', {
    extend: 'Ext.app.Controller',

    views: ['EntityGrid'],
    stores: ['Entities'],
    models: ['LocationEntity'],

    refs: [
        {
            ref: 'list',
            selector: 'entitygrid'
        }
    ],

    init: function() {
        var self = this

        this.control({
            '#reload': {
                click: function() {
                    self.getEntitiesStore().refresh()
                }
            }
        });
    },

    onLaunch: function() {
        var self = this

        var store = self.getEntitiesStore()
    }
});
