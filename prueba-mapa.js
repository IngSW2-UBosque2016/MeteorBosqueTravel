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
                "name": "Av 9 # 134B",
                "location": {
                    "type": "Point",
                    "coordinates": {
					
                        "lat": 4.71405,
                        "lng": -74.03243
                    }
                }
            },
            {
                "name": "Av 9 # 135c",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.71601,
                        "lng": -74.03238
                    }
                }
            },
            {
                "name": "Av 9 # 140",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.71842,
                        "lng":  -74.03232
                    }
                }
            },
            {
                "name": "Av 9 # 142",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.72019,
                        "lng": -74.03227
                    }
                }
            },
            {
                "name": "Av 9 # 145",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 4.72355,
                        "lng": -74.03218
                    }
                }
            },
            {
                "name": "Av 9 # 149",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.72712,
                        "lng":  -74.03211
                    }
                }
            },
			{  "name": "Av 9 # 152a",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.7305 ,
                        "lng":  -74.03201
                    }
                }
            },
			  {
                "name": "Av 9 # 157",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.73477 ,
                        "lng":  -74.03189
                    }
                }
            },
				  {
                "name": "Av 9 # 161a",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.73902, 
                        "lng": -74.03179 
                    }
                }
            },
				  {
                "name": "Av 9 # 164",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74142, 
                        "lng": -74.03174 
                    }
                }
            },
							  {
                "name": "Av 9 # 165a",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74405, 
                        "lng": -74.03165 
                    }
                }
            },
							  {
                "name": "Av 9 # 164",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74142, 
                        "lng": -74.03174 
                    }
                }
            },
			
							  {
                "name": "Av 9 # 165a",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74405,  
                        "lng": -74.03165 
                    }
                }
            },
							  {
                "name": "Av 9 # 164",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74142, 
                        "lng": -74.03174 
                    }
                }
            },
						  {
                "name": "Av 9 # 165a",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74405,
                        "lng":-74.03165
                    }
                }
            },
						  {
                "name": "Av 9 # 169",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74724, 
                        "lng":-74.03154
                    }
                }
            },
					  {
                "name": "Calle 170 # 11",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74855,  
                        "lng":-74.03282
                    }
                }
            },
					  {
                "name": "Calle 170 # 15",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.7492, 
                        "lng":-74.03713
                    }
                }
            },
					  {
                "name": "Calle 170 # 17",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.74964, 
                        "lng": -74.03912
                    }
                }
            },
					  {
                "name": "Calle 170 # 19",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.75006, 
                        "lng":-74.04074
                    }
                }
            },
					  {
                "name": "Éxito Calle 170",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.75572, 
                        "lng":-74.04534
                    }
                }
            },
					  {
                "name": "Estación Santa Fé",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.76417, 
                        "lng":-74.04385
                    }
                }
            },
					  {
                "name": "Estación Terminal",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.76994,  
                        "lng":-74.04301
                    }
                }
            },
					  {
                "name": "Autopista Norte # 192",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.77201, 
                        "lng":-74.04265
                    }
                }
            },
					  {
                "name": "Autopista Norte # 198",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.77731, 
                        "lng":-74.04186
                    }
                }
            },
					  {
                "name": "Autopista Norte # 207",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.78365, 
                        "lng":-74.04079
                    }
                }
            },
					  {
                "name": "Autopista Norte # 224",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.80189,  
                        "lng":-74.03761
                    }
                }
            },
					  {
                "name": "Multiparque",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat":4.80647, 
                        "lng":-74.0369
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