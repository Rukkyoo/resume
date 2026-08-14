'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  X,
  FileText,
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tag,
  Save,
  Check,
  Copy,
  Lock,
  Loader2,
} from 'lucide-react';

export interface ResumeDetail {
  id: string;
  title: string;
  date: string;
  score: number;
  fileName: string;
  resumeContent: string;
  jobDescription: string;
  aiRecommendations: {
    id: string;
    category: string;
    text: string;
    type: 'strength' | 'improvement' | 'keyword';
  }[];
  aiAnalysis?: string;
  isVerified?: boolean;
  isLoading?: boolean;
}

interface ResumeDetailModalProps {
  resume: ResumeDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveJobDescription?: (resumeId: string, updatedJd: string) => void;
}

export function ResumeDetailModal({
  resume,
  isOpen,
  onClose,
  onSaveJobDescription,
}: ResumeDetailModalProps) {
  const [editableJd, setEditableJd] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [copiedResume, setCopiedResume] = useState(false);
  const { data: session } = useSession();

  const isUserLoggedIn = resume?.isVerified ?? !!session;

  // Pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (resume?.jobDescription !== undefined) {
      setEditableJd(resume.jobDescription);
      setIsSaved(false);
    }
  }, [resume?.id, resume?.jobDescription]);

  if (!resume) return null;

  const handleSaveJd = () => {
    if (onSaveJobDescription && resume) {
      onSaveJobDescription(resume.id, editableJd);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopyResume = () => {
    navigator.clipboard.writeText(resume.resumeContent);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          data-lenis-prevent
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1d3557]/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0.15 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#f1faee] border-2 border-[#1d3557] shadow-[8px_8px_0px_#1d3557] overflow-hidden z-10 my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b-2 border-[#1d3557] bg-[#eaf5e8] shrink-0">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#e63946] border-2 border-[#1d3557] text-white shadow-[2px_2px_0px_#1d3557] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-[#1d3557] truncate">
                      {resume.title}
                    </h2>
                    {resume.score > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a8dadc] text-[#1d3557] border border-[#1d3557]">
                        Match Score: {resume.score}%
                      </span>
                    )}
                    {resume.isLoading && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/30 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" /> AI Analyzing...
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#457b9d] mt-0.5">
                    Tailored on {resume.date} • {resume.fileName}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl border-2 border-[#1d3557] bg-white text-[#1d3557] hover:bg-[#e63946] hover:text-white transition-colors cursor-pointer shrink-0 shadow-[2px_2px_0px_#1d3557] active:translate-x-[1px] active:translate-y-[1px]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable Body */}
            <div
              className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 min-h-0"
              data-lenis-prevent
            >
              {/* Grid Layout for Resume & Editable Job Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Uploaded Resume Section */}
                <div className="flex flex-col rounded-xl border-2 border-[#1d3557] bg-white p-4 shadow-[4px_4px_0px_#1d3557]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1d3557]/15 mb-3">
                    <div className="flex items-center gap-2 font-bold text-[#1d3557] text-sm">
                      <FileText className="w-4 h-4 text-[#e63946]" />
                      Uploaded Resume
                    </div>
                    <button
                      onClick={handleCopyResume}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#457b9d] hover:text-[#1d3557] transition-colors cursor-pointer"
                    >
                      {copiedResume ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Text
                        </>
                      )}
                    </button>
                  </div>
                  <div
                    className="bg-[#f8fdf6] border border-[#1d3557]/20 rounded-lg p-3.5 text-xs font-mono text-[#1d3557] whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto"
                    data-lenis-prevent
                  >
                    {resume.resumeContent || 'No extracted CV text available.'}
                  </div>
                </div>

                {/* Editable Job Description Section */}
                <div className="flex flex-col rounded-xl border-2 border-[#1d3557] bg-white p-4 shadow-[4px_4px_0px_#1d3557]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1d3557]/15 mb-3">
                    <div className="flex items-center gap-2 font-bold text-[#1d3557] text-sm">
                      <Briefcase className="w-4 h-4 text-[#457b9d]" />
                      Target Job Description
                    </div>
                    <button
                      onClick={handleSaveJd}
                      className="btn btn-primary text-xs py-1 px-2.5 gap-1 shadow-[2px_2px_0px_#1d3557]"
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    value={editableJd}
                    onChange={(e) => setEditableJd(e.target.value)}
                    placeholder="Paste or edit the job description here..."
                    className="w-full bg-[#f8fdf6] border border-[#1d3557]/30 focus:border-[#e63946] rounded-lg p-3 text-xs font-sans text-[#1d3557] leading-relaxed resize-none min-h-[160px] max-h-[220px] outline-none transition-all overflow-y-auto"
                    rows={8}
                    data-lenis-prevent
                  />
                </div>
              </div>

              {/* AI Loading State */}
              {resume.isLoading ? (
                <div className="rounded-xl border-2 border-[#1d3557] bg-white p-8 shadow-[4px_4px_0px_#1d3557] flex flex-col items-center justify-center py-10 gap-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#e63946]/10 border-2 border-[#e63946] flex items-center justify-center text-[#e63946] animate-bounce">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-bold text-[#1d3557] text-base flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#e63946]" />
                    Analyzing CV & Job Description with Gemini AI...
                  </h3>
                  <p className="text-xs text-[#457b9d] max-w-md font-medium">
                    Generating surgical ATS alignment scores, identifying key missing terms, and building actionable bullet point recommendations.
                  </p>
                </div>
              ) : (
                <>
                  {/* Detailed AI Analysis Markdown View */}
                  {resume.aiAnalysis && (
                    <div className="rounded-xl border-2 border-[#1d3557] bg-white p-5 shadow-[4px_4px_0px_#1d3557]">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-[#1d3557]/15 mb-3">
                        <div className="p-1.5 rounded-lg bg-[#a8dadc] border border-[#1d3557] text-[#1d3557]">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1d3557] text-base">
                            AI Detailed CV & JD Analysis
                          </h3>
                          <p className="text-xs text-[#457b9d]">
                            Generated using Google Gemini AI reasoning model.
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#f8fdf6] border border-[#1d3557]/20 rounded-lg p-4 text-xs font-sans text-[#1d3557] whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                        {resume.aiAnalysis}
                      </div>
                    </div>
                  )}

                  {/* AI Recommendations Cards Section */}
                  {resume.aiRecommendations && resume.aiRecommendations.length > 0 && (
                    <div className="rounded-xl border-2 border-[#1d3557] bg-white p-5 shadow-[4px_4px_0px_#1d3557]">
                      <div className="flex items-center justify-between pb-4 border-b border-[#1d3557]/15 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-[#a8dadc] border border-[#1d3557] text-[#1d3557]">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#1d3557] text-base">
                              AI Optimization Pointers
                            </h3>
                            <p className="text-xs text-[#457b9d]">
                              Key actionable recommendations tailored to your profile.
                            </p>
                          </div>
                        </div>
                        {!isUserLoggedIn && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#e63946]/10 text-[#e63946] px-2.5 py-1 rounded-md border border-[#e63946]/30">
                            <Lock className="w-3 h-3" /> Preview Snippet
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {resume.aiRecommendations.map((rec) => (
                          <div
                            key={rec.id}
                            className="p-3.5 rounded-xl border border-[#1d3557] bg-[#f8fdf6] flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`badge text-[10px] py-0.5 px-2 ${
                                    rec.type === 'strength'
                                      ? 'badge-success'
                                      : rec.type === 'improvement'
                                      ? 'badge-primary'
                                      : 'badge-muted'
                                  }`}
                                >
                                  {rec.type === 'strength' && (
                                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                                  )}
                                  {rec.type === 'improvement' && (
                                    <AlertCircle className="w-3 h-3 inline mr-1" />
                                  )}
                                  {rec.type === 'keyword' && (
                                    <Tag className="w-3 h-3 inline mr-1" />
                                  )}
                                  {rec.category}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-[#1d3557] leading-snug">
                                {rec.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Locked Banner for Unverified Users */}
                      {!isUserLoggedIn && (
                        <div className="mt-4 p-5 rounded-xl border-2 border-dashed border-[#e63946] bg-[#e63946]/5 text-center flex flex-col items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#e63946] text-white flex items-center justify-center border border-[#1d3557] shadow-[2px_2px_0px_#1d3557]">
                            <Lock className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1d3557] text-sm">Full AI Suggestions Locked</h4>
                            <p className="text-xs text-[#457b9d] mt-1 max-w-md mx-auto font-medium">
                              Log in or create a free account to unlock complete AI CV analysis, ATS keyword matching, and tailored bullet point suggestions.
                            </p>
                          </div>
                          <div className="flex gap-3 mt-1 flex-wrap justify-center">
                            <Link
                              href="/sign-in"
                              className="btn bg-[#e63946] hover:bg-[#d32f3c] text-white text-xs font-bold px-4 py-2 rounded-lg border border-[#1d3557] shadow-[2px_2px_0px_#1d3557]"
                            >
                              Sign In to Unlock
                            </Link>
                            <Link
                              href="/sign-up"
                              className="btn bg-[#a8dadc] hover:bg-[#96c8ca] text-[#1d3557] text-xs font-bold px-4 py-2 rounded-lg border border-[#1d3557] shadow-[2px_2px_0px_#1d3557]"
                            >
                              Create Free Account
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t-2 border-[#1d3557] bg-[#eaf5e8] gap-3 shrink-0">
              <button
                onClick={handleSaveJd}
                className="btn btn-primary text-xs px-5 py-2 shadow-[2px_2px_0px_#1d3557]"
              >
                Save & Update Optimization
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
