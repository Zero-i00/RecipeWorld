using System.Text.Json;
using System.Text.Json.Serialization;

namespace backend.Converters;

public class Base64JsonConverter : JsonConverter<string[]>
{
    public override string[] Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var base64String = reader.GetString();
        return Convert.FromBase64String(base64String).Select(b => b.ToString()).ToArray();
    }

    public override void Write(Utf8JsonWriter writer, string[] value, JsonSerializerOptions options)
    {
        var base64String = Convert.ToBase64String(value.Select(s => Convert.ToByte(s)).ToArray());
        writer.WriteStringValue(base64String);
    }
}
