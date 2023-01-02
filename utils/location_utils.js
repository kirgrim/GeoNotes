import {requestLocationPermission} from "./permissions_utils";
import Geolocation from 'react-native-geolocation-service';

export const requestLocation = async (setLocation) => {
    let currLocation;
    await requestLocationPermission().then(res => {
        if (res) {
            return Geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        latitude: position['coords'].latitude,
                        longitude: position['coords'].longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                    console.log('updated location')
                },
                error => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    currLocation = null;
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
        }
    });
    console.log('currLocation = ', currLocation);
    return currLocation;
};