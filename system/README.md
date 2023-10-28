# System documentation
## Endpoints
### Users

`POST /login`
| Parameters | Description         |
|------------|---------------------|
| email      | users email address |
| password   | hashed password     |

#### Return
JWT token and/or HTTP error code

---

`POST /register`
| Parameters | Description         |
|------------|---------------------|
| email      | users email address |
| password   | hashed password     |

#### Returns
HTTP error code

---

`POST /update`
| Parameters | Description                            |
|------------|----------------------------------------|
| email      | users email address                    |
| password   | hashed password                        |
| firstnames | firstnames                             |
| lastname   | lastname                               |
| token      | JWT token for authentication           |

#### Return
HTTP error code

---

### Event browsing

`GET /events`
| Parameters   | Description                            |
|--------------|----------------------------------------|
| tags         | an array of tags (given as strings)    |
| start_time   | ISO 8601 containing date and time      |
| end_time     | ISO 8601 containing date and time      |
| geolocation  | Tuple of long/lat coordinates          |
| max_distance | Maximum accepted distance from given geolocation to possible events        |

#### Date & Time
If time is given but not date, today is assumed. If date is given but no time, 00:00 is given to start date, 23:59 is given to end date.

Time is stored in UTC (Coordinated Universal Time). We'll figure out later how the the correct time can be displayed without the users input.

##### Example
User gives date range 1 August 2022 - 3 August 2022. Resulting start time will be `2022-08-01T00:00:00+0000` and the end time will be `2022-08-03T23:59:00+0000`.

User gives only the start time 12:37 (the date is 18 October 2023). The resulting start time will be `2023-10-18T12:37:00+000`. The end time will be assumed to be midnight the same day, i.e. `2023-10-18T23:59:00+000`. If no start time is given, the date is the current date and the time is 00:00.

#### Geolocation
Events locations are defines as a GeoJSON Point. User can enter a coordinate (another GeoJSON Point) to find events near the entered Point.

This is what a GeoJSON Point looks like `{ type: "Point", coordinates: [ 40, 5 ] }`.

---

`GET /event/:id`

🔒 Requires authentication and authorization.

#### Returns
Information about the given event as JSON

Gets information about specific event

---
### Event creation

`POST /event`
| Parameters   | Description                            |
|--------------|----------------------------------------|
| eventName    | Full event name                        |
| date         | ISO 6801 date with time                |
| location     | GeoJSON point with coordinates         |
| host         | Host full name                         |
| creator      | UserID of creaor of the event          |
| maxParticipants | Max number of participants          |
| image        | Event iamge, an image                  |

🔒 Requires authentication and authorization.

`PUT /event/:id`

PUT event/:id uses the same properties as POST. 

🔒 Requires authentication and authorization.

`DELETE /event/:id`

🔒 Requires authentication and authorization.
### Emails
E-mail service will log outgoing e-mails.

`POST /email`
| Parameters   | Description                            |
|--------------|----------------------------------------|
| receiver     | E-mail address of receiver             |
| subject      | Subject of e-mail                      |
| messageBody  | The message body of the e-mail         |
---

## GDPR compliance
For now we will assume it is not

## Development
run with `nodemon run dev`
### ENV
The ENV variables needed are put in a `.env` file in the system root. The following variables are needed:
- DB_URI=\<value\>
- JWT_SECRET=\<value\>
  
The values can be found in the code folder in the project OneDrive. 

### Architecture
The application is monolithic multi-layered. It consists of a router that handles HTTP requests and a set of modules that handle business logic.
### Routing layer
### Service layer
### Data access layer
#### Images
Images are uploaded to system/images/. Cloudinary could be used as an alternative.

An uploaded file is named "\<event_creator\>+\<event_name\>" hashed with bcrypt, the original file extension is kept. The file URI is added to the database.
#### Blurhash
Blurhash is calculated whenever image is changed. Blurhash is added to the database.
### Facade patterns
Each module exposes a set of functions (facade). Only facade functions should be used. New ones may be created but should be well documented.
### MongoDB schemas
#### User profile
#### Event
| Name      | Description           | Type                  |
|-----------|-----------------------|-----------------------|
| eventName |                       | string
| startTime |                       | string (ISODate/ISO6801)
| endTime   |                       | string (ISODate/ISO6801)
| location  |                       | GeoJSON 
| imageURI  |                       | string
| blurhash  |                       | string
#### 

### Deployment
We'll worry about it later.

### Testing
We will be using Jest for unit testing and JMeter for executing performance testing as part of our testing procedures.

### Technologies
| Name      | Function               |   Link |
|-----------|--------------------|-----------------------|
| Axios     | HTTP requests      | https://www.npmjs.com/package/axios
| Bcrypt    | Encryption         | https://www.npmjs.com/package/bcrypt 
| Blurhash  | Thumbnails         | https://blurha.sh
| Express   | HTTP router        | N/A
| GeoJSON   | Format             | https://geojson.org/
| Jest      | Testing framework  | https://jestjs.io/
| MongoDB   | Document DB        | N/A
| NodeJS    | Server             | N/A
| React     | Frontend           | https://react.dev/ 
| Bootstrap | CSS framework      | N/A
