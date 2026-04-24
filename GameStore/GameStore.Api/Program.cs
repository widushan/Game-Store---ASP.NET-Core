using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Endpoints;
using GameStore.Api.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddValidation();

builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors("AllowReactApp");

app.MapGamesEndpoints();

app.MapGeneresEndpoints();

app.MigrateDb();

app.Run();
