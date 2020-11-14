var loadFile = function(event) {
var canvas = document.getElementById("canvas");

function getPosition(obj) {
  var right = 0,
  down = 0;
  if (obj.offsetParent) {
    do {
      right += obj.offsetLeft;
      down += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return {
      x: right,
      y: down
    };
  }
  return undefined;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw "color component not found";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  function drawImageFromWebUrl(sourceurl) {
    var img = new Image();
    img.addEventListener("load", function() {
      canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    });
    img.setAttribute("src", sourceurl);
  }
  var image = document.getElementById('output');
  drawImageFromWebUrl(URL.createObjectURL(event.target.files[0]));

  canvas.addEventListener("mousemove", function(e) {
  var pos = getPosition(this);
  var x = e.pageX - pos.x;
  var y = e.pageY - pos.y;
  var coord = "coordinate : ("+x+","+y+")";
  var c = this.getContext('2d');
  var p = c.getImageData(x, y, 1, 1).data;
  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    document.getElementById("show").innerHTML="hex : "+hex;
    document.getElementById("show2").innerHTML="rgb : "+"("+p[0]+", "+p[1]+", "+p[2]+")";
    document.getElementById("status").innerHTML = coord;
    document.getElementById("color").style.backgroundColor = hex;
  }, false);
}
