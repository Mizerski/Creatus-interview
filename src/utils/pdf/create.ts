import PDFDocument from "pdfkit";

interface PDFCreateOptions {
  fontSize?: number;
  margins?: { top: number; left: number };
}

export async function createPDF(
  content: string,
  options?: PDFCreateOptions
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ bufferPages: true });
    let buffers: Buffer[] = [];

    const fontSize = options?.fontSize || 25;
    const margins = options?.margins || { top: 100, left: 100 };

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", reject);

    doc.fontSize(fontSize).text(content, margins.left, margins.top, {
      width: doc.page.width - margins.left * 2,
      height: doc.page.height - margins.top * 2,
      ellipsis: true,
    });

    doc.end();
  });
}
