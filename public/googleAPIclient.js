var map;
var marker;
var infowindow;
var messagewindow;
var clicked = false;
var markers = [];

function initMap() {

    var telAviv = {
        lat: 32.063567,
        lng: 34.773053
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: telAviv,
        zoom: 15,
        gestureHandling: 'none',
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        minZoom: 15

    });

    var bounds = new google.maps.LatLngBounds();

    bounds.extend(new google.maps.LatLng('32.051772', '34.750975'));
    bounds.extend(new google.maps.LatLng('32.086575', '34.78994'));

    map.fitBounds(bounds);

    google.maps.event.addListener(map, 'click', function (event) {
        if (!clicked) {
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map
            });
            markers.push(marker);
            $('.post-form').addClass('show');
            $('.map-press').removeClass('show');
            
            clicked = true;
        } 
        else {
            //when pressing on new marker 
            marker.addListener('click', function () {
                if (!(infowindow)) {
                    $('.post-form').addClass('show');
                } else {
                    infowindow.open(marker.get('map'), marker);
                }
            })
        }
    });
};

function attachPosts(marker, post) {
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="map-marker-txts"><div class="person-name">' + post.name + '</div><div class="person-text">' + post.text + '</div></div>'
    });

    //when pressing on a existing marker
    marker.addListener('click', function () {
        infowindow.open(marker.get('map'), marker);
    });
}