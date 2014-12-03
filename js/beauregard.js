window.onload=load
function setSizes(){
document.getElementById("buttons").style.width=window.innerwidth*0.6+"px";
document.getElementsByTagName("iframe")[0].style.width=window.innerwidth*0.6+"px";
}

function zwoush(){
scrollTo(0,150);
}
function load(){
setSizes();
document.getElementsByClassName("button")[1].onclick=zwoush;
}