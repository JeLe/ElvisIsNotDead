

var navMenu = [["Musique", ["beauregard.html", "Beauregard"], ["jazz.html", "Jazz sous les Pommiers"]], ["Cinéma", ["deauville.html", "Festival de deauville"]], ["Tradition", ["medieval.html", "Festival médiéval de Bayeux"], ["cidre.html", "Cidre et Dragons"]]];



window.onload = load;


function load(){
    oldWidth = -1;
    header(); //on fabrique le header
    setStyle(true); //on mets les divers styles en place
    
 // do this only if there is no other onresize in the other scripts...
 //   window.onresize = setStyle;
    
    
    
    //et finalement on appelle la fonction qui aurait été appellée onload dans le script particulier de chaque page.
    main();
    


    //et la derniere chose qu'on fait apres le chargement de la page, c'est de charger les src des iframes, commme ca ils ne ralentissent pas toute la page :)
    //il faudra juste que ca dépende de sur quelle page on est ...
    //Donc on le mets dans le main();

}




function setStyle(){

    var landscape = window.innerHeight < window.innerWidth;
    console.log(oldWidth);
    if (oldWidth != -1){
        if (oldWidth > 960 && window.innerWidth <= 960) moveNavToAside();
        else if(oldWidth <= 960 && window.innerWidth > 960) moveNavToHeader();
    
        console.log(document.getElementById("asideNav"));
    }
    else{
        if (window.innerWidth <= 960) moveNavToAside();
    }
    
    //cela correspond à nos &media queries
    if (window.innerWidth > 960) {
        //on commence par vérifier que le nav est a la bonne place.
        

      /*  if (document.getElementsByTagName("nav")[0].parentNode == document.getElementById("asideNav")) {
            moveNavToHeader();
        }*/

    
        //un peu de style pour le menu deroulant automatique :
        var li = document.getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (var i=0; i<li.length; i++){
            if ( li[i].parentNode.parentNode == document.getElementsByTagName("nav")[0]){
                li[i].style.width = 99/navMenu.length + "%";
            }
        }
    
        
        if (landscape){
            //taille du header et du footer et des textes a l'interieur...
            document.getElementsByTagName("header")[0].style.height = window.innerHeight*0.08+"px";
            document.getElementsByTagName("footer")[0].style.height = window.innerHeight*0.08+"px";
            $("header a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");
            $("footer a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");
            console.log("big landscape");

        }
        else{
            document.getElementsByTagName("header")[0].style.height = window.innerWidth*0.08+"px";
            document.getElementsByTagName("footer")[0].style.height = window.innerWidth*0.08+"px";
            $("header a").css("font", window.innerWidth*0.07/3+"px/"+window.innerWidth*0.07+"px Junction, sans-serif");
            $("footer a").css("font", window.innerWidth*0.07/3+"px/"+window.innerWidth*0.07+"px Junction, sans-serif");
            console.log("big portrait");


        }
    }
    

    
    
    else {

        //wierd cases : height not big enough
        //portrait...
        //en gros quand en grand il est pas assez haut et en petit qu'il l'est trop...
        
        //mobile version
        // et du coup le menu déroulant va sur le coté :)
        /*console.log(document.getElementById("asideNav"));
        if (document.getElementById("asideNav") == null) {
            moveNavToAside();
            console.log("ici");
        }*/
        
        if(landscape){
        //les polices sont d'un plus grand ratio par rapport a la taille de la page
        $("header a").css("font", window.innerHeight*0.09/3+"px/"+window.innerHeight*0.09+"px Junction, sans-serif");
        $("footer a").css("font", window.innerHeight*0.09/3+"px/"+window.innerHeight*0.09+"px Junction, sans-serif");
        

        $("nav a").css("font", window.innerHeight*0.09/3+"px/"+window.innerHeight*0.09+"px Junction, sans-serif");
        $("nav li").css("width", "100%");

        //header et footer height = 10% de la page chacun
        document.getElementsByTagName("header")[0].style.height = window.innerHeight*0.1+"px";
        document.getElementsByTagName("footer")[0].style.height = window.innerHeight*0.1+"px";
        

        document.getElementsByTagName("aside")[0].style.height = window.innerHeight*0.8-18+"px"; //ca c'est le menu
            
            console.log("small landscape");

       
        }
        else {
            console.log("where the hell am I ??");
            //ici le menu est caché...
            $("header a").css("font", window.innerWidth*0.09/3+"px/"+window.innerWidth*0.09+"px Junction, sans-serif");
            $("footer a").css("font", window.innerWidth*0.09/3+"px/"+window.innerWidth*0.09+"px Junction, sans-serif");
            

            $("nav a").css("font", window.innerWidth*0.09/3+"px/"+window.innerWidth*0.09+"px Junction, sans-serif");
            $("nav li").css("width", "100%");
            
            //header et footer height = 10% de la page chacun
            document.getElementsByTagName("header")[0].style.height = window.innerWidth*0.1+"px";
            document.getElementsByTagName("footer")[0].style.height = window.innerWidth*0.1+"px";
            
            //if (setStyle.arguments[0]!= true) location.reload();
        
        }
        
        
        
        //ca c'est pour le contenu principal de toutes les pages sauf de l'accueil...
            /*if (document.getElementById("alles") != null) {
            
            //ca c'est pour toutes les pages sauf l'accueil, il faut le finir
            document.getElementById("alles").style.width = window.innerWidth-document.getElementsByTagName("aside")[0].offsetWidth-20+"px";
            document.getElementById("alles").style.height = window.innerHeight*0.8-20+"px";
            document.getElementById("alles").style.overflow = "scroll";
            
             }*/

        
    }
    
    // et ca c'est pour voir si le UCBN dépasse et si oui le racourcir...
    document.getElementById("UCBN").innerHTML = "Université de Caen Basse-Normandie";
    if (document.getElementById("UCBN").scrollHeight >  document.getElementsByTagName("footer")[0].clientHeight) {
        document.getElementById("UCBN").innerHTML = "UCBN";
    }
    
     //this is a cheap fix for the couple of bugs we have when switching from one layout to another...
    oldWidth = window.innerWidth;


    
}



