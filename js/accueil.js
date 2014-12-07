//window.onload = main;

function main(){
    //header(); //cette fonction vient de commun :)
    setSizes();
    sliderChange = setInterval(slider, 4000);
    document.getElementById("mainLink").onclick= goToSlide;
    //il faut zussi ajiuter un truc qui remet le timer a 0
    document.getElementsByClassName("arrows")[0].onclick= goToPrevious;
    document.getElementsByClassName("arrows")[1].onclick= goToNext;
    window.onresize = setSizes;
    document.getElementById("cine").onclick = BackToSlides;
    

}



function setSizes(){
    //et la dedans sur le style du reste...
    setStyle();

    var landscape = window.innerHeight < window.innerWidth;

    // ici on va agir sur le style du slider
    var img = document.getElementById("mainImage");
    
    if (window.innerHeight > 540 && window.innerWidth > 960 && landscape) {
        // on met les articles a la bonne hauteur pour quand ils seront ouverts.
        $("article").css("height", window.innerHeight*0.8+"px");
        $("article").css("overflow", "scroll");
        
        
        // et on met les images à la bonne hauteur
        img.style.height = window.innerHeight*0.8+"px";
        document.getElementById("left").firstElementChild.style.height = window.innerHeight*0.8+"px";
        document.getElementById("right").firstElementChild.style.height = window.innerHeight*0.8+"px";
        // on met la div slider a la bonne place
        document.getElementById("slider").style.top= document.getElementsByTagName("header")[0].offsetHeight+"px";
        

        //et on la centre.
        document.getElementById("mainLink").style.left = (window.innerWidth-img.clientWidth)/2+"px";
        //et on place les deux autres.
        document.getElementById("right").style.left = img.clientWidth+(window.innerWidth-img.clientWidth)/2+"px";
        document.getElementById("left").style.left = -img.clientWidth+(window.innerWidth-img.clientWidth)/2+"px";
        
        
        document.getElementById("slider").style.height = img.clientHeight+"px";
    
        
        
        
        
        var leftArrow = document.getElementsByClassName("arrows")[0].firstElementChild;
        var rightArrow = document.getElementsByClassName("arrows")[1].firstElementChild;

        //on met les fleches à l bonne taille et a la bonne place
        leftArrow.style.height = (window.innerHeight*0.8)/5+"px";
        leftArrow.parentNode.style.top = (img.clientHeight-leftArrow.clientHeight)/2+"px";
        leftArrow.parentNode.style.left = (window.innerWidth-img.clientWidth)/2+"px";
        rightArrow.style.height = (window.innerHeight*0.8)/5+"px";
        rightArrow.parentNode.style.top = (img.clientHeight-rightArrow.clientHeight)/2+"px";
        rightArrow.parentNode.style.left = (window.innerWidth-img.clientWidth)/2+img.clientWidth-rightArrow.clientWidth+"px";

    }
    
    else if(landscape){
        //Ca ca marche pas trop...

        img.style.left = document.getElementById("asideNav").offsetWidth+"px";
//     img.style.top= document.getElementsByTagName("footer")[0].offsetHeight+"px"; //ca ca marche pas ??
        img.style.height= window.innerHeight-document.getElementsByTagName("footer")[0].offsetHeight+"px"; //ca ca marche pas ??


    
    }
    
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
    
    var img = document.getElementById("mainImage");

    document.getElementById("mainLink").firstElementChild.style.opacity = ".4";
    document.getElementById("mainLink").style.left = img.clientWidth+(window.innerWidth-img.clientWidth)/2+"px";
    document.getElementById("left").firstElementChild.style.opacity = ".9";
    document.getElementById("left").style.left = (window.innerWidth-img.clientWidth)/2+"px";
    document.getElementById("right").style.left = -img.clientWidth+(window.innerWidth-img.clientWidth)/2+"px";
    
    
    //et on permutte les ids
    document.getElementById("mainLink").setAttribute("id", "buffer");
    document.getElementById("left").setAttribute("id", "mainLink");
    document.getElementById("right").setAttribute("id", "left");
    document.getElementById("mainLink").setAttribute("id", "right");
    

    // on place la bonne image dans la division
    //document.getElementById("slider").getElementsByTagName("img")[0].src = images[I][1];

}

function goToNext(){
    clearInterval(sliderChange);
    slider();
    sliderChange = setInterval(slider, 4000);
}


function goToPrevious(){
    clearInterval(sliderChange);
    
    slider(1);
    sliderChange = setInterval(slider, 4000);
}


function goToSlide(){
    clearInterval(sliderChange);
    document.getElementById("slider").style.display = "none";
    document.getElementById(images[I][0]).style.display = "block";
}

function BackToSlides(){
    //ca ca marche, il faut juste que ca revienne a partir d'un vrai bouton :)
    sliderChange = setInterval(slider, 4000);
    document.getElementById("slider").style.display = "block";
    document.getElementById(images[I][0]).style.display = "none";

}
