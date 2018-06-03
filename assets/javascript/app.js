window.onload = function() {

//setup trivia object
let triviaGame={
//object to hold answer, questions, pictures etc
//order of questions will be randomized based on index value hopefully
    Questions:[],
    correct: 0,
    incorrect: 0,

    //  Variable that will hold our setInterval that runs the stopwatch
    intervalId: 0,
    // prevents the clock from being sped up unnecessarily
    clockRunning: false,

//build questions

buildQuestions: function (){
//constructor ala eloquent javascript chapter 4
let newQuestion = function(question,answer,choiceOne,choiceTwo,choiceThree,choiceFour,image,link){
    triviaGame.Questions.push({question,answer,choiceOne,choiceTwo,choiceThree,choiceFour,image,link});
};
//test question
newQuestion("Magnetism or Fairie Lights? This natural wonder can be seen from where:","Tromso, Norway","Prime Meridian", "Tromso, Norway","Equator","Syndey, Australia","https://www.pinterest.com/pin/315674255102159273/","https://en.wikipedia.org/wiki/Aurora");
newQuestion("It's the tippy top of tall:","Mt. Everest","Mt.Kilamonjaro", "Mt. Ranier","Mt. Fuji","Mt.Everest","https://cdn.britannica.com/700x450/17/83817-004-C5DB59F8.jpg","https://www.britannica.com/place/Mount-Everest");

},
//start/end screen
startScreen: function(){
    let startBar = $("<div>");
    startBar.attr("id","titleBar");
    startBar.html("<h3>Travel Trivia:World Wonders</h3><br><h3>Wonder Where? destinations known or unknown - we'll find out!</h3>");

    let startButton = $("<button>");
    startButton.attr("id", "gameButton").text("Start Game");
    $("body").append(startBar).append(startButton);

},
endScreen: function(){
 
    let endBar = $("<div>");
    endBar.attr("id","titleBar");
    endBar.html("<h3>Travel Trivia:World Wonders</h3><br><h3>Thank you for playing! If you were Wondering, you accurately identified:</h3>");
    let displayResults = $("<div>");
    displayResults.html("<h3>"+triviaGame.correct+" Places correctly and "+ triviaGame.incorrect+" Places incorrectly"+"</h3>")
   
    redoButton = $("<button>");
    redoButton.attr("id", "redoButton").text("Try Again?");

    $("body").append(endBar).append(displayResults).append(redoButton);
},
//game reset
gameReset: function(){

},

// setup multiple choice or true false
displayQuestion: function(n){
    console.log(n);
    let questionBox = $("<div>");
    questionBox.attr("id","questionBox");
    $("body").append(questionBox);

    let question = $("<h1>")
    question.attr("id","question");
    // works:: console.log(triviaGame.Questions[0].question);
    question.text(triviaGame.Questions[n].question);
    questionBox.append(question);

    //html for answer choices
    let options = $("<div>");
    options.attr("id","options");
    let b1 = $("<button>");
    b1.attr("id", "buttonOne").attr("value",triviaGame.Questions[n].choiceOne);
    b1.text(triviaGame.Questions[n].choiceOne);
    let b2 = $("<button>");
    b2.attr("id", "buttonTwo").attr("value",triviaGame.Questions[0].choiceTwo);
    b2.text(triviaGame.Questions[n].choiceTwo);
    let b3 = $("<button>");
    b3.attr("id", "buttonThree").attr("value",triviaGame.Questions[0].choiceThree);
    b3.text(triviaGame.Questions[n].choiceThree);
    let b4 = $("<button>");
    b4.attr("id", "buttonFour").attr("value",triviaGame.Questions[0].choiceFour);
    b4.text(triviaGame.Questions[n].choiceFour);
    
    
questionBox.append(options);
options.append(b1,b2,b3,b4);
 

},

//timer
timer: {
 
    time:20,
    display: function(){
    let timerDisplay = $("<div>");
        let timeRemaining = $("<h2>");
        timeRemaining.attr("id","timeRemaining")
        timeRemaining.text("Time Remaining: 00:"+triviaGame.timer.time);
        $("#question").append(timerDisplay);
        timerDisplay.append(timeRemaining);
    },

    start: function() {
        triviaGame.timer.time = 20;
        //  TODO: Use setInterval to start the count here and set the clock to running.
            triviaGame.clockRunning=true;   
            intervalId = setInterval(this.count,1000);
    
    },

    count: function() {

        //  TODO: increment time by 1, remember we cant use "this" here.
        triviaGame.timer.time--;
      
        //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
        //        and save the result in a variable.
        let current= triviaGame.timer.timeConverter(triviaGame.timer.time);

        //  TODO: Use the variable you just created to show the converted time in the "display" div.
        
        $("#timeRemaining").text("Time Remaining: "+current);
        //stops timer at 0
        if(triviaGame.timer.time === 0){
            triviaGame.clockRunning=false;
            clearInterval(intervalId)
            $("#timeCurrent").text("Time Remaining: 00.00");
            triviaGame.incorrect++
            $("button[value='"+triviaGame.Questions[0].answer+"']").addClass("correct");
            $("#question").append("<a href="+triviaGame.Questions[0].link+" target='_blank'><h2>Not quite. To learn more about "+triviaGame.Questions[0].answer+" click here.</h2></a>");
            // $("body").slideUp();
            // $("body").empty();
            triviaGame.timer.time = 20;
            
            
        }
    },

    timeConverter: function(t) {
        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);
        if (seconds < 10) {
        seconds = "0" + seconds;
        }
        if (minutes === 0) {
        minutes = "00";
        }
        else if (minutes < 10) {
        minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    },

},
//loop question with timer


//game ends when time runs out
//reveal right and wrong
//counter for right and wrong
//limit choices to one answer
takeQuiz: function(){
    i=0;
        this.displayQuestion(i);
        triviaGame.timer.display();
    triviaGame.timer.start();

    $("button").on("mouseenter",function(){
        $(this).fadeTo("fast",0.5);
 
    });
    $("button").on("mouseleave",function(){
        $(this).fadeTo("fast",1.0);
 
    });
    $("button").on("click", function(){
        let choice =  $(this).val();
        if (choice === triviaGame.Questions[0].answer){
            $("button[value='"+triviaGame.Questions[0].answer+"']").addClass("correct");
        } else {
            console.log("Wrong!")
           $("button[value='"+triviaGame.Questions[0].answer+"']").addClass("correct");
           $("button[value='"+choice+"']").addClass("wrong");
            console.log(triviaGame.Questions[0].link)
           $("#question").append("<a href="+triviaGame.Questions[0].link+" target='_blank'><h2>Not quite. To learn more about "+triviaGame.Questions[0].answer+" click here.</h2></a>");

        }
    });
}

//countdown timer


//end of trivia game object
}
//execute trivia game
triviaGame.buildQuestions();
triviaGame.takeQuiz();





}