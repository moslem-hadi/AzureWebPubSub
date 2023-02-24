using AzureWebPubSub.Services.Interfaces;
using AzureWebPubSub.Services.Models;
using AzureWebPubSub.Services.Services;

namespace AzureWebPubSub.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.Configure<AzurePubsubConfig>(builder.Configuration.GetSection("AzurePubsubConfig"));
            builder.Services.AddSingleton<IWebSocketService, AzureWebSocketService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "_allowfrontendapp",
                policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod()
                                        .AllowCredentials();
                });
            });
            var app = builder.Build();
            app.UseCors("_allowfrontendapp");
         
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            app.MapGet("/", context => context.Response.WriteAsync("PubSub API works..."));
            app.Run();
        }
    }
}