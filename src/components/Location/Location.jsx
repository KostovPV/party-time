import { useEffect, useState } from "react";



export default function Location() {
    // const centerLocation = { lat: 42.525899, lon: 27.454538 }
    const [distance, setDistance] = useState(null);
    function toRad(value) {
        return (value * Math.PI) / 180;
    }

    function calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lng2 - lng1);
        const l1 = toRad(lat1);
        const l2 = toRad(lat2);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    function findDistance(userLocation) {
        console.log('userlocation', userLocation);
        console.log(userLocation.latitude);
        console.log(userLocation.longitude);
        const distanceA = calculateDistance(42.525899, 27.454538, userLocation.latitude, userLocation.longitude);
        console.log(userLocation.latitude);
        console.log(userLocation.longitude);
        return distanceA
    };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const distance = findDistance({ latitude, longitude });
                console.log(distance);
                setDistance(distance.toFixed(2));
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }
        );
    }, []);

    return (distance && (
        <div>
            <span>
                You are {distance}km away from us!
            </span>
        </div>)
    )


}

