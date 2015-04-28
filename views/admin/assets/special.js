$(function () {
	
	var items = $('.pagetype-item');

	function hidePageTypeSections () {
		items.val('');
		items.hide();
	}

	function updatePageTypeSections (pagetype) {
		hidePageTypeSections();
		$('.pagetype-'+pagetype).show();
	}


	var pagetype = $('#pagetype');
	updatePageTypeSections($('#pagetype > option:selected').val());

	pagetype.change(function () {
		var type = $(this).val();
		console.log("changin to page type "+ type);
		updatePageTypeSections(type);
	});

});