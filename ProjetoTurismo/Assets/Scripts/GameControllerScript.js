#pragma strict

//csantos: all actions in the game
public static var CHANGE_CURRENT_PLAYER : String = "changeCurrentPlayer";
public static var SHOW_DICE : String = "showDice";
public static var ROTATE_DICE : String = "rotateDice";
public static var MOVE_PLAYER : String = "movePlayer";

public var trackLength = 0;
public var randomNum : int = 0;						//csantos: random number selected to move player
public var currentPlayer : int = 0;			//csantos: player's number in the current turn
public var tileBeacons : Transform[];			//csantos: reference to all tiles in the current game
public var players : GameObject[];					//csantos: reference to all players in the current game
public var dice : GameObject;
public var players_hud : GameObject[];

private var countTime : float = 0.0;				//csantos: a time counter to give more space between actions
private var nextAction : String = "";				//csantos: reference to the next action

function Start () 
{
	//numberOfTiles = GameObject.FindGameObjectsWithTag(Vars.TILE); //csantos: search all tiles
	//players = GameObject.FindGameObjectsWithTag(Vars.PLAYER); //csantos: search all players
	LoadPlayers();
	LoadTiles();
	dice = GameObject.FindGameObjectWithTag(Vars.DICE);
	players_hud = GameObject.FindGameObjectsWithTag(Vars.PLAYER_HUD);
	
	//temp
	setTimerAndAction(0.0, CHANGE_CURRENT_PLAYER);
}

function LoadPlayers () {
	players = new GameObject[4];
	var tmpPlayers : GameObject[];
	tmpPlayers = GameObject.FindGameObjectsWithTag(Vars.PLAYER);
	for (var p in tmpPlayers) {
		if (p.name.StartsWith("Player")) {
			players[int.Parse(p.name.Replace("Player", ""))] = p;
		}
	}
}

function LoadTiles () {
	tileBeacons = new Transform[trackLength];
	var tmpBeacons : GameObject[];
	tmpBeacons = GameObject.FindGameObjectsWithTag(Vars.TILE);
	for (var b in tmpBeacons) {
		if (b.name.StartsWith("h")) {
			tileBeacons[int.Parse(b.name.Replace("h", ""))] = b.transform;
		}
	}	
}

//csantos: select a random number to move player. this number will be shown with a dice.
function ChooseRandomNumber()
{
	randomNum = Random.Range (1, 6);
	//randomNum = 1;
}

//csantos: change player's turn
function ChangeCurrentPlayer() {
	currentPlayer = Mathf.PingPong (currentPlayer, players.length-1) + 1;
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
				if(!hud.name.Contains(currentPlayer.ToString()))
				{
					hud.active = false;
				}
				
				i++;
			}
		break;
		case 2:
			for(var hud in players_hud)
			{
				if(!hud.name.Contains(currentPlayer.ToString()))
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
		if(hud.name.Contains(currentPlayer.ToString()))
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
	GameObject.Find("Player1").GetComponent(PivotControllerScript).Move (55);
	//players[currentPlayer].GetComponent(PivotControllerScript).Move (randomNum);
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
	if(dice) {
		UnityEngine.Object.Destroy(dice);
	}
	
	for(var tile in tileBeacons) {
		if(tile) {
			UnityEngine.Object.Destroy(tile);
		}
	}
	
	for(var player in players) {
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