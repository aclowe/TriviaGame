$(document).ready(function() {


//setTimeout(fiveSeconds, 5000);
// DEFINE GLOBAL VARIABLES

var data = [
    {
        question:"In what year was the original Jurassic Park film released?",
        choices:["1989" , "1990" , "1993", "1994"],
        correctAnswer:"1993",
        image: "<img src=\"assets/images/question1.jpg\" alt=question1image>",
    },
    {
        question:"What is the name of the fictional island Jurassic Park is situated on?",
        choices:["San Lorenzo" , "Isla Nublar" , "Koholint Island", "Isle of Naboombu"],
        correctAnswer: "Isla Nublar",
        image: "<img src=\"assets/images/question2.jpg\" alt=question2image>",
    },
    {
        question:"What prevents the Jurassic Park dinosaurs from reproducing?",
        choices:["They're all male" , "They're all female" , "Dinosaur contraceptives", "They just don't fancy each other"],
        correctAnswer: "They're all female",
        image: "<img src=\"assets/images/question3.jpg\" alt=question3image>",
    },
    {
        question:"What was Jurassic Park's tagline?",
        choices:["ARRRRGH! DINOSAURS!" , "Have we got a vacation for you!" , "Buy the ticket, take the ride", "An adventure 65 million years in the making"],
        correctAnswer: "An adventure 65 million years in the making",
        image: "<img src=\"assets/images/question4.jpg\" alt=question4image>",
    },
]

//define global variables
var currentQuestion = "";
var userAnswer = "";
var correctAnswer = "";
var correctAnswerCount = 0;
var incorrectAnswerCount = 0;
var unansweredCount = 0;
var count;

//FUNCTIONS
// timeRemaining
function timerFunc(x) {
    count = x;
    console.log("count: " + count);
    var counter = setInterval(timer, 1000); //1000 will run it every 1 second
    
    function timer(){
      count--;
      console.log("Time Remaining: " + count);
      $("#timeRemaining").html("Time Remaining: " + count);
      
      if (count <= 0){
         clearInterval(counter);
         //counter ended, do something here
        //return;
      }
    }
 }

 //cycle through questions
function startQuestion(){
    console.log(data);
    for (var i = 0; i < data.length; i++){
        $("#questionField").html(data[i].question);
        $("#answerFieldA").html(data[i].choices[0]);
        $("#answerFieldB").html(data[i].choices[1]);
        $("#answerFieldC").html(data[i].choices[2]);
        $("#answerFieldD").html(data[i].choices[3]);

        //define currentQuestion and correctAnswer
        currentQuestion = (data[i].question);
        correctAnswer = (data[i].correctAnswer);

        console.log("question: ", data[i].question);
        console.log("correctAnswer:: ", data[i].correctAnswer);
    }
    
};

// LOGIC
$(document).on("click", "#start", function(){
    console.log("Start Clicked");

    //set timer for 30 seconds
    timerFunc(30);

    //run function startQuestion
    startQuestion(); 
    
    //when user clicks an answer
    $(".answerChoice").on("click", function() {

        //define users' click as userAnswer
        userAnswer = $(this).html()
        console.log("userAnswer: " + userAnswer);
    })

    //if time runs out
    if (count === 0) {
        $("#answerContainer").addClass("collapse.show");
        $("#statusMessage").html("Too Slow!");
        $("#correctAnswer").html("Correct Answer: " + correctAnswer);
        unansweredCount++;
    }
    //if answer clicked is correct
    else if (userAnswer === correctAnswer) {
        $("#answerContainer").addClass("collapse.show");
        $("#statusMessage").html("Correct!");
        $("#correctAnswer").html("Correct Answer: " + correctAnswer);
        correctAnswerCount++;
        }

    //if answer clicked is incorrect
    else {
        $("#answerContainer").addClass("collapse.show");
        $("#statusMessage").html("Sorry - Wrong Answer");
        $("#correctAnswer").html("Correct Answer: " + correctAnswer);
        incorrectAnswerCount++;
        }
})



})








