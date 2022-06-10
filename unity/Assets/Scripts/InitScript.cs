using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InitScript : MonoBehaviour
{

   
    public void SpawnAstro()
    {

        var oldAstro = GameObject.Find("astro");
        if (oldAstro != null) Destroy(oldAstro);
        GameObject astro = Resources.Load<GameObject>("Stylized Astronaut");
        GameObject camera = GameObject.Find("Main Camera");
        Vector3 position = camera.transform.position;
        position.z += 1;
        astro = Instantiate(astro, position, Quaternion.identity);
        
        astro.name = "astro";
    }

    

    public void FollowMe()
    {
        GameObject.Find("astro").GetComponent<Player>().FollowMe();
    }


    public void Danse()
    {
        GameObject.Find("astro").GetComponent<Player>().Danser();
    }


    public void LeaveMe()
    {
        GameObject.Find("astro").GetComponent<Player>().LeaveMe();
    }
}
