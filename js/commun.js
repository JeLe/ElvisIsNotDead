//la fonction premiere de ce script est de générer les parties communes de toutes les pages, afin de faciliter la maintenance.

window.onload = main;

function main(){
    header();
    
}

var navMenu = [["Musique", ["beauregard.html", "Beauregard"], ["jazz.html", "Jazz sous les Pommiers"]], ["Cinéma", ["deauville.html", "Festival de deauville"]], ["Tradition", ["medieval.html", "Festival médiéval de Bayeux"], ["cidre.html", "Cidre et Dragons"]]];


function header(){
    
    //cette fonction construit le header dans son ensemble, générant le menu de navigation à partir d'une liste.
    //each appending must be in new line. this is crap.
    //this method goes from top to bottom. (kinda...)
    
    var homeTitle = document.createElement("div");
    homeTitle.setAttribute("id", "left");
    var homeLink = document.createElement("a");
    homeLink.src="#";
    homeLink.appendChild(document.createElement("img"));
    
    //document.createElement("ul")); //can this be done at the end ?
    var firstUl = document.createElement("ul"); //thanks to this variable ?

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
    
    
    document.getElementsByTagName("header")[0].appendChild(firstUl);
    document.body.appendChild(document.adoptNode(firstUl)); //this works, can be good for putting menu in an other container.
 }


