using Azure.Messaging.WebPubSub;
using AzureWebPubSub.Services.Interfaces;
using AzureWebPubSub.Services.Models;
using AzureWebPubSub.Services.Utils;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace AzureWebPubSub.Services.Services
{
    public class AzureWebSocketService : IWebSocketService
    {
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
                expiresAfter: TimeSpan.FromHours(2)
                ); 

            return uri.ToString();
        }
        public async Task AddUserToGroup(Guid userId, Guid groupId)
        {
            await pubSubServiceClient.AddUserToGroupAsync(groupId.ToString(), userId.ToString());
        }

        public async Task SendToAll(Message message)
        {
            await pubSubServiceClient.SendToAllAsync(JSON.Stringify(message));
        }

        public async Task SendToTenantUsers(Guid groupId, Message message)
        {
            await pubSubServiceClient.SendToGroupAsync(groupId.ToString(), JSON.Stringify(message));
        }

        public async Task SendToUser(Guid userId, Message message)
        {
            await pubSubServiceClient.SendToUserAsync(userId.ToString(), JSON.Stringify(message));
        }

    }
}
