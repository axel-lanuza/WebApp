using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace WebApp
{
    /// <summary>
    /// TrackingService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://www.brightmoon.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class TrackingService : System.Web.Services.WebService
    {
        static TrackingService()
        {
            try
            {
                bool isExist = DataHelper.HasRow(string.Format("select name from sqlite_master where type='table' and name<>'sqlite_sequence' and name='sy_user_position'"));
                if (!isExist)
                    DataHelper.ExecuteNonQuery("create table sy_user_position(id integer primary key autoincrement,time timestamp(3),user varchar2(200),latitude number(20),longitude number(20))");
            }
            catch
            {
            }
        }

        [WebMethod(EnableSession = true, Description = "<b>向服务端上报所在经纬度数据</b><br>time：时间<br>id：设备或者用户ID<br>latitude：经度<br>longitude：纬度")]
        public string Upload(DateTime time, string id, double latitude, double longitude)
        {
            try
            {
                string sqlStr = string.Format("insert into sy_user_position(time,user,latitude,longitude) values('{0:yyyy-MM-dd HH:mm:ss}','{1}',{2},{3})", time, id, latitude, longitude);
                DataHelper.ExecuteNonQuery(sqlStr);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return null;
        }

        [WebMethod(EnableSession = true, Description = "<b>从服务端获取指定id所在时间范围内经纬度数据</b><br>id：设备或者用户ID<br>start：起始时间<br>end：结束时间")]
        public string GetPositions(string id, DateTime start, DateTime end)
        {
            JsonResponse resp = new JsonResponse();
            try
            {
                if (start >= end)
                    throw new Exception("起始时间必须小于结束时间");
                DataTable result = DataHelper.GetDataTableBySql(string.Format("select time,latitude,longitude from sy_user_position where time>='{0:yyyy-MM-dd HH:mm:ss}' and time<'{1:yyyy-MM-dd HH:mm:ss}' and user='{2}' order by time asc", start, end, id));
                if (result.Rows.Count == 0)
                    throw new Exception(string.Format("未查询到id为{0}对应的信息", id));
                List<UserPosition> pos = new List<UserPosition>();
                foreach (DataRow dr in result.Rows)
                {
                    pos.Add(new UserPosition(dr));
                }
                resp.Result = true;
                resp.Message = "查询成功";
                resp.Data = new { id = id, positions = pos };
            }
            catch (Exception ex)
            {
                resp.Result = false;
                resp.Message = ex.Message;
            }
            return JsonConvert.SerializeObject(resp);
        }
    }
}
