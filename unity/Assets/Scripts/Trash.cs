using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Trash : MonoBehaviour
{

    public void DisplayTrashCan()
    {
        GameObject trashCan = Resources.Load<GameObject>("trash_can");
        Vector3 pose = GameObject.Find("astro").transform.position;
        pose.y += 0.6f;
        pose.x += 0.6f;
        trashCan = Instantiate(trashCan, pose, trashCan.transform.rotation);
        trashCan.name = "trashcan";
    }

    public void HideTrashCan()
    {
        Destroy(GameObject.Find("trashcan"));
    }

    private void OnCollisionEnter(Collision collision)
    {
        if(gameObject.name == "Cylinder")
        {
            Destroy(collision.gameObject);
            Destroy(GameObject.Find("trashcan"));
        }
            
    }
}
