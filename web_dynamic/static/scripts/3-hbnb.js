$(document).ready(function () {
    const amenityIds = {}; // Store Amenity IDs in an object

    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr("data-id");
        const amenityName = $(this).attr("data-name");

        if (this.checked) {
            amenityIds[amenityId] = amenityName;
        } else {
            delete amenityIds[amenityId];
        }

        // Update the h4 tag with the list of Amenities checked
        const amenitiesList = Object.values(amenityIds).join(', ');
        const $h4 = $('.amenities h4');
        $h4.text(amenitiesList);
        $h4.attr('title', amenitiesList);
    });
});

$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
	if (data.status === "OK") {
		$("div#api_status").addClass("available");
	} else {
		$("div#api_status").removeClass("available");
	}
});

$.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
        $(data).each(function () {
            $('.places').append(
                $('<article>').append(
                    $('<div class="price_by_night">').text('$' + $(this).attr('price_by_night')),
                    $('<h2></h2>').text($(this).attr('name')),
                    $('<div class="informations"></div>').append(
                        $('<div class="max_guest"></div>').text($(this).attr('max_guest') + ' Guests'),
                        $('<div class="number_rooms"></div>').text($(this).attr('number_rooms') + ' Rooms'),
                        $('<div class="number_bathrooms">').text($(this).attr('number_bathrooms') + ' Bathrooms'),
                        $('<div class="description"></div>').text($(this).attr('description'))
                    )
                )
            );
        });
    }
});
