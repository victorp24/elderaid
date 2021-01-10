const path = require('path');
const fs = require('fs');
const Database = require("./Database.js");
const express = require('express');
var cors = require('cors');

const DATABASE_NAME = 'testdb';
const DATABASE_ADMIN_USERNAME = 'admin';
const DATABASE_ADMIN_PASSWORD = 'admin';
const DATABASE_URL = 'mongodb+srv://' + DATABASE_ADMIN_USERNAME + ":" + DATABASE_ADMIN_PASSWORD 
					+ '@cluster0.8jxdu.mongodb.net/' + DATABASE_NAME + '?retryWrites=true&w=majority';
var db = new Database(DATABASE_URL, DATABASE_NAME);

// helper function to log all incoming requests to the web server
function logRequest(req, res, next){
	console.log(`${new Date()}  ${req.ip} : ${req.method} ${req.path}`);
	next();
}


// a standard user schema example
var userSchemaFields = [
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
];

var userSchemaSignUpFields = [
	"firstName", 
	"lastName", 
	"email", 
	"password", 
	"contactNumber",
	"role",
];	

// helper function to check if array of fields match the obj's fields
function isSchemaValid(fields, obj) {
	for(var i = 0; i < fields.length; i++) {
		if(!obj.hasOwnProperty(fields[i])) {
			return false;
		}
	}
	return true;
}

// Helper function to delete sensitive info that we don't want to pass to client
function deleteSensitiveInfo(user) {

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

// sort allUsers based on straight-line distance. If we want distance based on roads, we will need to use a mapping API, which is less trivial than this implementation
// Stolen from https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function distanceSort(lat1, lon1, lat2, lon2) {
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
  
function deg2rad(deg) {
	return deg * (Math.PI/180)
}

const host = 'localhost';
const port = 3000;
const clientApp = path.join(__dirname, 'client');

// express app
let app = express();

app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded
app.use(logRequest);							// logging for debug

// serve static files (client-side)
app.use('/', express.static(clientApp, { extensions: ['html'] }));
app.listen(port, () => {
	console.log(`${new Date()}  App Started. Listening on ${host}:${port}, serving ${clientApp}`);
});

// enable all cross-site domain requests (this is a security breach, do not do in actual production-level app)
app.use(cors());

// Add user (signup)
app.route('/api/users')
	.get(function(req, res, next) {
		db.getUsers().then(function(allUsers) {
			for(var i = 0; i < allUsers.length; i++) {
				delete allUsers[i].password;
				delete allUsers[i]._id;
			}
			res.json(allUsers);
		})
	})
	.post(function (req, res) {
		var jsonBody = req.body;
		if(isSchemaValid(userSchemaSignUpFields, jsonBody)) {
			jsonBody.isVerified = false;
			jsonBody.flagged = false;
			jsonBody.imageUrl = "";
			jsonBody.location = [];
			jsonBody.age = -1;
			jsonBody.gender = "";
			jsonBody.bio = "";
			jsonBody.partnerId = "",
			jsonBody.invitations = [];
			db.createNewUser(jsonBody).then(function(newUser) {
				res.json(newUser);
			}, function(err) {
				res.status(400).send(err.message);
			});
		} else {
			res.status(400).send("Cannot add user: user schema mismatch.");
		}
	});
	

app.get('/api/usersbyproximity', function (req, res) {
	db.getUsers().then(function(allUsers) {		
		// Latitude and longitude coordinates of the query
		var lat1 = req.query.lat;
		var long1 = req.query.long;	

		var allFreeUsers = [];

		for(var i = 0; i < allUsers.length; i++) {
			if ((allUsers[i].partnerId != null || allUsers[i].partnerId === "") && allUsers[i].isVerified == true && allUsers[i]._id != req.body.id){
				// set distance of user compared to elder's location
				allUsers[i].distance = distanceSort(lat1, long1, allUsers[i].location[0], allUsers[i].location[1]);
				allUsers[i] = deleteSensitiveInfo(allUsers[i]);
				allFreeUsers.push(allUsers[i]);	
			}
			
		}

		// sort based on distance, ascending. aka from min to max
		allFreeUsers.sort((a, b) => {
			return a.distance - b.distance;
		});		

		res.json(allFreeUsers); 
	})
	
});

// requester's (elder) ID is in the POST data
// id is youth id for adding requester into their invitations arr
app.post('/api/sendinvite/:id', function (req, res){
	var jsonBody = req.body;
	var requester_id = jsonBody.id; 
	// Gets user by id from root parameter
	db.getUserById(req.params.id).then(function(user) {
		if(user != null) {
			// Check to see if arr does not already contain requester ID, and add if not inside
			if(user.invitations.includes(requester_id)) {
				res.status(200).send("User already found in invitations. No need to re-add.");
			} else {
				user.invitations.push(requester_id);
			}
			db.addUserInvite(req.params.id, user.invitations).then(function(response) {
				res.status(200).send("Invitation sent successfully");
			}).catch(function(err) {
				res.status(400).send(err.message);
			});
		} else {
			res.status(404).send("No User with the specified ID was found.");
		}
	})

});

// Get invitation arr from id and returns a user object array of people who are in side the invitation arr of the user id requested
app.get('/api/users/invites/:id', function (req, res){
	// Gets user by id from root parameter
	db.getUserById(req.params.id).then(function(user) {
		db.getUserByIds(user.invitations).then(function(users) {
			if (users == null) {
				res.status(404).send("Invalid data in invitations array! Could not find user with specified ID!");
			} else {
				if (users.length < 1){
					res.status(200).send("Invitation list is empty");
				}
				res.send(users);
			}
		})
	})
});

// Finds user by id
app.get('/api/users/id/:id', function (req, res) {
	db.getUserById(req.params.id).then(function(user) {
		if(user != null) {
			delete user.password;
			res.json(user);
		} else {
			res.status(404).send("No User with the specified ID was found.");
		}
	})
});

// Finds if user is verified or not
app.get('/api/userverified/:id', function (req, res) {
	db.getUserById(req.params.id).then(function(user) {
		if(user != null) {
			res.json(user.isVerified);
		} else {
			res.status(404).send("No User with the specified ID was found.");
		}
	})
});

// Authentication + email validation for no same user with email
app.post('/api/authenticate', function (req,res) {
	var jsonBody = req.body;
	db.getUserByEmail(jsonBody.email).then(function(user) {
		if(user != null) {
			if(jsonBody.password === user.password) {
				res.json(user);
			} else {
				res.status(401).send("Invalid email/password credentials.");
			}
		} else {
			res.status(401).send("Given email is not registered.");
		}
	})
});