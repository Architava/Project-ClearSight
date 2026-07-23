using Microsoft.EntityFrameworkCore;
using ClearSight.API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add your Azure SQL Database Context to the DI Container
builder.Services.AddDbContext<FreeSqlDb0690774Context>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("AzureSqlConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()));

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
