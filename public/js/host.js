var socket = io();
var params = jQuery.deparam(window.location.search);
var number_of_players = 0;

//Khi máy chủ kết nối với máy chủ
socket.on('connect', function() {

    document.getElementById('players').value = "";
    
    //Cho máy chủ biết rằng đó là kết nối máy chủ
    socket.emit('host-join', params);
});

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});

//Thêm tên người chơi vào màn hình và cập nhật số lượng người chơi
socket.on('updatePlayerLobby', function(data){
    var textnode = document.createTextNode("");
    var node = document.createElement("LI");
    textnode = document.createTextNode(data[number_of_players].name);
    node.appendChild(textnode);
    document.getElementById("players").appendChild(node);
    number_of_players+=1;
    document.getElementById('number').innerHTML = number_of_players;
        
});

//Yêu cầu máy chủ bắt đầu trò chơi nếu nút được nhấp
function startGame(){
    socket.emit('startGame');
}
function endGame(){
    window.location.href = "/";
}

//Khi máy chủ bắt đầu trò chơi
socket.on('gameStarted', function(id){
    console.log('Game Started!');
    window.location.href="/host/game/" + "?id=" + id;
});

socket.on('noGameFound', function(){
   window.location.href = '../../';//Chuyển hướng người dùng đến trang 'tham gia trò chơi'
});

