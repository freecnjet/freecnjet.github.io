/**
 * Global function
 */ 
function ShowTag(id){
   document.getElementById(id).style.display="block";
}
 
function HideTag(id){
   document.getElementById(id).style.display="none";
}


function DX(a, b)
{
	return 0;
}

function DY(a, b)
{
	return 0;
}


/**
 * Engine
 */
var g_GameMode = null;
var g_PlayerName = null;
var g_Timer = null;
var g_MoveStep = 0.5;
var g_ManPlayer = null;
var g_ManPositionX = 100;
var g_ManPositionY = 100;
var g_WomanPlayer = null;
var g_WomanPositionX = 200;
var g_WomanPositionY = 200;

var g_ScreenWidth = 0;
var g_ScreenHeight = 0;

//var g_Count = 0;


function SaturatePlayerPosition()
{
	if( g_WomanPositionX<0 ) g_WomanPositionX = 0;
	if( g_WomanPositionX>g_ScreenWidth ) g_WomanPositionX = g_ScreenWidth;
	if( g_WomanPositionY<0 ) g_WomanPositionY = 0;
	if( g_WomanPositionY>g_ScreenHeight ) g_WomanPositionY = g_ScreenHeight;	
	
	if( g_ManPositionX<0 ) g_ManPositionX = 0;
	if( g_ManPositionX>g_ScreenWidth ) g_ManPositionX = g_ScreenWidth;
	if( g_ManPositionY<0 ) g_ManPositionY = 0;
	if( g_ManPositionY>g_ScreenHeight ) g_ManPositionY = g_ScreenHeight;		
}

 
function InitEngine()
{
	HideTag("LoginUI");
	ShowTag("MainGame");
	g_GameMode = 2;
	InitGame();
    HideTag("ResultUI");
}


function DeinitEngine()
{
	
}


function GameUpdate()
{
	var man_player = document.getElementById("jyp");
	var woman_player = document.getElementById("wxl");
	
	var dx = g_ManPositionX-g_WomanPositionX;
	var dy = g_ManPositionY-g_WomanPositionY;
	
	if( 1==g_GameMode )	{
		g_WomanPositionX -= dx>0 ? g_MoveStep : -g_MoveStep;
		g_WomanPositionY -= dy>0 ? g_MoveStep : -g_MoveStep;
	} else {
		g_ManPositionX -= dx>0 ? g_MoveStep : -g_MoveStep;
		g_ManPositionY -= dy>0 ? g_MoveStep : -g_MoveStep;		
	}
	
	SaturatePlayerPosition();
	
	g_ManPlayer.style.left = g_ManPositionX + "px";
	g_ManPlayer.style.top = g_ManPositionY + "px";
	
	g_WomanPlayer.style.left = g_WomanPositionX + "px";
	g_WomanPlayer.style.top = g_WomanPositionY + "px";	
	
	//++g_Count;
	//document.getElementById("jyp").innerHTML = g_Count;
}

function InitGame()
{
	if(null==g_GameMode) return;

	g_ManPlayer = document.getElementById("jyp");
	g_WomanPlayer = document.getElementById("wxl");
	
	var mainGameScreen = document.getElementById("MainGame");
	mainGameScreen.style.position="absolute";
    g_ScreenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    g_ScreenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	g_ManPlayer.style.position="absolute";
	g_ManPlayer.style.left = g_ManPositionX + "px";
	g_ManPlayer.style.top = g_ManPositionY + "px";
	
	g_WomanPlayer.style.position="absolute";
	g_WomanPlayer.style.left = g_WomanPositionX + "px";
	g_WomanPlayer.style.top = g_WomanPositionY + "px";
	
	
	g_Timer = setInterval(GameUpdate, 33);
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
