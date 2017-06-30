exports.install = function() {
	F.route('/', view_index);

	F.route('/artists', view_artists, ['get']);
	F.route('/artists', create_artist, ['post']);
	F.route('/artists/{id}', view_artist, ['get']);
	F.route('/artists/{id}', edit_artist, ['put']);
	F.route('/artists/{id}', delete_artist, ['delete']);
	

	// F.route('/artists/{id}/art', view_all_art, ['get']);
	// F.route('/artists/{id}/art/{id}', view_art, ['get']);
	// F.route('/artists/{id}/art/{id}', create_art, ['post']);
	// F.route('/artists/{id}/art/{id}', edit_art, ['get']);
	// F.route('/artists/{id}/art/{id}', delete_art, ['get']);


};

function view_index() {
	var self = this;


	self.view('index');
}
	
function view_artists() {
	var self = this;

	F.database(function(err, client, done) {
		client.query('SELECT id, first_name, last_name, dob, email FROM artists', function(err, result) {
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

	self.view('index');
}


function edit_artist() {
	var self = this;
	
	DB(function(err, client, done) {
		client.query('UPDATE TABLE artists SET first_name=$1, last_name=$2, dob=$3, email=$4 WHERE id=$5', [self.body.fname, self.body.lname, self.body.dob, self.body.email, self.body.id], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.plain('successfully updated artist');
				}
		})
	})
}


function delete_artist() {
	var self = this;

	DB(function(err, client, done) {
		client.query('DELETE from artists WHERE id=$1', [self.body.id], 
			function(err, result) {
				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					self.plain('successfully deleted artist');
				}
		})
	})
}