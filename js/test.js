window.onload=load;

var test = 0;
function load(){
    mySlider = new Slider(document.getElementById("slider"), "right", true);
   // setInterval(mySlider.Step, 1000);
    setTimeout(function(){mySlider.Step.apply(mySlider)}, 1000);
}

// this is my slider object.
//arguments are : the container object
//positions for all 3 elements, from left to right; ca nbe func refs
//which side to slide : "left", or "right"
//optianl : true if positions must be recalculated on resize. If so, pos must be func refs
function Slider(){
    //extraction des arguments.
    this.DOMElement = Slider.arguments[0];
    this.elements = Slider.arguments[0].children;
    this.dir = Slider.arguments[1];
    if (Slider.arguments.length == 2) this.recalc = Slider.arguments[2];
    // suite de l'init
    this.index = 0;

    //calcul des positions des 3 morceaux
    this.bufferPos = "-5000px";
    // on mets tout en place

    for (var i=0; i<this.elements.length; i++){
        if (this.elements[i].firstElementChild.tagName == "img")
            this.elements[i].firstElementChild.style.height = this.DOMElement.clientHeight+"px";
        else this.elements[i].firstElementChild.style.height = this.DOMElement.clientHeight+"px";
        this.elements[i].style.left = this.bufferPos;
    }
        
    this.pos1 = (this.DOMElement.clientWidth - this.elements[1].clientWidth)/2 +"px";
    this.pos2 = parseInt(this.pos1)+ this.elements[1].clientWidth +"px";
    this.pos0 = parseInt(this.pos1)-this.elements[1].clientWidth +"px";
    this.elements[0].style.left = this.pos0;
    this.elements[1].style.left = this.pos1;
    this.elements[2].style.left = this.pos2;
   // this.elements[0].style.opacity = ".4";
    //this.elements[2].style.opacity = ".4";
    
    this.Step = function(){
        this.index--;
        this.elements[this.index+1].style.left = this.pos0;//finir le modulo
        this.elements[this.index+1].style.left = this.pos1;
        this.elements[this.index+2].style.left = this.pos2;
        this.elements[this.index+3].style.zIndex = "-2";
        this.elements[this.index+3].style.left = this.bufferPos;

    };
}


