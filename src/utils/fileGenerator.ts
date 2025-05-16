import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const generatePdf = async (
  resumeContainerRef: React.RefObject<HTMLDivElement>,
  fileName: string = 'resume.pdf'
): Promise<void> => {
  try {
    if (resumeContainerRef.current) {
      // Clone the resume container
      const clone = resumeContainerRef.current.cloneNode(true) as HTMLElement;
      
      // Reset any scaling transforms
      clone.style.transform = 'none';
      clone.style.width = '210mm';
      clone.style.height = '297mm';
      
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.appendChild(clone);
      document.body.appendChild(container);

      const canvas = await html2canvas(clone, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 2480, // A4 width at 300 DPI
        height: 3508, // A4 height at 300 DPI
        foreignObjectRendering: true,
        removeContainer: true,
      });

      // Remove the temporary container
      document.body.removeChild(container);

      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Add the image to PDF with proper dimensions
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        210, // A4 width in mm
        297, // A4 height in mm
        undefined,
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