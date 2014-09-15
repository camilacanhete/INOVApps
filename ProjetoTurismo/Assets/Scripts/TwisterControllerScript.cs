using UnityEngine;
using System.Collections;

public class TwisterControllerScript : MonoBehaviour {

	private ParticleSystem.Particle[] particles = new ParticleSystem.Particle[1000];
	private Vector3 velocity, position;
	private Vector2 planarVelocity;
	private int length, i;
	private float radiusF;
	public float maxHeight = 1.0f;
	public float maxRadius = 2.0f;
	public float baseSpeed = 500;
	public float speedCoefficient = 1.0f;
	public float planarAcceleration = 1.0f;
	public float planarCoefficient = 1.0f;
	public float verticalAcceleration = 1.0f;
	public float verticalCoefficient = 1.0f;
	//public Transform reference;

	// Use this for initialization
	void Start () {
	}

	void Update () {
		length = particleSystem.GetParticles (particles);
		for (i = 0; i<length; i++) {
			position = particles[i].position;
			planarVelocity = new Vector2(position.x, position.y);
			radiusF = planarVelocity.sqrMagnitude;
			planarVelocity.Normalize ();
			planarVelocity = planarVelocity *
				Mathf.Pow (planarAcceleration * Mathf.Clamp((1.0f - radiusF / maxRadius), 0.0f, 1.0f),
				planarCoefficient);
			velocity = new Vector3 (planarVelocity.x, planarVelocity.y,
				Mathf.Pow(verticalAcceleration * Mathf.Clamp((1.0f - position.z / maxHeight), 0.0f, 1.0f),
			    verticalCoefficient));
			position = Quaternion.AngleAxis(Time.deltaTime *
			Mathf.Pow (baseSpeed * radiusF, speedCoefficient), new Vector3(0.0f, 0.0f, 1.0f)) * position;
			particles[i].velocity = velocity;
			particles[i].position = position;
			
		}
		
		particleSystem.SetParticles (particles, length);
	}

}
