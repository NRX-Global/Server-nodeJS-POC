Ext.require( 'Ext.ux.SocketIO');

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
        var self = this;

        this.control({
            'entitygrid': {
                selectionchange: function(selModel, selections) {
                    self.getList().down('#delete').setDisabled(selections.length === 0);
                },
                edit: function(editor, event) {
                    var record = event.record;
                    if( record.get('id')) {
                        self.connection.socket.put( '/LocationEntity/' + record.get('id'), record.getData(), function() {
                            record.commit();
                        });
                    } else {
                        self.connection.socket.post( '/LocationEntity', record.getData(), function( data) {
                            record.set( data);
                            record.commit();
                        });
                    }
                },
                canceledit: function(editor, event) {
                    var record = event.record;
                    if( !record.get('id')) {
                        self.getEntitiesStore().remove( record);
                    }
                }
            },
            'entitygrid #add': {
                click: function() {
                    var editor = self.getList().getPlugin('rowEditor');
                    editor.cancelEdit();

                    var r = Ext.create('EntityClient.model.LocationEntity', { erpCode: 'LOC-'});

                    self.getEntitiesStore().insert(0, r);
                    editor.startEdit(0, 0);
                }
            },
            'entitygrid #delete': {
                click: function() {
                    var selections = self.getList().getSelectionModel().getSelection();
                    if (selections.length > 0) {
                        Ext.Array.each( selections, function( entity) {
                            self.connection.socket.delete( '/LocationEntity/' + entity.get('id'), function() {
                                console.log( "Removed", entity);
                                self.getEntitiesStore().remove( entity);
                            })
                        })
                    }

                }
            },
            'entitygrid #reload': {
                click: function() {
                    self.getEntitiesStore().fireEvent('beforeload', self.getEntitiesStore())
                    self.getEntitiesStore().removeAll();
                    self.connection.socket.get( '/LocationEntity', {}, function( data) {
                        self.getEntitiesStore().fireEvent('load', self.getEntitiesStore())
                        console.log( "Entity list of " + data.length);
                        self.getEntitiesStore().add( data);
                    });
                }
            }
        })
    },

    connection: undefined,

    onLaunch: function() {
        var self = this

        console.log( "Create Socket.IO");
        self.getEntitiesStore().fireEvent('beforeload', self.getEntitiesStore())

        self.connection = new Ext.ux.SocketIO({
            host: 'localhost',
            port: 8888
        });

        self.connection.socket.on( 'connect', function() {
            console.log( "Connected to server");

            self.connection.socket.get( '/LocationEntity', {}, function( data) {
                console.log( "Entity list of " + data.length);
                self.getEntitiesStore().fireEvent('load', self.getEntitiesStore())
                self.getEntitiesStore().add( data);
            });

            self.connection.socket.on('message', function(message){
                // handle updates from the server
                console.log( "Message", message);
                var record = self.getEntitiesStore().getById( message.id);
                if( record) {
                    if( message.verb === 'update') {
                        var modifiedFields = record.set( message.data);
                        Ext.defer( function() {
                            record.commit( false, modifiedFields);
                        }, 5000);
                    } else if( message.verb === 'destroy') {
                        self.getEntitiesStore().remove( record);
                    }
                } else {
                    if ( message.verb === 'create') {
                        self.getEntitiesStore().add( message.data);
                    }
                }
            });

        });
    }
});
