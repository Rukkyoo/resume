'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { CgNotes } from 'react-icons/cg';
import { FileText, X, Sparkles, Loader2 } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { Card } from '@/components/lightswind/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/lightswind/form';
import { Textarea } from '@/components/lightswind/textarea';
import { Button } from '@/components/lightswind/button';
import { AnimatePresence, motion } from 'framer-motion';

interface ResumeTailorFormData {
  resumeFile: File | null;
  jobDescription: string;
}

const trustBadges = ['Google', 'Stripe', 'AI / ML'];

export function LandingHero() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const words = [
    "a Moment",
    "an Instant",
    "a Flash",
    "a Second",
    "no Time",
    "a Jiffy"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000)
    return () => clearInterval(interval);
  }, [])

  const form = useForm<ResumeTailorFormData>({
    defaultValues: {
      resumeFile: null,
      jobDescription: '',
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    form.setValue('resumeFile', file, { shouldValidate: true });
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    form.setValue('resumeFile', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: ResumeTailorFormData) => {
    setIsSubmitting(true);
    console.log('Submitting Resume & Job Description:', {
      fileName: selectedFile?.name,
      jobDescription: data.jobDescription,
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-headline"
      style={{ background: '#f1faee' }}
    >

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[#a8dadc] opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
      />

      <div className="container-app relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-10 md:gap-12 items-center py-12 md:py-28">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
            {/* Label chip */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span
                className="badge badge-success bg-[#a8dadc] text-[#1d3557] border border-[#1d3557]"
                style={{ padding: '0.35rem 0.85rem' }}
              >
                ✦ AI-powered
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-headline"
              className="text-display-lg text-center md:text-left mx-auto md:mx-0 font-bold"
              style={{ color: '#1d3557', maxWidth: '520px' }}
            >
              Tailor Your Resume for Every Job in{' '}
              <span style={{ color: '#e63946' }}><AnimatePresence mode="wait">
                <motion.span
                  key={words[currentWordIndex]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.7 }}
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence></span>
            </h1>

            {/* Subtext */}
            <p
              className="text-body-lg text-center md:text-left mx-auto md:mx-0 font-medium"
              style={{ color: '#457b9d', maxWidth: '440px' }}
            >
              Our AI <motion.span
                  initial={{
                    backgroundSize: "0% 100%",
                    backgroundPosition: "left",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "linear-gradient(to right, #e63946 0%, #e63946 100%)",
                    color: "#1d3557",
                    padding: "4px",
                    fontWeight: "bold",
                  }}
                  animate={{
                    backgroundSize: "100% 100%",
                    color: "white",
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >analyzes</motion.span> job descriptions, <motion.span
                  initial={{
                    backgroundSize: "0% 100%",
                    backgroundPosition: "left",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "linear-gradient(to right, #e63946 0%, #e63946 100%)",
                    color: "#1d3557",
                    padding: "4px",
                    fontWeight: "bold",
                  }}
                  animate={{
                    backgroundSize: "100% 100%",
                    color: "white",
                  }}
                  transition={{
                    duration: 1.0,
                  }}
                >highlights</motion.span> your relevant skills with surgical
              precision, and <motion.span
                  initial={{
                    backgroundSize: "0% 100%",
                    backgroundPosition: "left",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "linear-gradient(to right, #e63946 0%, #e63946 100%)",
                    color: "#1d3557",
                    padding: "4px",
                    fontWeight: "bold",
                  }}
                  animate={{
                    backgroundSize: "100% 100%",
                    color: "white",
                  }}
                  transition={{
                    duration: 1.2,
                  }}
                >generates</motion.span> a tailored resume in seconds.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start w-full sm:w-auto">
              <Link
                href={ROUTES.signUp}
                className="btn btn-primary bg-[#e63946] hover:bg-[#d32f3c] text-white border border-[#1d3557] shadow-[3px_3px_0px_#1d3557] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1d3557] w-full sm:w-auto"
                style={{ padding: '0.75rem 1.75rem' }}
              >
                Try for Free
              </Link>
              <Link
                href="#demo"
                className="btn btn-secondary bg-[#457b9d] hover:bg-[#3a6a89] text-white border border-[#1d3557] shadow-[3px_3px_0px_#1d3557] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1d3557] w-full sm:w-auto"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                See it in Action →
              </Link>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:max-w-none">
            <Card className="card-surface p-6 flex flex-col gap-4 bg-[#f1faee] border border-[#1d3557] rounded-xl shadow-[4px_4px_0px_#1d3557]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                            className={`relative rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 py-8 px-4 cursor-pointer transition-all duration-200 ${isDragging
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
                                  Drop your resume here, or <span className="text-[#e63946] font-bold underline">browse</span>
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
                            className="h-20 min-h-[80px] resize-none rounded-lg text-sm bg-[#f8fdf6] text-[#1d3557] border-[#1d3557] focus:border-[#e63946] placeholder:text-[#457b9d]"
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
                    className="w-full h-11 bg-[#e63946] hover:bg-[#d32f3c] text-white border border-[#1d3557] shadow-[3px_3px_0px_#1d3557] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1d3557] rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Tailoring Resume...
                      </>
                    ) : isSuccess ? (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Resume Tailored!
                      </>
                    ) : (
                      'Tailor Resume'
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}


