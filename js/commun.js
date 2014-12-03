

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
        console.log("youpi");
    }
    else {
        setStyle();
        window.onresize = setStyle;
    }

}


function setStyle(){
    var landscape = window.innerHeight < window.innerWidth;
    var portrait = !landscape;
    
    
    //taille du header. Importatnt, sinon il n'est pas displayed...
    //les header et footer sont dynamiques :)
    $("header a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");
    $("footer a").css("font", window.innerHeight*0.07/3+"px/"+window.innerHeight*0.07+"px Junction, sans-serif");
    
    document.getElementsByTagName("header")[0].style.height = window.innerHeight*0.08+"px";
    document.getElementsByTagName("footer")[0].style.height = window.innerHeight*0.08+"px";

    
    
    //cela correspond à nos &media queries
    if (window.innerHeight > 540 && window.innerWidth > 960 && landscape) {
        console.log("big");

    
        //un peu de style pour le menu deroulant automatique :
        var li = document.getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (i=0; i<li.length; i++){
            if ( li[i].parentNode.parentNode == document.getElementsByTagName("nav")[0]){
                li[i].style.width = 99/navMenu.length + "%";
            }
        }
    
    }
    else if(landscape){
        //mobile version
        // et du coup le menu déroulant va sur le coté :)
        //prévoir aussi le retour !!
        
        dropDown.insertBefore(document.getElementsByTagName("footer")[0]);
        console.log("small");
    }

}


//ce code est pour voir si l'ucbn est trop long ou pas ...

//if ($('#div-id')[0].scrollWidth >  $('#div-id').innerWidth()) {
    //Text has over-flowed
//}


