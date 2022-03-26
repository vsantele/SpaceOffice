using SpaceOffice.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

var app = builder.Build();



app.UseRouting();

app.UseAuthorization();

app.MapHub<TaskHub>("/taskHub");

app.Run();
