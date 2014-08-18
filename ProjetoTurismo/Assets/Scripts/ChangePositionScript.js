#pragma strict

var speed : float = 4.0;
var currentMoves : int = 0;
 
private var nav : NavMeshAgent;					// Reference to the nav mesh agent.

private var nextPoint : GameObject = null;	
private var currentTile : int = 0;

function Start () {
	nav = GetComponent(NavMeshAgent);
	
}

function Update () {
 
 	nav.speed = speed;
 	
 	Debug.Log(nav.remainingDistance);
 	
 	if(currentMoves > 0 && nav.pathStatus == NavMeshPathStatus.PathComplete && nav.remainingDistance == 0)
 	{
 		nextPoint = GameObject.Find("Tile" + (currentTile + 1));

	 	nav.destination = nextPoint.transform.position;
	 	
 		currentMoves--;
 		currentTile++;
 	}
	
}