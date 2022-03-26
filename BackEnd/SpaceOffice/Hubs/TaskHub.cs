using Microsoft.AspNetCore.SignalR;

namespace SpaceOffice.Hubs
{
  public class TaskHub : Hub
  {
    public async Task SendMessage(string task)
    {
      await Clients.All.SendAsync("ReceiveTask", task);
    }
  }
}