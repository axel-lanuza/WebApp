using System;
using System.Collections.Generic;
using System.Data;

namespace WebApp
{
    public class SimpleDataTable
    {
        private List<object[]> rows;
        private List<string> columnNames;

        public SimpleDataTable()
        {
            columnNames = new List<string>();
            rows = new List<object[]>(500);
        }

        public SimpleDataTable(DataTable table)
            : this()
        {
            foreach (DataColumn col in table.Columns)
            {
                this.columnNames.Add(col.ColumnName);
            }
            foreach (DataRow dr in table.Rows)
            {
                this.rows.Add(dr.ItemArray);
            }
        }

        public SimpleDataTable(int capacity)
        {
            columnNames = new List<string>();
            rows = new List<object[]>(capacity);
        }

        public SimpleDataTable(List<string> _columnNames)
        {
            columnNames = _columnNames;
            rows = new List<object[]>(500);
        }
        public List<object[]> Rows
        {
            get
            {
                return rows;
            }
        }
        public List<string> ColumnNames
        {
            get
            {
                return columnNames;
            }
        }

        public object[] NewRow()
        {
            return new object[columnNames.Count];
        }

        public void AppendRow(object[] row)
        {
            rows.Add(row);
        }

        public int this[string columnName]
        {
            get
            {
                return columnNames.IndexOf(columnName);
            }
        }

        public object this[int rowIndex, int columnIndex]
        {
            get
            {
                if (rowIndex >= rows.Count || rowIndex < 0 || columnIndex < 0 || columnIndex >= columnNames.Count)
                    throw new IndexOutOfRangeException("索引超界");
                return rows[rowIndex][columnIndex];
            }
        }

        public object this[int rowIndex, string columnName]
        {
            get { return this[rowIndex, this[columnName]]; }
        }

        public SimpleDataTable Where(Predicate<object[]> func)
        {
            if (func == null)
                return null;
            SimpleDataTable result = new SimpleDataTable(columnNames);
            foreach (object[] objs in rows)
            {
                if (func(objs))
                {
                    result.AppendRow(objs);
                }
            }
            return result;
        }

        public SimpleDataTable Range(int startRecord, int pageSize)
        {
            SimpleDataTable result = new SimpleDataTable(columnNames);
            for (int i = startRecord; i < (startRecord + pageSize); ++i)
                result.AppendRow(rows[i]);
            return result;
        }

        private int index = -1;
        public bool Read()
        {
            if (index + 1 < rows.Count)
            {
                ++index;
                return true;
            }
            return false;
        }
        public object GetValue(int i)
        {
            return this[index, i];
        }
    }
}
