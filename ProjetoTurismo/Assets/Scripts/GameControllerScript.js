#pragma strict

var randomNum : int = 0;
var currentPlayerNumber : int = 1;
var currentPlayer : GameObject;
var numberOfTiles : GameObject[];
var players : GameObject[];

function Start () {
	numberOfTiles = GameObject.FindGameObjectsWithTag("Tile"); 
	players = GameObject.FindGameObjectsWithTag("Player"); 
	
	//temp
	currentPlayer = GameObject.Find("Player1");
	currentPlayer.GetComponent(ChangePositionScript).currentMoves = ChooseRandomNumber();
	
	Debug.Log("init player?");
}

function ChooseRandomNumber() : int{
	randomNum = Random.Range (1, 6);
	return randomNum;
}

function ChangeCurrentPlayer(){
	
	if(currentPlayerNumber == 4)
	{
		currentPlayerNumber = 1;
	}
	else
	{
		currentPlayerNumber = currentPlayerNumber + 1;	
	}
	
	for(var player in players)
	{
		if(player.GetComponent(ChangePositionScript).playerNumber == currentPlayerNumber)
		{
			player.GetComponent(ChangePositionScript).currentMoves = ChooseRandomNumber();
		}
	}
}

function Update () {

}