
var config = {
  apiKey: "AIzaSyBZ1_iq8l18ZtzVF1666EpEvdjOcoNUd6I",
  authDomain: "employee-f4664.firebaseapp.com",
  databaseURL: "https://employee-f4664.firebaseio.com",
  projectId: "employee-f4664",
  storageBucket: "employee-f4664.appspot.com",
  messagingSenderId: "221902002876"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function (event) {
  event.preventDefault()

  var name = $("#nameInput").val().trim()
  var dest = $("#destinationInput").val().trim()
  var time = $("#timeInput").val().trim()
  var min = $("#minInput").val().trim()

  //store in the firebase 
  var train = {
    trainName: name,
    destination: dest,
    firstTime: time,
    frequency: min,
  }
  //upload train data to database
  database.ref().push(train)
})
//listner
database.ref().on("child_added", function (snap) {
  var name = snap.val().trainName
  var dest = snap.val().destination
  var time = snap.val().firstTime
  var min = snap.val().frequency

  //add row

  





  //   // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % min;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = min - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  //time for next train arrival
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm")
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  //append row
  $("tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + min + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>")

})
