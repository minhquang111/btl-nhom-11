var socket = io();
var id_user = '5fc768af40c195246040ba91';
socket.on('connect', function(){
    socket.emit('requestDbNames');//Nhận tên cơ sở dữ liệu để hiển thị cho người dùng
});

var k = 0;
socket.on('gameNamesData', function(data){
    for(var i = Object.keys(data).length-1; i>=0; i--){
       
        if(data[i].id_user == id_user){
            k = Object.keys(data).length-i;
            var divtieude = document.createElement('div');
            var divnut = document.createElement('div');
            var ul = document.getElementById('game-list');
            var li = document.createElement('li');
            var h3 = document.createElement('h3');
            var buttoned = document.createElement('button');
            var buttonpl = document.createElement('button');
            h3.innerHTML = data[i].name;
            divtieude.setAttribute('class', 'tieudecauhoi');
            divnut.setAttribute('class', 'nutcauhoi');
            buttoned.setAttribute('id', 'sua');
            buttonpl.setAttribute('id', 'choi');
            buttoned.setAttribute('onClick', "Edit(" + data[i].id +"," + k + ")");
            buttonpl.setAttribute('onClick', "startGame('" + data[i].id + "')");
            li.setAttribute('style', 'background-image: url("../image/' + k + '.png");');
            buttoned.innerHTML = "Edit";
            buttonpl.innerHTML = "Play";
            ul.appendChild(li);
            li.appendChild(divtieude);
            li.appendChild(divnut);
            divtieude.appendChild(h3);
            divnut.appendChild(buttoned);
            divnut.appendChild(buttonpl);
        }
        
    }
});

function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}
function Edit(data,k){
    window.location.href="/edit/" + "?id=" + data + "&k=" + k;
}
