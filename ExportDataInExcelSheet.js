
//npm install axios exceljs



import React, { useState } from 'react';
import axios from 'axios';
import * as ExcelJS from 'exceljs';

function ExportToExcel() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('your-node-api-endpoint');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers
    const headers = ['Column 1', 'Column 2', 'Column 3']; // Replace with your headers
    worksheet.addRow(headers);

    // Add data rows
    data.forEach(row => {
      worksheet.addRow([row.field1, row.field2, row.field3]); // Replace with your field names
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={exportToExcel} disabled={!data.length}>Export to Excel</button>
    </div>
  );
}

export default ExportToExcel;
