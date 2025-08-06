"use client";

import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist";
import Image from "next/image";

// Point pdfjs to the worker file in node_modules
GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface PdfThumbnailProps {
  url: string;
  width?: number;
  height?: number;
}

export default function PdfThumbnail({
  url,
  width = 300,
  height = 200,
}: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbDataUrl, setThumbDataUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function makeThumbnail() {
      // Load PDF document
      const loadingTask = getDocument(url);
      const pdf = await loadingTask.promise;

      // First page + scale to desired width
      const page = await pdf.getPage(1);
      const unscaledVp = page.getViewport({ scale: 1 });
      const scale = width / unscaledVp.width;
      const viewport = page.getViewport({ scale });

      // Off-screen canvas
      const canvas = canvasRef.current!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;

      await page.render({
        canvasContext: ctx,
        canvas,
        viewport,
      }).promise;

      if (!cancelled) {
        setThumbDataUrl(canvas.toDataURL("image/png"));
      }
    }

    makeThumbnail().catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [url, width]);

  return (
    <>
      {/* Hidden canvas used for rendering */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Once we have a data-URL, show it with Next/Image */}
      {thumbDataUrl ? (
        <Image
          src={thumbDataUrl}
          alt="PDF thumbnail"
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      ) : (
        // Fallback placeholder while generating
        <div
          style={{ width, height }}
          className="bg-gray-100 flex items-center justify-center text-sm text-gray-500"
        >
          Loading…
        </div>
      )}
    </>
  );
}
