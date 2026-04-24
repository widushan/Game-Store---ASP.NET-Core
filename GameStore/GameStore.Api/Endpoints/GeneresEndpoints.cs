using System;

namespace GameStore.Api.Endpoints;
using GameStore.Api.Data;
using GameStore.Api.Dtos;
using Microsoft.EntityFrameworkCore;

public static class GeneresEndpoints
{
    public static void MapGeneresEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/genres");

        // GET /genres
        group.MapGet("/", async (GameStoreContext dbContext) 
            => await dbContext.Genres
            .Select(genre => new GenereDto(
                genre.Id,
                genre.Name
            ))
            .AsNoTracking()
            .ToListAsync());
    }
}
