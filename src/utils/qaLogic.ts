export interface QAItem {
  id: string;
  author: string;
  content: string;
  tag: 'product' | 'pricing' | 'process' | 'environment' | 'other';
  likes: number;
  isPinned: boolean;
  isAnswered: boolean;
  answer?: string;
  answeredBy?: string;
  createdAt: number;
}

export function sortQuestions(questions: QAItem[], activeTag: string = 'all', searchQuery: string = ''): QAItem[] {
  return [...questions]
    .filter(q => {
      const matchesTag = activeTag === 'all' || q.tag === activeTag;
      const matchesSearch = !searchQuery.trim() || 
        q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    })
    .sort((a, b) => {
      // 1. Pinned first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // 2. Unanswered before answered (so speakers focus on pending)
      if (!a.isAnswered && b.isAnswered) return -1;
      if (a.isAnswered && !b.isAnswered) return 1;
      // 3. Most upvotes first
      if (b.likes !== a.likes) return b.likes - a.likes;
      // 4. Most recent
      return b.createdAt - a.createdAt;
    });
}

export function generateAnonymousNick(lang: 'vi' | 'en'): string {
  const adjsVi = ['Ẩn danh', 'Thân thiện', 'Yêu cà phê', 'Yêu môi trường', 'Sáng tạo', 'Hiếu kỳ'];
  const nounsVi = ['Khán giả', 'Nhà đầu tư', 'Bạn trẻ', 'Người yêu cây', 'Người tiêu dùng'];
  
  const adjsEn = ['Curious', 'Green', 'Coffee', 'Eco', 'Mindful', 'Friendly'];
  const nounsEn = ['Guest', 'Investor', 'Audience', 'Citizen', 'Innovator'];
  
  const randNum = Math.floor(100 + Math.random() * 900);
  if (lang === 'vi') {
    const adj = adjsVi[Math.floor(Math.random() * adjsVi.length)];
    const noun = nounsVi[Math.floor(Math.random() * nounsVi.length)];
    return `${noun} ${adj} #${randNum}`;
  } else {
    const adj = adjsEn[Math.floor(Math.random() * adjsEn.length)];
    const noun = nounsEn[Math.floor(Math.random() * nounsEn.length)];
    return `${adj}${noun}_${randNum}`;
  }
}
