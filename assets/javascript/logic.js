
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

var trainName = "";
var destination ="";
var firstTrain = "";
var trainFreq = "";

$(".btn-primary").on("click", function(event){

    event.preventDefault();

    trainName =   $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain =  $("#firstTrain").val().trim();
    trainFreq =   $("#trainFreq").val().trim();

    console.log("trainName: "+trainName);
    console.log("destination: "+destination);
    console.log("firstTrain: "+firstTrain);
    console.log("trainFreq: "+trainFreq);

    


});