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
				window.location = '/artists?flash=edits_saved';
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


		var tile = e.currentTarget.parentElement.parentElement.children,
				form = $('div#form form#editArt')[0].children;
		
		// console.log('tile: ', +tile[5].innerHTML.substring(1, tile[5].innerHTML.length));
		// console.log('form: ', form);

		$('div#form form#newArt').css('display', 'none');
		$('div#form form#editArt').css('display', 'block');
		// debugger;
		form.id.value = tile[0].value;
		form.artist_id.value = tile[1].value;
		form[3].children.name.value = tile[2].innerHTML;
		form[3].children.price.value = +tile[5].children[1].innerHTML.substring(1, tile[5].innerHTML.length);
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
				window.location = '/artists/'+form.artist_id.value+'/art?flash=edits_saved';
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


	// dynamic list update

	$('div#arts select').on('change', function(e) {
		$.get('/art/' + e.target.value, function(artists) {
			console.log('artists', artists);

			$('div#artDisplay').empty();
			
			artists.forEach(function(el, i) {
				var tile = $('<div>', {'class': 'tile'});
				var bottom = $('<div>', {'class': 'bottom'});

				tile.append("<input type='hidden' value="+ el.art_id +">");
				tile.append("<input type='hidden' value="+ el.artist_id +">");
				tile.append("<h4 class='artist'>" + el.first_name + el.last_name +"</h4>");
				tile.append("<h4 class='name'><b>"+ el.name +"</b></h4>");
				tile.append("<img src='/i/iris_garden.jpg'>");
				tile.append("<p class='desc'>"+ el.description +"</p>");

				bottom.append("<a class='glyphE' data-get-edit-url='/artists/" + el.artist_id + "/art/" + el.id + "/edit' data-make-edit-url='/artists/" + el.artist_id + "/art/" + el.art_id + "'><span class='fa fa-edit fa-2x'></span></a>");
				bottom.append("<h3 class='price'>" + el.price + "</h3>");
				bottom.append("<a class='glyphD' data-url='/artists/" + el.artist_id + "/art/" + el.art_id + "'><span class='fa fa-remove fa-2x'></span></a>");

				tile.append(bottom);

				$('div#artDisplay').append(tile);
			});
		});
		// window.location = '/art/' + e.target.value;
	});

	
	// delete art from arts

	$('#arts .glyphD').on('click', function(e) {
		
		var deleteUrl = e.currentTarget.dataset.url;
		$.ajax({
			method: "DELETE",
			url: deleteUrl
		}).then(function(raw) {

			var item = e.currentTarget.parentElement.parentElement;

			item.innerHTML = 'Successfully deleted art';
			item.style.color = '#F25F5C';
			item.style.border = 'none';
			item.style.height = 'auto';

		});
	});	


});
