$(document).ready(function() {

	// select artist
	$('.item').on('click', '.cl', function(e) {
		window.location = "/artists/" + e.delegateTarget.firstChild.innerHTML + '/art';
	});

	// edit artist
	$('.glyphE').on('click', function(e) {
		console.log('e: ', e);
		
		var getEditUrl = e.currentTarget.dataset.getEditUrl;
		var makeEditUrl = e.currentTarget.dataset.makeEditUrl;

		$.get(getEditUrl).then(function(raw) {
			console.log('raw: ', raw);
			
			$('div#form form#newArtist').css('display', 'none');
			$('div#form form#editArtist').css('display', 'block');

			$('div#form form#editArtist')[0].children.id.value = raw.id;
			$('div#form form#editArtist')[0].children.fname.value = raw.first_name;
			$('div#form form#editArtist')[0].children.lname.value = raw.last_name;
			$('div#form form#editArtist')[0].children.dob.value = raw.dob.substring(0,10);
			$('div#form form#editArtist')[0].children.email.value = raw.email;

			// $('div#form form#editArtist')[0].attributes.action.value = makeEditUrl;

			$('div#form form#editArtist input[type="submit"]').on('click', function(e) {
				e.preventDefault();

				$.ajax({
					method: 'PUT',
					url: makeEditUrl,
					data: {
						id: $('div#form form#editArtist')[0].children.id.value,
						fname: $('div#form form#editArtist')[0].children.fname.value,
						lname: $('div#form form#editArtist')[0].children.lname.value,
						dob: $('div#form form#editArtist')[0].children.dob.value,
						email: $('div#form form#editArtist')[0].children.email.value
					}
				}).then(function(res) {
					console.log('edits saved');
					window.location = '/artists';
				})
			});

			console.log('form: ', $('div#form form#editArtist') );
		});
	});

	//delete artist
	$('.glyphD').on('click', function(e) {
		
		var deleteUrl = e.currentTarget.dataset.url;

		$.ajax({
			method: "DELETE",
			url: deleteUrl
		}).then(function(raw) {

			var item = e.currentTarget.parentElement.parentElement;

			item.innerHTML = 'Successfully deleted artist';
			item.style.color = '#F25F5C';
			item.style.margin = '0 auto';
			item.style.width = '25%';

		});
	});
});