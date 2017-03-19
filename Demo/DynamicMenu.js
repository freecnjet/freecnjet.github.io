function DisplayElement(eid, newDisplay) {
	document.getElementById(eid).style.display=newDisplay;
}


function clickStartButton() {
    DisplayElement('StartButton', 'none'); 
	DisplayElement('MainMenu', 'block');
}
