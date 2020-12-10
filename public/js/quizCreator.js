var socket = io();
var questionNum = 1; //Starts at two because question 1 is already present

function updateDatabase(){
    var questions = [];
    var name = document.getElementById('name').value;
    var id_user = document.getElementById('id_user').value;
    for(var i = 1; i <= questionNum; i++){
        var question = document.getElementById('q' + i).value;
        var answer1 = document.getElementById(i + 'a1').value;
        var answer2 = document.getElementById(i + 'a2').value;
        var answer3 = document.getElementById(i + 'a3').value;
        var answer4 = document.getElementById(i + 'a4').value;
        var correct = document.getElementById('correct' + i).value;
        // ++
        var time = document.getElementById('time' + i).value;
        var poin = document.getElementById('poin' + i).value;
        // var image = document.getElementById('image' + i).value = 1;

        var answers = [answer1, answer2, answer3, answer4];
        questions.push({"question": question, "answers": answers, "correct": correct, "time":time, "poin":poin})
    }
    
    var quiz = {id: 0, "name": name, "id_user":id_user, "questions": questions};
    socket.emit('newQuiz', quiz);
}


function auto(){
    var correctauto = document.getElementById("correctauto").value;
    var timeauto = document.getElementById("timeauto").value;
    var poinauto = document.getElementById("poinauto").value;
    for(var i=1;i<=questionNum;i++){
        if(correctauto!=""){
        document.getElementById('correct' + String(i)).value= correctauto;
        }
        if(timeauto!=""){
        document.getElementById('time' + String(i)).value = timeauto;
        }
        if(poinauto!=""){
        document.getElementById('poin' + String(i)).value = poinauto;
        }
    }
}

function addQuestion(){
    questionNum += 1;
    
    var questionsUl = document.getElementById('allQuestions');
    
    var newQuestionUl = document.createElement("ul");
    var newQuestionLi = document.createElement("li");
    
    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');
    
    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');
    
    var answer2Label = document.createElement('label');
    var answer2Field = document.createElement('input');
    
    var answer3Label = document.createElement('label');
    var answer3Field = document.createElement('input');
    
    var answer4Label = document.createElement('label');
    var answer4Field = document.createElement('input');
    
    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');

    var poinLabel = document.createElement('label');
    var poinField = document.createElement('input');

    var timeLabel = document.createElement('label');
    var timeField = document.createElement('input');

    var imageLabel = document.createElement('label');
    var imageField = document.createElement('input');

    questionLabel.innerHTML = "Quiz " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');
    correctLabel.innerHTML = "Correct Answer(1-4):";
    poinLabel.innerHTML = "Poin:";
    timeLabel.innerHTML = "Time:";
    imageLabel.innerHTML = "Image: ";
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    answer1Field.setAttribute('class', 'Answer1');
    answer1Field.setAttribute('placeholder', 'Answer 1:');
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('type', 'text');
    answer2Field.setAttribute('class', 'Answer2')
    answer2Field.setAttribute('placeholder', 'Answer 2:');
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer3Field.setAttribute('type', 'text');
    answer3Field.setAttribute('class', 'Answer3')
    answer3Field.setAttribute('placeholder', 'Answer 3:');
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    answer4Field.setAttribute('type', 'text');
    answer4Field.setAttribute('class', 'Answer4')
    answer4Field.setAttribute('placeholder', 'Answer 4:');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('type', 'number');
    timeField.setAttribute('id', 'time' + String(questionNum));
    timeField.setAttribute('type', 'number');
    poinField.setAttribute('id', 'poin' + String(questionNum));
    poinField.setAttribute('type', 'number');
    imageField.setAttribute('id', 'image' + String(questionNum));
    imageField.setAttribute('type', 'file');
    
    newQuestionLi.setAttribute('id', 'question-field');//Sets class of div
    
    newQuestionLi.appendChild(questionLabel);
    newQuestionLi.appendChild(questionField);
    newQuestionLi.appendChild(answer1Label);
    newQuestionLi.appendChild(answer1Field);
    newQuestionLi.appendChild(answer2Label);
    newQuestionLi.appendChild(answer2Field);
    newQuestionLi.appendChild(answer3Label);
    newQuestionLi.appendChild(answer3Field);
    newQuestionLi.appendChild(answer4Label);
    newQuestionLi.appendChild(answer4Field);
    newQuestionLi.appendChild(correctLabel);
    newQuestionLi.appendChild(correctField);
    newQuestionLi.appendChild(timeLabel);
    newQuestionLi.appendChild(timeField);
    newQuestionLi.appendChild(poinLabel);
    newQuestionLi.appendChild(poinField);
    newQuestionLi.appendChild(imageLabel);
    newQuestionLi.appendChild(imageField);
    
    questionsUl.appendChild(newQuestionLi);//Adds the question div to the screen
}


//Called when user wants to exit quiz creator
function cancelQuiz(){
    if (confirm("Are you sure you want to exit? All will be DELETE!")) {
        window.location.href = "/create";
    }
}

socket.on('startGameFromCreator', function(data){
    window.location.href = "/create";
});
