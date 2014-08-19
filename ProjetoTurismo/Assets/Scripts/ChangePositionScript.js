#pragma strict

var speed : float = 4.0;
var currentMoves : int = 0;
var playerNumber : int = 1;
var offTileDistance : float = 0.3;

public var playerIsMoving : boolean = false;
 
private var nav : NavMeshAgent;					// Reference to the nav mesh agent.
private var nextPoint : GameObject = null;	
private var currentTile : int = 0;
private var movementDirection : Vector3 = Vector3.zero;
private var col : CapsuleCollider;

private var gameController : GameObject;

function Start () {
	nav = GetComponent(NavMeshAgent);
	col = GetComponent(CapsuleCollider);
	gameController = GameObject.Find("GameController");
	
}

function Update () {
 
 	nav.speed = speed;
 	
 	//Debug.Log(nav.remainingDistance);
 	
 	
 	if(currentMoves > 0 && nav.pathStatus == NavMeshPathStatus.PathComplete && nav.remainingDistance == 0)
 	{
 		nextPoint = GameObject.Find("Tile" + (currentTile + 1));
		
		if(currentMoves != 1)
		{
			movementDirection = nextPoint.transform.position;
		}
		else
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
			
			gameController.GetComponent(GameControllerScript).ChangeCurrentPlayer();
		}
		
		nav.destination = movementDirection;
	 	
 		currentMoves--;
 		currentTile++;
 		
 		playerIsMoving = true;
 	}
 	else
 	{
 		playerIsMoving = false;
 		
 		
 		if(playerNumber == gameController.GetComponent(GameControllerScript).currentPlayerNumber)
 		{
 			currentMoves = gameController.GetComponent(GameControllerScript).ChooseRandomNumber();
 		}
 		
 	}
	
}
