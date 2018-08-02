$(document).ready(function() {

    // DEFINE GLOBAL VARIABLES
    
    var data = [
        {
            question:"In what year was the original Jurassic Park film released?",
            choices:["1989" , "1990" , "1993", "1994"],
            correctAnswer:"1993",
            image: "assets/images/question1.jpg",
        },
        {
            question:"What is the name of the fictional island Jurassic Park is situated on?",
            choices:["San Lorenzo" , "Isla Nublar" , "Koholint Island", "Isle of Naboombu"],
            correctAnswer: "Isla Nublar",
            image: "assets/images/question2.jpg",
        },
        {
            question:"What prevents the Jurassic Park dinosaurs from reproducing?",
            choices:["They're all male" , "They're all female" , "Dinosaur contraceptives", "They just don't fancy each other"],
            correctAnswer: "They're all female",
            image: "assets/images/question3.jpg",
        },
        {
            question:"What was Jurassic Park's tagline?",
            choices:["ARRRRGH! DINOSAURS!" , "Have we got a vacation for you!" , "Buy the ticket, take the ride", "An adventure 65 million years in the making"],
            correctAnswer: "An adventure 65 million years in the making",
            image: "assets/images/question4.jpg",
        },
    ]
    
    //define global variables
    var currentQuestion = "";
    var userAnswer = "";
    var correctAnswer = "";
    var correctAnswerCount = 0;
    var incorrectAnswerCount = 0;
    var unansweredCount = 0;
    var answerCount;
    var i = 0;
    var answerCounter;
    var questionCount;
    var questionCounter;
    
    //FUNCTIONS

    //Reset view
    function resetInitialView(){
        $("#questionContainer").show();
        $("#answerContainer").hide();
        $("#finalContainer").hide();
    }
    function resetAnswerView(){
        $("#questionContainer").hide();
        $("#answerContainer").show();
        $("#finalContainer").hide();
    }
    function resetFinalView(){
        $("#questionContainer").hide();
        $("#answerContainer").hide();
        $("#finalContainer").show();
    }

    //question time remaining
    function questionTimer(x) {
        questionCount = x;
        console.log("questionCount: " + questionCount);
        questionCounter = setInterval(timer, 1000); //1000 will run it every 1 second
        
        function timer(){
          questionCount--;
          console.log("Time Remaining: " + questionCount);
          $("#timeRemaining").html("Time Remaining: " + questionCount);
          
          if (questionCount <= 0){
                clearInterval(questionCounter);
                resetAnswerView();
                $("#statusMessage").html("Sorry - Too Slow!");
                $("#correctAnswer").html("Correct Answer: " + correctAnswer);
                unansweredCount++;
                answerTimer(5);
          }
        }
     }

    //answer time remaining
    function answerTimer(y) {
        answerCount = y;
        console.log("answerCount: " + answerCount);
        answerCounter = setInterval(timer, 1000); //1000 will run it every 1 second
        
        function timer(){
        answerCount--;
          console.log("Time Remaining: " + answerCount);
          $("#timeRemaining").html("Time Remaining: " + answerCount);
          
          if (answerCount <= 0){
            clearInterval(answerCounter);
            i++;
            selectQuestion();
            resetInitialView();
            questionTimer(10);
          }
        }   
    }
    
     //function to cycle through questions
    function selectQuestion(){
        console.log(i);

        if (i > data.length - 1) {
            $("#correctAnswerCount").html("Correct Answers: " + correctAnswerCount);
            $("#incorrectAnswerCount").html("Incorrect Answers: " + incorrectAnswerCount);
            $("#unansweredCount").html("Unanswered Questions: " + unansweredCount);
            resetFinalView();
        }

        console.log(data);
        $("#questionField").html(data[i].question);
        $("#answerFieldA").html(data[i].choices[0]);
        $("#answerFieldB").html(data[i].choices[1]);
        $("#answerFieldC").html(data[i].choices[2]);
        $("#answerFieldD").html(data[i].choices[3]);
            
        //define currentQuestion and correctAnswer
        currentQuestion = (data[i].question);
        correctAnswer = (data[i].correctAnswer);
        console.log("question: ", data[i].question);
        console.log("correctAnswer: ", data[i].correctAnswer);
        //define image for answer
        $("#answerImage").attr("src", data[i].image);
            
            return;
        }
    
    // LOGIC
    
    //show question container, hide answerContainer and finalContainer
    resetInitialView();

    //user clicks start to begin game
    $(document).on("click", "#start", function(){
        console.log("Start Clicked");
    
        //set timer for 30 seconds
        questionTimer(10);
    
        //run function startQuestion
        selectQuestion();

    });

    //when user clicks an answer
    $(".answerChoice").on("click", function() {
        //stop timer
        clearInterval(questionCounter);

        //define users' click as userAnswer
        userAnswer = $(this).html();
        console.log("userAnswer: " + userAnswer);

            //if answer clicked is correct
            if (userAnswer === correctAnswer) {
            $("#statusMessage").html("Correct!");
            $("#correctAnswer").html("Correct Answer: " + correctAnswer);
            correctAnswerCount++;
            resetAnswerView();
            answerTimer(5)
            }

            //if answer clicked is incorrect
            else {
            $("#statusMessage").html("Sorry - Wrong Answer!");
            $("#correctAnswer").html("Correct Answer: " + correctAnswer);
            incorrectAnswerCount++;
            resetAnswerView();
            answerTimer(5)
            }
    });

    //user clicks restart to begin game
    $("#restart").on("click", function() {
        console.log("restart Clicked");
        
        //reset variables and view
        currentQuestion = "";
        userAnswer = "";
        correctAnswer = "";
        correctAnswerCount = 0;
        incorrectAnswerCount = 0;
        unansweredCount = 0;
        answerCount;
        i = 0;
        answerCounter;
        questionCount;
        questionCounter;
        resetInitialView();

        //set timer for 30 seconds
        questionTimer(10);
    
        //run function startQuestion
        selectQuestion();

    });

})