#pragma strict

private var gameController : GameObject;					//csantos: reference to game controller object

function Start()
{
	Screen.sleepTimeout = SleepTimeout.NeverSleep; //csantos: make android screen never fade out
	
	gameController = GameObject.Find(Vars.GAME_CONTROLLER); //csantos: init game controller reference
	
	//csantos: to increate performance in mobile devices is advised to user InvokeRepeating() 
	//instead of default Update() function in all functions that don't use Time.deltatime as a parameter
	InvokeRepeating("CheckKeyPressed",0.02, 0.02);    
}

function CheckKeyPressed () 
{
	if (Input.GetKey(KeyCode.Escape))
    {
    	Application.Quit();
    	return;
    }
    
    //Debug.Log(Input.touches.length);
    
    if ((Input.GetButtonUp("Jump") ||  Input.touches.length != 0) && gameController != null)
	{
		if(gameController.GetComponent(GameControllerScript).checkIfDiceCanMove())
		{
			gameController.GetComponent(GameControllerScript).setTimerAndAction(0.0, GameControllerScript.ROTATE_DICE);
			
		}
	}
}