using AzureWebPubSub.Services.Models;

namespace AzureWebPubSub.Services.Interfaces
{
    public interface IWebSocketService
    {
        Task<string> GetClientAccessUri(Guid userId);
        Task AddUserToGroup(Guid userId, Guid groupId);
        Task SendToAll(Message message);
        Task SendToUser(Guid userId, Message message);
        Task SendToTenantUsers(Guid groupId, Message message);
    }
}
