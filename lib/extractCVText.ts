'use client';

import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

/**
 * Extract raw text from a PDF File and log it.
 * Validates file type (PDF) and size (≤5 MB).
 * The file is read into an ArrayBuffer, parsed with pdfjs-dist, and the text of all pages is concatenated.
 * The extracted text is logged and returned. No persistent storage is used.
 */
export async function extractCVText(file: File): Promise<string> {
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.type && file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        console.warn('[extractCVText] Non-PDF file provided:', file.name, file.type);
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          console.log('[extractCVText] Reading plain text file directly...');
          const text = await file.text();
          console.log('[extractCVText] Plain text file read successfully, length:', text.length);
          return text;
        }
        throw new Error(`Unsupported file format (${file.type || 'unknown'}). Please upload a PDF or TXT document.`);
    }

    if (file.size > MAX_SIZE) {
        console.error('[extractCVText]  File size exceeds 5MB limit:', file.size);
        throw new Error('File exceeds the 5 MB size limit.');
    }

    try {
        console.log('[extractCVText] Reading ArrayBuffer...');
        const arrayBuffer = await file.arrayBuffer();
        const pdfData = new Uint8Array(arrayBuffer);

        console.log('[extractCVText] Parsing PDF with pdfjs-dist...');
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdfDoc = await loadingTask.promise;
        console.log('[extractCVText] PDF loaded, page count:', pdfDoc.numPages);
        let fullText = '';

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => (item.str ? item.str : '')).join(' ');
            fullText += pageText + '\n';
        }
        return fullText;
    } catch (err: any) {
        console.error('[extractCVText] Exception during PDF parsing:', err);
        throw err;
    }
}