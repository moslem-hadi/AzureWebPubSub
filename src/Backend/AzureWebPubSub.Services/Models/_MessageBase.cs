namespace AzureWebPubSub.Services.Models;

public abstract class MessageBase<TData>
{
    public DateTime Date => DateTime.UtcNow;
    public TData? Data { get; set; }
    public string Event => this.GetType().Name;
}
