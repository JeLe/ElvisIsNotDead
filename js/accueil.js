window.onload = main;

function main(){
    setSizes();
    sliderInterval = setInterval(slider, 4000);
    document.getElementById("link").onclick= goToSlide;
    //il faut zussi ajiuter un truc qui remet le timer a 0
    document.getElementById("previous").onclick= function(){if(I>1)I=I-2; slider()};//ca ca bug...
    document.getElementById("next").onclick= function(){slider()};
    window.onresize = setSizes;
}


function setSizes(){
    var img = document.getElementById("slider").getElementsByTagName("img")[0];
    //et on la met à la bonne hauteur
    img.style.height = window.innerHeight-130+"px";
    //et on la centre.
    
    img.style.left = (window.innerWidth-img.clientWidth)/2+"px";
    //et remets le footer a la bonne place :
    document.getElementById("slider").style.height = img.clientHeight+4+"px";
}



var images = [["music", "../images/musique.jpg"],["cine", "../images/cinema.jpg"],["trad", "../images/tradition.jpg"]];
var I=0; //global index also used as counter, modulo 3.

function slider(){
    //I is now incremented, but cannot be more than 2.
    I++;
    if (I==3){I=0;}

    // on place la bonne image dans la division
    document.getElementById("slider").getElementsByTagName("img")[0].src = images[I][1];


}


function goToSlide(){
    clearInterval(sliderInterval);
    document.getElementById("slider").style.display = "none";
    document.getElementById(images[I][0]).style.display = "block";
}

