#pragma strict

public var speed : float = 4.0;								//csantos: movement speed of player
public var currentMoves : int = 0;							//csantos: how many tiles player needs to move in the current turn
public var playerNumber : int = 1;							//csantos: number of the player's turn (first, second, third or forth)
public var offTileDistance : float = 0.3;					//csantos: off-path distance in the last movement of player's turn
public var playerIsMoving : boolean = false;				//csantos: check if player is moving
 
private var nav : NavMeshAgent;								//csantos: reference to the nav mesh agent
private var nextPoint : GameObject = null;					//csantos: reference to the next tile of the player's movement
private var currentTile : int = 0;							//csantos: current tile number
private var movementDirection : Vector3 = Vector3.zero;		//csantos: player's next movement direction
private var col : CapsuleCollider;							//csantos: reference to player's capsule collider

private var gameController : GameObject;					//csantos: reference to game controller object

function Start () 
{
	nav = GetComponent(NavMeshAgent); //csantos : init navmesh reference
	col = GetComponent(CapsuleCollider); //csantos : init capsule collider reference
	gameController = GameObject.Find(Vars.GAME_CONTROLLER); //csantos: init game controller reference
	
}

function Update () 
{
 
 	nav.speed = speed; //csantos: adjust speed manually
 	

 	//csantos: check if current tile is the last tile available in the board. if it is the last tile, we have a winner!
 	if(currentTile >= gameController.GetComponent(GameControllerScript).numberOfTiles.length)
 	{
 		Debug.Log("Player " + playerNumber + " won!");
 		return;
 	}
 	
 	//csantos: if still is player's turn and he/she is not moving yet
 	if(currentMoves > 0 && nav.pathStatus == NavMeshPathStatus.PathComplete && nav.remainingDistance == 0)
 	{
 		//csantos: set the next tile as the destination
 		nextPoint = GameObject.Find(Vars.TILE_NAME + (currentTile + 1));
		
		//csantos: if it isn't the last movement of the player in this turn, we keep him in the middle of the tile
		if(currentMoves != 1)
		{
			movementDirection = nextPoint.transform.position;
		}
		else //csantos: if it is the last movement of the player, we select a corner to keep him off-path.
		{
			switch(playerNumber)
			{
				case 1:
					movementDirection = Vector3(nextPoint.transform.position.x + offTileDistance, nextPoint.transform.position.y, nextPoint.transform.position.z - offTileDistance);
				break;
				case 2: 
					movementDirection = Vector3(nextPoint.transform.position.x + offTileDistance, nextPoint.transform.position.y, nextPoint.transform.position.z + offTileDistance);
				break;
				case 3: 
					movementDirection = Vector3(nextPoint.transform.position.x - offTileDistance, nextPoint.transform.position.y, nextPoint.transform.position.z + offTileDistance);
				break;
				case 4: 
					movementDirection = Vector3(nextPoint.transform.position.x - offTileDistance, nextPoint.transform.position.y, nextPoint.transform.position.z - offTileDistance);
				break;
			}

			//csantos: and we tell to game controller it is time to continue the game
			gameController.GetComponent(GameControllerScript).setTimerAndAction(5.0, GameControllerScript.ACTION_CHANGE_CURRENT_PLAYER);
		}
		
		//csantos: move the player to the next point
		nav.destination = movementDirection;
	 	
 		currentMoves--;
 		currentTile++;
 		
 		playerIsMoving = true;
 	}
 	else
 	{
 		playerIsMoving = false;
 		
 	}
	
}
