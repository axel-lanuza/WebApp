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
    [System.Web.Script.Services.ScriptService]
    public class SQLiteDbService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true, Description = "<b>数据库操作-查询存在的表</b>")]
        public string ShowTableList()
        {
            JsonResponse resp = new JsonResponse();
            try
            {
                DataTable result = DataHelper.GetDataTableBySql("select name from sqlite_master where type='table' and name<>'sqlite_sequence'");
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

        [WebMethod(EnableSession = true, Description = "<b>数据库操作-查询</b>")]
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

        [WebMethod(EnableSession = true, Description = "<b>数据库操作-编辑/修改</b>")]
        public string Edit(string sql)
        {
            JsonResponse resp = new JsonResponse();
            try
            {
                if (string.IsNullOrEmpty(sql))
                    throw new Exception("SQL语句为空");
                int result = DataHelper.ExecuteNonQuery(sql);
                resp.Result = true;
                resp.Message = "成功";
                resp.Data = string.Format("共影响{0}行数据", result);
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
