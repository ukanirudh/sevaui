import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';

export const handleReportDownload = (tableID) => {
  window.html2canvas = html2canvas;
  const pdf = new jsPDF("l", "pt", "a3");
  pdf.html(document.getElementById(tableID), {
     callback: function (doc) {
       doc.save();
     }
  });
}


export const getSevaOption = ({sevaName, sevaLabel, amount}) => ({
  value: sevaName,
  key: sevaName,
  text: sevaLabel,
  amount
})