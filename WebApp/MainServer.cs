using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WebApp
{
    public class MainServer
    {
        public static void Init()
        {
            try
            {
                string dbPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, System.Configuration.ConfigurationManager.AppSettings["dbPath"]);
                string fileName = Path.Combine(dbPath, "System.db");
                if (!Directory.Exists(dbPath))
                    Directory.CreateDirectory(dbPath);
                if (!File.Exists(fileName))
                {
                    DataHelper.CreateDataBase(fileName);
                    DataHelper.SetSQLiteConnection(fileName);
                    DataHelper.ExecuteNonQuery("create table sy_session_log(id integer primary key autoincrement,time timestamp(3),hostaddress varchar2(200),browser varchar2(200),useragent varchar2(200))");
                }
                else
                    DataHelper.SetSQLiteConnection(fileName);
            }
            catch
            {
            }
        }

        public static void AddSessionLog(string address, string browser, string agent)
        {
            try
            {
                string sqlStr = string.Format("insert into sy_session_log(time,hostaddress,browser,useragent) values('{0:yyyy-MM-dd HH:mm:ss}','{1}','{2}','{3}')", DateTime.Now, address, browser, agent);
                DataHelper.ExecuteNonQuery(sqlStr);
            }
            catch
            {
            }
        }
    }
}