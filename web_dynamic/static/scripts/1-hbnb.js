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
