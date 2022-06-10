using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class WeatherInfo : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void setText(string newText)
    {
        gameObject.transform.GetChild(0).GetComponent<TextMeshPro>().text = newText;
    }

    private void OnCollisionEnter(Collision collision)
    {
        GetComponent<Rigidbody>().constraints = RigidbodyConstraints.FreezePosition;
    }
}


