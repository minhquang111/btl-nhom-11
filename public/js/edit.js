var socket = io();
var id_user = 99;
var name1="";
var idq1 = 12;
var x = window.location.href;
function chuyenid(x){
    var i;
    var k="";
    var j;
    for(i=0;i<x.length;i++){
        if(x[i]=='='){
            for(j=i+1;j<x.length;j++){
                if(x[j]=="&"){
                    break;
                }
                k += x[j];
            }
            break;
        }
    }
    return k;
}
function chuyenk(x){
    var i;
    var k="";
    var h = 0;
    var j;
    for(i=0;i<x.length;i++){
        if(x[i]=='='){
            h +=1;
        }
        if(h==2){
            for(j=i+1;j<x.length;j++){
                k += x[j];
            }
            break;
        }
    }
    return k;
}


// var params = jQuery.deparam(window.location.search); //Lấy id từ url
var params = chuyenid(x);


//Khi máy chủ kết nối với máy chủ
socket.on('connect', function() {
    
    //Nói với máy chủ rằng đó là kết nối máy chủ từ chế độ xem trò chơi
    socket.emit('edit-game', params);
});


socket.on('editQuestions', function(data){
    document.getElementById('name').innerHTML = data.name;
    name1 = data.name;
    id_user = data.userid1;
    idq1 = data.idq1;
    for(var i=0;i<data.size1;i++){
    questionNum = 1+i;
    document.getElementById('img').style.backgroundImage = 'url("../image/' + chuyenk(x) + '.png")';
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
    questionField.setAttribute('value', data.q1[0+i*10])
    correctLabel.innerHTML = "Correct Answer (1-4): ";
    poinLabel.innerHTML = "Poin: ";
    timeLabel.innerHTML = "Time: ";
    imageLabel.innerHTML = "Image: ";
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    answer1Field.setAttribute('class', 'Answer1');
    answer1Field.setAttribute('placeholder', 'Answer 1:');
    answer1Field.setAttribute('value', data.q1[1+i*10]);
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('type', 'text');
    answer2Field.setAttribute('class', 'Answer2')
    answer2Field.setAttribute('placeholder', 'Answer 2:');
    answer2Field.setAttribute('value', data.q1[2+i*10]);
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer3Field.setAttribute('type', 'text');
    answer3Field.setAttribute('class', 'Answer3')
    answer3Field.setAttribute('placeholder', 'Answer 3:');
    answer3Field.setAttribute('value', data.q1[3+i*10]);
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    answer4Field.setAttribute('type', 'text');
    answer4Field.setAttribute('class', 'Answer4')
    answer4Field.setAttribute('placeholder', 'Answer 4:');
    answer4Field.setAttribute('value', data.q1[4+i*10]);
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('type', 'number');
    correctField.setAttribute('value', data.q1[5+i*10]);
    timeField.setAttribute('id', 'time' + String(questionNum));
    timeField.setAttribute('type', 'number');
    timeField.setAttribute('value', data.q1[6+i*10]);
    poinField.setAttribute('id', 'poin' + String(questionNum));
    poinField.setAttribute('type', 'number');
    poinField.setAttribute('value', data.q1[7+i*10]);
    imageField.setAttribute('id', 'image' + String(questionNum));
    imageField.setAttribute('type', 'file');
    
    newQuestionLi.setAttribute('id', 'question-field');
    
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
    
    questionsUl.appendChild(newQuestionLi);
    }

    
});
function save(){
    var quiz = {id: parseInt(params)};
    socket.emit('deleteQuiz', quiz);
    updateDatabase();
    window.location.href="/create/";
}
function updateDatabase(){
    var questions = [];
    var name = document.getElementById('name').value;
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
    
    var quiz = {id: idq1 , "name": name1, "id_user":id_user, "questions": questions};
    socket.emit('newQuiz', quiz);
}
