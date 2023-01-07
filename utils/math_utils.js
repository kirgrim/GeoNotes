const EARTH_RADIUS_METERS = 6.3781 * 10^6; // Radius of the earth in km


/**
 * Returns the shortest distance in meters from two coordinates using "Haversine" formula
 * source: https://stackoverflow.com/a/27943
 * @param pos1: coordinates of first object
 * @param pos2: coordinates of second object
 * @returns {number}: distance (in meters) between provided positions
 */
export function getDistanceFromCoordinates(pos1,pos2) {
    const dLat = deg2rad(pos2.lat-pos1.lat);  // deg2rad below
    const dLon = deg2rad(pos2.lon-pos1.lon);
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return EARTH_RADIUS_METERS * c;
}

/**
 * Degrees to radian
 * @param deg: angle degrees provided
 * @returns {number}
 */
function deg2rad(deg) {
    return deg * (Math.PI/180)
}