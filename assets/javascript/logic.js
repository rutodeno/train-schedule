
/* pseudocode

1. Take user input data. This can be our function dataInput
2. save data on firbase
3. take user data an do calculations. We'll do this in the function dataCalculate
3. present data on the table

*/

// Initialize Firebase
var config = {
apiKey: "AIzaSyCV2eaNcCA_8yXNBTOljj1mZ-ra470dHM0",
authDomain: "trainschedule-b7c61.firebaseapp.com",
databaseURL: "https://trainschedule-b7c61.firebaseio.com",
projectId: "trainschedule-b7c61",
storageBucket: "",
messagingSenderId: "92663101238"
};
firebase.initializeApp(config);

var database = firebase.database ();
  
// Global variables



$(".btn-primary").on("click", function(event){

    event.preventDefault();

   var  trainName =   $("#trainName").val().trim();
   var  destination = $("#destination").val().trim();
   var  firstTrain =  moment($("#firstTrain").val().trim(), "HH:mm").format("HH:mm");
   
   var  trainFreq =   $("#trainFreq").val().trim();
    

    var newTrain = {

        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        trainFreq: trainFreq
    };

    console.log("trainName: "+newTrain.trainName);
    console.log("destination: "+newTrain.destination);
    console.log("firstTrain: "+newTrain.firstTrain);
    console.log("trainFreq: "+newTrain.trainFreq);

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#trainFreq").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    var dataTrain =childSnapshot.val().trainName;
    var dataDestination =childSnapshot.val().destination;
    var dataTime =childSnapshot.val().firstTrain;
    var dataFreq =childSnapshot.val().trainFreq;

    console.log("Train: "+dataTrain);
    console.log("Destination: "+dataDestination);
    console.log("Time: "+dataTime);
    console.log("Frequency: "+dataFreq);

    // calling our time function
    var ourTime = trainTime(dataFreq, dataTime);
    var dataMinutesToTrain = ourTime[0];
    var dataNextTrainTime = ourTime[1];


    // logging data onto the the html

    var newTraindata = $("<tr><td>"+dataTrain+"</td><td>"
                                    +dataDestination+"</td><td>"
                                    +dataFreq+"</td><td>"
                                    +dataNextTrainTime+"</td><td>"
                                    +dataMinutesToTrain+"</td></tr>");

    $("#train-table >tbody").append(newTraindata);


});

function trainTime (tFrequency, firstTime) {

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1,"years");
    
    var currentTime = moment();
    
    // get the difference between the times
    var diffTime = moment().diff(firstTimeConverted,"minutes");
    
    var tRemainder = diffTime %tFrequency;

    var minutesTillTrain = tFrequency - tRemainder;

    var nextTrain = moment().add(minutesTillTrain, "minutes");

    return [minutesTillTrain, nextTrain.format("hh:mm A")];
    

};







