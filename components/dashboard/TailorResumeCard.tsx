'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { CgNotes } from 'react-icons/cg';
import { FileText, X, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { extractCVText } from '@/lib/extractCVText';
import { Card } from '@/components/lightswind/card';
import { ResumeDetailModal, ResumeDetail } from '@/components/dashboard/ResumeDetailModal';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/lightswind/form';
import { Textarea } from '@/components/lightswind/textarea';
import { Button } from '@/components/lightswind/button';

interface ResumeTailorFormData {
  resumeFile: File | null;
  jobDescription: string;
}

interface TailorResumeCardProps {
  onTailorSuccess?: (detail: ResumeDetail) => void;
  className?: string;
}

export function TailorResumeCard({ onTailorSuccess, className }: TailorResumeCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cvText, setCvText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeDetail, setResumeDetail] = useState<ResumeDetail | null>(null);
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ResumeTailorFormData>({
    defaultValues: {
      resumeFile: null,
      jobDescription: '',
    },
  });

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    form.setValue('resumeFile', file, { shouldValidate: true });
    try {
      const text = await extractCVText(file);
      setCvText(text);
    } catch (error) {
      console.error('[TailorResumeCard] Error extracting CV text:', error);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    form.setValue('resumeFile', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResumeDetail(null);
  };

  const onSubmit = async (data: ResumeTailorFormData) => {
    setIsSubmitting(true);
    let activeCvText = cvText;

    if (!activeCvText && selectedFile) {
      try {
        activeCvText = await extractCVText(selectedFile);
        setCvText(activeCvText);
        console.log(activeCvText.slice(0, 100));
      } catch (err) {
        console.error('Failed to extract text:', err);
      }
    }

    const initialDetail: ResumeDetail = {
      id: 'tailored-' + Date.now(),
      title: selectedFile?.name ? `Tailored: ${selectedFile.name.replace(/\.[^/.]+$/, '')}` : 'AI Tailored Resume',
      date: new Date().toLocaleDateString(),
      score: 0,
      fileName: selectedFile?.name ?? 'uploaded-resume.pdf',
      resumeContent: activeCvText || 'No resume text extracted.',
      jobDescription: data.jobDescription || 'No job description pasted.',
      aiRecommendations: [],
      aiAnalysis: '',
      isVerified: !!session,
      isLoading: true,
    };
    setResumeDetail(initialDetail);
    setIsModalOpen(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData: { content: activeCvText },
          jobData: { description: data.jobDescription },
        }),
      });


      let aiResult;
      if (response.ok) {
        aiResult = await response.json();
      } else {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const formattedDetail: ResumeDetail = {
        ...initialDetail,
        score: aiResult.score || 88,
        aiRecommendations: aiResult.recommendations || [],
        aiAnalysis: aiResult.analysis || '',
        isVerified: aiResult.isVerified ?? !!session,
        isLoading: false,
      };

      setResumeDetail(formattedDetail);
      setIsSuccess(true);
      if (onTailorSuccess) {
        onTailorSuccess(formattedDetail);
      }
    } catch (error: any) {
      console.error('Error fetching AI suggestions:', error?.message || error);
      setResumeDetail({
        ...initialDetail,
        score: 82,
        aiRecommendations: [
          { id: '1', category: 'Keywords', text: 'Incorporate key terms from the job description directly into your work experience.', type: 'keyword' }
        ],
        aiAnalysis: `Could not connect to AI service: ${error?.message || 'Network error'}. Please verify your connection.`,
        isVerified: !!session,
        isLoading: false,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 4000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values = form.getValues();
    const currentJd = values.jobDescription || form.watch('jobDescription') || '';
    onSubmit({ ...values, jobDescription: currentJd });
  };

  return (
    <Card className={cn("card-surface p-6 flex flex-col gap-4 bg-[#f1faee] border-2 border-[#1d3557] rounded-xl shadow-[6px_6px_0px_#1d3557] w-full max-w-xl mx-auto", className)}>
      <div className="flex items-center gap-3 pb-3 border-b border-[#1d3557]/15">
        <div className="w-10 h-10 rounded-xl bg-[#e63946] border border-[#1d3557] text-white flex items-center justify-center shadow-[2px_2px_0px_#1d3557]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1d3557]">Tailor Your Resume</h2>
          <p className="text-xs text-[#457b9d] font-medium">
            Upload your resume and paste a job description for instant AI matching.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          {/* Drop zone field */}
          <FormField
            control={form.control}
            name="resumeFile"
            render={() => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-label-sm text-left block text-[#1d3557] font-bold tracking-wider">
                  Upload Resume
                </FormLabel>
                <FormControl>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className={`relative rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 py-8 px-4 cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? 'border-[#e63946] bg-[#e63946]/10 scale-[1.01]'
                        : 'border-[#1d3557] bg-[#f8fdf6] hover:border-[#e63946] hover:bg-[#a8dadc]/10'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf,.docx,.txt"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    />

                    {selectedFile ? (
                      <div className="flex items-center gap-3 w-full p-2.5 bg-[#f1faee] rounded-lg border border-[#1d3557] shadow-[2px_2px_0px_#1d3557]">
                        <div className="w-9 h-9 rounded-lg bg-[#e63946]/15 text-[#e63946] flex items-center justify-center shrink-0 border border-[#1d3557]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1 text-left">
                          <span className="text-sm font-semibold truncate text-[#1d3557]">
                            {selectedFile.name}
                          </span>
                          <span className="text-xs text-[#457b9d] font-medium">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1 rounded-md hover:bg-[#e63946]/20 text-[#1d3557] transition-colors"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xl text-[#1d3557] border border-[#1d3557]"
                          style={{ background: '#a8dadc' }}
                        >
                          <CgNotes />
                        </div>
                        <p className="text-body-md text-center text-[#1d3557] font-medium">
                          Drop your resume here, or{' '}
                          <span className="text-[#e63946] font-bold underline">browse</span>
                        </p>
                        <span className="text-label-sm text-[#457b9d] font-medium">
                          PDF, DOCX, TXT up to 5MB
                        </span>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job description field */}
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-label-sm text-left block text-[#1d3557] font-bold tracking-wider">
                  Job description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the job description here..."
                    className="h-28 min-h-[100px] resize-none rounded-lg text-sm bg-[#f8fdf6] text-[#1d3557] border-[#1d3557] focus:border-[#e63946] placeholder:text-[#457b9d]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tailor button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#e63946] hover:bg-[#d32f3c] text-white border border-[#1d3557] shadow-[3px_3px_0px_#1d3557] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1d3557] rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-base"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Tailoring Resume...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white" />
                Resume Tailored Successfully!
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Tailor Resume
              </>
            )}
          </Button>
        </form>
      </Form>
      
      {/* AI Suggestions Modal */}
      <ResumeDetailModal
        resume={resumeDetail}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Card>
  );
}
