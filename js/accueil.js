
function main(){
    setSizes(true);
    
    
/*    var doit;
    window.onresize = function(){
        clearTimeout(doit);
        doit = setTimeout(setSizes, 100);
    };*/
    window.onresize = setSizes;



    mySlider = new Slider(document.getElementById("slider"), document.getElementById("mainImage").clientWidth);
    sliderChange = setInterval(function(){mySlider.StepForward.apply(mySlider);}, 3000);
    
    document.getElementsByClassName("arrows")[0].onclick= goToPrevious;
    document.getElementsByClassName("arrows")[1].onclick= goToNext;


    //charger les videos apres le reste de la page pour que les trucs a faire onload soient fait vite !
    
    setTimeout(function(){
               var iframeSrc = ["http://www.dailymotion.com/embed/video/x11kf4c", "http://www.youtube.com/embed/34HluqAbGYA", "http://www.youtube.com/embed/urnKEleBBZc"];
               for (var i=0; i< document.getElementsByTagName("iframe").length; i++){
               document.getElementsByTagName("iframe")[i].setAttribute("src", iframeSrc[i]);
               }}, 2000);


}



function setSizes(){
    setStyle();

    var landscape = window.innerHeight < window.innerWidth;

    // ici on va agir sur le style du slider
    
    if (window.innerWidth > 960) {
        
        if (landscape){
        // on met les articles a la bonne hauteur pour quand ils seront ouverts.
        $("article").css("height", window.innerHeight*0.8+"px");
        
        
        // et on met l'image principale à la bonne hauteur
        //beaucoup de choses sont calculées en fonction de la taille de celle ci, mais grace a son id, on peut la mettre a la bonne taille inependament du reste...
        document.getElementById("mainImage").style.height = window.innerHeight*0.8+"px";
        document.getElementById("mainImage").style.width = "auto";

        //la hauteur de mon element slider entre autres
        document.getElementById("slider").style.height = document.getElementById("mainImage").clientHeight+"px";
        document.getElementById("slider").style.top = "0";
        

        }
    
        else {

    
        
        
        // et on met l'image principale à la bonne hauteur
        //beaucoup de choses sont calculées en fonction de la taille de celle ci, mais grace a son id, on peut la mettre a la bonne taille inependament du reste...
        document.getElementById("mainImage").style.width = window.innerWidth-100+"px";
        document.getElementById("mainImage").style.height = "auto";
        
        //la hauteur de mon element slider entre autres
        document.getElementById("slider").style.height = document.getElementById("mainImage").clientHeight+"px";
        document.getElementById("slider").style.top = "0";
            $("article").css("height", document.getElementById("slider").clientHeight+"px");


        }
        
    }
    
    else {
        if (landscape) {
       
        document.getElementById("slider").style.height = window.innerHeight*.6+"px";         document.getElementById("mainImage").style.height = document.getElementById("slider").clientHeight+"px";
        document.getElementById("mainImage").style.width = "auto";
        
        document.getElementById("slider").style.top = (window.innerHeight-document.getElementsByTagName("header")[0].offsetHeight*2-document.getElementById("slider").clientHeight-20)/2+"px"; //on centre approximativement le slider..
        
        // et le style des articles si jamais on clique dessus..
        $("article").css("height", window.innerHeight*.7+"px");
        $("article").css("width", document.getElementById("slider").clientWidth+"px");
        
        }
        
        
        else {

            // et on met l'image principale à la bonne hauteur
            //beaucoup de choses sont calculées en fonction de la taille de celle ci, mais grace a son id, on peut la mettre a la bonne taille inependament du reste...
            document.getElementById("mainImage").style.width = window.innerWidth-50+"px";
            document.getElementById("mainImage").style.height = "auto";
            
            //la hauteur de mon element slider entre autres
            document.getElementById("slider").style.height = document.getElementById("mainImage").clientHeight+"px";
            document.getElementById("slider").style.top = "0";
            $("article").css("height", window.innerHeight*.7+"px");
       //document.getElementById("slider").style.width = window.innerWidth-16+"px"; //car il y a normalement 16px total de marge sur le body

            
        }
    }
    
    
    //dans tous les cas, si ce n'est pas la premiere fois qu'on appelle cette fonction, on recalcule les positions du slider :

    if (setSizes.arguments[0] !== true){
        mySlider.elementWidth = document.getElementById("mainImage").clientWidth;
        mySlider.calcPos();
        mySlider.index--;
        mySlider.StepForward();
    }
    
    //on met les fleches à l bonne taille et a la bonne hauteur
    
    var leftArrow = document.getElementsByClassName("arrows")[0].firstElementChild;
    var rightArrow = document.getElementsByClassName("arrows")[1].firstElementChild;
    
    leftArrow.style.height = (window.innerHeight*0.8)/5+"px";
    leftArrow.parentNode.style.top = (document.getElementById("slider").clientHeight-leftArrow.clientHeight)/2+"px";
    rightArrow.style.height = (window.innerHeight*0.8)/5+"px";
    rightArrow.parentNode.style.top = (document.getElementById("slider").clientHeight-rightArrow.clientHeight)/2+"px";
    
}

