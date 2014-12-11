


function load(){
    mySlider = new Slider(document.getElementById("slider"), "right", true);
    document.getElementsByTagName("header")[0].onclick = (function(){mySlider.StepForward.apply(mySlider);});
//    document.getElementsByTagName("footer")[0].onclick = (function(){mySlider.dir = -1; mySlider.Step.apply(mySlider)});

}

// this is my slider object.
//arguments are : the container object
//positions for all 3 elements, from left to right; ca nbe func refs
//which side to slide : "left", or "right"
//optional : true if positions must be recalculated on resize. If so, pos must be func refs
function Slider(){
    //extraction des arguments.
    this.DOMElement = Slider.arguments[0];
    this.elements = Slider.arguments[0].children;
    if (Slider.arguments[1] == "left") this.dir = 1;
    else this.dir =-1;
    if (Slider.arguments.length == 2) this.recalc = Slider.arguments[2];
    // suite de l'init
    this.index = 0;

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
    this.bufferPosRight = parseInt(this.pos2)+ this.elements[1].clientWidth+"px";
    this.bufferPosLeft = parseInt(this.pos0)- this.elements[1].clientWidth+"px";
    
    this.elements[0].style.left = this.pos0;
    this.elements[1].style.left = this.pos1;
    this.elements[2].style.left = this.pos2;
    
    
    /*jusqu'ici...*/
    
   // this.elements[0].style.opacity = ".4";
    //this.elements[2].style.opacity = ".4";
    
    this.StepForward = function(){
        this.index++;
        this.elements[(this.index-1)%this.elements.length].setAttribute("class", "notransition");
        this.elements[(this.index-1)%this.elements.length].style.left = this.bufferPosRight;
        this.elements[(this.index-1)%this.elements.length].offsetHeight;
        this.elements[(this.index-1)%this.elements.length].removeAttribute("class", "notransition");

        // et plein de modulos pour revenir au debut au aller a la fin du array
        this.elements[(this.index)%this.elements.length].style.left = this.bufferPosLeft;
        
        
        this.elements[this.index%this.elements.length].style.left = this.pos0;
        this.elements[(this.index+1)%this.elements.length].style.left = this.pos1;
        this.elements[(this.index+2)%this.elements.length].style.left = this.pos2;

        
    };
    
    
    this.HiddenElementToOtherSide = function(){

        console.log(this);
    };
}

/*
 this.Step = function(){
 
 this.elements[(this.index)].style.left = this.bufferPos;
 
 
 this.index++;
 // et plein de modulos pour revenir au debut au aller a la fin du array
 
 if (this.index == this.elements.length){
 this.elements[0].style.left = this.pos0;
 this.elements[1].style.left = this.pos1;
 this.elements[2].style.left = this.pos2;
 }
 else
 this.elements[(this.index)].style.left = this.pos0;
 
 if (this.index+1 == this.elements.length){
 this.elements[0].style.left = this.pos1;
 this.elements[1].style.left = this.pos2;
 }
 else
 this.elements[(this.index+1)].style.left = this.pos1;
 
 if (this.index+2 == this.elements.length){
 this.index = 0;
 this.elements[this.index].style.left = this.pos2;
 }
 else
 this.elements[(this.index+2)].style.left = this.pos2;
 
 };
 */

