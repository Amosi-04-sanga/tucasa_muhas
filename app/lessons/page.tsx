'use client';

import React, { useEffect, useState } from 'react';
import { createClient, Entry, Asset, EntrySkeletonType, EntryFieldTypes } from 'contentful';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { log } from 'console';

// Types for the PDF documents
type LessonSkeleton = EntrySkeletonType & {
  contentTypeId: 'lessons';
  fields: {
    title: EntryFieldTypes.Symbol;
    language: EntryFieldTypes.Symbol;
    year: EntryFieldTypes.Integer;
    quarter?: EntryFieldTypes.Symbol;
    quater?: EntryFieldTypes.Symbol;
    lessonPdf: EntryFieldTypes.AssetLink;
  };
};

// PDF Card Component
const PDFCard = ({ entry }: { entry: Entry<LessonSkeleton> }) => {
  const { title, language, year } = entry.fields;
  
  // Use lessonPdf.fields.file.url directly with debugging
  const lessonPdf = entry.fields.lessonPdf as any;
  
  // Debug logging
  console.log('=== PDFCard Debug ===');
  console.log('Title:', title);
  console.log('Lesson PDF field:', lessonPdf);
  console.log('Lesson PDF fields:', lessonPdf?.fields);
  console.log('Lesson PDF file:', lessonPdf?.fields?.file);
  console.log('Lesson PDF URL:', lessonPdf?.fields?.file?.url);
  
  const pdfUrl = lessonPdf?.fields?.file?.url 
    ? "https:" + lessonPdf.fields.file.url 
    : null;
    
  console.log('Final PDF URL:', pdfUrl);
  console.log('==================');
    
  const englishFlagRaw = (entry.fields as any).english ?? language;
  const isEnglish = typeof englishFlagRaw === 'boolean'
    ? englishFlagRaw
    : String(englishFlagRaw ?? '').toLowerCase() === 'yes';
  const langLabel = isEnglish ? 'English version' : 'Swahili version';
  const quarterVal = (entry.fields as any).quarter ?? (entry.fields as any).quater;

  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    if (downloading || !pdfUrl) return;
    
    try {
      setDownloading(true);
      setProgress(0);

      // Force download behavior
      const requestUrl = pdfUrl.includes('?') ? `${pdfUrl}&dl=` : `${pdfUrl}?dl=`;

      const response = await fetch(requestUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const contentLengthHeader = response.headers.get('content-length');
      const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;

      if (response.body && totalBytes > 0 && 'getReader' in response.body) {
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let receivedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            receivedBytes += value.length;
            setProgress(Math.min(100, Math.round((receivedBytes / totalBytes) * 100)));
          }
        }

        const blob = new Blob(chunks, { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = globalThis.document.createElement('a');
        link.href = url;
        link.download = `${String(title)}.pdf`;
        globalThis.document.body.appendChild(link);
        link.click();
        globalThis.document.body.removeChild(link);
        setProgress(100);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      } else {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = globalThis.document.createElement('a');
        link.href = url;
        link.download = `${String(title)}.pdf`;
        globalThis.document.body.appendChild(link);
        link.click();
        globalThis.document.body.removeChild(link);
        setProgress(100);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
    } catch (e) {
      console.error('Download failed, opening in new tab', e);
      // Fallback: open direct URL in a new tab
      window.open(pdfUrl, '_blank');
    } finally {
      setTimeout(() => {
        setDownloading(false);
        setProgress(0);
      }, 800);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100 hover:border-teal-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {String(title)}
        </h3>
        
        {/* Language Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 mb-3">
          {langLabel}
        </div>
        
        {/* Year and Quarter */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="font-medium">{String(year)}</span>
          {quarterVal ? (
            <>
              <span className="text-gray-400">•</span>
              <span className="capitalize">{String(quarterVal)}</span>
            </>
          ) : null}
        </div>
      </div>

      {/* Download Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleDownload}
          disabled={!pdfUrl || downloading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-dark text-white font-medium rounded-lg hover:bg-primary-dark/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          {downloading ? `Downloading${progress ? ` ${progress}%` : ''}` : 'Download PDF'}
        </button>
        {!pdfUrl && (
          <p className="text-xs text-red-500 mt-2 text-center">PDF not available - Debug: {JSON.stringify(lessonPdf?.fields?.file?.url || 'null')}</p>
        )}
        {downloading && (
          <div className="mt-3 h-2 w-full bg-teal-50 rounded-full overflow-hidden">
            <div className="h-full bg-teal-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

// Main Lessons Page
const LessonsPage = () => {
  const [documents, setDocuments] = useState<Entry<LessonSkeleton>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const client = createClient({
          space: "ahfy535kiwrz",
          accessToken: "lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso",
        });

        const response = await client.getEntries<LessonSkeleton>({
          content_type: "lessons", // Adjust this to match your Contentful content type
          include: 10, // Ensure linked assets are fully resolved
          order: ['-fields.year'], // Sort by year
        });

    

        console.log(response.items);
       
        setDocuments(response.items);
      } catch (err) {
        setError('Failed to fetch documents');
        console.error('Error fetching documents:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              sabbath school Lessons
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find and download sabbath school lessons, ensuring you never miss out on any lesson. Check back regularly for updates as new lessons are added.
            </p>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
          sabbath school Lessons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find and download sabbath school lessons, ensuring you never miss out on any lesson. Check back regularly for updates as new lessons are added.
            </p>
        </div>

        {/* Documents Grid */}
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <PDFCard key={doc.sys.id} entry={doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Check back later for new resources and lessons.</p>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default LessonsPage;
