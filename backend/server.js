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
	"imgUrl",
	"location",
	"age",
	"gender",
	"bio",
	"partnerId",
	"invitations",
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

// sort allUsers based on distance 
function distanceSort(lat1, long1, lat2, long2) {
	
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
		if(isSchemaValid(userSchemaFields, jsonBody)) {
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
//	req.query.lat
//	req.query.long
	db.getUsers().then(function(allUsers) {
		
		for(var i = 0; i < allUsers.length; i++) {
			allUsers[i] = deleteSensitiveInfo(allUsers[i]);
			// need a function to calculate the distance put in in km unit rounded to nearest
			// TODO: we haven't added a schema in database or in backend for a 'distance' parameter?? is that ok
			allUsers[i].distance = distanceSort(allUsers)
		}

		// sort allUsers based on distance 
		distanceSort(lat1, long1, lat2, long2); 
			
	
		res.json(allUsers);
	})
	
});

// // requester's (elder) ID is in the POST data
// // id is youth id for adding requester into their invitations arr
// app.post('/api/sendinvite/:id', function (req, res){
// 	var jsonBody = req.body;
// 	var requester_id = jsonBody.id; 
// 	// Gets user by id from root parameter
// 	db.getUserById(req.params.id).then(function(user) {
// 		if(user != null) {
// 			// Check to see if arr does not already contain requester ID, and add if not inside
// 			for (var i = 0 ; i < user.invitations; ++i){
// 				if (user.invitations[i] == requester_id)
// 					res.status(200).send("User already found in invitations. No need to re-add");
// 				// Add requester ID into youth ID's invitation arr
// 				user.invitations.push(requester_id);
// 			}
// 			db.addUserInvite(req.params.id, user.invitations);
// 		} else {
// 			res.status(404).send("No User with the specified ID was found.");
// 		}
// 	})

// 	// Return either 400 error bad request (couldn't be complete) or 200 status OK (went through)
// });

// Get invitation arr from id and returns a user object array of people who are in side the invitation arr of the user id requested
// TODO: test


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