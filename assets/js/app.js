var num = 0;
var correctAns;
var numCorrectAns = 0;
var numWrongAns = 0;
var numUnattended = 0;
var quseAnsObj = {
    "ques1": {
        "q": " What’s the total number of dots on a pair of dice?",
        "a": ["42", "32", "22", "30"],
        "src": "assets/images/dice.jpg"
    },
    "ques2": {
        "q": "What is the capital city of Peru?",
        "a": ["Swiden", "Sydney", "Barzil", "Lima"],
        "src": "assets/images/peru.jpg"
    },
    "ques3": {
        "q": "Which fictional city is the home of Batman?",
        "a": ["Duckberg", "Gotham City", "Metropolis", "Central City"],
        "src": "assets/images/gotham.jpeg"
    },
    "ques4": {
        "q": "Spinach is high in which mineral?",
        "a": ["Calcium", "Potassium", "Iron", "Zinc"],
        "src": "assets/images/spinach.jpg"
    },
    "ques5": {
        "q": "Which crime-fighting cartoon dog has the initals “S.D.” on his collar?",
        "a": ["Goofy", "Scooby Doo", "Pluto", "Underdog"],
        "src": "assets/images/Scoobydoo.jpg"
    }

}
var rightAnsObj = {
    "ques1": "42",
    "ques2": "Lima",
    "ques3": "Gotham City",
    "ques4": "Iron",
    "ques5": "Scooby Doo"

}


