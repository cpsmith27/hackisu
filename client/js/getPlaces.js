Markers = new Mongo.Collection('markers');


if (Meteor.isClient) {
    var MAP_ZOOM = 15;

    Meteor.startup(function() {
        GoogleMaps.load({key: 'AIzaSyALQD2Ax84rd5q_MYLZ-AbWpE17F8fE0-E', libraries: 'places' });
        Geolocation.currentLocation();
    });

    Template.map.helpers({
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var userLocation = Geolocation.latLng();
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && userLocation) {
                return {
                    center: new google.maps.LatLng(userLocation.lat, userLocation.lng),
                    zoom: MAP_ZOOM
                };
            }
        }
    });

    Template.map.onRendered(function() {
        GoogleMaps.ready('map', function(map) {
            var userLocation = Geolocation.latLng();
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });

            var givenRadius = parseInt(Session.get('ion-ios-navigate')) * 300;
            var givenMoney = parseInt(Session.get('ion-social-usd')) + 1;
            var givenRate = parseInt(Session.get('ion-ios-star')) + 1;
            var types = Session.get('types');

            console.log(givenRadius);
            console.log(givenMoney);
            console.log(givenRate);
            console.log(types);

            var service = new google.maps.places.PlacesService(m).nearbySearch({
                location: userLocation,
                radius: 5000,
                name: types,
                openNow: true,
                maxPriceLevel: givenMoney,
                types: ['restaurant']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var rnd = Math.floor(Math.random() * results.length);
                    Session.set("places",  results[rnd]);
                }

                console.log(Session.get("places"));
            }

            function getNames(results){
                var names = [];
                for(i = 0; i < results.length; i++){
                    names.push(results[i].name);
                }
                return names;
            }
        });
    });

    Template.home.onRendered(function() {
        var genButton = this.$('#generate');
        var content = this.$('#main-page-content');

        genButton.click(function () {
            console.log(content);
            content.empty();
            loadingView = Blaze.render(Template.generating, content[0]);

            setTimeout(function() {
                $(".randoms").each(function(e){
                    Blaze.remove(loadingView);
                });

                Blaze.render(Template.restaurant, content[0]);
            }, 1000);
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

    });
}
