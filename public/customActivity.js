define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ 
        { "label": "Configure SMS", "key": "step1" }
    ];

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('clickedNext', save);

    function onRender() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }
        
        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true,
            enabled: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        var messageValue = $('#messageInput').val();

        payload['arguments'].execute.inArguments = [{
            "message": messageValue
        }];

        connection.trigger('updateActivity', payload);
    }
});
