#pragma strict

//csantos: all actions in the game
public static var CHANGE_CURRENT_PLAYER : String = "changeCurrentPlayer";
public static var SHOW_DICE : String = "showDice";
public static var ROTATE_DICE : String = "rotateDice";
public static var MOVE_PLAYER : String = "movePlayer";

public var randomNum : int = 0;						//csantos: random number selected to move player
public var currentPlayerNumber : int = 0;			//csantos: player's number in the current turn
public var currentPlayer : GameObject;				//csantos: reference to current player's
public var numberOfTiles : GameObject[];			//csantos: reference to all tiles in the current game
public var players : GameObject[];					//csantos: reference to all players in the current game
public var dice : GameObject;
public var players_hud : GameObject[];

private var countTime : float = 0.0;				//csantos: a time counter to give more space between actions
private var nextAction : String = "";				//csantos: reference to the next action

function Start () 
{
	numberOfTiles = GameObject.FindGameObjectsWithTag(Vars.TILE); //csantos: search all tiles
	players = GameObject.FindGameObjectsWithTag(Vars.PLAYER); //csantos: search all players
	dice = GameObject.FindGameObjectWithTag(Vars.DICE);
	players_hud = GameObject.FindGameObjectsWithTag(Vars.PLAYER_HUD);
	
	//temp
	setTimerAndAction(0.0, CHANGE_CURRENT_PLAYER);
}

//csantos: select a random number to move player. this number will be shown with a dice.
function ChooseRandomNumber()
{
	randomNum = Random.Range (1, 6);
	//randomNum = 1;
}

//csantos: change player's turn
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
	
	currentPlayer = GameObject.Find(Vars.PLAYER + currentPlayerNumber);
	updateHUD();
	Debug.Log("here");
	
}

function initHUD()
{
	var i : int = 1;
	
	switch(players.length)
	{
		case 1:
			for(var hud in players_hud)
			{
				if(!hud.name.Contains(currentPlayerNumber.ToString()))
				{
					hud.active = false;
				}
				
				i++;
			}
		break;
		case 2:
			for(var hud in players_hud)
			{
				if(!hud.name.Contains(currentPlayerNumber.ToString()))
				{
					hud.active = false;
				}
			}
		break; 
	}
}

function updateHUD()
{
	for(var hud in players_hud)
	{
		if(hud.name.Contains(currentPlayerNumber.ToString()))
		{
			TweenAlpha.Begin(hud, 0.6, 1.0);
		}
		else
		{
			TweenAlpha.Begin(hud, 0.6, 0.5);
		}
	}
}

//csantos: move current player on the board
function moveCurrentPlayer()
{
	for(var player in players)
	{
		if(player.GetComponent(ChangePositionScript).playerNumber == currentPlayerNumber)
		{
			player.GetComponent(ChangePositionScript).currentMoves = randomNum;
		}
	}
}

//csantos: change if dice can move or not
function ToggleDiceMovement()
{
	if(dice.GetComponent(DiceScript).diceCanMove)
	{
		dice.GetComponent(DiceScript).diceCanMove = false;
	}
	else
	{
		dice.GetComponent(DiceScript).diceCanMove = true;
	}
}

//csantos: enable/disable dice to gain performance
function ToggleDiceVisibility(enable : boolean)
{
	if(!enable)
	{
		dice.active = false;
	}
	else
	{
		dice.active = true;
	}
}

//csantos: check if dice can move or already moved
function checkIfDiceCanMove() : boolean
{
	return dice.GetComponent(DiceScript).diceCanMove;
}

//csantos: set a timer and move on with the game
function setTimerAndAction(seconds : float, action : String)
{
	countTime = seconds;
	nextAction = action;
	
	Invoke("CheckNextAction", seconds);
}

//csantos: switch between game's actions
function CheckNextAction()
{
	switch(nextAction)
	{
		case CHANGE_CURRENT_PLAYER:
			ChangeCurrentPlayer();
			setTimerAndAction(2.0, SHOW_DICE);
		break;
		case SHOW_DICE:
			ToggleDiceVisibility(true);
			ToggleDiceMovement();
		break;
		case ROTATE_DICE:
			//ChangeCurrentPlayer();
			ChooseRandomNumber();
			//setTimerAndAction(3.0, MOVE_PLAYER);
			ToggleDiceMovement();
			dice.GetComponent(DiceScript).RotateDice(randomNum);
		break;
		case MOVE_PLAYER:
			ToggleDiceVisibility(false);
			moveCurrentPlayer();
		break;
	}
	
	Debug.Log(nextAction);
}

//csantos: clean up the house on user quit
function OnApplicationQuit()
{	
	if(currentPlayer)
	{
		UnityEngine.Object.Destroy(currentPlayer);
	}
	
	if(dice)
	{
		UnityEngine.Object.Destroy(dice);
	}
	
	for(var tile in numberOfTiles)
	{
		if(tile)
		{
			UnityEngine.Object.Destroy(tile);
		}
	}
	
	for(var player in players)
	{
		if(player)
		{
			UnityEngine.Object.Destroy(player);
		}
	}
	
	for(var hud in players_hud)
	{
		if(hud)
		{
			UnityEngine.Object.Destroy(hud);
		}
	}
}