using Microsoft.Phone.Info;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppTracking
{
    public class Utils
    {
        public static string GetUniqueId()
        {
            byte[] byteArray = DeviceExtendedProperties.GetValue("DeviceUniqueId") as byte[];
            StringBuilder sb = new StringBuilder();
            foreach (byte b in byteArray)
            {
                sb.Append(b.ToString("X2"));
            }
            return sb.ToString();
        }
    }
}
