To run:
Ensure you have both Node.Js and NPM installed on your machine. This can be done by visiting the offical
Node.js site and downloaeding the latest version. The following link has good directions to ensure the install
worked successfully: https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac

Once preReqs are installed, open a command prompt and navigate to the location of this code.
Once in the correct directory, run: 
npm install readline
then run:
node iACentralFill.js

at this point the program should start and accept your coordinate input.


Assumptions:
The main assumptions I made were a minimum medication price of $1.00, a maximum medication price of
$100.00, 10 central fill facilites existing, and 3 medications existing. These were round numbers making for
easy testing. However, any of these numbers could be adjusted and the program would work the same way.
Another assumption was that users could only enter points that are whole number integers. This could also be changed
and the program would still work.


Multiple central fills at one location:
To support multiple central fill facilities at one location, I would have to change my Set of facilities to an
Array of facilities, and remove code that checks if the coordinates of a facility already exist. Next, when sorting the 
facilities by distance, I would add a secondary sort that sorts by lowest medication price within the facilities inventory.
This would ensure that when getting the closest 3 facilities to a user location, we can break any ties based on which will
have the cheaper medication.


Larger world size:
To support a larger world size, we could change the way we store the facilities to a more efficient structure that is organized
in a way to more efficiently find nearest neighbors. Something like kd tree would work. I could also change my distance calculation from manhattan distance to another
algorithm more efficient for larger data sets.