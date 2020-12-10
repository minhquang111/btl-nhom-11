var socket = io();
// var url = require('url');
// var url_parts = url.parse(request.url, true);
// var query = url_parts.query;
//Khi người chơi kết nối với máy chủ
socket.on('connect', function() {
    
    var params = jQuery.deparam(window.location.search); //Lấy dữ liệu từ url
    
    //Nói với máy chủ rằng đó là kết nối của người chơi
    socket.emit('player-join', params);
});
var x = window.location.href;
function chuyenname(x){
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
function chuyenpin(x){
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

document.getElementById('name').innerHTML = chuyenname(x);
document.getElementById('pin').innerHTML = "Pin: " + chuyenpin(x);

//Khởi động trình phát trở lại màn hình tham gia nếu mã pin trò chơi không khớp
socket.on('noGameFound', function(){
    window.location.href = '../';
});
//Nếu máy chủ ngắt kết nối, thì trình phát sẽ được khởi động vào màn hình chính
socket.on('hostDisconnect', function(){
    window.location.href = '../';
});

//Khi máy chủ nhấp vào bắt đầu trò chơi, màn hình trình phát sẽ thay đổi
socket.on('gameStartedPlayer', function(){
    window.location.href="/player/game/" + "?id=" + socket.id;
});


