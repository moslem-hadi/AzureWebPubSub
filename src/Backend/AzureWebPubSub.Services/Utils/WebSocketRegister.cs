using AzureWebPubSub.Services.Interfaces;
using AzureWebPubSub.Services.Models;
using AzureWebPubSub.Services.Services;
using Microsoft.Extensions.DependencyInjection;

namespace AzureWebPubSub.Services.Utils;
public static class WebSocketRegister
{
    public static IServiceCollection AddWebSocket(
        this IServiceCollection services, Action<AzurePubsubConfig> configure)
    {
        services.AddWebSocket();
        services.Configure(configure);
        return services;
    }
    public static IServiceCollection AddWebSocket(this IServiceCollection services)
    {
        if (services == null)
            throw new ArgumentNullException(nameof(services));

        services.AddScoped<IWebSocketService, AzureWebSocketService>();

        return services;
    }
}
