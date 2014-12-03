//window.onload = main;

function main(){
    //header(); //cette fonction vient de commun :)
    setSizes();
    sliderChange = setInterval(slider, 4000);
    document.getElementById("link").onclick= goToSlide;
    //il faut zussi ajiuter un truc qui remet le timer a 0
    document.getElementsByClassName("arrows")[0].onclick= goToPrevious;
    document.getElementsByClassName("arrows")[1].onclick= goToNext;
    window.onresize = setSizes;

}



function setSizes(){
    
    //here we're gonna need a switch, kinda like the css @media...
    
    // ici on agit sur le style du slider
    var img = document.getElementById("slider").getElementsByTagName("img")[0];
    //et on la met à la bonne hauteur
    img.style.height = window.innerHeight*0.8+"px";
    //et on la centre.
    img.style.left = (window.innerWidth-img.clientWidth)/2+"px";
    //et remets le footer a la bonne place :
    document.getElementById("slider").style.height = img.clientHeight+4+"px";
    
    //on met les fleches à l bonne taille et a la bonne place
    document.images[2].style.height = (window.innerHeight*0.8)/5+"px";
    document.images[2].parentNode.style.top = (img.clientHeight-document.images[2].clientHeight)/2+"px";
    document.images[2].parentNode.style.left = (window.innerWidth-img.clientWidth)/2+"px";
    document.images[3].style.height = (window.innerHeight*0.8)/5+"px";
    document.images[3].parentNode.style.top = (img.clientHeight-document.images[3].clientHeight)/2+"px";
    document.images[3].parentNode.style.left = (window.innerWidth-img.clientWidth)/2+img.clientWidth-document.images[3].clientWidth+"px";

    //et la dedans sur le style du reste...
    setStyle();
    
}



var images = [["music", "../images/musique.jpg"],["cine", "../images/cinema.jpg"],["trad", "../images/tradition.jpg"]];
var I=0; //global index also used as counter, modulo 3.

function slider(){
    //I is now incremented, but cannot be more than 2.
    if (slider.arguments.length > 0) {
        if (I>0) I=I-2;
        else I=1;
    }
    I++;
    if (I==3){I=0;}

    // on place la bonne image dans la division
    document.getElementById("slider").getElementsByTagName("img")[0].src = images[I][1];

}

function goToNext(){
    clearInterval(sliderChange);
    slider();
    sliderChange = sliderInterval = setInterval(slider, 4000);
}


function goToPrevious(){
    clearInterval(sliderChange);
    
    slider(1);
    sliderChange = sliderInterval = setInterval(slider, 4000);
}


function goToSlide(){
    clearInterval(sliderChange);
    document.getElementById("slider").style.display = "none";
    document.getElementById(images[I][0]).style.display = "block";
}

