using GameStore.Api.Dtos;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();



List<GameDto> games = [
    new (
        1, 
        "Street Fighter II", 
        "Fighting", 
        1499.00M, 
        new DateOnly(1992, 11, 1)
    ),
    new (
        2, 
        "Grand Theft Auto V", 
        "Action-Adventure", 
        2999.00M, 
        new DateOnly(2013, 9, 17)
    ),
    new (
        3, 
        "Astro Bot", 
        "Platformer", 
        3999.00M, 
        new DateOnly(2024, 9, 6)
    )
];

// GET /games
app.MapGet("/games", () => games);


// GET /games/1
app.MapGet("/games/{id}", (int id) => games.Find(game => game.Id == id));

// POST /games
app.MapPost("/games", (CreateGameDto gameDto) => {
    GameDto game = new (
        games.Count + 1,
        gameDto.Name,
        gameDto.Genre,
        gameDto.Price,
        gameDto.ReleaseDate
    );
    games.Add(game);
    return Results.Created($"/games/{game.Id}", game);
});

app.Run();
