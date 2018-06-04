$(document).ready(function(){

//setup trivia object
let triviaGame={

    Questions:[],
    correct: 0,
    incorrect: 0,


    //  Variable that will hold our setInterval that runs the stopwatch
    intervalId: 0,
    time:0,
    question: 0,
    // prevents the clock from being sped up unnecessarily
    clockRunning: false,

//build questions

buildQuestions: function (){
//constructor ala eloquent javascript chapter 4
let newQuestion = function(question,answer,choiceOne,choiceTwo,choiceThree,choiceFour,image,link){
    triviaGame.Questions.push({question,answer,choiceOne,choiceTwo,choiceThree,choiceFour,image,link});

};
newQuestion("Magnetism or Fairie Lights? This natural wonder can be seen from where:","Tromso, Norway","Prime Meridian", "Tromso, Norway","Equator","Syndey, Australia","https://i.pinimg.com/1200x/74/8d/65/748d65261fea6a63badbcb60c1e69717.jpg","https://en.wikipedia.org/wiki/Aurora");
newQuestion("It's the tippy top of tall:","Mt Everest","Mt Kilamonjaro", "Mt Ranier","Mt Fuji","Mt Everest","https://cdn.britannica.com/700x450/17/83817-004-C5DB59F8.jpg","https://www.britannica.com/place/Mount-Everest");
newQuestion("The largest of it's kind in the world and provides material essential to human life","Salar de Uyuni","Salinas Grandes","Salar de Uyuni","Bonneville","Chott el Djerid","https://www.tripzilla.com/wp-content/uploads/2014/05/Salar-de-Uyuni-Picture-1024x576.jpg","https://en.wikipedia.org/wiki/Salar_de_Uyuni");
newQuestion("Know affectionately as 'The Door to Hell' - it can be visited in this country:","Turkmenistan","New Zealand","Turkmenistan","Italy","DR Congo","https://cdn.newsapi.com.au/image/v1/1b46c3b0f23bbc0ff721dd7891dffad1","https://en.wikipedia.org/wiki/Darvaza_gas_crater")
newQuestion("Yes this is a place on Earth, and those are people for scale","Naica Mine, Mexico","Cayman Crystal Caves, Cayman Islands","Crystal Ice Caves, Iceland","Lechuguilla Cave, Carlsbad, USA","Naica Mine, Mexico","https://i.ytimg.com/vi/z7BzHG9RgD8/maxresdefault.jpg","https://en.wikipedia.org/wiki/Naica_Mine")
newQuestion("Two billion years of geologic history are on full display here!","Grand Canyon","Tsangpo Canyon","Cotahuasi Canyon","Kali Gandaki Gorge","Grand Canyon","https://www.canyontours.com/wp-content/uploads/2013/09/West-Rim-768x512.jpg","https://www.nps.gov/grca/index.htm")
newQuestion("It's considered the largest waterfall in the world:","Victoria Falls","Niagara Falls","Victoria Falls","Kaieteur Falls","Iguazu Falls","https://victoriafallstourism.org/wp-content/uploads/2018/01/victoria_falls.jpg","https://victoriafallstourism.org/")
},


startScreen: function(){
    let startBar = $("<div>");
    startBar.attr("id","titleBar");
    startBar.html("<h3>Travel Trivia:World Wonders</h3><br><h3>Wonder Where? destinations known or unknown - we'll find out!</h3>");

    let startButton = $("<button>");
    startButton.attr("id", "gameButton").text("Start Game");
    $("body").append(startBar).append(startButton);
    $("#gameButton").on("click", function(){
        $("#titleBar").slideUp("slow");
        $("#titleBar").remove();
        $("#gameButton").remove();
        triviaGame.buildQuestions();
        triviaGame.takeQuiz();
    });
},

endScreen: function(){
    let endBar = $("<div>");
    endBar.attr("id","titleBar");
    endBar.html("<h3>Travel Trivia:World Wonders</h3><br><h3>Thank you for playing! If you were Wondering, you accurately identified:</h3>");
    $("body").append(endBar)
    
    let displayResults = $("<div>");
    displayResults.html("<h3>"+triviaGame.correct+" Places correctly and "+ triviaGame.incorrect+" Places incorrectly"+"</h3>")
    endBar.append(displayResults);

    redoButton = $("<button>");
    redoButton.attr("id", "redoButton").text("Try Again?");
    displayResults.append(redoButton);

    $("#redoButton").on("click", function(){
        $("#titleBar").slideUp("slow");
        $("#titleBar").remove();
        
      
        triviaGame.correct= 0,
        triviaGame.incorrect= 0,
        triviaGame.time=0,
        triviaGame.question= 0,
        
        triviaGame.takeQuiz();
    });
},
//game reset
gameReset: function(){
    triviaGame.time = 10;
    triviaGame.question+=1;
    $("#questionBox").slideUp("slow");
    $("#questionBox").remove();
  
    triviaGame.takeQuiz();
},

// setup multiple choice or true false
displayQuestion: function(n){

    let questionBox = $("<div>");
    questionBox.attr("id","questionBox");
    questionBox.html("<img src='"+triviaGame.Questions[n].image+"' alt='"+triviaGame.Questions[n].answer+"'>");
    $("body").append(questionBox);

    let question = $("<h1>")
    question.attr("id","question");
    // works:: console.log(triviaGame.Questions[0].question);
    question.text(triviaGame.Questions[n].question);
    questionBox.append(question);

    //display area for timer
    let timerDisplay = $("<div>");
    let timeRemaining = $("<h2>");
    timeRemaining.attr("id","timeRemaining")
    timeRemaining.text("Time Remaining: 00:"+triviaGame.time);
    $("#question").append(timerDisplay);
    timerDisplay.append(timeRemaining);

    //html for answer choices
    let options = $("<div>");
    options.attr("id","options");
    let b1 = $("<button>");
    b1.attr("id", "buttonOne").attr("value",triviaGame.Questions[n].choiceOne);
    b1.text(triviaGame.Questions[n].choiceOne);
    let b2 = $("<button>");
    b2.attr("id", "buttonTwo").attr("value",triviaGame.Questions[n].choiceTwo);
    b2.text(triviaGame.Questions[n].choiceTwo);
    let b3 = $("<button>");
    b3.attr("id", "buttonThree").attr("value",triviaGame.Questions[n].choiceThree);
    b3.text(triviaGame.Questions[n].choiceThree);
    let b4 = $("<button>");
    b4.attr("id", "buttonFour").attr("value",triviaGame.Questions[n].choiceFour);
    b4.text(triviaGame.Questions[n].choiceFour);
    
    questionBox.append(options);
    options.append(b1,b2,b3,b4);

},

takeQuiz: function(){
 console.log(triviaGame.Questions.length);
   if(triviaGame.question<triviaGame.Questions.length){
        triviaGame.time = 10;
        triviaGame.displayQuestion(triviaGame.question);
            
        console.log(triviaGame.question);  
        intervalId = setInterval(countDown,1000);
        function countDown(){
         
            let current= timeConverter(triviaGame.time);
            
            $("#timeRemaining").text("Time Remaining: "+current);
            if(triviaGame.time === 0){
                clearInterval(intervalId);
                $("#timeCurrent").text("Time Remaining: 00.00");
                triviaGame.incorrect++
                console.log(triviaGame.Questions[triviaGame.question].answer);
                $("button[value='"+triviaGame.Questions[triviaGame.question].answer+"']").addClass("correct");
                $("#question").append("<a href="+triviaGame.Questions[triviaGame.question].link+" target='_blank'><h2>Not quite. To learn more about "+triviaGame.Questions[triviaGame.question].answer+" click here.</h2></a>");
                triviaGame.question+=1;
                window.setTimeout(triviaGame.gameReset,4000);
            }
            triviaGame.time--;
            
        };
        
                    //hover for answer choices
                $("button").on("mouseenter",function(){
                    $(this).fadeTo("fast",0.5);
                });
                $("button").on("mouseleave",function(){
                    $(this).fadeTo("fast",1.0);
                    //when an anwer is picked
                });

                $("button").on("click", function(){
                    let choice =  $(this).attr("value");
                    clearInterval(intervalId);
                    console.log(triviaGame.question);  
                    console.log(choice);
                    
                    $("button").prop('disabled',true);

                    if (choice === triviaGame.Questions[triviaGame.question].answer){
                        
                        $("button[value='"+triviaGame.Questions[triviaGame.question].answer+"']").addClass("correct");
                        $("#question").append("Correct!");
                        triviaGame.correct++
            
                    } else {
                        console.log("Wrong!")
                        $("button[value='"+triviaGame.Questions[triviaGame.question].answer+"']").addClass("correct");
                        $("button[value='"+choice+"']").addClass("wrong");
                            console.log(triviaGame.Questions[triviaGame.question].answer)
                        $("#question").append("<a href="+triviaGame.Questions[triviaGame.question].link+" target='_blank'><h2>Not quite. To learn more about "+triviaGame.Questions[triviaGame.question].answer+" click here.</h2></a>");
                        triviaGame.incorrect++   
                    }   
                    
                    window.setTimeout(triviaGame.gameReset,4000);
                });
        
    } else {
        clearInterval(intervalId);
        $("#questionBox").slideUp("slow");
        $("#questionBox").remove();
        triviaGame.endScreen();
        
    };

    function timeConverter(t) {
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
    };
},

//countdown timer


//end of trivia game object
}
//execute trivia game
triviaGame;
triviaGame.startScreen();





});