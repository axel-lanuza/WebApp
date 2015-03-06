using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace WebApp
{
    /// <summary>
    /// Map 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://www.brightmoon.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class MapService : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true, Description = "<b>获取城市经纬度信息</b>")]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCityPosition(string city)
        {
            JsonResponse resp = new JsonResponse();
            try
            {
                string url = "http://api.map.baidu.com/geocoder/v2/?address=" + city + "&output=json&ak=nbN4XhiWzpCkC1IakFERAuUo";
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse res = (HttpWebResponse)req.GetResponse();
                using (StreamReader reader = new StreamReader(res.GetResponseStream(), Encoding.UTF8))
                {
                    string strResult = reader.ReadToEnd();
                    resp.Data = strResult;
                    reader.Close();
                }
                resp.Result = true;
                resp.Message = "查询成功";
            }
            catch (Exception ex)
            {
                resp.Result = false;
                resp.Message = ex.Message;
            }
            return JsonConvert.SerializeObject(resp);
        }

        [WebMethod(EnableSession = true, Description = "<b>获取城市经纬度信息，城市名间以“,”分割</b>")]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCitysPosition(string citys)
        {
            JsonResponse resp = new JsonResponse();
            try
            {
                string[] _citys = citys.Split(',');
                List<httpresponse> infos = new List<httpresponse>();
                foreach (string city in _citys)
                {
                    string url = "http://api.map.baidu.com/geocoder/v2/?address=" + city + "&output=json&ak=nbN4XhiWzpCkC1IakFERAuUo";
                    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                    HttpWebResponse res = (HttpWebResponse)req.GetResponse();
                    using (StreamReader reader = new StreamReader(res.GetResponseStream(), Encoding.UTF8))
                    {
                        string strResult = reader.ReadToEnd();
                        httpresponse info = JsonConvert.DeserializeObject<httpresponse>(strResult);
                        infos.Add(info);
                        reader.Close();
                    }
                }
                resp.Data = infos;
                resp.Result = true;
                resp.Message = "查询成功";
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


class httpresponse
{
    public int status;
    public httpresult result;
}

class httpresult
{
    public httplocation location;
    public int precise;
    public int confidence;
    public string level;
}

class httplocation
{
    public double lng;
    public double lat;
}