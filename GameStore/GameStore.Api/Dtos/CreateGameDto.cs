namespace GameStore.Api.Dtos;


using System.ComponentModel.DataAnnotations;

public record CreateGameDto(
    [Required][StringLength(50)] string Name,
    [Required] string Genre,
    [Range(1,100000)] decimal Price,
    [Required] DateOnly ReleaseDate
);