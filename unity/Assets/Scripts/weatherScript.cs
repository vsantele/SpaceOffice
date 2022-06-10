using Microsoft.MixedReality.Toolkit.UI;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.UIElements;
using System.Timers;

public class weatherScript : MonoBehaviour
{
    public float timeLeft = 6f;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        timeLeft -= Time.deltaTime;
        if (timeLeft < 0)
        {
            GameObject.Find("astro").GetComponent<Player>().BaisserLesBras();
            Destroy(gameObject);
        }
    }
}

