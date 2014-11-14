window.onload = main;

function main(){
    document.getElementById("slider").getElementsByTagName("img")[0].style.height = window.innerHeight-110+"px";
    sliderInterval = setInterval(slider, 4000);
    document.getElementById("link").onclick= goToSlide;
}


function init(){}



var images = [["music", "../images/musique.jpg"],["cine", "../images/cinema.jpg"],["trad", "../images/tradition.jpg"]];
var I=0; //global index also used as counter, modulo 3.

function slider(){
    //I is now incremented, but cannot be more than 2.
    I++;
    if (I==3){I=0;}

    // on place la bonne image dans la division
    document.getElementById("slider").getElementsByTagName("img")[0].src = images[I][1];

    //et on la met aux bonnes dimensions... ou pas !
    document.getElementById("slider").getElementsByTagName("img")[0].style.height = window.innerHeight-150+"px";
}


function goToSlide(){
    clearInterval(sliderInterval);
    document.getElementById("slider").style.display = "none";
    document.getElementById(images[I][0]).style.display = "block";

}