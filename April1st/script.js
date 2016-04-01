/**
 * Global function
 */ 
function ShowTag(id){
   document.getElementById(id).style.display="block";
}
 
function HideTag(id){
   document.getElementById(id).style.display="none";
}



/**
 * Engine
 */
var g_GameMode = null;
var g_PlayerName = null;
var g_Timer = null;
var g_MoveStep = 1.0;
var g_ManPlayer = null;
var g_ManPositionX = 0;
var g_ManPositionY = 0;
var g_WomanPlayer = null;
var g_WomanPositionX = 0;
var g_WomanPositionY = 0;

var g_ScreenWidth = 0;
var g_ScreenHeight = 0;

var g_MousePositionX = 0;
var g_MousePositionY = 0;


var g_Count = 0;


function RandomPlayerPosition()
{	
	if( 1==g_GameMode )	{
		if( g_MoveStep<=g_ScreenWidth/2.0 ) {
		    if( g_ManPositionX<g_ScreenWidth/2.0 ) {
				var lowBound = g_ManPositionX + g_MoveStep;
				g_WomanPositionX = lowBound + Math.random()*(g_ScreenWidth - lowBound);
			} else {
				var highBound = g_ManPositionX - g_MoveStep;
				g_WomanPositionX = Math.random()*highBound;				
			}
		}

		
		if( g_MoveStep<=g_ScreenHeight/2.0 ) {
		    if( g_ManPositionY<g_ScreenHeight/2.0 ) {
				var lowBound = g_ManPositionY + g_MoveStep;
				g_WomanPositionY = lowBound + Math.random()*(g_ScreenHeight - lowBound);
			} else {
				var highBound = g_ManPositionY - g_MoveStep;
				g_WomanPositionY = Math.random()*highBound;				
			}
		}
		
		if( g_WomanPositionX<0 ) g_WomanPositionX = 0;
		if( g_WomanPositionX>g_ScreenWidth ) g_WomanPositionX = g_ScreenWidth;		
		if( g_WomanPositionY<0 ) g_WomanPositionY = 0;
		if( g_WomanPositionY>g_ScreenHeight ) g_WomanPositionY = g_ScreenHeight;
		
	} else {
		// should impossible.
	}
}

function SaturatePlayerPosition()
{
	if( g_WomanPositionX<0 || g_WomanPositionX>g_ScreenWidth
     ||	g_WomanPositionY<0 || g_WomanPositionY>g_ScreenHeight )
	 {
		 RandomPlayerPosition();
	 }
	
	/*if( g_WomanPositionX<0 ) g_WomanPositionX += g_ScreenWidth;
	if( g_WomanPositionX>g_ScreenWidth ) g_WomanPositionX -= g_ScreenWidth;
	if( g_WomanPositionY<0 ) g_WomanPositionY += g_ScreenHeight;
	if( g_WomanPositionY>g_ScreenHeight ) g_WomanPositionY -= g_ScreenHeight;	
	
	if( g_ManPositionX<0 ) g_ManPositionX += g_ScreenWidth;
	if( g_ManPositionX>g_ScreenWidth ) g_ManPositionX -= g_ScreenWidth;
	if( g_ManPositionY<0 ) g_ManPositionY += g_ScreenHeight;
	if( g_ManPositionY>g_ScreenHeight ) g_ManPositionY -= g_ScreenHeight;*/		
}

 
function InitEngine()
{
	g_ScreenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    g_ScreenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	document.getElementById("LoginUI").style.height = g_ScreenHeight + "px";
	document.getElementById("ResultUI").style.height = g_ScreenHeight + "px";
}


function DeinitEngine()
{
	
}

