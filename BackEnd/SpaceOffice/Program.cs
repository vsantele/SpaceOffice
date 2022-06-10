using SpaceOffice.Hubs;

var builder = WebApplication.CreateBuilder(args);

var _policyName = "CorsPolicy";

builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: _policyName, policy =>
  {
    policy.AllowAnyOrigin();
    policy.AllowAnyHeader();
    policy.AllowAnyMethod();
  });
});

var app = builder.Build();



app.UseRouting();

app.UseAuthorization();
app.UseCors(_policyName);
app.MapHub<TaskHub>("/taskHub");

app.Run();
