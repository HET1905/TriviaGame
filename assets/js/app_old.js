var quesArray = [
    "Who is President of U.S.?", "What is your name?",
]
var ansArray= [
    ['A', 'B', 'C', 'D'],
    ['x', 'y', 'z', 'w']
]
var quesNumber = 0;

// console.log(quesAnsObj.ans1);
$(document).ready(function () {
    var timerFlag = false;
    var time = 0;
    var timerText = $("<span>");
    var timingLabel = $("<h2>");
    var quesLable = $("<p>");
    var ansUl = $("<ul>");
    // var ansLi = $("<li>");

    function counter() {
        if (!timerFlag) {
            var intervalId = setInterval(function () {
                time++;
                timerText.text(time + " Seconds");
                checkTimer();
            }, 1000);
            timerFlag = true;
        }
        return time;
    }

    function checkTimer() {
        if (time === 10) {
            // alert("time over");
            time = 0;
            quesNumber++;
            printQuestion(quesNumber);
        }
    }

    function printQuestion(quesNumber) {
        // $.each(quesAnsObj,function(i,val){
        //     quesLable.append(  val + "<br>");

        // });
        // for (var i = 0; i < quesArray.length; i++) {
            quesLable.append("<li>" + quesArray[quesNumber] + "</li>");

            for(var j = 0;j<ansArray[quesNumber].length;j++){
                ansUl.append("<li>" + ansArray[j] + "</li>");
            }
            
        // }
        // while(var i <quesArray.len)
    }

    function createDynamicElements() {

        // quesNumber++;
        timingLabel.text("Timming Remaining : ");
        counter();
        printQuestion(quesNumber);
        // quesLable.append("<li>"+ quesAnsObj.ques1);
        $("#dynamicDiv").append(timingLabel, timerText, quesLable,ansUl);
    }


    $("#btnStart").click(function () {
        // alert("hello");
        $("#btnDiv").hide();
        createDynamicElements();

    });

});