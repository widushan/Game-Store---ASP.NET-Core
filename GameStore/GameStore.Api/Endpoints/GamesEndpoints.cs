namespace GameStore.Api.Endpoints;
using GameStore.Api.Dtos;



public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";

    private static readonly List<GameDto> games = [
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

    public static void MapGamesEndpoints(this WebApplication app)
    {

        var group = app.MapGroup("/games");

        // GET /games
        group.MapGet("/", () => games);


        // GET /games/1
        group.MapGet("/{id}", (int id) => {
            var game = games.Find(game => game.Id == id);
            return game is null ? Results.NotFound() : Results.Ok(game);
        })
        .WithName(GetGameEndpointName)
        ;

        // POST /games
        group.MapPost("/", (CreateGameDto gameDto) => {

            // Validation
            if (string.IsNullOrWhiteSpace(gameDto.Name)) return Results.BadRequest("Name is required");
            if (string.IsNullOrWhiteSpace(gameDto.Genre)) return Results.BadRequest("Genre is required");
            if (gameDto.Price <= 0) return Results.BadRequest("Price must be greater than 0");
            if (gameDto.ReleaseDate > DateOnly.FromDateTime(DateTime.Now)) return Results.BadRequest("Release date cannot be in the future");

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

        // PUT /games/1
        group.MapPut("/{id}", (int id, UpdateGameDto updatedGame) => {
            var index = games.FindIndex(game => game.Id == id);
            if (index == -1) return Results.NotFound();

            games[index] = new GameDto(
                id,
                updatedGame.Name,
                updatedGame.Genre,
                updatedGame.Price,
                updatedGame.ReleaseDate
            );

            return Results.NoContent();
        });

        // DELETE /games/1
        group.MapDelete("/{id}", (int id) => {
            var game = games.Find(game => game.Id == id);
            if (game is null) return Results.NotFound();

            games.Remove(game);

            return Results.NoContent();
        }); 
    }
}