define(["postmonger"], function (Postmonger) {
  var connection = new Postmonger.Session();
  var payload = {};
  var email, phone, date;

  $(window).ready(onRender);

  connection.on("initActivity", initialize);
  connection.on("requestedTokens", storeTokens);
  connection.on("requestedEndpoints", storeEndpoints);

  connection.on("clickedNext", save);

  function onRender() {
    connection.trigger("ready");

    // If you need tokens or endpoints, request them here:
    connection.trigger("requestTokens");
    connection.trigger("requestEndpoints");
  }

  function initialize(data) {
    if (data) {
      payload = data;
    }

    var inArguments = payload['arguments']?.execute?.inArguments || [];

    inArguments.forEach(function (arg) {
      if (arg.email) {
        $('#input-email').val(arg.email);
      }
      if (arg.phone) {
        $('#input-phone').val(arg.phone);
      }
      if (arg.date) {
        $('#input-date').val(arg.date);
      }
    });

    connection.trigger("updateButton", {
      button: "next",
      enabled: true
    });
  }

  function storeTokens(tokens) {
    // Optional: store tokens if needed for backend calls
  }

  function storeEndpoints(endpoints) {
    // Optional: store endpoints if needed
  }

  function save() {
    email = $('#input-email').val();
    phone = $('#input-phone').val();
    date = $('#input-date').val();

    payload['arguments'].execute.inArguments = [
      {
        email: email,
        phone: phone,
        date: date
      }
    ];

    payload['metaData'].isConfigured = true;

    connection.trigger("updateActivity", payload);
  }
});