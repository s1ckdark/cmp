import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const PdfExport = async (id: string, filename:any) => {
    if (document) {
        html2canvas(document.querySelector(`#${id}`)!).then((canvas:any) => {
            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const pdf = new jsPDF('p', 'mm', 'A4');
            const imgWidth = 195;
            const margin = 10;
            // const pageHeight = imgWidth * 1.414;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            heightLeft -= pageHeight;
            // eslint-disable-next-line new-cap
            let position = margin;
            pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position + 10, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save(filename+'.pdf');
        });
    }
};