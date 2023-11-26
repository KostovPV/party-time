// import React, { useEffect } from 'react';

// const FindUs = () => {
//   const centerLocation = { lat: 42.525899, lon: 27.454538 };

//   useEffect(() => {
//     // Load the Google Maps JavaScript API
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAeze8SmEQ1zLTS43pSmM-ZnHViQom20Eg&libraries=places`;

//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       initializeMap();
//     };

//     return () => {
//       // Clean up the script to avoid memory leaks
//       document.head.removeChild(script);
//     };
//   }, []); // Ensure this effect runs only once on component mount

//   const initializeMap = () => {
//     // Initialize the map
//     const map = new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: centerLocation.lat, lng: centerLocation.lon },
//       zoom: 15,
//     });
  
//     // Add a marker for the center location
//     new window.google.maps.Marker({
//       position: { lat: centerLocation.lat, lng: centerLocation.lon },
//       map: map,
//       title: 'Center Location',
//     });
  
//     // You can add more map functionality or calculations here
//   };
  

//   return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
// };

// export default FindUs;


import React, { useEffect } from 'react';

const FindUs = () => {
  const centerLocation = { lat: 42.525899, lon: 27.454538 };
  let map;
  let directionsService;
  let directionsRenderer;

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAeze8SmEQ1zLTS43pSmM-ZnHViQom20Eg&libraries=places`;

      script.async = true;
      document.head.appendChild(script);

      // Define the callback function
      window.initMap = initializeMap;

      script.onload = () => {
        initializeMap();
      };

      script.onerror = () => {
        console.error('Error loading Google Maps API.');
      };
    };

    // Check if the Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      loadScript();
    }

    return () => {
      // Remove the callback function from the global scope
      delete window.initMap;
    };
  }, []); 

  const initializeMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: centerLocation.lat, lng: centerLocation.lon },
      zoom: 15,
    });

    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: map,
    });

    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        // Display user marker on the map
        new window.google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location',
        });

        // Calculate and display directions
        calculateAndDisplayRoute(userLocation);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  const calculateAndDisplayRoute = (userLocation) => {
    const request = {
      origin: new window.google.maps.LatLng(userLocation.lat, userLocation.lon),
      destination: new window.google.maps.LatLng(centerLocation.lat, centerLocation.lon),
      travelMode: 'DRIVING',
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        // You can also access distance and duration from 'result' object
        console.log('Distance:', result.routes[0].legs[0].distance.text);
        console.log('Duration:', result.routes[0].legs[0].duration.text);
      } else {
        console.error('Error calculating route:', status);
      }
    });
  };

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default FindUs;
