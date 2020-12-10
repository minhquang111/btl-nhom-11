var socket = io();

var params = jQuery.deparam(window.location.search); //Lấy id từ url
var timer;
var time_answer = 0;
var time = 20;
var tam_dung = 1;
var k = 0;
var concauhoi = 1;
var randomso = 0;

//Khi máy chủ kết nối với máy chủ
socket.on('connect', function() {
    
    //Nói với máy chủ rằng đó là kết nối máy chủ từ chế độ xem trò chơi
    socket.emit('host-join-game', params);
});

socket.on('noGameFound', function(){
   window.location.href = '../../';//Chuyển hướng người dùng đến trang 'tham gia trò chơi'
});
// ++
socket.on('gameQuestions', function(data){
    document.getElementById('question').innerHTML = data.q1;
        document.getElementById('answer1').innerHTML = data.a1;
        document.getElementById('answer2').innerHTML = data.a2;
        document.getElementById('answer3').innerHTML = data.a3;
        document.getElementById('answer4').innerHTML = data.a4;
    // document.getElementById('question').innerHTML = data.q1;
    // document.getElementById('answer1').innerHTML = data.a1;
    // document.getElementById('answer2').innerHTML = data.a2;
    // document.getElementById('answer3').innerHTML = data.a3;
    // document.getElementById('answer4').innerHTML = data.a4;
    document.getElementById('poinnum').innerHTML = data.poin;
    document.getElementById('num').innerHTML = data.time;
    var correctAnswer = data.correct;
    // ++
    var timeAnswer = data.time;
    var poinAnswer = data.poin;
    document.getElementById('playersAnswered').innerHTML = "0";
    k = data.size1;
    document.getElementById('socauhoi').innerHTML = " / " +4;
    document.getElementById('concauhoi').innerHTML = concauhoi;
    updateTimer(timeAnswer);
});

socket.on('updatePlayersAnswered', function(data){
   document.getElementById('playersAnswered').innerHTML = data.playersAnswered; 
});

socket.on('questionOver', function(playerData, correct){
    clearInterval(timer);
    var answer1 = 0;
    var answer2 = 0;
    var answer3 = 0;
    var answer4 = 0;
    var total = 0;
   
    // //Ẩn các phần tử trên trang
    document.getElementById('playersAnswered').style.display = "none";
    document.getElementById('timerText').style.display = "none";
    document.getElementById('poinText').style.display = "none";
    document.getElementById('tamdung').style.display = "none";
    document.getElementById('ketthuc').style.display = "none";
    document.getElementById('answered').style.display = "none";
    document.getElementById('than2').style.display = "none";
    document.getElementById('square').style.display = "block";
    document.getElementById('listGame').style.display = "none";

    //Hiển thị câu trả lời đúng của người dùng với các hiệu ứng trên các phần tử
    if(correct == 1){
        document.getElementById('answer2').style.filter = "grayscale(50%)";
        document.getElementById('answer3').style.filter = "grayscale(50%)";
        document.getElementById('answer4').style.filter = "grayscale(50%)";
        document.getElementById('dung1').style.display = "block";
    }else if(correct == 2){
        document.getElementById('answer1').style.filter = "grayscale(50%)";
        document.getElementById('answer3').style.filter = "grayscale(50%)";
        document.getElementById('answer4').style.filter = "grayscale(50%)";
        document.getElementById('dung2').style.display = "block";
    }else if(correct == 3){
        document.getElementById('answer1').style.filter = "grayscale(50%)";
        document.getElementById('answer2').style.filter = "grayscale(50%)";
        document.getElementById('answer4').style.filter = "grayscale(50%)";
        document.getElementById('dung3').style.display = "block";
    }else if(correct == 4){
        document.getElementById('answer1').style.filter = "grayscale(50%)";
        document.getElementById('answer2').style.filter = "grayscale(50%)";
        document.getElementById('answer3').style.filter = "grayscale(50%)";
        document.getElementById('dung4').style.display = "block";
    }
    
    for(var i = 0; i < playerData.length; i++){
        if(playerData[i].gameData.answer == 1){
            answer1 += 1;
        }else if(playerData[i].gameData.answer == 2){
            answer2 += 1;
        }else if(playerData[i].gameData.answer == 3){
            answer3 += 1;
        }else if(playerData[i].gameData.answer == 4){
            answer4 += 1;
        }
        total += 1;
    }
    
    //Nhận giá trị cho biểu đồ
    answer1 = answer1 / total * 100;
    answer2 = answer2 / total * 100;
    answer3 = answer3 / total * 100;
    answer4 = answer4 / total * 100;
    
    
    document.getElementById('square1').style.height = answer1 +  45 +"px";
    document.getElementById('square2').style.height = answer2 +  45 +"px";
    document.getElementById('square3').style.height = answer3 +  45 +"px";
    document.getElementById('square4').style.height = answer4 +  45 +"px";
    document.getElementById('square1').style.marginTop = -answer1 +  200 +"px";
    document.getElementById('square2').style.marginTop = -answer2 +  200 +"px";
    document.getElementById('square3').style.marginTop = -answer3 +  200 +"px";
    document.getElementById('square4').style.marginTop = -answer4 +  200 +"px";
    
    document.getElementById('nextQButton').style.display = "block";
    
});

