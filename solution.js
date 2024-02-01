"use strict";

const haversineDistance = (coord1, coord2) => {

    const radius = 6371;

    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const lat1Rad = degreeToRadians(lat1);
    const lon1Rad = degreeToRadians(lon1);
    const lat2Rad = degreeToRadians(lat2);
    const lon2Rad = degreeToRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = radius * c;

    return distance;
}

const degreeToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}

const generateTimeMap = (coordinates) => {

    let n = coordinates.length;

    let timeMatrix = initializeMatrix(n);

    for(let i = 0; i < n; i ++) {
        for(let j = i + 1; j < n; j ++) {
            let distance = haversineDistance(coordinates[i], coordinates[j]);
            let timeNeeded = distance / 20;
            timeMatrix[i][j] = timeNeeded;
            timeMatrix[j][i] = timeNeeded;
        }
    }

    return timeMatrix;

}

const initializeMatrix = (n) => Array.from(Array(n), () => new Array(n).fill(0));

const traversePath = (timeMatrix, path) => {

    let n = path.length;

    let timeElapsed = 0;

    for(let i = 0; i < n - 1; i ++) {

        const src = path[i];
        const dest = path[i + 1];

        if(src.startsWith("r")) timeElapsed += getWaitTime(src, timeElapsed);
        timeElapsed += timeMatrix[locationsMap[src]][locationsMap[dest]];


    }

    return timeElapsed;

}

const getWaitTime = (restaurant, timeElapsed) => {

    const waitTimes = getWaitTimes();

    if(timeElapsed >= waitTimes[restaurant]) return 0;

    else return waitTimes[restaurant] - timeElapsed;

}

const getAllPaths = () => ([
    ["aman", "r1", "r2", "c1", "c2"], //  r1, r2, c1, c2
    ["aman", "r2", "r1", "c1", "c2"], //  r2, r1, c1, c2
    ["aman", "r1", "r2", "c2", "c1"], //  r1, r2, c2, c1
    ["aman", "r2", "r1", "c2", "c1"], //  r2, r1, c2, c1

    ["aman", "r1", "c1", "r2", "c2"], // r1, c1, r2, c2
    ["aman", "r2", "c2", "r1", "c1"] //  r2, c2, r1, c1
]);

const getWaitTimes = () => ({
    "r1": pt1,
    "r2": pt2,
});

////////////////////     Inputs    //////////////////////////

const locations = [[25.2907786,85.8387586], [20.2824948,85.7622445], [20.27518855541144, 85.82114041488582], [20.3107216, 85.8172878], [20.269228, 85.8129888]];

let pt1 = 2;
let pt2 = 3;


//////////////////  End of Inputs ////////////////////////////

const locationsMap = {
    "aman": 0,
    "r1": 1,
    "r2": 2,
    "c1":3,
    "c2": 4,
}

let minTimeTaken = Number.MAX_SAFE_INTEGER;
let shortestPath = [];

const timeMatrix = generateTimeMap(locations);

getAllPaths().forEach((path) => {
    let timeTaken = traversePath(timeMatrix, path);
    if(timeTaken < minTimeTaken) {
        minTimeTaken = timeTaken;
        shortestPath = path;
    }
});

console.log(shortestPath);