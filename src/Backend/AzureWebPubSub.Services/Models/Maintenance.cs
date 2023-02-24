namespace AzureWebPubSub.Services.Models
{
    //Sample
    public class Maintenance : MessageBase<MaintenanceData>
    {
    }
    public class MaintenanceData
    {
        public string Text { get; set; }
    }
}
