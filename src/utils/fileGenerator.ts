import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const generatePdf = async (
  resumeContainerRef: React.RefObject<HTMLDivElement>,
  fileName: string = 'resume.pdf'
): Promise<void> => {
  try {
    if (resumeContainerRef.current) {
      const canvas = await html2canvas(resumeContainerRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794, // A4 width in pixels at 96 DPI
        windowHeight: 1123, // A4 height in pixels at 96 DPI
        onclone: (clonedDoc) => {
          const element = clonedDoc.querySelector('[ref="resumeContainer"]');
          if (element) {
            element.style.transform = 'none';
            element.style.width = '210mm';
            element.style.height = '297mm';
          }
        }
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = 297; // A4 height in mm

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );

      pdf.save(fileName);
    }
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
};

export const generateDoc = async (
  resumeContainerRef: React.RefObject<HTMLDivElement>,
  fileName: string = 'resume.docx'
): Promise<void> => {
  try {
    if (resumeContainerRef.current) {
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              size: {
                width: 11906,  // A4 width in twips
                height: 16838, // A4 height in twips
              },
              margin: {
                top: 1440,    // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeContainerRef.current.innerText,
                  size: 24,
                }),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Failed to generate DOC:', error);
    throw error;
  }
};