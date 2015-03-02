using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Reflection;
using System.Collections;
using System.IO;

namespace WebApp
{
    /// <summary>
    /// SQLite数据库帮助类
    /// </summary>
    public class DataHelper
    {
        private static string connectionString = string.Empty;
        private static SQLiteConnection sqlConn;
        public static void SetSQLiteConnection(string fileName)
        {
            connectionString = string.Format("Data Source={0}", fileName);
            sqlConn = new SQLiteConnection(connectionString);
        }

        public static void SetSQLiteConnection(string fileName, string password)
        {
            connectionString = string.Format("Data Source={0};Password={1}", fileName, password);
            sqlConn = new SQLiteConnection(connectionString);
        }

        public static string Test()
        {
            sqlConn = new SQLiteConnection(connectionString);
            try
            {
                sqlConn.Open();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                sqlConn.Close();
            }
            return null;
        }

        public static void CreateDataBase(string fileName)
        {
            try
            {
                string path = Path.GetDirectoryName(fileName);
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                SQLiteConnection.CreateFile(fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool HasRow(string sqlStr)
        {
            return HasRow(sqlStr, null);
        }

        public static SQLiteConnection Open()
        {
            SQLiteConnection conn = new SQLiteConnection(connectionString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            sqlConn = conn;
            return conn;
        }

        public static SQLiteConnection Open(SQLiteConnection conn)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            sqlConn = conn;
            return conn;
        }

        public static SQLiteConnection Open(string connStr)
        {
            SQLiteConnection conn = new SQLiteConnection(connStr);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            sqlConn = conn;
            return conn;
        }

        public static bool HasRow(string sqlStr, object param)
        {
            using (SQLiteCommand cmd = GetCommand(sqlStr, param))
            using (SQLiteDataReader dr = cmd.ExecuteReader())
                return dr.Read();
        }

        internal static SQLiteCommand GetCommand(string sqlStr)
        {
            SQLiteConnection conn = Open();
            return new SQLiteCommand(sqlStr, conn);
        }

        internal static SQLiteCommand GetCommand(string sqlStr, object param)
        {
            SQLiteConnection conn = Open();
            SQLiteCommand cmd = new SQLiteCommand(sqlStr, conn);
            SQLiteParameter parameter = new SQLiteParameter { ParameterName = "0", Value = param ?? "" };
            cmd.Parameters.Add(parameter);
            return cmd;
        }

        internal static SQLiteCommand GetCommand(string sqlStr, SQLiteParameter param)
        {
            SQLiteConnection conn = Open();
            SQLiteCommand cmd = new SQLiteCommand(sqlStr, conn);
            cmd.Parameters.Add(param);
            return cmd;
        }

        internal static SQLiteCommand GetCommand(string sqlStr, object[] param)
        {
            SQLiteConnection conn = Open();
            SQLiteCommand cmd = new SQLiteCommand(sqlStr, conn);
            int count = param.Length;
            for (int i = 0; i < count; ++i)
            {
                SQLiteParameter parameter = new SQLiteParameter { ParameterName = i.ToString(), Value = param[i] ?? "" };
                cmd.Parameters.Add(parameter);
            }
            return cmd;
        }

        internal static SQLiteCommand GetCommand(string sqlStr, SQLiteParameter[] parameters)
        {
            SQLiteConnection conn = Open();
            SQLiteCommand cmd = new SQLiteCommand(sqlStr, conn);
            int count = parameters.Length;
            foreach (SQLiteParameter param in parameters)
            {
                cmd.Parameters.Add(param);
            }
            return cmd;
        }

        internal static SQLiteCommand GetCommand(string sqlStr, int paramcount)
        {
            SQLiteConnection conn = Open();
            SQLiteCommand cmd = new SQLiteCommand(sqlStr, conn);
            for (int i = 0; i < paramcount; ++i)
            {
                SQLiteParameter parameter = new SQLiteParameter { ParameterName = i.ToString() };
                cmd.Parameters.Add(parameter);
            }
            return cmd;
        }

        /// <summary>     
        /// 对SQLite数据库执行增删改操作，返回受影响的行数。     
        /// </summary>     
        /// <param name="sql">要执行的增删改的SQL语句</param>     
        /// <param name="parameters">执行增删改语句所需要的参数，参数必须以它们在SQL语句中的顺序为准</param>     
        /// <returns></returns>     
        public static int ExecuteNonQuery(string sql, IList<SQLiteParameter> parameters)
        {
            int affectedRows = 0;
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (DbTransaction transaction = connection.BeginTransaction())
                {
                    using (SQLiteCommand command = new SQLiteCommand(connection))
                    {
                        command.CommandText = sql;
                        if (!(parameters == null || parameters.Count == 0))
                        {
                            foreach (SQLiteParameter parameter in parameters)
                            {
                                command.Parameters.Add(parameter);
                            }
                        }
                        affectedRows = command.ExecuteNonQuery();
                    }
                    transaction.Commit();
                }
            }
            return affectedRows;
        }

        public static int ExecuteNonQuery(string sql)
        {
            return ExecuteNonQuery(sql, null);
        }

        /// <summary>
        /// 批量执行SQL Insert语句
        /// </summary>
        /// <param name="sqls"></param>
        /// <returns></returns>
        public static int ExecuteInsert(List<string> sqls)
        {
            int affectedRows = 0;
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (DbTransaction transaction = connection.BeginTransaction())
                {
                    using (SQLiteCommand command = new SQLiteCommand(connection))
                    {
                        foreach (string sql in sqls)
                        {
                            command.CommandText = sql;
                            affectedRows += command.ExecuteNonQuery();
                        }
                    }
                    transaction.Commit();
                }
            }
            return affectedRows;
        }

        /// <summary>     
        /// 执行一个查询语句，返回一个关联的SQLiteDataReader实例     
        /// </summary>     
        /// <param name="sql">要执行的查询语句</param>     
        /// <param name="parameters">执行SQL查询语句所需要的参数，参数必须以它们在SQL语句中的顺序为准</param>     
        /// <returns></returns>     
        public static SQLiteDataReader ExecuteReader(string sql, IList<SQLiteParameter> parameters)
        {
            SQLiteConnection connection = new SQLiteConnection(connectionString);
            SQLiteCommand command = new SQLiteCommand(sql, connection);
            if (!(parameters == null || parameters.Count == 0))
            {
                foreach (SQLiteParameter parameter in parameters)
                {
                    command.Parameters.Add(parameter);
                }
            }
            connection.Open();
            return command.ExecuteReader(CommandBehavior.CloseConnection);
        }

        /// <summary>     
        /// 执行一个查询语句，返回一个包含查询结果的DataTable     
        /// </summary>     
        /// <param name="sql">要执行的查询语句</param>     
        /// <param name="parameters">执行SQL查询语句所需要的参数，参数必须以它们在SQL语句中的顺序为准</param>     
        /// <returns></returns>     
        public static DataTable GetDataTableBySql(string sql, IList<SQLiteParameter> parameters)
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = new SQLiteCommand(sql, connection))
                {
                    if (!(parameters == null || parameters.Count == 0))
                    {
                        foreach (SQLiteParameter parameter in parameters)
                        {
                            command.Parameters.Add(parameter);
                        }
                    }
                    SQLiteDataAdapter adapter = new SQLiteDataAdapter(command);
                    DataTable data = new DataTable();
                    adapter.Fill(data);
                    return data;
                }
            }
        }

        public static DataTable GetDataTableBySql(string sql)
        {
            return GetDataTableBySql(sql, null);
        }

        /// <summary>     
        /// 执行一个查询语句，返回查询结果的第一行第一列     
        /// </summary>     
        /// <param name="sql">要执行的查询语句</param>     
        /// <param name="parameters">执行SQL查询语句所需要的参数，参数必须以它们在SQL语句中的顺序为准</param>     
        /// <returns></returns>     
        public static object ExecuteScalar(string sql, IList<SQLiteParameter> parameters)
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = new SQLiteCommand(sql, connection))
                {
                    if (!(parameters == null || parameters.Count == 0))
                    {
                        foreach (SQLiteParameter parameter in parameters)
                        {
                            command.Parameters.Add(parameter);
                        }
                    }
                    return command.ExecuteScalar();
                }
            }
        }

        public static object ExecuteScalar(string sql)
        {
            return ExecuteScalar(sql, null);
        }

        /// <summary>     
        /// 查询数据库中的所有数据类型信息     
        /// </summary>     
        /// <returns></returns>     
        public static DataTable GetSchema()
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                DataTable data = connection.GetSchema("TABLES");
                connection.Close();
                return data;
            }
        }
    }
}
