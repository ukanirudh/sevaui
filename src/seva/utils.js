import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';

export const handleReportDownload = (tableID) => {
  window.html2canvas = html2canvas;
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });
  pdf.html(document.getElementById(tableID), {
    margin: 10,
    width: 800,
    windowWidth: 1000,
  //   html2canvas: {
  //     // insert html2canvas options here, e.g.
  //     windowWidth: 1000
  // },
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