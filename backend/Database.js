const { MongoClient, ObjectID, ObjectId } = require('mongodb');	// require the mongodb driver



/**
 * Uses mongodb v3.6+ - [API Documentation](http://mongodb.github.io/node-mongodb-native/3.6/api/)
 * Database wraps a mongoDB connection to provide a higher-level abstraction layer
 * for manipulating the objects in our cpen400a app.
 */
function Database(mongoUrl, dbName){
	if (!(this instanceof Database)) return new Database(mongoUrl, dbName);
	this.connected = new Promise((resolve, reject) => {
		MongoClient.connect(
			mongoUrl,
			{
				useNewUrlParser: true
			},
			(err, client) => {
				if (err) reject(err);
				else {
					console.log('[MongoClient] Connected to ' + mongoUrl + '/' + dbName);
					resolve(client.db(dbName));
				}
			}
		)
	});
	this.status = () => this.connected.then(
		db => ({ error: null, url: mongoUrl, db: dbName }),
		err => ({ error: err })
	);
}

Database.prototype.getUsers = function() {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			// grab all users from the database
			// note: the database must have a collection named 'users' for this to work
			resolve(db.collection('users').find({}).toArray());
		})	
	)
}

Database.prototype.getUserById = function(id) {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			// grab a specific user from the database that matches the given id
			// note: MongoDB uses '_id' as the identifier for documents in a collection
			// also, MongoDB uses an object of type 'ObjectID' for the identifier
			try {
				var object_id = new ObjectID(id);
			} catch(e) {
				// error most likely occured since id passed is not in the proper format for ObjectID creation
				var object_id = id.toString();
			}
			resolve(db.collection('users').findOne({_id: object_id}));
		})	
	)
}

Database.prototype.getUserByIds = function(ids) {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			var obj_id_arrays = [];
			for(var i = 0; i < ids.length; i++) {
				try {
					var object_id = new ObjectID(ids[i]);
				} catch(e){
					var object_id = ids[i].toString();
				}
				obj_id_arrays.push(object_id);
			}
			
			var obj_ids = {
				"$in": obj_id_arrays
			};
			db.collection('users').find({_id: obj_ids }).toArray(function(err, result) {
				resolve(result);
			})
		})	
	)
}

Database.prototype.updatePartnerId = function(myId, partnerId) {
	var remove = false;
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			// grab a specific user from the database that matches the given id
			// note: MongoDB uses '_id' as the identifier for documents in a collection
			// also, MongoDB uses an object of type 'ObjectID' for the identifier
			try {
				var object_id = new ObjectID(myId);
			} catch(e) {
				// error most likely occured since id passed is not in the proper format for ObjectID creation
				var object_id = myId.toString();
			}
			// Finds object with specified ID, and updates invite array
			// TODO: check syntax of $set and updateOne from https://stackoverflow.com/questions/63869381/how-to-update-and-insert-new-element-in-array-in-mongodb
			resolve(db.collection('users').updateOne(	{_id: object_id},
														{ $set: { partnerId: partnerId} }));
		})	
	)

}


Database.prototype.clearInvitationsByIds = function(ids) {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			var obj_id_arrays = [];
			for(var i = 0; i < ids.length; i++) {
				try {
					var object_id = new ObjectID(ids[i]);
				} catch(e){
					var object_id = ids[i].toString();
				}
				obj_id_arrays.push(object_id);
			}
			
			var obj_ids = {
				"$in": obj_id_arrays
			};
			resolve(db.collection('users').update({_id: obj_ids}, { $set: { invitations: []} }, {multi: true}));
		})	
	)
}

Database.prototype.getUserByEmail = function(email) {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			// grab a specific user from the database that matches the given username
			resolve(db.collection('users').findOne({email: email}));
		})	
	)
}

Database.prototype.createNewUser = function(user) {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			// check if user with the email already exists
			db.collection('users').findOne({email: user.email}).then(function(doesUserExist) {
				if(doesUserExist != null) {
					reject(new Error("User with the given email already exists."))
				} else {
					db.collection('users').insertOne(user, function(err, result) {
						if(err) {
							reject(err)
						} else {
							resolve(result.ops[0]);
						}
					});
				}
			})
		})
	)
}

Database.prototype.addUserInvite = function(id, invite) {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			// grab a specific user from the database that matches the given id
			// note: MongoDB uses '_id' as the identifier for documents in a collection
			// also, MongoDB uses an object of type 'ObjectID' for the identifier
			try {
				var object_id = new ObjectID(id);
			} catch(e) {
				// error most likely occured since id passed is not in the proper format for ObjectID creation
				var object_id = id.toString();
			}
			// Finds object with specified ID, and updates invite array
			resolve(db.collection('users').updateOne(	{_id: object_id},
														{ $set: { invitations: invite} }));
		})	
	)
}

Database.prototype.updateLocationById = function(id, locations) {
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			// grab a specific user from the database that matches the given id
			// note: MongoDB uses '_id' as the identifier for documents in a collection
			// also, MongoDB uses an object of type 'ObjectID' for the identifier
			try {
				var object_id = new ObjectID(id);
			} catch(e) {
				// error most likely occured since id passed is not in the proper format for ObjectID creation
				var object_id = id.toString();
			}
			// Finds object with specified ID, and updates location array
			resolve(db.collection('users').updateOne(	{_id: object_id},
														{ $set: { location: locations} }));
		})	
	)
}

module.exports = Database;