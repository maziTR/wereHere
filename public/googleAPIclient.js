var map;
var marker;
var infowindow;
var messagewindow;

function initMap() {
    var telAviv = { lat: 32.063567, lng: 34.773053 }
    map = new google.maps.Map(document.getElementById('map'), {
        center: telAviv,
        zoom: 15,
        gestureHandling: 'none',
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl : false,
        minZoom: 15

    })
    var bounds = new google.maps.LatLngBounds();

    bounds.extend(new google.maps.LatLng('32.051772', '34.750975')); 
    bounds.extend(new google.maps.LatLng('32.086575', '34.78994')); 

    map.fitBounds(bounds);

    /*     infowindow = new google.maps.InfoWindow({
            content: document.getElementById('form')
        }); */

    google.maps.event.addListener(map, 'click', function (event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        //when pressing on new marker 
        marker.addListener('click', function () {
/*             infowindow.open(marker.get('map'), marker);*/
            if (!(infowindow)){
                $('.post-form').addClass('show');
            }
            else{
                infowindow.open(marker.get('map'), marker);
            }
        });
/* 
        infowindow = new google.maps.InfoWindow({
            content: document.getElementById('form')
        })  */
    });
    
    }

var form = document.getElementById('form').innerHTML

function attachPosts(marker, post) {
    console.log(marker);
    var infowindow = new google.maps.InfoWindow({
        content: '<hr><h6>' + post.name + '</h6><br><p>' + post.text + '</p><br><hr>'
    });
    //when pressing on a existing marker

    marker.addListener('click', function () {
        infowindow.open(marker.get('map'), marker);
    }); 
}


    /* function saveData() {
        var name = escape(document.getElementById('post-name').value);
        var text = escape(document.getElementById('text').value);
        var latlng = marker.getPosition();
    }; */
    //////// CHANGE TO MONGODB + AJAX

    /* var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
        '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();
    downloadUrl(url, function (data, responseCode) {
        if (responseCode == 200 && data.length <= 1) {
            infowindow.close();
            messagewindow.open(map, marker);
        }
    })*/