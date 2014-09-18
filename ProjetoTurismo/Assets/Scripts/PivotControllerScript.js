#pragma strict

private var anim : Animator;
private var movingStateHash : int  = Animator.StringToHash("Base Layer.moving");
private var stateInfo : AnimatorStateInfo;
private var currentBase : int = 0;
public var controller : GameControllerScript;
public var beacons : Transform[];
public var finishLine : int = 60;
public var speed : float = 0.5f;
private var start : float;
private var forward : boolean = true;
private var diceFace : int = 0;
public var ring : GameObject;
public var sparker : GameObject;
private var slot : Vector3;

// Use this for initialization
function Start () {
	anim = GetComponent(Animator);
	start = Time.time;
	slot = (transform.position - GameObject.Find('h0').transform.position) * 10;
}

function SetBase (bn : int) {
	currentBase = bn;
	transform.position = beacons[currentBase].position;
}

function Move (dFace : int) {
	beacons = controller.tileBeacons;
	diceFace = dFace;
    forward = diceFace > 0;
	if (forward) {
		if (currentBase + diceFace > finishLine) {
			diceFace = finishLine - currentBase;
		}
		anim.SetBool ("stopMoving", false);
		Invoke ("DepartAnimation", 0.9f);
	} else {
		SetBase (Mathf.Max(currentBase + diceFace, 0));
	}
}

function DepartAnimation () {
	TraversePath ();
}

function TraversePath () {
	diceFace--;
	if (diceFace < 0) {
		rigidbody.velocity = transform.forward * 0.0f;
		anim.SetBool("stopMoving", true);
		controller.setTimerAndAction (2.0f, GameControllerScript.CHANGE_CURRENT_PLAYER);
	} else {
		currentBase++;
		transform.position = beacons [currentBase-1].transform.TransformPoint(slot);
		var destiny : Vector3 = beacons [currentBase].transform.TransformPoint(slot);
		var path : Vector3 = destiny - transform.position;
		transform.LookAt (destiny, beacons [currentBase].up);
		rigidbody.velocity = transform.forward * speed;
		Invoke ("TraversePath", path.magnitude/speed);
	}
}
