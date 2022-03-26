using Microsoft.AspNetCore.SignalR;

namespace SpaceOffice.Hubs
{
  public class TaskHub : Hub
  {
    public async Task SendTask(string task)
    {
      await Clients.All.SendAsync("ReceiveTask", task);
    }

    public async Task SendWeather(string weather)
    {
      await Clients.All.SendAsync("ReceiveWeather", weather);
    }
  }
}