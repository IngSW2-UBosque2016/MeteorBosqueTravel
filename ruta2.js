Places = new Mongo.Collection('places');

if (Meteor.isClient) {
    var lookup = [];

    Meteor.startup(function() {
        GoogleMaps.load();
    });

    Template.map.onCreated(function() {
        var self = this;

        GoogleMaps.ready('map', function(map) {
            self.autorun(function() {
                getBox();

                var handle = Meteor.subscribe('places', Session.get('box'));
                if (handle.ready()) {
                    var places = Places.find().fetch();

                    _.each(places, function(place) {
                        var lat = place.location.coordinates[0];
                        var lng = place.location.coordinates[1];

                        if (!_.contains(lookup, lat+','+lng)) {
                            var marker = new google.maps.Marker({
                             position: new google.maps.LatLng(lat, lng),
                               map: GoogleMaps.maps.map.instance
                           });
                            lookup.push(lat+','+lng);
                        }
                    });
                }
            });

            google.maps.event.addListener(map.instance, 'dragend', function(e){
                 getBox();
            });

            google.maps.event.addListener(map.instance, 'zoom_changed', function(e){
                 getBox();
            });
        });
    });

    Template.map.helpers({
        mapOptions: function() {
            if (GoogleMaps.loaded()) {
                return {
                    center: new google.maps.LatLng(4.71405, -74.03243),
                    zoom: 14
                };
            }
        },
        places: function() {
            return Places.find();
        }
    });

    function getBox() {
        var bounds = GoogleMaps.maps.map.instance.getBounds();
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        Session.set('box', [[sw.lat(),sw.lng()], [ne.lat(),ne.lng()]]);
    }
}

if (Meteor.isServer) {
    Meteor.publish('places', function(box) {
        var find = {
            location: {
                $geoWithin: {
                    $box: box
                }
            }
        };

        return Places.find(find);
    });

    Meteor.startup(function() {
 var data = [
        {
                "name": "Cra 7 # 135",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.71345,
                        "lng": -74.02905
                    }
                }
            },
        {
                "name": "Cra 7 # 140",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.71586,
                        "lng": -74.02861
                    }
                }
            },
                {
                "name": "Cra 7 # 145",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.71981, 
                        "lng": -74.02715
                    }
                }
            },
        {
                "name": "Cra 7 # 149",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.72476, 
                        "lng":-74.02512
                    }
                }
            },
        {
                "name": "Cra 7 # 153b",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.72882,
                        "lng":-74.02402
                    }
                }
            },
            {
                "name": "Cra 7 # 156b",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.7322,
                        "lng":-74.02381
                    }
                }
            },
            {
                "name": "Cra 7 # 159 c",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.73484, 
                        "lng":-74.02422
                    }
                }
            },
            {
                "name": "Cra 7 # 163",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.73776, 
                        "lng": -74.02264
                    }
                }
            },
                {
                "name": "Cra 7 # 170b",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.74809,
                        "lng": -74.02291 
                    }
                }
            },
                {
                "name": "Cra 7 # 176",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.75468, 
                        "lng": -74.02433
                    }
                }
            },
                {
                "name": "Cra 7 # 182",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.75889,  
                        "lng": -74.02581
                    }
                }
            },
                {
                "name": "Cra 7 # 185c",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.76231, 
                        "lng": -74.02705
                    }
                }
            },
                            {
                "name": "Cra 7 # 189",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.76516, 
                        "lng":-74.02756
                    }
                }
            },
                            {
                "name": "Cra 7 # 191",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.76831, 
                        "lng": -74.02759
                    }
                }
            },
                            {
                "name": "Cra 7 # 200",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":  4.77689, 
                        "lng": -74.02602
                    }
                }
            },
                            {
                "name": "Cra 7 # 237",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.81165, 
                        "lng": -74.03079
                    }
                }
            },
           
              {
                "name": "Clínica Teletón",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.85671,
                        "lng":-74.02927
                    }
                }
            },

        ];

        if(!Places.find().count()) {
            _.each(data, function(place) {
                Places.insert({
                    name: place.name,
                    location: {
                        type: 'Point',
                        coordinates: [
                            place.location.coordinates.lat,
                            place.location.coordinates.lng
                        ]
                    }
                })
            });
        }
    });
}