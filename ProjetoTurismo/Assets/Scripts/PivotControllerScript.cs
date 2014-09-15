using UnityEngine;
using System.Collections;

public class PivotControllerScript : MonoBehaviour {

	private Animator anim;
	private int movingStateHash = Animator.StringToHash("Base Layer.moving");
	private AnimatorStateInfo stateInfo;
	public float speed = 0.5f;
	private float start;

	// Use this for initialization
	void Start () {
		anim = GetComponent<Animator> ();
		start = Time.time;
	}
	
	// Update is called once per frame
	void Update () {
		/*float moveH = Input.GetAxis ("Horizontal");
		float moveV = Input.GetAxis ("Vertical");

		rigidbody.AddForce (new Vector3 (moveV, 0.0f, -moveH) * Time.deltaTime * 20.0f);*/
		float dTime = Time.time - start;
		if (dTime > 8) {
			anim.SetBool ("stopMoving", false);
		}

		if (dTime > 17) {
			anim.SetBool ("stopMoving", true);
		}

		stateInfo = anim.GetCurrentAnimatorStateInfo (0);
		if (movingStateHash == stateInfo.nameHash) {
			transform.Translate(-transform.forward * Time.deltaTime * speed);
		}
	}
}
