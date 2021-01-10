#### Backend API Documentation

This document outlines the backend server API endpoints, their url parameters, data parameters, and return values.
### User Schemas
userSchemaFields
userSchemaSignUpFields
### Helper Functions
deleteSensitiveInfo
isSchemaValid
distanceSort
deg2rad
### API endpoints

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
