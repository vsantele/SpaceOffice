using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HandMenuManager : MonoBehaviour
{
    public static HandMenuManager instance;
    void Awake()
    {
        instance = this;
    }
}
