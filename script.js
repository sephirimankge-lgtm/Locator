document.addEventListener('DOMContentLoaded', function() {
    const getLocationBtn = document.getElementById('getLocationBtn');
    const loadingIndicator = document.getElementById('loading');
    const locationResult = document.getElementById('locationResult');
    const coordinatesElement = document.getElementById('coordinates');
    const accuracyElement = document.getElementById('accuracy');
    const addressElement = document.getElementById('address');
    const mapContainer = document.getElementById('mapContainer');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    getLocationBtn.addEventListener('click', function() {
        // Reset UI
        locationResult.classList.add('hidden');
        mapContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Show loading
        loadingIndicator.classList.remove('hidden');
        getLocationBtn.disabled = true;
        
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async function(position) {
                    // Success callback
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const accuracy = position.coords.accuracy;
                    
                    // Update UI with coordinates
                    coordinatesElement.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                    accuracyElement.textContent = `${Math.round(accuracy)} meters`;
                    
                    // Get address using reverse geocoding
                    try {
                        const address = await getAddressFromCoords(lat, lng);
                        addressElement.textContent = address;
                        
                        // Show map
                        showMap(lat, lng);
                        
                        // Show results
                        loadingIndicator.classList.add('hidden');
                        locationResult.classList.remove('hidden');
                    } catch (error) {
                        handleError("Couldn't retrieve address details.");
                    }
                    
                    getLocationBtn.disabled = false;
                },
                function(error) {
                    // Error callback
                    let errorMsg = "Unable to retrieve your location.";
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMsg = "Location access was denied. Please enable location services.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMsg = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            errorMsg = "The request to get location timed out.";
                            break;
                    }
                    handleError(errorMsg);
                }
            );
        } else {
            handleError("Geolocation is not supported by your browser.");
        }
    });

    async function getAddressFromCoords(lat, lng) {
        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(lat, lng);
        
        return new Promise((resolve, reject) => {
            geocoder.geocode({ 'location': latLng }, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        resolve(results[0].formatted_address);
                    } else {
                        reject('No results found');
                    }
                } else {
                    reject('Geocoder failed due to: ' + status);
                }
            });
        });
    }

    function showMap(lat, lng) {
        const mapElement = document.getElementById('map');
        const latLng = new google.maps.LatLng(lat, lng);
        
        const map = new google.maps.Map(mapElement, {
            center: latLng,
            zoom: 15,
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17"
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e9e9e9"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ]
        });

        new google.maps.Marker({
            position: latLng,
            map: map,
            title: "Your Location"
        });

        mapContainer.classList.remove('hidden');
    }

    function handleError(message) {
        loadingIndicator.classList.add('hidden');
        getLocationBtn.disabled = false;
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});
