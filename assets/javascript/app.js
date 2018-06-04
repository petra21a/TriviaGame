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
newQuestion("Magnetism or Fairie Lights? This natural wonder can be seen from where:","Tromso, Norway","Prime Meridian", "Tromso, Norway","Equator","Syndey, Australia","http://yourbusrovaniemi.com/wp-content/uploads/2016/07/Troms%C3%B8-n.l..jpg","https://en.wikipedia.org/wiki/Aurora");
newQuestion("It's the tippy top of tall:","Mt Everest","Mt Kilamonjaro", "Mt Ranier","Mt Fuji","Mt Everest","https://cdn.britannica.com/700x450/17/83817-004-C5DB59F8.jpg","https://www.britannica.com/place/Mount-Everest");
newQuestion("The largest of it's kind in the world and provides material essential to human life","Salar de Uyuni","Salinas Grandes","Salar de Uyuni","Bonneville","Chott el Djerid","https://www.tripzilla.com/wp-content/uploads/2014/05/Salar-de-Uyuni-Picture-1024x576.jpg","https://en.wikipedia.org/wiki/Salar_de_Uyuni");
newQuestion("Know affectionately as 'The Door to Hell' - it can be visited in this country:","Turkmenistan","New Zealand","Turkmenistan","Italy","DR Congo","https://cdn.newsapi.com.au/image/v1/1b46c3b0f23bbc0ff721dd7891dffad1","https://en.wikipedia.org/wiki/Darvaza_gas_crater")
newQuestion("Yes this is a place on Earth, and those are people for scale","Naica Mine, Mexico","Cayman Crystal Caves, Cayman Islands","Crystal Ice Caves, Iceland","Lechuguilla Cave, Carlsbad, USA","Naica Mine, Mexico","https://i.ytimg.com/vi/z7BzHG9RgD8/maxresdefault.jpg","https://en.wikipedia.org/wiki/Naica_Mine")
newQuestion("Two billion years of geologic history are on full display here!","Grand Canyon","Tsangpo Canyon","Cotahuasi Canyon","Kali Gandaki Gorge","Grand Canyon","https://www.canyontours.com/wp-content/uploads/2013/09/West-Rim-768x512.jpg","https://www.nps.gov/grca/index.htm")
newQuestion("It's considered the largest waterfall in the world:","Victoria Falls","Niagara Falls","Victoria Falls","Kaieteur Falls","Iguazu Falls","https://victoriafallstourism.org/wp-content/uploads/2018/01/victoria_falls.jpg","https://victoriafallstourism.org/")
},


