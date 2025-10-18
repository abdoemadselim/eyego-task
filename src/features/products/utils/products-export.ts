import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const handlePdfExport = async (data: any[]) => {
  const doc = new jsPDF();

  // Add header background
  doc.setFillColor(0, 153, 239); // Sky background
  doc.rect(0, 0, 210, 35, 'F');

  // Add Company Name
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255); // White text
  doc.setFont("helvetica", "bold");
  doc.text("EyeGo AIoT Platform", 14, 15);

  // Add subtitle
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Products Report", 14, 23);

  // Add date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setFontSize(9);
  doc.text(`Generated on: ${currentDate}`, 14, 29);

  // Reset text color for body
  doc.setTextColor(0, 0, 0);

  // Add summary info
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Products: ${data.length}`, 14, 45);

  // Table data
  const tableColumn = ["Product Name", "Category", "Stock", "Price", "Created At"];
  const tableRows = data.map((item) => [
    item.product_name,
    item.category_name,
    item.stock.toString(),
    `$${Number(item.price).toFixed(2)}`,
    new Date(item.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
  ]);

  // Data Table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 52,
    theme: "striped",
    headStyles: {
      fillColor: [0, 153, 239], // Sky header
      textColor: [255, 255, 255], // White text
      fontSize: 10,
      fontStyle: "bold",
      halign: "left",
      cellPadding: 3,
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [51, 51, 51],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // Light gray for alternate rows
    },
    columnStyles: {
      0: { cellWidth: 50 }, // Product Name
      1: { cellWidth: 35 }, // Category
      2: { cellWidth: 20, halign: "center" }, // Stock
      3: { cellWidth: 25 }, // Price
      4: { cellWidth: 40 }, // Created At
    },
    margin: { left: 14, right: 14 },
    styles: {
      lineColor: [230, 230, 230],
      lineWidth: 0.1,
    },
  });

  // Footer (Page count)
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  // Save file
  doc.save(`products-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const handleXlsxExport = async (data: any[]) => {
  const workbook = XLSX.utils.book_new();

  // Prepare data with formatted values
  const formattedData = data.map(item => ({
    'Product': item.product_name,
    'Category': item.category_name,
    'Stock': item.stock,
    'Price': `$${Number(item.price).toFixed(2)}`,
    'Created At': new Date(item.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
  }));

  // Create worksheet from formatted data
  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    header: ['Product', 'Category', 'Stock', 'Price', 'Created At']
  });

  // Set column widths
  worksheet['!cols'] = [
    { wch: 30 }, // Product Name
    { wch: 20 }, // Category
    { wch: 10 }, // Stock
    { wch: 12 }, // Price
    { wch: 18 }, // Created At
  ];

  // Style title cells
  const titleCell = worksheet['A1'];
  if (titleCell) {
    titleCell.s = {
      font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
    }
  }

  const dateCell = worksheet['A2'];
  if (dateCell) {
    dateCell.s = {
      font: { sz: 10, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "2563EB" } },
      alignment: { horizontal: "center", vertical: "center" }
    };
  }

  const totalCell = worksheet['A3'];
  if (totalCell) {
    totalCell.s = {
      font: { sz: 10, bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "2563EB" } },
      alignment: { horizontal: "center", vertical: "center" }
    };
  }

  // Style header row (now at row 5, index 4)
  const headerRow = 5;
  const headers = ['A', 'B', 'C', 'D', 'E'];
  headers.forEach(col => {
    const cellRef = `${col}${headerRow}`;
    if (worksheet[cellRef]) {
      worksheet[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 11 },
        fill: { fgColor: { rgb: "2563EB" } },
        alignment: { horizontal: "left", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      };
    }
  });

  // Style data cells with alternating row colors
  const dataStartRow = headerRow + 1;
  for (let i = 0; i < formattedData.length; i++) {
    const rowNum = dataStartRow + i;
    const isEvenRow = i % 2 === 0;

    headers.forEach((col, colIndex) => {
      const cellRef = `${col}${rowNum}`;
      if (worksheet[cellRef]) {
        worksheet[cellRef].s = {
          font: { sz: 10 },
          fill: { fgColor: { rgb: isEvenRow ? "FFFFFF" : "F8FAFC" } },
          alignment: {
            horizontal: colIndex === 2 || colIndex === 3 ? "center" : "left",
            vertical: "center"
          },
          border: {
            top: { style: "thin", color: { rgb: "E5E7EB" } },
            bottom: { style: "thin", color: { rgb: "E5E7EB" } },
            left: { style: "thin", color: { rgb: "E5E7EB" } },
            right: { style: "thin", color: { rgb: "E5E7EB" } }
          }
        };
      }
    });
  }

  // Set row heights
  if (!worksheet['!rows']) worksheet['!rows'] = [];
  worksheet['!rows'][0] = { hpt: 25 }; // Title row
  worksheet['!rows'][1] = { hpt: 18 }; // Date row
  worksheet['!rows'][2] = { hpt: 18 }; // Total row
  worksheet['!rows'][4] = { hpt: 22 }; // Header row

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products Report');

  // Write file with cell styles
  XLSX.writeFile(workbook, `products-report-${new Date().toISOString().split('T')[0]}.xlsx`, {
    cellStyles: true
  });
};