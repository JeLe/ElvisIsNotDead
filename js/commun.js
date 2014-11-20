//la fonction premiere de ce script est de générer les parties communes de toutes les pages, afin de faciliter la maintenance.

window.onload = main;

function main(){
//et tout d'abord le header
    header();
    

}

navMenu = [[Musique, [Beauregard, Jazz sous les Pommiers]], [Cinéma, []], [Tradition, [Festival médiéval, Cidre et Dragons]]];

function header(){
    //creation de tous les types d'éléments dont on aura besoin.
    var nav = document.createElement("nav");
    var div = document.createElement("div");
    var anchor = document.createElement("a");
    var list = document.createElement("ul");
    var listElement = document.createElement("li");

    var classAttr = document.createAttribute("class");
    var idAttr = document.createAttribute("id");
    var href = document.createAttribute("href");
    var src = document.createAttribute("src");
    var alt = document.createAttribute("alt");
    //et apres on change juste les valeurs et on mets tout dans un shaker ! :)
    
//    classAttr.value = "fancy_dropdown_menu";
    var menuDiv = div.appendChild(classAttr);
    menuDiv.class = "fancy_dropdown_menu";
    idAttr.value = "left";
    var leftDiv = div.appendChild(idAttr);//removeChild(firstChild).appendChild(idAttr); //this is just in case..
    
    
}

