# Endpoints

This is the official documentation for the 'note service' API, each endpoint is laid out as follows:
### METHOD /route
Request body

    {
        "JSON POST BODY HERE"
    }

Request args: (for a get, delete and that)

    ?args=args

The route description will go here, this will define what the route does and how it processes the data and where it's all stored.
Then assuming all goes well, a response will be laid out as the "errorless" response, it will often look like this,

Expected response:

    {
        "status": {
            "error": false,
            "code": 200,
            "type": "success",
            "message": "Success"
        },
        "data": [ {}, {} ]
    }

All data relevant to the request will be in an object in the data section ([0] if you're only requesting one resource, multiple resources will utalize the array)

## All errors will be formated the same:

    {
        "status": {
            "error": true,
            "code": Relavent HTTP error code,
            "type": What the code means,
            "message": What went wrong
        }
        "error" {
            "errors" [
                {
                    "status": Relavent HTTP error code,
                    "title": What the status code means,
                    "detail": What went wrong
                }
            ]
        }
    }

Erros are handled with HTTP codes and the request will never be fully processed if an error is present. Errors will maintain the same format throught, (other than ratelimiting errors, these just return a 403) this is for ease of parsing on the clinet side.

# All routes use /api
### POST /user
Request body:

    {
        "username": yourUsername,
        "email": yourEmail, 
        "password": yourPassword
    }

A POST request to the user endpoint will result in a new user being created, as a sign up, this users password will then be encrypted and stored in the database alongside with all of the other data in the body, an ID will be generated, currently your unique identifier is the UTC time your account was created.

The response from signup is the same as the login endpoint.

### POST /login
Request body:

    {
        "username": yourUsername,
        "password": yourPassword
    }

The login request can also use email as a substitute for username, this will look like

    {
        "email" yourEmail,
        "password" yourPassword
    }

The login route will validate all data inputed, if any is false, it will return an error, it will then generate a token if there is none stored, and return that token.

Expected response:

    "data": [
        {
            "status": "Authenticated",
            "user": {
                "id": yourID
                "username": yourUsername,
                "email": yourEmail,
                "updated": localeStringTimeUpdated
            },
            "token": yourGeneratedToken
        }
    ]

## POST /unauth/permanote
Request body: 

    {
        "content": textOfNote
    }

The request will be processed by the server if a text feild is present, then the server will store and generate an endpoint for the permalink.

Expected response: 

        "data": [
            {
                "status": "Resource created",
                "note": {
                    "uid": uidAssignedToNote,
                    "endpoint": "/api/note/generatedEndpoint",
                    "text": inputedText
                }
            }
        ]

## GET /note/:endpoint
Request args:

    :endpoint

If that note exists, the endpoint will simply return the text assigned to that endpoint or a 404 error.
