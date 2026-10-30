import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { QAItem, sortQuestions, generateAnonymousNick } from '../utils/qaLogic';
import { 
  subscribeQuestions, 
  submitQuestion, 
  upvoteQuestion, 
  pinQuestion, 
  answerQuestion, 
  removeQuestion,
  clearAllLocalQuestions,
  getLikedQuestionIds,
  FirestoreConnectionState 
} from '../services/firebase';
import { QRCodeDisplay } from './QRCodeDisplay';
import { 
  MessageSquare, 
  Heart, 
  Pin, 
  CheckCircle, 
  Send, 
  Trash2, 
  Search, 
  RotateCcw, 
  UserCheck, 
  Shield, 
  Radio, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveQnAHubProps {
  lang: 'vi' | 'en';
  isSpeakerViewProp?: boolean;
}

export const LiveQnAHub: React.FC<LiveQnAHubProps> = ({ lang, isSpeakerViewProp = false }) => {
  const t = TRANSLATIONS[lang].qa;
  const [questions, setQuestions] = useState<QAItem[]>([]);
  const [isSpeakerDashboard, setIsSpeakerDashboard] = useState(isSpeakerViewProp);
  const [authorName, setAuthorName] = useState(() => generateAnonymousNick(lang));
  const [questionContent, setQuestionContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<'product' | 'pricing' | 'process' | 'environment' | 'other'>('product');
  const [activeFilterTag, setActiveFilterTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>(() => getLikedQuestionIds());
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [speakerName, setSpeakerName] = useState('Speaker Trọng Dương');
  const [connState, setConnState] = useState<FirestoreConnectionState>({ isConnected: true, isFallback: false });

  // Subscribe to live questions
  useEffect(() => {
    const unsubscribe = subscribeQuestions(
      (updated) => {
        setQuestions(updated);
      },
      (status) => {
        setConnState(status);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleShuffleNick = () => {
    setAuthorName(generateAnonymousNick(lang));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionContent.trim()) return;

    setIsSubmitting(true);
    try {
      const added = await submitQuestion(authorName, questionContent, selectedTag);
      setQuestionContent('');
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.8 }
        });
      } catch {}
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = async (qId: string) => {
    const isLiked = likedIds.includes(qId);
    // Optimistic UI
    if (isLiked) {
      setLikedIds(prev => prev.filter(id => id !== qId));
    } else {
      setLikedIds(prev => [...prev, qId]);
      try {
        confetti({
          particleCount: 15,
          spread: 30,
          origin: { y: 0.85 }
        });
      } catch {}
    }
    await upvoteQuestion(qId, isLiked);
  };

  const handlePin = async (qId: string, currentPin: boolean) => {
    await pinQuestion(qId, !currentPin);
  };

  const handleOpenReply = (q: QAItem) => {
    setReplyingId(q.id);
    setReplyText(q.answer || '');
  };

  const handleSaveReply = async (qId: string) => {
    if (!replyText.trim()) return;
    await answerQuestion(qId, replyText, speakerName);
    setReplyingId(null);
    setReplyText('');
  };

  const handleDelete = async (qId: string) => {
    if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa câu hỏi này?' : 'Delete this question?')) {
      await removeQuestion(qId);
    }
  };

  const handleClearAll = () => {
    if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa toàn bộ danh sách câu hỏi để bắt đầu phiên mới?' : 'Clear all questions for a new session?')) {
      clearAllLocalQuestions();
      setQuestions([]);
    }
  };

  const filteredQuestions = sortQuestions(questions, activeFilterTag, searchQuery);

  const totalQuestions = questions.length;
  const totalUpvotes = questions.reduce((acc, q) => acc + q.likes, 0);
  const totalAnswered = questions.filter(q => q.isAnswered).length;

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#qa` : 'https://coffblock.web.app/#qa';

  return (
    <section id="qa" className="py-20 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2314] font-serif-display tracking-tight">
            {t.title}
          </h2>
          <p className="text-base text-[#4A2E15]/80">
            {t.subtitle}
          </p>

          {/* Database & Real-time Indicator */}
          <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-[#4A2E15]/60 font-mono">
            <span className={`w-2 h-2 rounded-full ${connState.isConnected ? 'bg-[#2D5A27]' : 'bg-[#eab308]'}`} />
            <span>
              {connState.isConnected ? 'Firestore Database Connected' : 'Local Real-time Sync Active'}
            </span>
          </div>
        </div>

        {/* QR Code & Presentation Strip */}
        <div className="mt-10 max-w-2xl mx-auto">
          <QRCodeDisplay url={currentUrl} lang={lang} />
        </div>

        {/* Audience vs Speaker Toggle Control */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#4A2E15]/10 pb-6">
          
          {/* Segmented Mode Switch */}
          <div className="flex items-center bg-[#4A2E15]/8 p-1.5 rounded-xl border border-[#4A2E15]/10 w-full sm:w-auto">
            <button
              onClick={() => setIsSpeakerDashboard(false)}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                !isSpeakerDashboard 
                  ? 'bg-white text-[#3D2314] shadow-sm' 
                  : 'text-[#4A2E15]/70 hover:text-[#3D2314]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.audienceTab}</span>
            </button>

            <button
              onClick={() => setIsSpeakerDashboard(true)}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                isSpeakerDashboard 
                  ? 'bg-[#3D2314] text-white shadow-sm' 
                  : 'text-[#4A2E15]/70 hover:text-[#3D2314]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#86efac]" />
              <span>{t.speakerTab}</span>
            </button>
          </div>

          {/* Real-time Stats Counters */}
          <div className="flex items-center gap-4 text-xs font-medium text-[#4A2E15]/80">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#3D2314] font-mono tabular-nums">{totalQuestions}</span>
              <span>{t.statsQuestions}</span>
            </div>
            <span className="text-[#4A2E15]/20">|</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#2D5A27] font-mono tabular-nums">{totalUpvotes}</span>
              <span>{t.statsUpvotes}</span>
            </div>
            <span className="text-[#4A2E15]/20">|</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#4E7C59] font-mono tabular-nums">{totalAnswered}</span>
              <span>{t.statsAnswered}</span>
            </div>
          </div>

        </div>

        {/* Main Q&A Content Area */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Audience Form or Speaker Guide) */}
          <div className="lg:col-span-5 space-y-6">
            {!isSpeakerDashboard ? (
              // Audience Input Box
              <div className="bg-white rounded-2xl p-6 border border-[#4A2E15]/15 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#3D2314] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#2D5A27]" />
                    <span>{lang === 'vi' ? 'Gửi câu hỏi ẩn danh' : 'Ask Anonymously'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleShuffleNick}
                    className="text-xs text-[#2D5A27] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    title="Đổi biệt danh khác"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{lang === 'vi' ? 'Đổi tên ngẫu nhiên' : 'Randomize'}</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Anonymous Nickname Input */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2E15]/75 mb-1">
                      {lang === 'vi' ? 'Tên hiển thị (ẩn danh):' : 'Display Nickname (Anonymous):'}
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      maxLength={40}
                      className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#FDFBF7] border border-[#4A2E15]/15 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#3D2314] font-medium"
                    />
                  </div>

                  {/* Question Content Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2E15]/75 mb-1">
                      {lang === 'vi' ? 'Nội dung câu hỏi:' : 'Question details:'}
                    </label>
                    <textarea
                      rows={3}
                      value={questionContent}
                      onChange={(e) => setQuestionContent(e.target.value)}
                      placeholder={t.inputPlaceholder}
                      required
                      maxLength={300}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#FDFBF7] border border-[#4A2E15]/15 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#3D2314] placeholder-[#4A2E15]/40 resize-none"
                    />
                    <div className="flex justify-between items-center text-[10px] text-[#4A2E15]/50 mt-1">
                      <span>{lang === 'vi' ? 'Không cần đăng nhập tài khoản' : 'No sign-in needed'}</span>
                      <span className="font-mono tabular-nums">{questionContent.length}/300</span>
                    </div>
                  </div>

                  {/* Topic Tag Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2E15]/75 mb-1.5">
                      {t.tagLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['product', 'pricing', 'process', 'environment'] as const).map((tagKey) => (
                        <button
                          key={tagKey}
                          type="button"
                          onClick={() => setSelectedTag(tagKey)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-colors cursor-pointer ${
                            selectedTag === tagKey
                              ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                              : 'bg-[#FDFBF7] text-[#4A2E15] border-[#4A2E15]/15 hover:bg-white'
                          }`}
                        >
                          {t.tags[tagKey]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !questionContent.trim()}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#2D5A27] hover:bg-[#23471f] disabled:opacity-50 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? t.submitting : t.submitButton}</span>
                  </button>
                </form>
              </div>
            ) : (
              // Speaker Dashboard Controls Guide
              <div className="bg-[#3D2314] text-white rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-[#86efac] text-xs font-bold">
                  <Shield className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Bảng Điều Hành Diễn Giả Pitch Deck' : 'Speaker Presentation Console'}</span>
                </div>
                <h3 className="text-xl font-bold font-serif-display text-[#FDFBF7]">
                  {lang === 'vi' ? 'Quản lý Câu hỏi Sân khấu' : 'Stage Q&A Moderation'}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {lang === 'vi' 
                    ? 'Bạn đang ở chế độ Diễn giả: Ghim câu hỏi quan trọng để thảo luận trên màn hình, đánh dấu câu hỏi đã giải đáp, hoặc nhập câu trả lời trực tiếp cho khán giả theo dõi.'
                    : 'You are in Speaker Mode: Pin standout questions to the top, mark answered topics, or write direct responses viewable by the entire audience.'}
                </p>

                {/* Speaker Identity selector */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    {lang === 'vi' ? 'Diễn giả đang phản hồi:' : 'Current Answering Speaker:'}
                  </label>
                  <select
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                  >
                    <option value="Speaker Trọng Dương (R&D & Process)" className="text-black">Trọng Dương (R&D & Process)</option>
                    <option value="Speaker Thu Hà (Introduction)" className="text-black">Thu Hà (Introduction)</option>
                    <option value="Speaker Lương Hạo (Coffee Waste)" className="text-black">Lương Hạo (Coffee Waste)</option>
                    <option value="Speaker Phan Vũ Duy (Household Problem)" className="text-black">Phan Vũ Duy (Household Problem)</option>
                    <option value="Speaker Trịnh Dũng (USPs & Customers)" className="text-black">Trịnh Dũng (USPs & Customers)</option>
                    <option value="Speaker Nguyễn Minh Hoàng (Marketing)" className="text-black">Nguyễn Minh Hoàng (Marketing)</option>
                    <option value="Speaker Đào Đức Duy (Conclusion & Q&A)" className="text-black">Đào Đức Duy (Conclusion & Q&A)</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-white/10 text-xs text-white/90 space-y-1">
                  <div className="font-bold text-[#86efac]">
                    💡 {lang === 'vi' ? 'Mẹo thuyết trình:' : 'Pitch Tip:'}
                  </div>
                  <p className="text-[11px] text-white/80">
                    {lang === 'vi' 
                      ? 'Ưu tiên trả lời các câu hỏi có lượt upvote cao nhất trước khi kết thúc phần Q&A 2 phút.' 
                      : 'Address top upvoted questions first within your allotted 2-minute Q&A block.'}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="w-full py-2 px-3 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-xl border border-rose-800/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'vi' ? 'Làm mới / Xóa tất cả câu hỏi' : 'Clear All Questions'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Questions Feed & Filter */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#4A2E15]/15 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#4A2E15]/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'vi' ? 'Tìm câu hỏi theo từ khóa hoặc người gửi...' : 'Search questions or author...'}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                />
              </div>

              {/* Tag Filter Segmented Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {(['all', 'product', 'pricing', 'process', 'environment'] as const).map((tagKey) => (
                  <button
                    key={tagKey}
                    onClick={() => setActiveFilterTag(tagKey)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeFilterTag === tagKey
                        ? 'bg-[#3D2314] text-white'
                        : 'bg-[#FDFBF7] text-[#4A2E15]/80 hover:bg-[#F5F2EA]'
                    }`}
                  >
                    {t.tags[tagKey]}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-[#4A2E15]/10 text-xs text-[#4A2E15]/60">
                <p>{t.emptyList}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQuestions.map((q) => {
                  const isLiked = likedIds.includes(q.id);
                  const isReplying = replyingId === q.id;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl bg-white border transition-all duration-200 ${
                        q.isPinned
                          ? 'border-2 border-[#2D5A27] shadow-md bg-[#FAFBF8]'
                          : 'border-[#4A2E15]/15 hover:border-[#4A2E15]/30 shadow-sm'
                      }`}
                    >
                      {/* Top Row: Author, Tags & Pinned Badge */}
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-[#3D2314]">{q.author}</span>
                          <span className="text-[#4A2E15]/30">·</span>
                          <span className="text-[11px] font-semibold text-[#4E7C59] uppercase">
                            {t.tags[q.tag] || q.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {q.isPinned && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D5A27] bg-[#2D5A27]/10 px-2 py-0.5 rounded-md">
                              <Pin className="w-3 h-3 fill-current" />
                              <span>{t.pinnedBadge}</span>
                            </span>
                          )}

                          {q.isAnswered && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <CheckCircle className="w-3 h-3" />
                              <span>{t.answeredBadge}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Content */}
                      <p className="text-sm font-medium text-[#222222] leading-relaxed mb-4">
                        {q.content}
                      </p>

                      {/* Speaker Answer Box (if answered) */}
                      {q.isAnswered && q.answer && (
                        <div className="mt-3 p-4 rounded-xl bg-[#F5F2EA] border-l-4 border-[#2D5A27] text-xs space-y-1 mb-4">
                          <div className="flex items-center justify-between text-[#2D5A27] font-bold text-[11px]">
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>{q.answeredBy || 'Diễn giả CoffBlock'}</span>
                            </span>
                            <span className="text-[#4A2E15]/60 font-normal">
                              {lang === 'vi' ? 'Đã giải đáp' : 'Answered'}
                            </span>
                          </div>
                          <p className="text-[#3D2314] leading-relaxed">
                            {q.answer}
                          </p>
                        </div>
                      )}

                      {/* Inline Speaker Reply Box (in Speaker Mode) */}
                      {isReplying && isSpeakerDashboard && (
                        <div className="mt-3 p-4 rounded-xl bg-[#3D2314]/5 border border-[#3D2314]/20 space-y-3">
                          <label className="block text-xs font-bold text-[#3D2314]">
                            {t.speakerActions.answerPrompt}
                          </label>
                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Nhập câu trả lời trực tiếp cho khán giả..."
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#4A2E15]/20 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setReplyingId(null)}
                              className="px-3 py-1.5 text-xs text-[#4A2E15] hover:underline cursor-pointer"
                            >
                              {t.speakerActions.cancel}
                            </button>
                            <button
                              onClick={() => handleSaveReply(q.id)}
                              className="px-4 py-1.5 text-xs font-bold text-white bg-[#2D5A27] rounded-lg hover:bg-[#23471f] cursor-pointer"
                            >
                              {t.speakerActions.saveAnswer}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Bottom Action Row: Upvote & Speaker Actions */}
                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#4A2E15]/10">
                        {/* Upvote Button (Audience & Speaker) */}
                        <button
                          onClick={() => handleUpvote(q.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                            isLiked
                              ? 'bg-[#fef2f2] text-rose-600 border border-rose-200'
                              : 'bg-[#FDFBF7] text-[#4A2E15]/75 border border-[#4A2E15]/15 hover:border-rose-300 hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
                          <span className="font-mono tabular-nums">{q.likes}</span>
                          <span className="hidden sm:inline font-normal text-[11px]">{t.upvoteText}</span>
                        </button>

                        {/* Speaker Action Controls */}
                        {isSpeakerDashboard && (
                          <div className="flex items-center gap-1.5 text-xs">
                            <button
                              onClick={() => handlePin(q.id, q.isPinned)}
                              className={`p-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                                q.isPinned
                                  ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                                  : 'bg-[#FDFBF7] text-[#4A2E15] border-[#4A2E15]/15 hover:bg-[#F5F2EA]'
                              }`}
                              title={q.isPinned ? t.speakerActions.unpin : t.speakerActions.pin}
                            >
                              <Pin className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenReply(q)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 text-[#2D5A27] font-bold text-xs cursor-pointer border border-[#2D5A27]/20"
                            >
                              {t.speakerActions.reply}
                            </button>

                            <button
                              onClick={() => handleDelete(q.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 cursor-pointer"
                              title={t.speakerActions.delete}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
