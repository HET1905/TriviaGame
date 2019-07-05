var num=0;
var correctAns;
var quseAnsObj = {
    "ques1": {
        "q": " By what name was William F. Cody better known?",
        "a": ["Buffalo Bill", "Horn Bill", "Horn", "Buffalo King"]
    },
    "ques2": {
        "q": "What is the capital city of Peru?",
        "a": ["Swiden", "Sidney", "Barzil", "Lima"]
    }
}
var rightAnsObj = {
    "ques1": "Buffalo Bill",
    "ques2": "Lima"
}


$(document).ready(function () {
    var timerFlag = false;
    var time = 0;
    var timerText = $("<span>");
    var timingLabel = $("<h2>");
    var intervalId;

    function createDynamicElements() {
        num++;
        timingLabel.append("Timming Remaining : ");
        counter();

        $("#dynamicDiv").append(timingLabel, timerText);
        printQuestion(num);
        $("#ulDynamic").trigger("click");
    }

    function counter() {
        if (!timerFlag) {
             intervalId = setInterval(function () {
                time++;
                timerText.text(time + " Seconds");
                checkTimer();
            }, 1000);
            timerFlag = true;
        }
        return time;
    }

    function checkTimer() {
        if (time === 10 || correctAns == "") {
            // alert("time over");
            time = 0;
            // alert("I will give you right Answer");
            correctAnswerDiv(num);
            num++;
            // printQuestion(num);
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


    }


    function printAnswer(qNo) {
        $("#dynamicDiv").append("<ul id='ulDynamic' class='ulDynamic'></ul>");
        var ques = "ques" + num;

        for (var i = 0; i < 4; i++) {
            var liValue = quseAnsObj[ques].a[i];
            var liId = "ansLiId" + i;
            var li = $("<li />", {
                'id': liId,
                'class': 'listDynamic'
            }).html(liValue).click(function () {
                // alert($(this).text());
                correctAns = $(this).text();
                checkAnswer(qNo)
            });

            $("#ulDynamic").append(li);

        }

    }

    function correctAnswerDiv(num) {
        var quesNo = "ques" + num;
        $("#dynamicDiv").append("<h2 id=nope >Nope ! </h2>");
        $("#dynamicDiv").append("<p id=correctAnswerP>The Correct answer is : " + rightAnsObj[quesNo] + "</p>") ;
        $("#quesHeadingId").remove();
        $("#ulDynamic").remove();
        clearInterval(intervalId);
        timerFlag=false;
    }

    function checkAnswer(num) {
        var quesNo = "ques" + num;
        if (correctAns === rightAnsObj[quesNo]) {
            alert("Right Answer !!!");
            $("#quesHeadingId").remove();
            $("#ulDynamic").remove();
            clearInterval(intervalId);
            timerFlag=false
            time=0;
            createDynamicElements();
        } else {
            alert("Wrong Answer");
            correctAnswerDiv(num);
            emptyDynamicDivId = setTimeout(function(){
                $("#nope").remove();
                $("#correctAnswerP").remove();
            },1000)
            createDynamicDivIntId = setTimeout(createDynamicElements,1000);
            // createDynamicElements();
        }
    }


    // num = 1;
    // printQuestion(num)
    // $("#ulDynamic").trigger("click");

    $("#btnStart").click(function () {
        $("#btnDiv").hide();
        createDynamicElements();

    });


});