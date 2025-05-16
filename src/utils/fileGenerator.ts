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
        scale: 2, // Increase scale for better quality
        useCORS: true, // Enable CORS to handle external resources
        logging: true, // Enable logging for debugging
        backgroundColor: null, // Ensure transparent background
        onclone: (document) => {
          // Adjust icon size in the cloned document
          const icons = document.querySelectorAll('svg');
          icons.forEach(icon => {
            icon.setAttribute('width', '12'); // Set icon width
            icon.setAttribute('height', '12'); // Set icon height
          });
        },
      });
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions for A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
      // Create a new Document
      const doc = new Document({
        sections: [{
          properties: {},
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

      // Generate and save the document
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