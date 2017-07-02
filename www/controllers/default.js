exports.install = function() {
	F.route('/', view_index);

	F.route('/artists', view_artists, ['get']);
	F.route('/artists/{id}', view_artist, ['get']);
	F.route('/artists', create_artist, ['post']);
	F.route('/artists/{id}/edit', show_edit_artist, ['get']);
	F.route('/artists/{id}', edit_artist, ['put']);
	F.route('/artists/{id}', delete_artist, ['delete']);
	

	F.route('/artists/{id}/art', view_all_art, ['get']);
	F.route('/artists/{id}/art/{art_id}', view_art, ['get']);
	F.route('/artists/{id}/art', create_art, ['post']);
	F.route('/artists/{id}/art/{art_id}/edit', show_edit_art, ['get']);
	F.route('/artists/{id}/art/{art_id}', edit_art, ['put']);
	F.route('/artists/{id}/art/{art_id}', delete_art, ['delete']);


};

function view_index() {
	var self = this;


	self.view('index');
}
	
function view_artists() {
	var self = this;

	F.database(function(err, client, done) {
		client.query('SELECT id, first_name, last_name, dob, email FROM artists ORDER BY id', function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				console.log('res: ', result.rows)
				self.view('artists', result.rows);
			}
		});
	});
}
	
function create_artist() {
	var self = this;

	DB(function(err, client, done) {
		client.query('INSERT INTO artists (first_name, last_name, dob, email) VALUES ($1, $2, $3, $4)', [self.body.fname, self.body.lname, self.body.dob, self.body.email], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.redirect('/artists');
				}
		})
	})
}


function view_artist() {
	var self = this;

	DB(function(err, client, done){
		client.query('SELECT id, first_name, last_name, dob, email FROM artists',
		function(err, result) {
			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				console.log('res: ', result)
				self.view('artist', result);
			}
		})
	})
}

function show_edit_artist() {
	var self = this;

	DB(function(err, client, done){
		client.query('SELECT id, first_name, last_name, dob, email FROM artists WHERE id='+self.req.path[1],
		function(err, result) {
			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				console.log('artist edit info:', result)
				self.json(result.rows[0]);
			}
		})
	})
}



function edit_artist() {
	var self = this;
	console.log('body: ', self.body)
	
	DB(function(err, client, done) {
		client.query('UPDATE artists SET first_name=$1, last_name=$2, dob=$3, email=$4 WHERE id=$5', [self.body.fname, self.body.lname, self.body.dob, self.body.email, self.body.id], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.json({'updated':self.body.id});
				}
		})
	})
}


function delete_artist() {
	var self = this;

console.log('id: ', self.req.path[1])

	DB(function(err, client, done) {
		client.query('DELETE from artists WHERE id=$1', [self.req.path[1]], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.json({'deleted':self.req.path[1]});
				}
		})
	})
}

function view_all_art() {
	var self = this;

	F.database(function(err, client, done) {
		client.query('SELECT artists.id AS artist_id, artists.first_name, artists.last_name, artists.dob, artists.email, art.id AS art_id, art.name, art.description, art.price FROM artists JOIN art ON artists.id=art.artist_id WHERE artists.id='+self.req.path[1]+' ORDER BY art.id', function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				console.log('res: ', result.rows);
				self.view('art', result.rows);
			}
		});
	});
}
	
function create_art() {
	var self = this;
	
	console.log('body: ', self.body)


	DB(function(err, client, done) {
		client.query('INSERT INTO art (artist_id, name, description, price) VALUES ($1, $2, $3, $4)', [+self.body.artist_id, self.body.name, self.body.desc, +self.body.price], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.redirect('/artists/'+self.body.artist_id+'/art');
				}
		})
	})
}


function view_art() {
	var self = this;

	DB(function(err, client, done){
		client.query('SELECT id, first_name, last_name, dob, email FROM artists',
		function(err, result) {
			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				console.log('res: ', result)
				self.view('artist', result);
			}
		})
	})
}

function show_edit_art() {
	var self = this;

	DB(function(err, client, done){
		client.query('SELECT id, first_name, last_name, dob, email FROM artists WHERE id='+self.req.path[1],
		function(err, result) {
			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				console.log('artist edit info:', result)
				self.json(result.rows[0]);
			}
		})
	})
}



function edit_art() {
	var self = this;
	console.log('body: ', self.body)
	
	DB(function(err, client, done) {
		client.query('UPDATE art SET artist_id=$1, name=$2, price=$3, description=$4 WHERE id=$5', [self.body.artist_id, self.body.name, self.body.price, self.body.desc, self.body.id], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.json({'updated':self.body.id});
				}
		})
	})
}


function delete_art() {
	var self = this;

console.log('id: ', self.req.path[1])

	DB(function(err, client, done) {
		client.query('DELETE from art WHERE id=$1', [self.req.path[3]], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.json({'deleted':self.req.path[3]});
				}
		})
	})
}