function header(){
    //cette fonction construit le header dans son ensemble, générant le menu de navigation à partir d'une liste.
    //each appending must be in new line. this is crap.
    //this method goes from top to bottom. (kinda...)
    
    dropDown = document.createElement("nav"); //this one needs to be global, it's the menu
    var firstUl = document.createElement("ul");
    dropDown.appendChild(firstUl);
    var clearer = document.createElement("div");
    clearer.setAttribute("class", "clearer");
    dropDown.appendChild(clearer);
    
    
    for (var element in navMenu){
        var li = document.createElement("li");
        var ul = document.createElement("ul");
        li.appendChild(ul); //this can be simplified
        firstUl.appendChild(li);
    }
    //now we have the global structure with nested lists, with as many elements as needed :¡
    // so next step is to fill the structure
    
    for (var i=0; i<navMenu.length; i++){ //parse the array
        //fill the first level
        var firstLi = firstUl.childNodes[i];
        var anchor = document.createElement("a");
        anchor.href = "#";
        anchor.appendChild(document.createTextNode(navMenu[i][0]));
        firstLi.insertBefore(anchor, firstLi.firstChild);
        
        //fill the second level
        var secondLevel = firstLi.lastChild;
        for (var j=1; j<navMenu[i].length; j++){
            var a = document.createElement("a");
            a.href = navMenu[i][j][0];
            a.appendChild(document.createTextNode(navMenu[i][j][1]));
            child = document.createElement("li");
            child.appendChild(a);
            secondLevel.appendChild(child);
        }
    }
    
    // et maintenant on place la structure créé dans le header
    document.getElementsByTagName("header")[0].appendChild(dropDown);
    
}



function moveNavToAside(){
    
    //et du coup la maintenant on crée un aside avec le id asideNav et on met le menu nav dedans
    var aside = document.createElement("aside");
    aside.setAttribute("id", "asideNav");
    var nav = document.getElementsByTagName("header")[0].removeChild(document.getElementsByTagName("header")[0].lastChild);
    document.body.insertBefore(aside, document.getElementById("beforeFooter"));
    document.getElementById("asideNav").appendChild(nav);

    
}

function moveNavToHeader(){
    
    //et du coup la maintenant on remet le menu nav dans le header
    var nav = document.getElementById("asideNav").removeChild(document.getElementById("asideNav").lastChild);
    document.getElementsByTagName("header")[0].appendChild(nav);
    document.body.removeChild(document.getElementById("asideNav"));
    document.getElementsByTagName("header")[0].style.width = "100%";
//    document.getElementById("first").style.removeAttribute("width"); //width = "auto";

    
    
}