function handleMouseMove(e)
{
	var dot, eventDoc, doc, body, pageX, pageY;

	event = event || window.event; // IE-ism

	// If pageX/Y aren't available and clientX/Y are,
	// calculate pageX/Y - logic taken from jQuery.
	// (This is to support old IE)
	if (event.pageX == null && event.clientX != null) {
		eventDoc = (event.target && event.target.ownerDocument) || document;
		doc = eventDoc.documentElement;
		body = eventDoc.body;

		event.pageX = event.clientX +
		  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
		  (doc && doc.clientLeft || body && body.clientLeft || 0);
		event.pageY = event.clientY +
		  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
		  (doc && doc.clientTop  || body && body.clientTop  || 0 );
	}
	
	g_MousePositionX = event.pageX;
	g_MousePositionY = event.pageY;
}


function GameUpdate()
{
	var dx = g_ManPositionX-g_WomanPositionX;
	var dy = g_ManPositionY-g_WomanPositionY;
		
	var moveStepX = Math.abs(dx)>g_MoveStep ? g_MoveStep : Math.abs(dx);
	var moveStepY = Math.abs(dy)>g_MoveStep ? g_MoveStep : Math.abs(dy);
	
	if( 1==g_GameMode )	{
		g_WomanPositionX -= dx>0 ? moveStepX : -moveStepX;
		g_WomanPositionY -= dy>0 ? moveStepY : -moveStepY;
		
		g_ManPositionX = g_MousePositionX;
		g_ManPositionY = g_MousePositionY;
	} else {
		g_ManPositionX -= dx>0 ? moveStepX : -moveStepX;
		g_ManPositionY -= dy>0 ? moveStepY : -moveStepY;	
		
        g_WomanPositionX = g_MousePositionX;
		g_WomanPositionY = g_MousePositionY;
	}
	
	SaturatePlayerPosition();
	
	g_ManPlayer.style.left = g_ManPositionX + "px";
	g_ManPlayer.style.top = g_ManPositionY + "px";
	
	g_WomanPlayer.style.left = g_WomanPositionX + "px";
	g_WomanPlayer.style.top = g_WomanPositionY + "px";	
	
	if( ++g_Count>20 ) {
		g_Count = 0;
		g_MoveStep += (1==g_GameMode ? 0.5 : 0.5);
		if( g_MoveStep<0 ) g_MoveStep = 0;
	}
	
	// Same position?
	if( Math.abs(dx)<g_MoveStep && Math.abs(dy)<g_MoveStep ) {
		//Game over
		DenitGame();
		HideTag("MainGame");
		ShowTag("ResultUI");
		return;
	}	
}

function InitGame()
{
	if(null==g_GameMode) return;	
	
    var g_ManPositionX = 0;
    var g_ManPositionY = 0;	
	g_WomanPositionX = g_ScreenWidth/2.0;
	g_WomanPositionY = g_ScreenHeight/2.0;	
	
	g_ManPlayer = document.getElementById("Man");
	g_WomanPlayer = document.getElementById("Woman");	
	var mainGameScreen = document.getElementById("MainGame");
	mainGameScreen.style.position="absolute";	
	
	g_ManPlayer.style.position="absolute";
	g_ManPlayer.style.left = g_ManPositionX + "px";
	g_ManPlayer.style.top = g_ManPositionY + "px";
	
	g_WomanPlayer.style.position="absolute";
	g_WomanPlayer.style.left = g_WomanPositionX + "px";
	g_WomanPlayer.style.top = g_WomanPositionY + "px";

	g_MoveStep = ( 1==g_GameMode ? 30 : 0 );
	
	document.onmousemove = handleMouseMove;
	g_Timer = setInterval(GameUpdate, 50);
}


function DenitGame() 
{
	clearInterval(g_Timer);
	g_Timer = null;
}



/**
 * LoginUI
 */
 function CheckPlayername()
 {
	var g_PlayerName = document.getElementById("PlayerName").value;
	if( "jyp"==g_PlayerName ) {
		g_GameMode = 1;
		HideTag("LoginUI");
		ShowTag("MainGame");
		InitGame();
	} else if( "wxl"==g_PlayerName ) {
		g_GameMode = 2;
		HideTag("LoginUI");
		ShowTag("MainGame");
		InitGame();
	} else {
		alert("Access denied.");
		g_GameMode = null;
	}
 }
 
 
 /**
  * MainGame
  */