startScreen: function(){
    let startBar = $("<div>");
    startBar.attr("id","titleBar").addClass("container card")
    startBar.html("<h3 class='display-4 display-md-2 text-center text-info font-weight-bold bg-muted'>Travel Trivia: World Wonders</h3>");
    $("body").append(startBar)

    let startImg = $("<img>")
    startImg.attr("src","https://www.nasa.gov/centers/goddard/images/content/638831main_globe_east_2048.jpg").attr("alt","planet earth");
    startImg.addClass("card-img");
    startBar.append(startImg).append("<h3 class='display-md-4 text-center text-white font-italic bg-info'>Wonder Where? destinations known or unknown - we'll find out!</h3>");
  
    let startOverlay = $("<div>");
    startOverlay.addClass("card-img-overlay h-100 d-flex flex-column justify-content-center");
    let startButton = $("<button>");
    startButton.attr("id", "gameButton").text("Start Game");
    startButton.addClass("btn-info display-4 display-md-1 p-2")
    startOverlay.append(startButton);
    startBar.append(startOverlay);
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
    endBar.attr("id","titleBar").addClass("container card");
    endBar.html("<h3 class='display-4 display-md-2 text-center text-info font-weight-bold bg-muted'>Travel Trivia:World Wonders</h3>");
    $("body").append(endBar);

    let endImg = $("<img>");
    endImg.attr("src","https://www.nasa.gov/centers/goddard/images/content/638831main_globe_east_2048.jpg").attr("alt","planet earth");
    endImg.addClass("card-img"); 
    endBar.append(endImg)
  
    let endOverlay = $("<div>");
    endOverlay.addClass("card-img-overlay h-100 d-flex flex-column justify-content-center");
    endBar.append(endOverlay);
    let redoButton = $("<button>");
    redoButton.attr("id", "redoButton").text("Try Again?");
    redoButton.addClass("btn-info display-4 display-md-1 p-2");
    endOverlay.append(redoButton);
    

    let displayResults = $("<div>");
    displayResults.text("<h3 class='display-md-4 text-center text-white font-italic bg-info'>Thank you for playing! If you were Wondering, you accurately identified:</h3>");
    displayResults.html("<h3 class='display-md-4 text-center text-white font-italic bg-info'>Thank you for playing! If you were Wondering, you accurately identified:<br>"+triviaGame.correct+" Places correctly and "+ triviaGame.incorrect+" Places incorrectly"+"</h3>")
    endOverlay.append(displayResults);


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
    questionBox.attr("id","questionBox").addClass("container card");
    
    questionBox.html("<img class='card-img' src='"+triviaGame.Questions[n].image+"' alt='"+triviaGame.Questions[n].answer+"'>");
    $("body").append(questionBox);

    // works:: console.log(triviaGame.Questions[0].question);
    let question = $("<h1>")
    question.attr("id","question");
    question.text(triviaGame.Questions[n].question);
    question.addClass("card-title display-md-4 justify-content-middle text-center text-info font-weight-bold font-italic bg-white m-2 p-2")
    questionBox.append(question);

    let questionOverlay = $("<div>");
    questionOverlay.addClass("card-img-overlay");
    questionBox.append(questionOverlay);
    //display area for timer
    let timerDisplay = $("<div>");
    timerDisplay.addClass(" justify-content-middle text-center text-white bg-info p-md-2 p-0")
    let timeRemaining = $("<div>");
    timeRemaining.attr("id","timeRemaining")
    timeRemaining.addClass("h-md-1 h-6 font-weight-bold");
    timeRemaining.text("Time Remaining: 00:"+triviaGame.time);
    $("#question").append(timerDisplay);
    timerDisplay.append(timeRemaining);
    questionOverlay.append(timerDisplay);
    




    //html for answer choices
    let options = $("<div>");
    options.attr("id","options").addClass("row btn-group justify-content-center bg-info");
    let b1 = $("<button>");
    b1.attr("id", "buttonOne").attr("value",triviaGame.Questions[n].choiceOne);
    b1.addClass("btn btn-light col-md-5 col-12 display-md-3 display-lg-1 font-weight-bold text-info text-center m-1");
    b1.text(triviaGame.Questions[n].choiceOne);
    let b2 = $("<button>");
    b2.attr("id", "buttonTwo").attr("value",triviaGame.Questions[n].choiceTwo);
    b2.addClass("btn btn-light col-md-5 col-12 display-md-3 display-lg-1 font-weight-bold  text-info text-center m-1");
    b2.text(triviaGame.Questions[n].choiceTwo);
    let b3 = $("<button>");
    b3.attr("id", "buttonThree").attr("value",triviaGame.Questions[n].choiceThree);
    b3.addClass("btn btn-light col-md-5 col-12 display-md-3 display-lg-1 font-weight-bold  text-info text-center m-1");
    b3.text(triviaGame.Questions[n].choiceThree);
    let b4 = $("<button>");
    b4.attr("id", "buttonFour").attr("value",triviaGame.Questions[n].choiceFour);
    b4.addClass("btn btn-light col-md-5 col-12 display-md-3 display-lg-1 font-weight-bold  text-info text-center m-1");
    b4.text(triviaGame.Questions[n].choiceFour);
    
    questionBox.append(options);
    options.append(b1,b2,b3,b4);

},

takeQuiz: function(){
   if(triviaGame.question<triviaGame.Questions.length){
        triviaGame.time = 10;

        triviaGame.displayQuestion(triviaGame.question);
        intervalId = setInterval(countDown,1000);
        function countDown(){
         
            let current= timeConverter(triviaGame.time);
            
            $("#timeRemaining").text("Time Remaining: "+current);
            if(triviaGame.time === 0){
                clearInterval(intervalId);
                triviaGame.incorrect+=1; 
                console.log(triviaGame.incorrect);
                $("#timeCurrent").text("Time Remaining: 00.00");
                
                
                $("button[value='"+triviaGame.Questions[triviaGame.question].answer+"']").attr("id","correct");
                $("#options").append("<br><a class='display-4 text-center text-danger m-1 bg-white' href="+triviaGame.Questions[triviaGame.question].link+" target='_blank'><h2>Time's Up! To learn more about "+triviaGame.Questions[triviaGame.question].answer+" click here.</h2></a>");
        
                window.setTimeout(triviaGame.gameReset,4000);
            }
            triviaGame.time--;
            
        };
        
                    //hover for answer choices
                $("button").on("mouseenter",function(){
                    $(this).fadeTo("fast",0.2);
                });
                $("button").on("mouseleave",function(){
                    $(this).fadeTo("fast",1.0);
                    //when an anwer is picked
                });

                $("button").on("click",function(){
                    let choice =  $(this).attr("value");
                    console.log(choice);
                    clearInterval(intervalId);
                

                    $("button").prop('disabled',true);

                    if (choice === triviaGame.Questions[triviaGame.question].answer){
                        
                        $("button[value='"+triviaGame.Questions[triviaGame.question].answer+"']").attr("id","correct");
                        let resultNote = $("<div>");
                        resultNote.addClass("row display-4 text-center text-success m-1 bg-white");
                        resultNote.text("Correct!");
                       $("#questionBox").append(resultNote);
                        triviaGame.correct++
            
                    } else {
                     
                        $("button[value='"+triviaGame.Questions[triviaGame.question].answer+"']").attr("id","correct");
                        $("button[value='"+choice+"']").attr("id","wrong");
                        $("#options").append("<br><a class='display-4 text-center text-danger m-1 bg-white' href="+triviaGame.Questions[triviaGame.question].link+" target='_blank'><h2>Not Quite. To learn more about "+triviaGame.Questions[triviaGame.question].answer+" click here.</h2></a>");
                        
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