function nextQuestion(){
    concauhoi = concauhoi+1;
    httk = concauhoi + 16;
    document.getElementById('concauhoi').innerHTML = concauhoi;
    document.getElementById('nextQButton').style.display = "none";
    document.getElementById('square').style.display = "none";
    document.getElementById('listGame').style.display = "none";
    document.getElementById('dung1').style.display = "none";
    document.getElementById('dung2').style.display = "none";
    document.getElementById('dung3').style.display = "none";
    document.getElementById('dung4').style.display = "none";
    
    
    document.getElementById('answer1').style.filter = "none";
    document.getElementById('answer2').style.filter = "none";
    document.getElementById('answer3').style.filter = "none";
    document.getElementById('answer4').style.filter = "none";
    
    
    document.getElementById('playersAnswered').style.display = "block";
    document.getElementById('answered').style.display = "block";
    document.getElementById('timerText').style.display = "block";
    document.getElementById('poinText').style.display = "block";
    document.getElementById('tamdung').style.display = "block";
    document.getElementById('ketthuc').style.display = "block";
    document.getElementById('than2').style.display = "block";

    document.getElementById('img').style.backgroundImage = 'url("../../image/' + httk + '.png")';
    document.getElementById('img').style.backgroundSize = 'cover';
    socket.emit('nextQuestion'); //Yêu cầu máy chủ bắt đầu câu hỏi mới
}

function tamdung(){
    tam_dung++;
}
function ketthuc(){
    tam_dung=1;
    socket.emit('timeUp');
}

function updateTimer(timeAnswer){
    // ++

    time = timeAnswer;
    timer = setInterval(function(){
        if(tam_dung%2==1){
        time_answer = timeAnswer;
        time -= 1;
        document.getElementById('num').textContent = " " + time;
        if(time == 0){
            socket.emit('timeUp');
        }
        }
    }, 1000);
}
function showGame(){
    socket.emit('showGame');
}


socket.on('showList', function(data){
   
    document.getElementById('than2').style.display = "none";
    document.getElementById('listGame').style.display = "block";
    document.getElementById('square').style.display = "none";
    
    document.getElementById('ten1').textContent = data.name1;
    document.getElementById('ten2').textContent = data.name2;
    document.getElementById('ten3').textContent = data.name3;
    document.getElementById('ten4').textContent = data.name4;
    document.getElementById('ten5').textContent = data.name5;
    document.getElementById('diem1').textContent = data.poin1;
    document.getElementById('diem2').textContent = data.poin2;
    document.getElementById('diem3').textContent = data.poin3;
    document.getElementById('diem4').textContent = data.poin4;
    document.getElementById('diem5').textContent = data.poin5;
    
});
//
socket.on('GameOver', function(data){
    document.getElementById('nextQButton').style.display = "none";
    document.getElementById('square').style.display = "none";
    document.getElementById('body').style.display = "none";
    document.getElementById('than').style.display = "none";
    document.getElementById('chia').style.display = "none";
    document.getElementById('question').innerHTML = "GAME OVER";
   
    document.getElementById('winnerTitle').style.display = "block";
    document.getElementById('winner1').style.display = "block";
    document.getElementById('winner2').style.display = "block";
    document.getElementById('winner3').style.display = "block";
    
    document.getElementById('winner1').textContent = data.num1;
    document.getElementById('winner2').textContent = data.num2;
    document.getElementById('winner3').textContent = data.num3;
});



socket.on('getTime', function(player){
    socket.emit('time', {
        player: player,
        time: time,
        time_answer: time_answer
    });
});



















