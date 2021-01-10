#### Backend API Documentation

This document outlines the backend server API endpoints, their url parameters, data parameters, and return values.

#### Table of Contents
- [API Endpoints](#API-endpoints)
- [User Schemas](#User-Schemas)
- [Helper Functions](#Helper-Functions)


#### API endpoints

**Add User Signup** 
----
Returns user object if a user exists and empty json otherwise

* **URL**

  /api/users
  
* **Method**

  `GET`,
  `POST`

* **URL Params**

  None

* **Data Params**
  
  None (`Get`),
  userSchemaSignUpFields (`POST`)

* **Response**

    **Content:**
    If user exists:
    ```json
    {
      "firstName": "san",
      "lastName": "jose",
      "email": "notme@god.com",
      "password": "password123",
      "contactNumber": "323-423-9222",
      "role": "ELDER",
      "isVerified": false,
      "flagged": false,
      "imageUrl": "",
      "location": [27.2970523, -121.9574942],
      "age": "420",
      "gender": "Other",
      "bio": "im god",
      "partnerId": "",
      "invitations": []
    }
    ```
    
    If schema mismatch:
    **Code:** 400 <br />
    ```json
    Cannot add user: user schema mismatch.
    ```


**Get Users by Distance**
----
Returns list of user objects sorted by distance. Calculated via straight-line distance longitudinal and latitudinal coordinates.

* **URL**

  /api/usersbyproximity

* **Method**

  `GET`

* **URL Params**

  **Required:**

  `lat=[-90.0:90.0]`,
  `lon=[-180:180]`

* **Data Params**

  id

* **Response**

    **Content:**
    
    User object list sorted from lowest to highest distance
    
    Example of a single returned user object:
    ```json
     {
        "_id": "5ffa4cf99a2bbc38e469df6a",
        "firstName": "god",
        "lastName": "god",
        "imageUrl": "",
        "age": "420",
        "gender": "Other",
        "bio": "im god",
        "distance": 123
    }
    ```
    
    If ID could not be found:
    **Code:** 404 <br />
    ```json
    No user with the specified ID was found.
    ```



**Send Invite to User**
----
Returns a success or failure.

* **URL**

  /api/sendinvite/<id>

* **Method**

  `POST`

* **URL Params**

  **Required:**

  `id=[userid]`: ID to request

* **Data Params**

  `id`: requester ID

* **Response**

    If invite is already logged with the requestee:
    **Code:** 200 <br />
    ```json
    User already found in invitations. No need to re-add.
    ```
    
    If invite is successful:
    **Code:** 200 <br />
    ```json
    Invitation sent successfully.
    ```
    If User invite ID is invalid:
    **Code:** 400 <br />
    ```json
    err.message
    ```

    If ID could not be found:
    **Code:** 404 <br />
    ```json
    No user with the specified ID was found.
    ```


**Get list of invites**
----
Returns a list of user objects that have sent invites to the user ID specified.

* **URL**

  /api/users/invites/<id>

* **Method**

  `GET`

* **URL Params**

  **Required:**

  `id=[userid]`: ID with invitations received

* **Data Params**

* **Response**

    **Content:**
    
    User object list of those who sent an invite to the user ID requested. Eg.
    ```json
    {
       "_id": "5ffa4cf99a2bbc38e469df6a",
       "firstName": "god",
       "lastName": "god",
       "imageUrl": "",
       "age": "420",
       "gender": "Other",
       "bio": "im god"
    }
    ```
    
    If requested invite list is empty:
    **Code:** 200 <br />
    ```json
    Invitation list is empty.
    ```
    
    If ID could not be found or invalid user:
    **Code:** 404 <br />
    ```json
    Invalid data in invitations array! Could not find user with the specified ID!
    ```



**Accept invite**
----
TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Returns a success or failure.

* **URL**

  /api/users/invites/<id>

* **Method**

  `POST`

* **URL Params**

  **Required:**

  `id=[userid]`: ID with invitations received

* **Data Params**

  `id=[userid]`: ID of requester

* **Response**

    **Content:**
    
    User object list of those who sent an invite to the user ID requested. Eg.
    ```json
    {
       "_id": "5ffa4cf99a2bbc38e469df6a",
       "firstName": "god",
       "lastName": "god",
       "imageUrl": "",
       "age": "420",
       "gender": "Other",
       "bio": "im god"
    }
    ```
    
    If requested invite list is empty:
    **Code:** 200 <br />
    ```json
    Invitation list is empty.
    ```
    
    If ID could not be found or invalid user:
    **Code:** 404 <br />
    ```json
    Invalid data in invitations array! Could not find user with the specified ID!
    ```

**Find User by ID**
----
Returns the user with the unique ID specified.

* **URL**

  /api/users/id/<id>

* **Method**

  `GET`

* **URL Params**

  **Required:**

  `id=[userid]`: unique ID of user

* **Data Params**

  None

* **Response**

    **Content:**
    
    User object of the ID requested. Eg.
    ```json
    {
       "_id": "5ffa4cf99a2bbc38e469df6a",
       "firstName": "God",
       "lastName": "",
       "imageUrl": "",
       "age": "999",
       "gender": "Other",
       "bio": "Greetings. I am God."
    }
    ```
  
    If ID could not be found or invalid user:
    **Code:** 404 <br />
    ```json
    No User with the specified ID was found.
    ```

**Is User Verified**
----
Returns if user with the unique ID specified is verified or not.

* **URL**

  /api/userverified<id>

* **Method**

  `GET`

* **URL Params**

  **Required:**

  `id=[userid]`: ID of user

* **Data Params**

  None

* **Response**

    **Content:**
    
    User object of the ID requested. Eg.
    ```json
    {
       "_id": "5ffa4cf99a2bbc38e469df6a",
       "firstName": "Jesus",
       "lastName": "O'Nazareth",
       "imageUrl": "",
       "age": "1988",
       "gender": "Male",
       "bio": "I can walk on water."
    }
    ```
  
    If ID could not be found or invalid user:
    **Code:** 404 <br />
    ```json
    No User with the specified ID was found.
    ```

**Authenticate User**
----
Returns user object given an unique email and password.

* **URL**

  /api/authenticate

* **Method**

  `POST`

* **URL Params**

  **Required:**

  None

* **Data Params**

  `email`: User email address
  `password`: User password

* **Response**

    **Content:**
    
    User object of the ID requested. Eg.
    ```json
    {
       "_id": "5ffa4cf99a2bbc38e469df6a",
       "firstName": "Donald",
       "lastName": "Trump",
       "imageUrl": "https://bit.ly/2K0SLc9",
       "age": "74",
       "gender": "Male",
       "bio": "I am the Donald."
    }
    ```
  
    If ID could not be found or invalid user:
    **Code:** 404 <br />
    ```json
    No User with the specified ID was found.
    ```

    
    
#### User Schemas

**userSchemaFields** 
----
Standard user schema that contains all relevant fields of interest.
```javascript
{
 	"firstName", 
	"lastName", 
	"email", 
	"password", 
	"contactNumber",
	"role",
	"isVerified",
	"flagged",
	"imageUrl",
	"location",
	"age",
	"gender",
	"bio",
	"partnerId",
	"invitations",
}
```

**userSchemaSignUpFields**
----
User schema for sign-up fields. Used for creating the initial user object.
```javascript
{
	"firstName", 
	"lastName", 
	"email", 
	"password", 
	"contactNumber",
	"role",
}
```

#### Helper Functions

**isSchemaValid**
----
Validates schema. Pre-check before allowing user object to pass into database.

Parameters: `user_schema`, `user_obj`

Returns: `bool`

```javascript
{
	for(var i = 0; i < fields.length; i++) {
		if(!obj.hasOwnProperty(fields[i])) {
			return false;
		}
	}
	return true;
}
```

**deleteSensitiveInfo**
----
Helper function to delete sensitive info before passing to front-end client side.

Parameters: `User_Obj`

Returns: `Scrubbed_User_Obj`

```javascript
{

	delete user.password;
	delete user.email;
	delete user.contactNumber;
	delete user.role;
	delete user.isVerified;
	delete user.flagged;
	delete user.location;
	delete user.partnerId;
	delete user.invitations;

	return user;
}
```

**distanceSort**
----
Helper function to compute straight-line distance in kilometers given longitudinal and latitudinal coordinates of Earth. Uses the hard-coded constant of Earth's radius in kilometers (6371 km).

Parameters: `start_latitude`, `start_longitude`, `end_latitude`, `end_longitude`.

Returns: `distance_km`

```javascript
{
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 	Math.sin(dLat/2) * Math.sin(dLat/2) +
	  			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	  			Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}
```

**deg2rad**
----
Helper function for `distanceSort`. Converts degrees to radians.

Parameters: `degrees`

Returns: `radians`

```javascript
{
	return deg * (Math.PI/180)
}
```

