using AzureWebPubSub.Api.Models;
using AzureWebPubSub.Services.Interfaces;
using AzureWebPubSub.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace AzureWebPubSub.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PubSubController : ControllerBase
    {
        private readonly IWebSocketService webSocketService;

        public PubSubController(IWebSocketService webSocketService)
        {
            this.webSocketService = webSocketService;
        }

        [HttpGet(nameof(Negotiate))]
        public async Task<string> Negotiate(Guid userId)
        {
            return await webSocketService.GetClientAccessUri(userId);
        }

        [HttpGet(nameof(Join))]
        public async Task<bool> Join(Guid userId, Guid groupId)
        {
            await webSocketService.AddUserToGroup(userId, groupId);
            return true;
        }



        //sample
        [HttpPost("Send")]
        public async Task<IActionResult> SampleSend(SampleSendDto dto)
        {
            var message = MessageBuilder.Create("A new message")
                .ForEvent(MessageEvent.Maintenance)
                .ToUser(dto.UserId)
                .ToTenant(dto.GroupId)
                .Build();

            if (message.UserId is not null)
                await webSocketService.SendToUser((Guid)message.UserId, message);
            else if (message.TenantId is not null)
                await webSocketService.SendToTenantUsers((Guid)message.TenantId, message);
            else
                await webSocketService.SendToAll(message);

            return Ok();
        }
    }
}