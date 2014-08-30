#pragma strict

public var diceCanMove : boolean = false;

private var rotateDice : boolean = false;
private var diceSide : Vector3 = Vector3.zero;
private var speed : float = 10.0;
private var gameController : GameObject;					//csantos: reference to game controller object

function Start()
{
	gameController = GameObject.Find(Vars.GAME_CONTROLLER); //csantos: init game controller reference
}
 
function GetDiceRotation(value : int) : Vector3
{
	switch(value)
	{
		case 1:
			return Vector3(-90, 0, 0);
		break;
		case 2:
			return Vector3(0, 0, 90);
		break;
		case 3:
			return Vector3(0, -90, 180);
		break;
		case 4:
			return Vector3(0, 90, 0);
		break;
		case 5:
			return Vector3(0, -90, -90);
		break;
		case 6:
			return Vector3(90, 0, 0);
		break;
	}
	
	return Vector3(0, 0, 0);
}

function RotateDice(side : int)
{
	//renderer.enabled = true;
	rotateDice = true;
	diceSide = GetDiceRotation(side);
}

function Update()
{
	//if(renderer.enabled)
	//{
		//transform.position = Camera.main.ScreenToWorldPoint( Vector3(Screen.width/2, Screen.height/2, 10.0) );
		//var cam = gameObject.Find("3DGUICamera").camera;
		//transform.position = cam.ScreenToWorldPoint( Vector3(Screen.width/2, Screen.height/2, 10.0) );
		
		if(rotateDice)
		{	
			transform.rotation = Quaternion.Lerp (transform.rotation, Quaternion.Euler(diceSide), Time.deltaTime * speed);
		
			if(Quaternion.Angle(transform.rotation, Quaternion.Euler(diceSide)) < 0.5)
			{
				rotateDice = false;
				gameController.GetComponent(GameControllerScript).setTimerAndAction(2.0, GameControllerScript.MOVE_PLAYER);
			}
		}
	//}
}
