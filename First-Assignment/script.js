document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loading-screen").style.visibility = "visible";
    } else {
        document.querySelector("#loading-screen").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
  };

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("header").style.top = "0";
    } else {
      document.getElementById("header").style.top = "-55px";
    }
    prevScrollpos = currentScrollPos;
  }