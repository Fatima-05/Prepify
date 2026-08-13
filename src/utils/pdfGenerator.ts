import { jsPDF } from 'jspdf';
import { PaperScanImage } from '../types';

function safeBtoa(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return btoa(str.replace(/[^\x00-\x7F]/g, ''));
  }
}

function convertSvgDataUrlToPng(svgDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 800;
      canvas.height = img.height || 1100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(svgDataUrl);
      }
    };
    img.onerror = () => {
      resolve(svgDataUrl);
    };
    img.src = svgDataUrl;
  });
}

export async function generatePaperPDF(
  paperTitle: string,
  images: PaperScanImage[],
  metadata: {
    courseCode: string;
    courseTitle: string;
    departmentName: string;
    examType: string;
    year: number;
    instructor: string;
  }
): Promise<void> {
  if (!images || images.length === 0) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let index = 0; index < images.length; index++) {
    const img = images[index];
    if (index > 0) {
      pdf.addPage();
    }

    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, pageWidth, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    const headerText = `Prepify (ATD) | ${metadata.courseCode}: ${metadata.courseTitle} | ${metadata.examType} ${metadata.year} | Instructor: ${metadata.instructor}`.replace(/[^\x00-\x7F]/g, '');
    pdf.text(headerText, 8, 8);

    let pngDataUrl = img.dataUrl;
    if (img.dataUrl.startsWith('data:image/svg+xml')) {
      try {
        pngDataUrl = await convertSvgDataUrlToPng(img.dataUrl);
      } catch (err) {
        console.warn('Could not convert SVG to PNG, attempting direct render:', err);
      }
    }

    try {
      pdf.addImage(pngDataUrl, 'PNG', 10, 16, pageWidth - 20, pageHeight - 28);
    } catch {
      try {
        pdf.addImage(pngDataUrl, 'JPEG', 10, 16, pageWidth - 20, pageHeight - 28);
      } catch (err) {
        console.error('Error embedding image into PDF:', err);
        pdf.setFillColor(248, 250, 252);
        pdf.rect(10, 16, pageWidth - 20, pageHeight - 28, 'F');
        pdf.setTextColor(30, 41, 59);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`[Exam Page ${index + 1} - ${metadata.courseCode}]`, pageWidth / 2, 50, { align: 'center' });
      }
    }

    pdf.setFillColor(241, 245, 249);
    pdf.rect(0, pageHeight - 10, pageWidth, 10, 'F');
    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Page ${index + 1} of ${images.length} - Verified Repository - CUI Abbottabad Campus`,
      pageWidth / 2,
      pageHeight - 4,
      { align: 'center' }
    );
  }

  const sanitizedFileName = `${metadata.courseCode}_${metadata.examType.replace(/\s+/g, '')}_${metadata.year}_CUI_ATD.pdf`;
  pdf.save(sanitizedFileName);
}

export function createSamplePaperDataUrl(
  courseCode: string,
  courseTitle: string,
  departmentName: string,
  examType: string,
  year: number,
  instructor: string,
  pageNum: number,
  totalPages: number,
  questions: string[]
): string {
  const svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" style="background:#ffffff; font-family:'Courier New', Courier, monospace;">
    <rect x="20" y="20" width="760" height="1060" fill="none" stroke="#1e293b" stroke-width="2"/>
    <rect x="35" y="35" width="730" height="140" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>
    
    <text x="400" y="65" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle" font-family="Arial, sans-serif">COMSATS UNIVERSITY ISLAMABAD, ABBOTTABAD CAMPUS</text>
    <text x="400" y="88" font-size="14" font-weight="bold" fill="#1e3a8a" text-anchor="middle" font-family="Arial, sans-serif">DEPARTMENT OF ${departmentName.toUpperCase()}</text>
    <text x="400" y="110" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle" font-family="Arial, sans-serif">${examType.toUpperCase()} EXAMINATION - ${year}</text>
    <line x1="50" y1="120" x2="750" y2="120" stroke="#94a3b8" stroke-width="1"/>
    
    <text x="50" y="142" font-size="13" font-weight="bold" fill="#334155" font-family="Arial, sans-serif">COURSE: ${courseCode} - ${courseTitle}</text>
    <text x="50" y="162" font-size="13" font-weight="bold" fill="#334155" font-family="Arial, sans-serif">INSTRUCTOR: ${instructor}</text>
    <text x="580" y="142" font-size="12" font-weight="bold" fill="#475569" font-family="Arial, sans-serif">MAX MARKS: 50</text>
    <text x="580" y="162" font-size="12" font-weight="bold" fill="#475569" font-family="Arial, sans-serif">TIME: 2.5 HOURS</text>

    <rect x="35" y="185" width="730" height="30" fill="#f1f5f9"/>
    <text x="45" y="205" font-size="11" font-style="italic" fill="#475569" font-family="Arial, sans-serif">Note: Attempt all questions. Show complete steps and diagrams where necessary. (Page ${pageNum} of ${totalPages})</text>

    ${questions
      .map(
        (q, idx) => `
    <g transform="translate(45, ${240 + idx * 160})">
      <rect x="0" y="0" width="710" height="145" fill="#fafafa" stroke="#e2e8f0" rx="4"/>
      <text x="15" y="28" font-size="14" font-weight="bold" fill="#1e293b" font-family="Arial, sans-serif">Q${idx + 1 + (pageNum - 1) * 3}: [Marks: 10]</text>
      <text x="15" y="55" font-size="13" fill="#334155" font-family="Courier New, monospace">${q.length > 70 ? q.substring(0, 70) + '...' : q}</text>
      ${q.length > 70 ? `<text x="15" y="75" font-size="13" fill="#334155" font-family="Courier New, monospace">${q.substring(70)}</text>` : ''}
      <line x1="15" y1="130" x2="695" y2="130" stroke="#cbd5e1" stroke-dasharray="4,4"/>
    </g>
    `
      )
      .join('')}

    <circle cx="700" cy="980" r="45" fill="none" stroke="#2563eb" stroke-width="2" opacity="0.35"/>
    <text x="700" y="975" font-size="9" font-weight="bold" fill="#1d4ed8" text-anchor="middle" opacity="0.6" font-family="Arial, sans-serif">EXAM DEPT</text>
    <text x="700" y="988" font-size="8" fill="#1d4ed8" text-anchor="middle" opacity="0.6" font-family="Arial, sans-serif">CUI ATD</text>

    <text x="400" y="1055" font-size="10" fill="#64748b" text-anchor="middle" font-family="Arial, sans-serif">Prepify - CUI Abbottabad Repository - Page ${pageNum}/${totalPages}</text>
  </svg>
  `;

  return `data:image/svg+xml;base64,${safeBtoa(svgContent)}`;
}
