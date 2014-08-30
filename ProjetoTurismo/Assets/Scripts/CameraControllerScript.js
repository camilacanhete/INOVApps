#pragma strict

public  var distance : float = 30.0;						//csantos: distance
public  var speed : float = 10.0;							//csantos: movement speed

private var cam : Camera;									//csantos: reference to camera component
private var gameController : GameObject;					//csantos: reference to game controller object
private var currentPlayer : GameObject;						//csantos: reference to current player playing

function Start () 
{
	gameController = GameObject.Find(Vars.GAME_CONTROLLER); //csantos: init game controller reference
	cam = gameObject.GetComponent("Camera");
}

function LateUpdate () 
{
	currentPlayer = gameController.GetComponent(GameControllerScript).currentPlayer;
	
	if (currentPlayer == null)
		return;

	transform.position = Vector3.Lerp(transform.position, currentPlayer.transform.position + new Vector3(-distance, distance, -distance), 0.5f * Time.deltaTime);
	cam.transform.LookAt(currentPlayer.transform);
	
	#if UNITY_EDITOR || UNITY_STANDALONE || UNITY_WEBPLAYER		
		cam.orthographicSize -= Input.GetAxis("Mouse ScrollWheel") * speed * Time.deltaTime;
	#elif UNITY_IPHONE || UNITY_ANDROID || UNITY_BLACKBERRY
		// Store both touches.
        var touchZero = Input.GetTouch(0);
        var touchOne = Input.GetTouch(1);

        // Find the position in the previous frame of each touch.
        var touchZeroPrevPos = touchZero.position - touchZero.deltaPosition;
        var touchOnePrevPos = touchOne.position - touchOne.deltaPosition;

        // Find the magnitude of the vector (the distance) between the touches in each frame.
        var prevTouchDeltaMag = (touchZeroPrevPos - touchOnePrevPos).magnitude;
        var touchDeltaMag = (touchZero.position - touchOne.position).magnitude;

        // Find the difference in the distances between each frame.
        var deltaMagnitudeDiff = prevTouchDeltaMag - touchDeltaMag;
        
		cam.orthographicSize += deltaMagnitudeDiff * speed * Time.deltaTime;
 	#endif
 	
 	cam.orthographicSize = Mathf.Max(cam.orthographicSize, 0.5f);
 	cam.orthographicSize = Mathf.Min(cam.orthographicSize, 15f);
}