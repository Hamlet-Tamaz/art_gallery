$(document).ready(function() {
	//			ARTIST

	// select artist
	$('.item').on('click', '.cl', function(e) {
		window.location = "/artists/" + e.delegateTarget.firstChild.innerHTML + '/art';
	});

	// edit artist
	$('#artists .glyphE').on('click', function(e) {
		$('div#form p.success').remove();

		
		var getEditUrl = e.currentTarget.dataset.getEditUrl;
		var makeEditUrl = e.currentTarget.dataset.makeEditUrl;
			
		$('div#form form#newArtist').css('display', 'none');
		$('div#form form#editArtist').css('display', 'block');

		var artist = e.currentTarget.parentElement.parentElement.children,
				form = $('div#form form#editArtist')[0].children;

		form.id.value = artist[0].innerHTML;
		form.fname.value = artist[1].innerHTML;
		form.lname.value = artist[2].innerHTML;
		form.dob.value = artist[3].attributes.rel.value;
		form.email.value = artist[4].innerHTML;


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
				window.location = '/artists?flash=saved';
			})
		});
	});

	//delete artist
	$('#artists .glyphD').on('click', function(e) {
		
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

	//	toggle to newArtist form

	$('form#editArtist button').on('click', function(e) {
		$('div#form form#newArtist').css('display', 'block');
		$('div#form form#editArtist').css('display', 'none');
	});

	
	//  	 ART


	// edit art
	$('#art .glyphE').on('click', function(e) {
		$('div#form p.success').remove();

		var getEditUrl = e.currentTarget.dataset.getEditUrl;
		var makeEditUrl = e.currentTarget.dataset.makeEditUrl;


		var tile = e.currentTarget.parentElement.children,
				form = $('div#form form#editArt')[0].children;
		
		console.log('tile: ', +tile[5].innerHTML.substring(1, tile[5].innerHTML.length));
		console.log('form: ', form);

		$('div#form form#newArt').css('display', 'none');
		$('div#form form#editArt').css('display', 'block');
		
		form.id.value = tile[0].value;
		form.artist_id.value = tile[1].value;
		form[3].children.name.value = tile[2].innerHTML;
		form[3].children.price.value = +tile[5].innerHTML.substring(1, tile[5].innerHTML.length);
		form[3].children.desc.innerHTML = tile[4].innerHTML;


		$('div#form form#editArt input[type="submit"]').on('click', function(e) {
			e.preventDefault();

			$.ajax({
				method: 'PUT',
				url: makeEditUrl,
				data: {
					id: form.id.value,
					artist_id: form.artist_id.value,
					name: form[3].children.name.value,
					price: form[3].children.price.value,
					desc: form[3].children.desc.value
				}
			}).then(function(res) {
				console.log('edits saved');
				window.location = '/artists/'+form.artist_id.value+'/art?flash=saved';
			})
		});
	});

	//delete art
	$('#art .glyphD').on('click', function(e) {
		
		var deleteUrl = e.currentTarget.dataset.url;
		$.ajax({
			method: "DELETE",
			url: deleteUrl
		}).then(function(raw) {

			var item = e.currentTarget.parentElement;

			item.innerHTML = 'Successfully deleted art';
			item.style.color = '#F25F5C';
			item.style.border = 'none';
			item.style.height = 'auto';

		});
	});	

//	toggle to newArt form

	$('form#editArt button').on('click', function(e) {
		$('div#form form#newArt').css('display', 'block');
		$('div#form form#editArt').css('display', 'none');
	});


	//	ARTS

	$('div#art select').on('change', function(e) {
		// debugger;

		$.get('/art/' + e.target.value, function(res) {
			console.log('res', res)
		})
		// window.location = '/art/' + e.target.value;
	})

});
