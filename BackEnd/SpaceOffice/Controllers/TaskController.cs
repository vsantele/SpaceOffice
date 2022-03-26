using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SpaceOffice.Hubs;

namespace SpaceOffice.Contollers;



[ApiController]
[Route("api/")]
public class TaskController : ControllerBase
{
  private IHubContext<TaskHub> TaskHubContext { get; set; }
  public TaskController(IHubContext<TaskHub> hubcontext)
  {
    TaskHubContext = hubcontext;
  }
  // GET: api/task
  [HttpGet("task/{task}")]
  public async Task<ActionResult<string>> Get(string task)
  {
    Console.WriteLine(task);
    await TaskHubContext.Clients.All.SendAsync("ReceiveTask", task);
    return "OK";
  }

}
