using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace WebApp
{
    /// <summary>
    /// SQLiteDbService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://www.brightmoon.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class SQLiteDbService : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true, Description = "<b>数据库操作查询</b>")]
        public string Select(string sql)
        {
            JsonResponse resp = new JsonResponse();
            try
            {
                if (string.IsNullOrEmpty(sql))
                    throw new Exception("SQL语句为空");
                DataTable result = DataHelper.GetDataTableBySql(sql);
                if (result.Rows.Count == 0)
                    throw new Exception("未查询到记录");
                SimpleDataTable table = new SimpleDataTable(result);
                resp.Result = true;
                resp.Message = "查询成功";
                resp.Data = table;
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
