using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace WebApp
{
    /// <summary>
    /// FileWebService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://www.brightmoon.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class FileWebService : System.Web.Services.WebService
    {

        [WebMethod]
        public string SearchFile(string filename)
        {
            JsonResponse resp = new JsonResponse();
            try
            {
                string path = Path.Combine(this.Context.Request.PhysicalApplicationPath, "Content", "Data", filename);
                using (FileStream fs = new FileStream(path, FileMode.Open))
                {
                    using (StreamReader sr = new StreamReader(fs))
                    {
                        resp.Result = true;
                        resp.Message = "Search Success";
                        resp.Data = sr.ReadToEnd();
                    }
                }
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
