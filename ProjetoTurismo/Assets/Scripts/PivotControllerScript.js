#pragma strict

private var anim : Animator;
private var movingStateHash : int  = Animator.StringToHash("Base Layer.moving");
private var stateInfo : AnimatorStateInfo;
private var position : int = 0;
public var controller : GameControllerScript;
public var beacons : Transform[];
public var finishLine : int = 60;
public var speed : float = 0.5f;
private var start : float;
private var forward : boolean = true;
private var diceFace : int = 0;

// Use this for initialization
function Start () {
	anim = GetComponent(Animator);
	start = Time.time;
}

function SetBase (bn : int) {
	position = bn;
	transform.position = beacons[position].position;
}

function Move (dFace : int) {
	beacons = controller.tileBeacons;
	diceFace = dFace;
    forward = diceFace > 0;
	if (forward) {
		if (position + diceFace > finishLine) {
			diceFace = finishLine - position;
		}
		anim.SetBool ("stopMoving", false);
		Invoke ("DepartAnimation", 0.9f);
	} else {
		SetBase (Mathf.Max(position + diceFace, 0));
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
	} else {
		position++;
		transform.position = beacons [position-1].position;
		var path : Vector3 = beacons [position].position - transform.position;
		transform.LookAt (beacons [position].position, beacons [position].up);
		rigidbody.velocity = transform.forward * speed;
		Invoke ("TraversePath", path.magnitude/speed);
	}
}
