var req = new XMLHttpRequest();

var slider = document.getElementById('weeksStudied');
var output = document.getElementById('rangeVal');
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

req.onreadystatechange = function () {
    if (req.readyState === 4) {
        if (req.status === 200) {
            var jsonObj = JSON.parse(req.responseText);
            for (var i = 0; i < jsonObj.length; i++) {
                var link = $(`<a href="http://localhost:3000/api/topics/${jsonObj[i].id}">${jsonObj[i].title} - ID: ${jsonObj[i].id}</a>`);
                $('<li></li>')
                    .html(link)
                    .appendTo('#topicsOutput');
            }
        } else {
            console.log('Error');
        }
    }
}
req.open('GET', 'http://localhost:3000/api/topics');
req.send();

var postBtn = document.getElementById('postBtn');
var delBtn = document.getElementById('delBtn');
var id;

postBtn.onclick = function (e) {
    e.preventDefault();
    var title = document.getElementById('title').value;
    var tag = document.getElementById('tag').value;
    var notes = document.getElementById('notes').value;
    var source = document.getElementById('src').value;
    var timeToMaster = document.getElementById('timeToMaster').value;
    var weeksStudied = document.getElementById('weeksStudied').value;
    var startDay = document.getElementById('startD').value;
    var progress = document.querySelector('input[name="inProgress"]:checked').value;
    var complDay = document.getElementById('complD').value;

    data = {
        "title": title,
        "tag": tag,
        "notes": notes,
        "source": source,
        "timeToMaster": parseInt(timeToMaster),
        "weeksStudied": parseInt(weeksStudied),
        "startDay": startDay,
        "inProgress": progress,
        "complDay": complDay
    };
    postTopic();
};

function postTopic() {
    $.ajax({
        url: 'http://localhost:3000/api/topics',
        type: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (result) { },
        error: function (request, msg, error) { }
    });
    // location.reload();
}

delBtn.onclick = function (e) {
    e.preventDefault();
    id = document.getElementById('delId').value;
    deleteTopic(id);
};

function deleteTopic(id) {
    $.ajax({
        url: 'http://localhost:3000/api/topics/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        success: function (result) {
        },
        error: function (request, msg, error) {
        }
    });
    // location.reload();
}

function backgroundColor() {
    var body = document.getElementById('body');
    var currentClass = body.className;
    body.className = currentClass == 'dark-mode' ? 'light-mode' : 'dark-mode';
}
