{
  "workflowApiVersion": "1.1",
  "name": "Envoi SMS vers DE",
  "description": "Cette activité ajoute un contact dans la DE SMS_journey avec email, téléphone et date.",
  "metaData": {
    "icon": "images/icon.svg",
    "category": "message"
  },
  "type": "REST",
  "lang": {
    "en-US": {
      "name": "Send SMS to DE",
      "description": "Inserts email, phone, and date into the SMS_journey Data Extension",
      "step1Label": "Email",
      "step2Label": "Phone",
      "step3Label": "Date"
    }
  },
  "arguments": {
    "execute": {
      "inArguments": [
        {
          "email": "{{Contact.Default.Email}}",
          "phone": "{{Contact.Attribute.Phone}}",
          "date": "{{Contact.Attribute.Date}}"
        }
      ],
      "outArguments": [],
      "timeout": 10000,
      "retryCount": 3,
      "retryDelay": 1000,
      "concurrentRequests": 5,
      "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/execute",
      "useJwt": false
    }
  },
  "configurationArguments": {
    "publish": {
      "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/publish"
    },
    "validate": {
      "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/validate"
    },
    "stop": {
      "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/stop"
    }
  },
  "wizardSteps": [
    {
      "label": "step1Label",
      "key": "step1"
    },
    {
      "label": "step2Label",
      "key": "step2"
    },
    {
      "label": "step3Label",
      "key": "step3"
    }
  ],
  "userInterfaces": {
    "configModal": {
      "url": "index.html",
      "fullscreen": true
    },
    "runningModal": {
      "url": "runningModal.html"
    },
    "runningHover": {
      "url": "runningHover.html"
    }
  },
  "schema": {
    "arguments": {
      "execute": {
        "inArguments": [
          {
            "email": {
              "dataType": "Email",
              "isNullable": false,
              "direction": "in"
            },
            "phone": {
              "dataType": "Phone",
              "isNullable": false,
              "direction": "in"
            },
            "date": {
              "dataType": "Date",
              "isNullable": false,
              "direction": "in"
            }
          }
        ],
        "outArguments": []
      }
    }
  },
  "copySettings": {
    "allowCopy": true
  }
}