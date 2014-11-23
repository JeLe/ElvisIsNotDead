//la fonction premiere de ce script est de générer les parties communes de toutes les pages, afin de faciliter la maintenance.

window.onload = main;

function main(){
    //et tout d'abord le header

    header();
    
}

var navMenu = [["Musique", ["beauregard.html", "Beauregard"], ["jazz.html", "Jazz sous les Pommiers"]], ["Cinéma", ["deauville.html", "Festival de deauville"]], ["Tradition", ["medieval.html", "Festival médiéval de Bayeux"], ["cidre.html", "Cidre et Dragons"]]];


function header(){
    
    //cette fonction construit le header dans son ensemble, générant le menu de navigation à partir d'une liste.
    //each appending must be in new line. this is crap.
    //this method goes from top to bottom. (kinda...)
    
    
    
    //document.createElement("ul")); //can this be done at the end ?
    var firstUl = document.createElement("ul"); //thanks to this variable ?

    for (element in navMenu){
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


/*


var d = new Date(); //this is to try to benchmark the function...
//creation de tous les types d'éléments dont on aura besoin.
   idAttr.value = "left";
 var leftDiv = div.appendChild(idAttr);//removeChild(firstChild).appendChild(idAttr); //this is just in case..
 
// tous les types d'attributs possibles..

var classAttr = document.createAttribute("class");
//var idAttr = document.createAttribute("id");
//var src = document.createAttribute("src");
//var alt = document.createAttribute("alt");
//et apres on change juste les valeurs et on mets tout dans un shaker ! :)
//    classAttr.value = "fancy_dropdown_menu";




var href = document.createAttribute("href");
href.value = "#";
var anchor = document.createElement("a");
anchor.setAttributeNode(href);

var content = [];

for(var i in navMenu){
    
    //if you append two children to the same thing, do it in two seperate lines
    
    //et on doit pouvoir ajouter facilement des elements :)
    var lastLevel =[];
    for(n=1; n!=i.length; n++ ){ //skip first elemnt
        //en fait, il faut commencer par faire le dernier niveau, et petit a petit on remonte...
        //donc la on fait le bon lien et onle mets dans un li
        var a = document.createElement("a");
        href.value = i[n][0];//i hope href isn't a reference ...
        a.setAttributeNode(href);
        
        //et on le met dans lastLevel.
        lastLevel.push(document.createElement("li").appendChild(a.appendChild(document.createTextNode(i[n][1]))));
    }
    //at this point, lastLevel is full, so put it's content in a ul.
    
    var lastUl = document.createElement("ul");
    for(var n in lastLevel){
        lastUl.appendChild(n);
    }
    
    //now create firts level, with an anchor an lastUl
    
    firstLi = document.createElement("li").appendChild(anchor.appendChild(document.createTextNode(i[0])));
    console.log(firstLi);
    //content.push(firstLi.appendChild(lastUl));
    //content.push(firstLi.appendChild(document.createTextNode("iuvpbno")));
    
}

//now all the content is generated from navMenu.
//all we need to do is put it all together.
//    var menuDiv = document.createElement("div").appendChild(classAttr);
//   menuDiv.class = "fancy_dropdown_menu";

ul = document.createElement("ul");
for(var j in content){
    ul.appendChild(j);
}

document.getElementsByTagName("header")[0].appendChild(ul);

*/