{
    "workflowApiVersion": "1.1",
    "metaData": {
        "icon": "images/icon.png",
        "category": "message"
    },
    "type": "REST",
    "lang": {
        "en-US": {
            "name": "Custom SMS Activity",
            "description": "A custom activity for sending SMS messages"
        }
    },
    "arguments": {
        "execute": {
            "inArguments": [],
            "outArguments": [],
            "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/execute",
            "timeout": 10000,
            "retryCount": 3,
            "retryDelay": 1000,
            "concurrentRequests": 1
        }
    },
    "configurationArguments": {
        "save": {
            "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/save"
        },
        "publish": {
            "url":"https://demosmscustom-3a3ca3cd2daa.herokuapp.com/publish"
        },
        "validate": {
            "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/validate"
        },
        "stop": {
            "url": "https://demosmscustom-3a3ca3cd2daa.herokuapp.com/stop"
        }
    },
    "userInterfaces": {
        "configModal": {
            "height": 400,
            "width": 600,
            "fullscreen": false
        }
    }
}
