<<<<<<< HEAD:js/beauregard.js

function setSizes(){
    document.getElementById("buttons").style.width=window.innerwidth*0.6+"px";
    document.getElementsByTagName("iframe")[0].style.width=window.innerwidth*0.6+"px";
    $(".button1 a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");

}

//function zwoush(){
    //scrollTo(0,150);
}
function load(){
    setSizes();
    //document.getElementsByClassName("button")[1].onclick=zwoush;
}

    
function main(){
    newSetSizes();
    window.onresize = newSetSizes;
    

}

function newSetSizes(){
    setStyle();
    
    
    var landscape = window.innerHeight < window.innerWidth;

    
    if (window.innerWidth > 960) {
        
        if (landscape){
            
            document.getElementById("slider").style.height = window.innerHeight*0.8+"px";
            
            
        }
        
        else {
            
            document.getElementById("slider").style.height = window.innerHeight*0.7+"px";
            
            
        }
        
    }
    
    else {
        if (landscape) {
            
            document.getElementById("alles").style.height = window.innerHeight*.6+"px";
            
        }
        
        
        else {
            
            document.getElementById("alles").style.height = window.innerHeight*.7+"px";
            
        }
    }
    
    

    
}



}
=======

function setSizes(){
    document.getElementById("buttons").style.width=window.innerwidth*0.6+"px";
    document.getElementsByTagName("iframe")[0].style.width=window.innerwidth*0.6+"px";
    $(".button1 a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");

}

//function zwoush(){
    //scrollTo(0,150);
}
function load(){
    setSizes();
    //document.getElementsByClassName("button")[1].onclick=zwoush;
}

    
>>>>>>> FETCH_HEAD:js/commun-event.js
