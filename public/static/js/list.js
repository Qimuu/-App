var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    var text = div.innerHTML.split('<span');
    window.localStorage.removeItem(`^${text[0]}`);
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
  var text = ev.target.innerHTML.split('<span');
  var flag = window.localStorage.getItem(`^${text[0]}`);
  if(flag == 'false') window.localStorage.setItem(`^${text[0]}`, true);
  else window.localStorage.setItem(`^${text[0]}`, false);
}, false);

function loadLi() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); 
    if(key[0] == '^' && key.length > 2) {
      var txt = localStorage.getItem(key);
      console.log(key,txt);
      if(txt == 'false') txt = false;
      else txt = true;
      newLi(key.slice(1), txt);
    }   
  }
}

function newLi(inputValue, txt) {
  var li = document.createElement("li");
  window.localStorage.setItem(`^${inputValue}`, txt);
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    
  } else {
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";
    if(txt == false) li.classList.toggle('checked');
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        var text = div.innerHTML.split('<span');
        window.localStorage.removeItem(`^${text[0]}`);
      }
    }
  }
}
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  window.localStorage.setItem(`^${inputValue}`, true);
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    
  } else {
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        var text = div.innerHTML.split('<span');
        window.localStorage.removeItem(`^${text[0]}`);
      }
    }
  }
}