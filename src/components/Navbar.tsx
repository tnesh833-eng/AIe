import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Flame,
  Award,
  AlertTriangle,
  Brain,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Lightbulb,
  User,
} from 'lucide-react';
import { StudentProfile } from '../types.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  student: StudentProfile | null;
  onSwitchStudent: (id: string) => void;
  allStudentIds: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  student,
  onSwitchStudent,
  allStudentIds,
}) => {
  const tabs = [
    { id: 'tutor', label: 'AI Tutor', icon: Brain, badge: 'NLP' },
    { id: 'quiz', label: 'Adaptive Quizzes', icon: CheckCircle2, badge: 'Live' },
    { id: 'analytics', label: 'Performance & Weak Areas', icon: BarChart3, badge: student?.weakAreas.length ? `${student.weakAreas.length} Weak` : undefined },
    { id: 'recommendations', label: 'Study Recommendations', icon: Lightbulb },
    { id: 'curriculum', label: 'Course Syllabus', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with branding, stats, and student profile */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Intelligent Tutor
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  AI Learning System
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Personalized NLP Tutoring • Adaptive Diagnostics • Weak Area Identification
              </p>
            </div>
          </div>

          {/* Student Status & Persona Switcher */}
          <div className="flex items-center gap-3">
            {/* Streak & XP */}
            {student && (
              <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
                  {student.streakDays}d Streak
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 font-semibold text-purple-300">
                  <Award className="w-4 h-4 text-purple-400" />
                  {student.xpPoints} XP
                </span>
                {student.weakAreas.length > 0 && (
                  <>
                    <span className="text-slate-600">|</span>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="flex items-center gap-1 font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                      title="View diagnosed weak areas"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {student.weakAreas.length} Gaps
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Student Selector */}
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <select
                className="bg-transparent text-slate-200 outline-none cursor-pointer pr-1"
                value={student?.id || 'student-1'}
                onChange={(e) => onSwitchStudent(e.target.value)}
              >
                <option value="student-1" className="bg-slate-800 text-white">Alex Chen (CS & Algorithms)</option>
                <option value="student-2" className="bg-slate-800 text-white">Maya Patel (Physics & Calc)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab navigation bar */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      tab.badge.includes('Weak')
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isActive
                        ? 'bg-indigo-700/60 text-indigo-100'
                        : 'bg-slate-700/60 text-slate-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
