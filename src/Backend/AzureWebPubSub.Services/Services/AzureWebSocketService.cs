using Azure.Messaging.WebPubSub;
using AzureWebPubSub.Services.Interfaces;
using AzureWebPubSub.Services.Models;
using AzureWebPubSub.Services.Utils;
using Microsoft.Extensions.Options;

namespace AzureWebPubSub.Services.Services
{
    public class AzureWebSocketService : IWebSocketService
    {
        private TimeSpan connectionExpiry = TimeSpan.FromHours(2);
        private readonly WebPubSubServiceClient pubSubServiceClient;
        public AzureWebSocketService(IOptions<AzurePubsubConfig> config)
        {
            var connectionString = config.Value.ConnectionString ?? throw new ArgumentNullException(nameof(config.Value.ConnectionString));
            var hubName = config.Value.HubName ?? throw new ArgumentNullException(nameof(config.Value.HubName));

            pubSubServiceClient = new WebPubSubServiceClient(connectionString, hubName);
        }

        public async Task<string> GetClientAccessUri(Guid userId)
        {
            var uri = await pubSubServiceClient.GetClientAccessUriAsync(
                userId: userId.ToString(),
                expiresAfter: connectionExpiry
                );

            return uri.ToString();
        }
        public async Task AddUserToGroup(Guid userId, Guid groupId)
        {
            await pubSubServiceClient.AddUserToGroupAsync(groupId.ToString(), userId.ToString());
        }

        public async Task SendToAll<TData>(MessageBase<TData> message)
        {
            await pubSubServiceClient.SendToAllAsync(JSON.Stringify(message));
        }

        public async Task SendToGroupUsers<TData>(Guid groupId, MessageBase<TData> message)
        {
            await pubSubServiceClient.SendToGroupAsync(groupId.ToString(), JSON.Stringify(message));
        }

        public async Task SendToUser<TData>(Guid userId, MessageBase<TData> message)
        {
            await pubSubServiceClient.SendToUserAsync(userId.ToString(), JSON.Stringify(message));
        }

    }
}
