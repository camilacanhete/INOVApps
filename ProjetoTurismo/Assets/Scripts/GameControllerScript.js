#pragma strict

//csantos: all actions in the game
public static var ACTION_CHANGE_CURRENT_PLAYER : String = "changeCurrentPlayer";

public var randomNum : int = 0;						//csantos: random number selected to move player
public var currentPlayerNumber : int = 1;			//csantos: player's number in the current turn
public var currentPlayer : GameObject;				//csantos: reference to current player's
public var numberOfTiles : GameObject[];			//csantos: reference to all tiles in the current game
public var players : GameObject[];					//csantos: reference to all players in the current game

private var countTime : float = 0.0;				//csantos: a time counter to give more space between actions
private var nextAction : String = "";				//csantos: reference to the next action
private var nextActionIsReady : boolean = false;	//csantos: control if the action can be executed or not

function Start () 
{
	numberOfTiles = GameObject.FindGameObjectsWithTag(Vars.TILE); //csantos: search all tiles
	players = GameObject.FindGameObjectsWithTag(Vars.PLAYER); //csantos: search all players
	
	//temp
	currentPlayer = GameObject.Find(Vars.FIRST_PLAYER);	//csantos: set first player to begin game
	currentPlayer.GetComponent(ChangePositionScript).currentMoves = ChooseRandomNumber(); //csantos: set a random number to move player
}

//csantos: select a random number to move player. this number will be shown with a dice.
function ChooseRandomNumber() : int
{
	randomNum = Random.Range (1, 6);
	return randomNum;
}

//csantos: change turns
function ChangeCurrentPlayer()
{
	
	if(currentPlayerNumber == players.length)
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

//csantos: set a timer and move on with the game
function setTimerAndAction(seconds : float, action : String)
{
	countTime = Time.deltaTime + seconds;
	nextAction = action;
}

//csantos: switch between game's actions
function checkNextAction()
{
	switch(nextAction)
	{
		case ACTION_CHANGE_CURRENT_PLAYER:
			ChangeCurrentPlayer();
		break;
	}
}

function Update () 
{

	//Debug.Log(Mathf.CeilToInt(countTime));
	
	//csantos: timer count down
	if(Mathf.CeilToInt(countTime) > 0) 
	{
		countTime -= Time.deltaTime;
		
		if(Mathf.CeilToInt(countTime) == 1)
		{
			nextActionIsReady = true;
		}
	}
	else
	{
		if(nextActionIsReady)
		{
			checkNextAction();
			nextActionIsReady = false;
		}
	}
}