$(document).ready(function () {
    var timerFlag = false;
    var time = 11;
    var timerText = $("<span>");
    var timingLabel = $("<h2>");
    // var img = "<img>"
    var intervalId;

    function createDynamicElements() {
        // alert("inside create")
        num++;
        if (num < 6) {
            timingLabel.append("Timming Remaining : ");
            counter();
            $("#dynamicDiv").append(timingLabel, timerText);
            printQuestion(num);
            $("#ulDynamic").trigger("click");
        } else {
            // alert("Game Over");
            $("#dynamicDiv").empty();
            // $("#dynamicDiv").append(timingLabel,timerText);
            $("#dynamicDiv").append("<h2>All done, heres hows you did!");
            $("#dynamicDiv").append("<ul id=ulDynamic><li class=listDynamic> Correc Answers : " + numCorrectAns + "</li>");
            $("#dynamicDiv").append("<li class=listDynamic> Incorrect Answers : " + numWrongAns + "</li>");
            $("#dynamicDiv").append("<li class=listDynamic> Unanswered : " + numUnattended + "</li></ul>");
            $("#dynamicDiv").append("<button id=btnRestart>Start Over Again</button>");
        }
    }

    $("#dynamicDiv").on("click", "#btnRestart", function () {
        alert("From restart");
        var num = 0;
        var numCorrectAns = 0;
        var numWrongAns = 0;
        var numUnattended = 0;
        $("#dynamicDiv").empty();
        createDynamicElements();

    });

    function counter() {
        if (!timerFlag) {
            intervalId = setInterval(function () {
                time--;
                timerText.text(time + " Seconds");
                checkTimer();
            }, 1000);
            timerFlag = true;
        }
        return time;
    }

    function checkTimer() {
        if (time === 0 || correctAns == "") {
            correctAnswerDiv(num);
            time = 11;
        }
    }


    function printQuestion(num) {
        if (num == 1) {
            $("#dynamicDiv").append("<h3 id=quesHeadingId>" + quseAnsObj.ques1.q + "</h3> ")
            printAnswer(num)
        }
        if (num == 2) {
            $("#dynamicDiv").append("<h3 id=quesHeadingId>" + quseAnsObj.ques2.q + "</h3> ")
            printAnswer(num);
        }
        if (num == 3) {
            $("#dynamicDiv").append("<h3 id=quesHeadingId>" + quseAnsObj.ques3.q + "</h3> ")
            printAnswer(num);
        }
        if (num == 4) {
            $("#dynamicDiv").append("<h3 id=quesHeadingId>" + quseAnsObj.ques4.q + "</h3> ")
            printAnswer(num);
        }
        if (num == 5) {
            $("#dynamicDiv").append("<h3 id=quesHeadingId>" + quseAnsObj.ques5.q + "</h3> ")
            printAnswer(num);
        }

    }


    function printAnswer(qNo) {
        $("#dynamicDiv").append("<ul id='ulDynamic' class='ulDynamic'></ul>");
        var ques = "ques" + qNo;

        for (var i = 0; i < 4; i++) {
            var liValue = quseAnsObj[ques].a[i];
            var liId = "ansLiId" + i;
            var li = $("<li />", {
                'id': liId,
                'class': 'listDynamic'
            }).html(liValue).click(function () {
                correctAns = $(this).text();
                checkAnswer(qNo)
            });

            $("#ulDynamic").append(li);

        }
    }

    function checkAnswer(num) {
        var quesNo = "ques" + num;
        if (correctAns === rightAnsObj[quesNo]) {
            // alert("Right Answer !!!");
            numCorrectAns++;
            $("#quesHeadingId").remove();
            $("#ulDynamic").remove();

            $("#dynamicDiv").append("<h2 id=nope >Correct !!! </h2>");
            $("#dynamicDiv").append("<p id=correctAnswerP> Answer is : " + rightAnsObj[quesNo] + "</p>");
            // $(img).attr('src',quseAnsObj[quesNo].src);
            $("#dynamicDiv").append("<img src=" + quseAnsObj[quesNo].src + " id=ansImg />");
            emptyDynamicDivId = setTimeout(function () {
                $("#nope").remove();
                $("#correctAnswerP").remove();
                $("#ansImg").remove();
            }, 2000);
            var setTimeOut1 = setTimeout(createDynamicElements, 2000);

            clearInterval(intervalId);
            timerFlag = false
            time = 11;
            timingLabel.text("");
            timerText.text("");
        } else {
            // alert("Wrong Answer");
            correctAnswerDiv(num);
            time = 11;

        }
    }

    function correctAnswerDiv(num) {
        var quesNo = "ques" + num;
        if (time === 0) {
            numUnattended++;
            $("#quesHeadingId").remove();
            $("#ulDynamic").remove();
            $("#dynamicDiv").append("<h2 id=nope >Running Out of time ! </h2>");
            $("#dynamicDiv").append("<p id=correctAnswerP>The Correct answer was : " + rightAnsObj[quesNo] + "</p>");
            $("#dynamicDiv").append("<img src=" + quseAnsObj[quesNo].src + " id=ansImg />");

            timingLabel.text("");
            timerText.text("");
            clearInterval(intervalId);

            timerFlag = false;
            emptyDynamicDivId = setTimeout(function () {
                $("#nope").remove();
                $("#correctAnswerP").remove();
                $("#ansImg").remove();
            }, 2000);
            var setTimeOut1 = setTimeout(createDynamicElements, 3000);
        } else {
            numWrongAns++;
            $("#quesHeadingId").remove();
            $("#ulDynamic").remove();
            $("#dynamicDiv").append("<h2 id=nope >Nope ! </h2>");
            $("#dynamicDiv").append("<p id=correctAnswerP>The Correct answer was : " + rightAnsObj[quesNo] + "</p>");
            $("#dynamicDiv").append("<img src=" + quseAnsObj[quesNo].src + " id=ansImg />");
            timingLabel.text("");
            timerText.text("");
            clearInterval(intervalId);
            timerFlag = false;
            emptyDynamicDivId = setTimeout(function () {
                $("#nope").remove();
                $("#correctAnswerP").remove();
                $("#ansImg").remove();
            }, 2000);
            var setTimeOut1 = setTimeout(createDynamicElements, 2000);
        }

    }




    $("#btnStart").click(function () {
        $("#btnDiv").hide();
        createDynamicElements();

    });


});