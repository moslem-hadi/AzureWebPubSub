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

        [HttpPost("connect")]
        public async Task<IActionResult> Connect(ConnectDto dto)
        {
            return Ok(await webSocketService.GetClientAccessUri(dto.UserId));
        }


        [HttpPost("join")]
        public async Task<IActionResult> JoinGroup(JoinDto dto)
        {
            await webSocketService.AddUserToGroup(dto.UserId, dto.GroupId);
            return Ok();
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