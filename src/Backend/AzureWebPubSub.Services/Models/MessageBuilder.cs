namespace AzureWebPubSub.Services.Models
{
    public class MessageBuilder
    {
        private Message _message;
        private MessageBuilder(string content)
        {
            _message = new Message { Content = content };
        }
        public static MessageBuilder Create(string content)
        {
            return new MessageBuilder(content);
        }
        public Message Build() => _message;
        public MessageBuilder ForEvent(MessageEvent @event)
        {
            _message.Event = @event;
            return this;
        }
        public MessageBuilder ToUser(Guid userId)
        {
            _message.UserId = userId;
            return this;
        }
        public MessageBuilder ToTenant(Guid tenantId)
        {
            _message.TenantId = tenantId;
            return this;
        }
    }
}
