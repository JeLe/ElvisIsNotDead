//window.onload = main;

function main(){
    //header(); //cette fonction vient de commun :)
    setSizes();
  //  document.getElementById("mainLink").onclick= goToSlide;

  //  document.getElementsByClassName("arrows")[0].onclick= goToPrevious;
   // document.getElementsByClassName("arrows")[1].onclick= goToNext;
    window.onresize = setSizes;
    document.getElementById("cine").onclick = BackToSlides;
    mySlider = new Slider(document.getElementById("slider"), "right", true);
    setInterval(function(){mySlider.StepForward.apply(mySlider);}, 3000);

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
   /*     document.getElementById("left").firstElementChild.style.height = window.innerHeight*0.8+"px";
        document.getElementById("right").firstElementChild.style.height = window.innerHeight*0.8+"px";*/

        

  /*      //et on la centre.
        document.getElementById("mainLink").style.left = (window.innerWidth-img.clientWidth)/2+"px";
        //et on place les deux autres.
        document.getElementById("right").style.left = img.clientWidth+(window.innerWidth-img.clientWidth)/2+"px";
        document.getElementById("left").style.left = -img.clientWidth+(window.innerWidth-img.clientWidth)/2+"px";
        
        */
        document.getElementById("slider").style.height = img.clientHeight+"px";
    
        
        
        
        
   /*     var leftArrow = document.getElementsByClassName("arrows")[0].firstElementChild;
        var rightArrow = document.getElementsByClassName("arrows")[1].firstElementChild;

        //on met les fleches à l bonne taille et a la bonne place
        leftArrow.style.height = (window.innerHeight*0.8)/5+"px";
        leftArrow.parentNode.style.top = (img.clientHeight-leftArrow.clientHeight)/2+"px";
        leftArrow.parentNode.style.left = (window.innerWidth-img.clientWidth)/2+"px";
        rightArrow.style.height = (window.innerHeight*0.8)/5+"px";
        rightArrow.parentNode.style.top = (img.clientHeight-rightArrow.clientHeight)/2+"px";
        rightArrow.parentNode.style.left = (window.innerWidth-img.clientWidth)/2+img.clientWidth-rightArrow.clientWidth+"px";
*/
    }
    
    else if(landscape){
        //Ca ca marche pas trop...

        img.style.left = document.getElementById("asideNav").offsetWidth+"px";
//     img.style.top= document.getElementsByTagName("footer")[0].offsetHeight+"px"; //ca ca marche pas ??
        img.style.height= window.innerHeight-document.getElementsByTagName("footer")[0].offsetHeight+"px"; //ca ca marche pas ??


    
    }
    
}

function Slider(){
    //extraction des arguments.
    this.DOMElement = Slider.arguments[0];
    this.elements = Slider.arguments[0].children;
    if (Slider.arguments[1] == "left") this.dir = 1;
    else this.dir =-1;
    if (Slider.arguments.length == 2) this.recalc = Slider.arguments[2];
    // suite de l'init
    this.index = 0;
    this.exception = false;

    
    //calcul des positions des 3 morceaux
    this.bufferPosRight = 5000+"px";
    this.bufferPosLeft = -5000+"px";
    
    
    //c'est ca le plus gros probleme... a partir de quoi on calcule les positions...
    // on mets tout en place
    
    for (var i=0; i<this.elements.length; i++){
        if (this.elements[i].firstElementChild.tagName == "img")
            this.elements[i].firstElementChild.style.height = this.DOMElement.clientHeight+"px";
        else this.elements[i].firstElementChild.style.height = this.DOMElement.clientHeight+"px";
        this.elements[i].style.left = this.bufferPosRight;
    }
    
    
    this.pos1 = (this.DOMElement.clientWidth - this.elements[1].clientWidth)/2 +"px";
    this.pos2 = parseInt(this.pos1)+ this.elements[1].clientWidth +"px";
    this.pos0 = parseInt(this.pos1)-this.elements[1].clientWidth +"px";
    
    if (this.elements.length > 3){
        this.bufferPosRight = parseInt(this.pos2)+ this.elements[1].clientWidth+"px";
        this.bufferPosLeft = parseInt(this.pos0)- this.elements[1].clientWidth+"px";
    }
    else {
        //si il n'y a que trois elements dans la liste, cela pose des problemes
        //il faut en effet que l'element en position 0 y reste pour sortir vers la gauche ;
        // et qu'en meme temps il soit positionné en bufferRight pour rentrer de la droite...
        // il doit donc etre en double dans la liste pour un peu de temps ! (en fait ili sera toujours la mais pas toujours utile...
        this.bufferPosRight = parseInt(this.pos2)+ this.elements[1].clientWidth+"px";
        this.bufferPosLeft = parseInt(this.pos0)- this.elements[1].clientWidth+"px";

        this.exception = true;
        var test = this.elements[0].cloneNode(true);
        this.elements[this.elements.length] = test;
        console.log(this, this.elements);
    }
    
    this.elements[0].style.left = this.pos0;
    this.elements[1].style.left = this.pos1;
    this.elements[2].style.left = this.pos2;
    
    
    /*jusqu'ici...*/
    
    this.elements[0].style.opacity = ".6";
    this.elements[2].style.opacity = ".6";
    
    
    
    
    this.StepForward = function(){
        if (this.StepForward.arguments.length > 0)
            this.index+= this.StepForward.arguments.length-1;
        else
            this.index++;

        if (this.exception === true){
            var test = 0;
        }
        
        // et plein de modulos pour revenir au debut au aller a la fin du array
        this.elements[(this.index-1)%this.elements.length].style.left = this.bufferPosLeft;
        
        this.elements[this.index%this.elements.length].style.opacity = ".6";
        this.elements[this.index%this.elements.length].style.left = this.pos0;
        this.elements[(this.index+1)%this.elements.length].style.opacity = "1";
        this.elements[(this.index+1)%this.elements.length].style.left = this.pos1;
        this.elements[(this.index+2)%this.elements.length].style.opacity = ".6";
        this.elements[(this.index+2)%this.elements.length].style.left = this.pos2;

        
        var that = this;
        setTimeout(function(){
        that.elements[(that.index-1)%that.elements.length].setAttribute("class", "notransition");
        that.elements[(that.index-1)%that.elements.length].style.left = that.bufferPosRight;
        that.elements[(that.index-1)%that.elements.length].offsetHeight;
                   that.elements[(that.index-1)%that.elements.length].removeAttribute("class", "notransition");}, 900);//parce que la transition elle dure 800 ms et se fait toutes les 3000ms.
        
    };
    
}


var I=0; //global index also used as counter, modulo 3.


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
