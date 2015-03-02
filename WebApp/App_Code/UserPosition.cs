using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace WebApp
{
    public class UserPosition
    {
        public UserPosition(DataRow dr)
        {
            time = Convert.ToDateTime(dr["time"]);
            latitude = Convert.ToDouble(dr["latitude"]);
            longitude = Convert.ToDouble(dr["longitude"]);
        }

        public DateTime time;
        public double latitude;
        public double longitude;
    }
}