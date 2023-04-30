const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//world size
const MAX_X = 10
const MIN_X = -10
const MAX_Y = 10
const MIN_Y = -10
//ASSUMPTIONS:
const MIN_PRICE = 1.00
const MAX_PRICE = 100.00
const numberOfFacilities = 10
const medicines = ['A', 'B', 'C']

/*
function to generate the central fill facilities upon succesful coordinate input.
accepts an int representing the number of facilities to create.
returns an array containing the generated facilities.
*/
function generateCentralFillFacilities(facilityCount){
    const facilities = []
    const coordinates = new Set();
    
    //continually creates facilities until facilityCount is reached.
    while (facilities.length < facilityCount){
        //formula to generate a random int in the range of -10 to 10, representing coordinates of
        //the facility
        let xCoord = Math.floor(Math.random()*(MAX_X-MIN_X))+MIN_X;
        let yCoord = Math.floor(Math.random()*(MAX_Y-MIN_Y))+MIN_Y;

        //check to see if facility with these coordinates already exist.
        //if they do, do not count this facility.
        let coordinate = {xCoord,yCoord}
        if (coordinates.has(coordinate)){
            continue;
        }
        coordinates.add(coordinate);

        //create the inventory object for each facility
        const inventory = {}
        for (const medicationId of medicines){
            //formula to randomly create a price for each medication in the inventory.
            inventory[medicationId] = (Math.random()*(MAX_PRICE-MIN_PRICE)+MIN_PRICE).toFixed(2);
        }

        //create facility id with correct format.
        let facilityId = '';
        let facilityNumber = facilities.length+1
        if (facilityNumber < 10){
            facilityId = '00'+facilityNumber;
        }
        else if (facilityNumber >= 10 && facilityNumber < 100){
            facilityId = '0'+facilityNumber;
        }
        else{
            facilityId = facilityNumber.toString();
        }

        //construct the facility object and add it to facilities.
        let facility = {
            facilityId,
            xCoord,
            yCoord,
            inventory
        }
        facilities.push(facility)
    }
    return facilities;
}

/*
function to get manhattan distance.
accepts the x,y coordinate for 2 different points.
returns the manhattan distance between the 2 points.
*/
function getManhattanDistance(x1,y1,x2,y2){
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

//function to find the closest three facilities to the user coordinates.
//accepts a facilities array representing all facilities, the user x coordinate, and the user y coordinate.
//returns an array containing relevant info about the 3 closest facilities.
function findClosestFacilities(facilities,x,y){
    //sorts the facilities array based on the manhattan distance from the user coordinates
    //to the coordinates of the given facility.
    const sortedFacilities = facilities.sort((a,b) => {
        const aDist = getManhattanDistance(x,y,a.xCoord,a.yCoord)
        const bDist = getManhattanDistance(x,y,b.xCoord,b.yCoord)
        return aDist - bDist;
    })

    //take the first three facilities of the sorted facilities.
    const closestFacilities = sortedFacilities.slice(0,3);
    let facilitiesInfo = [];
    //loop through the 3 closest facilities and obtain the relevant info.
    for (const facility of closestFacilities){
        let distance = getManhattanDistance(x,y,facility.xCoord,facility.yCoord);
        let facilityId = facility.facilityId
        //to obtain the cheapest medicine at a given facility, we first set the lowest medicine price to
        //infinity, then we loop through the medicines at a given facility and whenever we see a medicine price
        //lower than our current lowest medicine price, we set the lowest medicine price to that price and keep track
        //of that medicines id.
        let cheapestMedicinePrice = Infinity;
        let cheapestMedicinePriceId = '';
        for (const medicationId of medicines){
            let medication = facility.inventory[medicationId];
            if (medication < cheapestMedicinePrice){
                cheapestMedicinePrice = medication;
                cheapestMedicinePriceId = medicationId;
            }
        }
        //construct the facility info object
        let facilityInfo = {
            facilityId,
            distance,
            cheapestMedicinePrice,
            cheapestMedicinePriceId
        }
        facilitiesInfo.push(facilityInfo)
    }
    return facilitiesInfo
}

/*
function to accept user input and return facility information.
*/
function userInput(){
rl.question('Please input coordinates (format: x,y): ', (input) => {
    //get the user input as coordinates.
    const [userX, userY] = input.split(',').map(Number);
    //if either coordinate is not an int, then it is an invalid coordinate.
    if (userX%1 !== 0 || userY%1 !== 0){
        console.log('invalid coordinates entered.')
    }
    else{
        let facilities = generateCentralFillFacilities(numberOfFacilities);
        let facilitiesInfo = findClosestFacilities(facilities, userX, userY);

        console.log('Closest Central Fills to ('+userX+','+userY+'):');
        for (const facilityInfo of facilitiesInfo){
            console.log('Central Fill '+facilityInfo.facilityId.toString()+' - $'+facilityInfo.cheapestMedicinePrice+', Medication '+facilityInfo.cheapestMedicinePriceId+' Distance '+facilityInfo.distance)
        }
    }
    userInput();
});
}
userInput(); 