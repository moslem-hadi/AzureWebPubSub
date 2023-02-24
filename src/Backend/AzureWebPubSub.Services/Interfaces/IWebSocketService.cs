using AzureWebPubSub.Services.Models;

namespace AzureWebPubSub.Services.Interfaces;

public interface IWebSocketService
{
    Task<string> GetClientAccessUri(Guid userId);
    Task AddUserToGroup(Guid userId, Guid groupId);
    Task SendToAll<TData>(MessageBase<TData> message);
    Task SendToUser<TData>(Guid userId, MessageBase<TData> message);
    Task SendToGroupUsers<TData>(Guid groupId, MessageBase<TData> message);
}
