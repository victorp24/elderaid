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

  `GET`
  `POST`

* **URL Params**

  None

* **Data Params**
  
  None (`Get`)
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

  `lat=[-90.0:90.0]`
  `lon=[-180:180]`

* **Data Params**

  id

* **Response**

    **Content:**
    
    User object list sorted from lowest to highest distance
    
    Example of a single returned user object:
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

