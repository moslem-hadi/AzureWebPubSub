using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AzureWebPubSub.Services.Utils
{
    public class JSON
    {
        private static JsonSerializerSettings settings = new JsonSerializerSettings()
        {
            Formatting = Formatting.None
        };

        private static JsonSerializerSettings prettySettings = new JsonSerializerSettings()
        {
            Formatting = Formatting.Indented
        };

        public static JObject? Parse(string str) => JsonConvert.DeserializeObject<JObject>(str, settings);

        public static T? Parse<T>(string str) => JsonConvert.DeserializeObject<T>(str, settings);

        public static string Stringify(object obj, bool indented = false) => JsonConvert.SerializeObject(obj, indented ? prettySettings : settings);
    }
}