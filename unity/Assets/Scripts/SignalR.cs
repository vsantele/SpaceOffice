using UnityEngine;
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Threading.Tasks;

public class SignalR : MonoBehaviour
{
    private static HubConnection connection;
    public string connectionId;
    // Start is called before the first frame update
    void Start()
    {
        connection = new HubConnectionBuilder()
                .WithUrl("https://spaceoffice.vsantele.dev/taskHub")
                .WithAutomaticReconnect()
                .Build();

        connection.Closed += async (error) =>
        {
            await Task.Delay(new System.Random().Next(0, 5) * 1000);
            await connection.StartAsync();
        };
        Connect();
    }

    // Update is called once per frame
    void Update()
    {

    }

    private async void Connect()
    {

        connection.On<string>("ReceiveWeather", (weather) =>
        {
            Debug.Log("re"+ weather);
            GameObject.Find("astro").GetComponent<Player>().NewData("weather", weather);
        });
        connection.On<string>("ReceiveTask", (task) =>
        {
            Debug.Log(task);
            GameObject.Find("astro").GetComponent<Player>().NewData("task", task);
        });

        

        try
        {
            await connection.StartAsync();
            connectionId = connection.ConnectionId;
            Debug.Log("SignalR Connected");

        }
        catch (Exception ex)
        {
            Debug.Log(ex.Message);
        }
    }
}
