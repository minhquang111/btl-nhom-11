var socket = io();
var id_user = document.getElementById('id_user').value;
socket.on('connect', function(){
    socket.emit('requestDbNames');//Nhận tên cơ sở dữ liệu để hiển thị cho người dùng
});

var k = 0;
socket.on('gameNamesData', function(data){
    for(var i = Object.keys(data).length-1; i>=0; i--){
       
        if(data[i].id_user == id_user){
            // k = Object.keys(data).length-i;
            k=Math.floor(Math.random() * (17)) + 1;
            var divtieude = document.createElement('div');
            var divnut = document.createElement('div');
            var ul = document.getElementById('game-list');
            var li = document.createElement('li');
            var h3 = document.createElement('h3');
            var buttonde = document.createElement('button');
            var buttoned = document.createElement('button');
            var buttonpl = document.createElement('button');
            h3.innerHTML = data[i].name;
            divtieude.setAttribute('class', 'tieudecauhoi');
            divnut.setAttribute('class', 'nutcauhoi');
            buttonde.setAttribute('id', 'de');
            buttoned.setAttribute('id', 'ed');
            buttonpl.setAttribute('id', 'pl');
            buttoned.setAttribute('onClick', "Edit(" + data[i].id +"," + k + ")");
            buttonde.setAttribute('onClick', "Delete(" + data[i].id + ")");
            buttonpl.setAttribute('onClick', "startGame('" + data[i].id + "')");
            li.setAttribute('style', 'background-image: url("../image/' + k + '.png");');
            buttonde.innerHTML = "Delete";
            buttoned.innerHTML = "Edit";
            buttonpl.innerHTML = "Play";
            ul.appendChild(li);
            li.appendChild(divtieude);
            li.appendChild(divnut);
            divtieude.appendChild(h3);
            divnut.appendChild(buttonde);
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
function Delete(data){
    var quiz = {id: data};
    socket.emit('deleteQuiz', quiz);
    window.location.href="/create/";
}
