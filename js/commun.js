

var navMenu = [["Musique", ["beauregard.html", "Beauregard"], ["jazz.html", "Jazz sous les Pommiers"]], ["Cinéma", ["deauville.html", "Festival de deauville"]], ["Tradition", ["medieval.html", "Festival médiéval de Bayeux"], ["cidre.html", "Cidre et Dragons"]]];


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


window.onload = load;


function load(){
    header();

    if (location.href.slice(-12)=="accueil.html" || location.href.slice(-13)=="accueil.html#" ){
            main();
        
        }
    else {
        setStyle();
        window.onresize = setStyle;
    }
    
    
    //et la derniere chose qu'on fait apres le chargement de la page, c'est de charger les src des iframes, commme ca ils ne ralentissent pas toute la page :)
    //il faudra juste que ca dépende de sur quelle page on est ...
    setTimeout(function(){
               var iframeSrc = ["http://www.dailymotion.com/embed/video/x11kf4c", "http://www.youtube.com/embed/34HluqAbGYA", "http://www.youtube.com/embed/urnKEleBBZc"];
               for (var i=0; i< document.getElementsByTagName("iframe").length; i++){
               document.getElementsByTagName("iframe")[i].setAttribute("src", iframeSrc[i]);
               }}, 2000);
}


function setStyle(){
    var landscape = window.innerHeight < window.innerWidth;
    //var portrait = !landscape; Pour l'instant, rien ne marche en mode portrait...
    
    
    //cela correspond à nos &media queries
    if (window.innerHeight > 540 && window.innerWidth > 960 && landscape) {
        //on commence par vérifier que le nav est a la bonne place.
        if (document.getElementsByTagName("nav")[0].parentNode == document.getElementById("asideNav")) {
            moveNavToHeader();
            console.log("nav in header ");
        }
        
        //taille du header. Importatnt, sinon il n'est pas displayed...
        //les header et footer sont dynamiques :)
        $("header a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");
        $("footer a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");
        
        document.getElementsByTagName("header")[0].style.height = window.innerHeight*0.08+"px";
        document.getElementsByTagName("footer")[0].style.height = window.innerHeight*0.08+"px";
    
        //un peu de style pour le menu deroulant automatique :
        var li = document.getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (var i=0; i<li.length; i++){
            if ( li[i].parentNode.parentNode == document.getElementsByTagName("nav")[0]){
                li[i].style.width = 99/navMenu.length + "%";
            }
        }
    
    }
    else if(landscape){
        //wierd cases : height not big enough
        //portrait...
        //en gros quand en grand il est pas assez haut et en petit qu'il l'est trop...
        
        //mobile version
        // et du coup le menu déroulant va sur le coté :)
        if (document.getElementById("asideNav") == null) {
            moveNavToAside();
        }
        console.log("small");
        
        $("header a").css("font", window.innerHeight*0.09/3+"px/"+window.innerHeight*0.09+"px Junction, sans-serif");
        $("footer a").css("font", window.innerHeight*0.09/3+"px/"+window.innerHeight*0.09+"px Junction, sans-serif");
        
        //ca il va falloir le faire en fonction du nombre de trucs dans le menu
        $("nav a").css("font", window.innerHeight*0.09/3+"px/"+window.innerHeight*0.09+"px Junction, sans-serif");
        
        //header et footer height = 10% de la page
        document.getElementsByTagName("header")[0].style.height = window.innerHeight*0.1+"px";
        document.getElementsByTagName("footer")[0].style.height = window.innerHeight*0.1+"px";
        
        document.getElementsByTagName("aside")[0].style.top = window.innerHeight*0.1+8+"px";
        document.getElementsByTagName("aside")[0].style.height = window.innerHeight*0.8+"px";

        // et le header fait la meme taille que le menu
        document.getElementsByTagName("header")[0].style.width = document.getElementsByTagName("aside")[0].offsetWidth+"px";
        
        $("nav li").css("width", "100%");
        
    }
    
    // et ca c'est pour voir si le UCBN dépasse


    
    document.getElementById("UCBN").innerHTML = "Université de Caen Basse-Normandie";
    console.log(document.getElementById("UCBN").scrollHeight);
    if (document.getElementById("UCBN").scrollHeight >  document.getElementsByTagName("footer")[0].clientHeight) {
        document.getElementById("UCBN").innerHTML = "UCBN";
    }

}


function moveNavToAside(){
    
    //et du coup la maintenant on crée un aside avec le id asideNav et on met le menu nav dedans
    var aside = document.createElement("aside");
    aside.setAttribute("id", "asideNav");
    var nav = document.getElementsByTagName("header")[0].removeChild(document.getElementsByTagName("header")[0].lastChild);
    document.body.insertBefore(aside, document.getElementsByTagName("footer")[0]);
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



