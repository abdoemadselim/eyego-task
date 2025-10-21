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
  // The entire excel sheet file
  const workbook = XLSX.utils.book_new();

  // Prepare data with formatted values
  const formattedData = data.map(item => ({
    'Product': item.product_name,
    'Category': item.category_name,
    'Stock': item.stock,
    'Sales': item.sales,
    'Price': `$${Number(item.price).toFixed(2)}`,
    'Created At': new Date(item.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
  }));

  // Create worksheet from formatted data
  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    header: ['Product', 'Category', 'Stock', 'Sales', 'Price', 'Created At']
  });

  // Set column widths
  worksheet['!cols'] = [
    { wch: 30 }, // Product Name
    { wch: 20 }, // Category
    { wch: 10 }, // Stock
    { wch: 10 }, // Sales
    { wch: 12 }, // Price
    { wch: 18 }, // Created At
  ];

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