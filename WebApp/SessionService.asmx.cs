using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace WebApp
{
    /// <summary>
    /// SessionService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://www.brightmoon.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class SessionService : System.Web.Services.WebService
    {
        [WebMethod]
        public void Report()
        {
            MainServer.AddSessionLog(this.Context.Request.UserHostAddress, this.Context.Request.Browser.Browser, this.Context.Request.UserAgent);
        }
    }
}