function Slider(){
    //cet objet doit prendre comme arguments l'élément Container du DOM et le width d'un des elements qui glissent.
    //traitement des arguments.
    this.DOMElement = Slider.arguments[0];
    
    //extraction des elements a utiliser
    this.elements = [];
    for (var i=0; i<Slider.arguments[0].children.length; i++){
        if (Slider.arguments[0].children[i].className != "ignore")
        this.elements.push(Slider.arguments[0].children[i]);
    }
    
    this.elementWidth = Slider.arguments[1];

    // suite de l'init
    this.index = 0;
    this.exception = false;
    
    this.calcPos = function(){

        //on fait les calculs en fonction de la largeur de de l'élement container et de la largeur d'un element
        this.pos1 = (this.DOMElement.clientWidth - this.elementWidth)/2 +"px";
        this.pos2 = parseInt(this.pos1)+ this.elementWidth +"px";
        this.pos0 = parseInt(this.pos1)-this.elementWidth +"px";
        
        
        this.bufferPosRight = parseInt(this.pos2)+ this.elementWidth+"px";
        this.bufferPosLeft = parseInt(this.pos0)- this.elementWidth+"px";
    // on resize tous les elements
    
    for ( i=0; i<this.elements.length; i++){
        if (this.elements[i].firstElementChild.tagName == "img")
            this.elements[i].firstElementChild.style.width = this.elementWidth+"px";
        else this.elements[i].firstElementChild.style.width = this.elementWidth+"px";
        this.elements[i].style.left = this.bufferPosRight;
    }
    
    if (this.elements.length <= 3) {
        //si il n'y a que trois elements dans la liste, cela pose des problemes
        //il faut en effet que l'element en position 0 y reste pour sortir vers la gauche ;
        // et qu'en meme temps il soit positionné en bufferRight pour rentrer de la droite...
        // il doit donc etre en double dans la liste pour un peu de temps ! (en fait ili sera toujours la mais pas toujours utile...
        
        this.exception = true;
        for (i=0; i!=3; i++) {
            this.DOMElement.appendChild(this.elements[i].cloneNode(true));
            this.elements.push(this.DOMElement.lastElementChild);
            this.elements[i+3].style.left = this.bufferPosRight;
            this.elements[i+3].id = "buffer";
            
        }
    }

//fin de la fonction calcPos
};
    
    
    //on mets les premiers elements a leur place.
    this.calcPos();
    
    this.elements[0].style.left = this.pos0;
    this.elements[1].style.left = this.pos1;
    this.elements[2].style.left = this.pos2;
    this.elements[1].addEventListener("click", goToSlide);

    this.elements[0].style.opacity = ".6";
    this.elements[2].style.opacity = ".6";
    
   
    

    
    
    
    
    this.StepForward = function(){
        
        var modulo = this.elements.length;

        if (this.StepForward.arguments.length > 0)
            this.index+=this.elements.length-1;
        else
            this.index++;

        if (this.exception === true){
            modulo = 3;
            this.elements[3+(this.index-1)%modulo].style.opacity = ".6";
            this.elements[3+(this.index-1)%modulo].style.left = this.pos2;
        }
        
        // et plein de modulos pour revenir au debut au aller a la fin du array
        if (this.elements[(this.index-1)%modulo] != null)
        this.elements[(this.index-1)%modulo].style.left = this.bufferPosLeft;
        else console.log ("BUG !!!");
        
        this.elements[this.index%modulo].style.opacity = ".6";
        this.elements[this.index%modulo].style.left = this.pos0;
        
        this.elements[(this.index+1)%modulo].style.opacity = "1";
        this.elements[(this.index+1)%modulo].style.left = this.pos1;
        
        if (this.exception !== true){
            this.elements[(this.index+2)%modulo].style.opacity = ".6";
            this.elements[(this.index+2)%modulo].style.left = this.pos2;
        }
        
        var that = this;
        setTimeout(function(){
                   
                   if (that.exception === true){
                   //si il n'y en avait que 3 il faut faire un swap de l'element de droite avec celui encore plus a droite qui lui correspond
                   that.elements[(that.index-1)%3].setAttribute("class", "notransition");
                   that.elements[(that.index-1)%3].style.left = that.pos2;
                   that.elements[(that.index-1)%3].offsetHeight;
                   that.elements[(that.index-1)%3].removeAttribute("class", "notransition");
                   
                   that.elements[3+(that.index-1)%3].setAttribute("class", "notransition");
                   that.elements[3+(that.index-1)%3].style.left = that.bufferPosRight;
                   that.elements[3+(that.index-1)%3].offsetHeight;
                   that.elements[3+(that.index-1)%3].removeAttribute("class", "notransition");
                   

                   }
                   else {
                   that.elements[(that.index-1)%that.elements.length].setAttribute("class", "notransition");
                   that.elements[(that.index-1)%that.elements.length].style.left = that.bufferPosRight;
                   that.elements[(that.index-1)%that.elements.length].offsetHeight;
                   that.elements[(that.index-1)%that.elements.length].removeAttribute("class", "notransition");

                   }
                   
                   that.elements[(that.index)%3].removeEventListener("click", goToSlide);
                   that.elements[(that.index+1)%3].addEventListener("click", goToSlide);

                   

                   }, 850);//parce que la transition elle dure 800 ms et se fait toutes les 3000ms. Les 50ms sont pour donner une marge on sait jamais... :)
        
    };
    
}

//il faudrait que ces trois fonctions soient des méthodes de l'objet Slider, masi pour cela il faudrait que le setInterval fasse partie des propriéts de cet objet...

function goToNext(){
    clearInterval(sliderChange);
    mySlider.StepForward.apply(mySlider);
    sliderChange = setInterval(function(){mySlider.StepForward.apply(mySlider);}, 3000);
}


function goToPrevious(){
    clearInterval(sliderChange);
    mySlider.StepForward.apply(mySlider, [true]); //on a rajouté un argument ce qui fait que ca va "dans l'autre sens"
    sliderChange = setInterval(function(){mySlider.StepForward.apply(mySlider);}, 3000);
}


function goToSlide(){

    clearInterval(sliderChange);
    document.getElementById("slider").style.display = "none";
    document.getElementById(this.getAttribute("href").slice(1)).style.display = "block";
    document.getElementById(this.getAttribute("href").slice(1)).onclick = BackToSlides;

}

function BackToSlides(){
    //ca ca marche, il faut juste que ca revienne a partir d'un vrai bouton :)
    sliderChange = setInterval(function(){mySlider.StepForward.apply(mySlider);}, 3000);
    document.getElementById("slider").style.display = "block";
    this.style.display = "none";

}
