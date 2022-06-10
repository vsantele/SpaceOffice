using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour
{

	private Animator anim;
	private CharacterController controller;
	public bool isFollowMe;
	public bool DataNeedToBeDisplay = false;

	public float speed = 50.0f;
	public float turnSpeed = 400.0f;
	private Vector3 moveDirection = Vector3.zero;
	public float gravity = 20.0f;
	public string actualDataType;
	public string actualData;

	void Start()
	{
		controller = GetComponent<CharacterController>();
		anim = gameObject.GetComponentInChildren<Animator>();
		isFollowMe = false;
	}

	void Update()
	{
		Vector3 targetPostition = new Vector3(GameObject.Find("Main Camera").transform.position.x,
									   this.transform.position.y,
										GameObject.Find("Main Camera").transform.position.z);
		this.transform.LookAt(targetPostition);
		if (controller.isGrounded)
		{
			moveDirection = transform.forward * Input.GetAxis("Vertical") * speed;
		}

		float turn = Input.GetAxis("Horizontal");
		transform.Rotate(0, turn * turnSpeed * Time.deltaTime, 0);
		controller.Move(moveDirection * Time.deltaTime);
		moveDirection.y -= gravity * Time.deltaTime;
		if (isFollowMe)
		{
			GoToUserPosition();
		}

	}

	public void BaisserLesBras()
	{
		anim.SetInteger("AnimationLeverBras", 0);
	}

	public void LeverLesBras()
	{
		GetComponent<AudioSource>().clip = Resources.Load<AudioClip>("twitter");
		GetComponent<AudioSource>().volume = 1;
		GetComponent<AudioSource>().PlayDelayed(2);
		anim.SetInteger("AnimationLeverBras", 1);
		anim.SetInteger("AnimationDance", 0);
	}

	public void Danser()
	{
        if (anim.GetInteger("AnimationDance") == 0)
        {
			GetComponent<AudioSource>().clip = Resources.Load<AudioClip>("macarena");
			GetComponent<AudioSource>().volume = 1;
			anim.SetInteger("AnimationDance", 1);
			GetComponent<AudioSource>().PlayDelayed(1.5f);
			Invoke("StopDanse", 7.5f);
        }
	}

	public void StopDanse()
    {
		anim.SetInteger("AnimationDance", 0);
	}

	public void FollowMe()
	{
		isFollowMe = true;
	}

	public void LeaveMe()
	{
		isFollowMe = false;
		anim.SetInteger("AnimationPar", 0);

	}

	public void GoToUserPosition()
	{
		var offset = GameObject.Find("Main Camera").transform.position - transform.position;
		//Get the difference.
		if (offset.magnitude > 2)
		{
			anim.SetInteger("AnimationDance", 0);
			//If we're further away than .1 unit, move towards the target.
			//The minimum allowable tolerance varies with the speed of the object and the framerate. 
			// 2 * tolerance must be >= moveSpeed / framerate or the object will jump right over the stop.
			offset = offset.normalized * speed;
			//normalize it and account for movement speed.
			anim.SetInteger("AnimationPar", 1);
			controller.Move(offset * Time.deltaTime);
			//actually move the character.
		}
		else
		{
			anim.SetInteger("AnimationPar", 0);
			if (actualDataType != "" && actualDataType == "weather" && DataNeedToBeDisplay)
			{
				LeverLesBras();
				Invoke("CreateWeather", 2);
				DataNeedToBeDisplay = false;
			}
			else if (actualDataType != "" && actualDataType == "task" && DataNeedToBeDisplay)
			{
				LeverLesBras();
				Invoke("CreateTodo", 2);
				DataNeedToBeDisplay = false;
			}
		}
	}

	public void NewData(string type, string data)
	{
		FollowMe();
		DataNeedToBeDisplay = true;
		actualDataType = type;
		actualData = data;
	}

	public void CreateTodo()
	{
		GameObject todo = Resources.Load<GameObject>("Task");
		todo.GetComponent<TodoTask>().SetText(actualData);
		todo = Instantiate(todo, new Vector3(transform.position.x, (float)(transform.position.y + 1), transform.position.z), todo.transform.rotation, GameObject.Find("astro").transform);
		todo.name = actualData;
		actualData = actualDataType = "";
		DataNeedToBeDisplay = false;
	}

	public void CreateWeather()
	{
		GameObject weatherobj;
		switch (actualData)
		{
			case "sunny":
				weatherobj = Resources.Load<GameObject>("sun");
				break;
			case "cloudy":
				weatherobj = Resources.Load<GameObject>("cloud");
				break;

			case "rainy":
				weatherobj = Resources.Load<GameObject>("rain");
				break;
			case "snowy":
				weatherobj = Resources.Load<GameObject>("snow");
				break;

			default:
				weatherobj = Resources.Load<GameObject>("cloud");
				break;

		}
		weatherobj = Instantiate(weatherobj, new Vector3(transform.position.x, (float)(transform.position.y + 1), transform.position.z), weatherobj.transform.rotation, GameObject.Find("astro").transform);
		weatherobj.name = "weatherIcon";
		actualData = actualDataType = "";
		DataNeedToBeDisplay = false;
	}

	//public void SetWeather(string weather)
	//   {
	//	this.weather = weather;
	//   }

}
