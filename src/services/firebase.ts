import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy,
  increment,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { QAItem } from '../utils/qaLogic';

const firebaseConfig = {
  apiKey: "AIzaSyDlawEAgGDEsz9hgFcmujHmVFOkGby3Ugw",
  authDomain: "coffblock.firebaseapp.com",
  databaseURL: "https://coffblock-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffblock",
  storageBucket: "coffblock.firebasestorage.app",
  messagingSenderId: "664196442054",
  appId: "1:664196442054:web:d664cb7835fda422b374c7",
  measurementId: "G-G719W906WX"
};

// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

const STORAGE_KEY = 'coffblock_live_questions_clean_v2';
const LIKED_QUESTIONS_KEY = 'coffblock_user_liked_questions';

// No sample seed questions - start with a clean slate for real audience
const INITIAL_SEED_QUESTIONS: QAItem[] = [];

export function getLocalFallbackQuestions(): QAItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filter out any legacy sample questions (e.g., id starting with seed-)
      const clean = parsed.filter(q => q && !q.id?.startsWith('seed-'));
      return clean;
    }
    return [];
  } catch {
    return [];
  }
}

export function clearAllLocalQuestions() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('coffblock_live_questions_fallback_v1');
  } catch {}
}

export function saveLocalFallbackQuestions(questions: QAItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed saving to localStorage', e);
  }
}

export function getLikedQuestionIds(): string[] {
  try {
    const raw = localStorage.getItem(LIKED_QUESTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setQuestionLiked(questionId: string, liked: boolean) {
  try {
    const ids = new Set(getLikedQuestionIds());
    if (liked) ids.add(questionId);
    else ids.delete(questionId);
    localStorage.setItem(LIKED_QUESTIONS_KEY, JSON.stringify(Array.from(ids)));
  } catch (e) {
    console.error(e);
  }
}

export interface FirestoreConnectionState {
  isConnected: boolean;
  isFallback: boolean;
  error?: string;
}

// Subscribe to Live questions with real-time Firestore sync & immediate fallback
export function subscribeQuestions(
  onUpdate: (questions: QAItem[]) => void,
  onStatusChange?: (status: FirestoreConnectionState) => void
): () => void {
  let isUnmounted = false;
  let unsubscribeFirestore: (() => void) | null = null;

  try {
    const questionsCol = collection(db, 'coffblock_questions');
    const q = query(questionsCol, orderBy('createdAt', 'desc'));

    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        if (isUnmounted) return;
        if (snapshot.empty) {
          // If Firestore is empty, use seed questions
          const local = getLocalFallbackQuestions();
          onUpdate(local);
          onStatusChange?.({ isConnected: true, isFallback: false });
        } else {
          const remoteQuestions: QAItem[] = snapshot.docs
            .map(docSnap => {
              const data = docSnap.data();
              return {
                id: docSnap.id,
                author: data.author || 'Anonymous',
                content: data.content || '',
                tag: data.tag || 'product',
                likes: Number(data.likes) || 0,
                isPinned: Boolean(data.isPinned),
                isAnswered: Boolean(data.isAnswered),
                answer: data.answer || '',
                answeredBy: data.answeredBy || '',
                createdAt: typeof data.createdAt?.toMillis === 'function' 
                  ? data.createdAt.toMillis() 
                  : (typeof data.createdAt === 'number' ? data.createdAt : Date.now()),
              };
            })
            .filter(q => !q.id?.startsWith('seed-'));
          // Merge with any locally pinned or created questions so audience questions never vanish
          const local = getLocalFallbackQuestions();
          const remoteIds = new Set(remoteQuestions.map(r => r.id));
          const localOnly = local.filter(l => !remoteIds.has(l.id));
          const combined = [...localOnly, ...remoteQuestions];
          onUpdate(combined);
          saveLocalFallbackQuestions(combined);
          onStatusChange?.({ isConnected: true, isFallback: false });
        }
      },
      (error) => {
        console.warn('Firestore real-time sync warning (falling back to synchronized local storage):', error.message);
        if (isUnmounted) return;
        const local = getLocalFallbackQuestions();
        onUpdate(local);
        onStatusChange?.({ 
          isConnected: false, 
          isFallback: true, 
          error: error.code === 'permission-denied' 
            ? 'Chế độ Trực tiếp Cục bộ (Firestore yêu cầu quyền truy cập công khai)' 
            : error.message 
        });
      }
    );
  } catch (err: any) {
    console.warn('Firestore initialization failed, using persistent local fallback:', err);
    const local = getLocalFallbackQuestions();
    onUpdate(local);
    onStatusChange?.({ isConnected: false, isFallback: true, error: err.message });
  }

  // Also listen for cross-tab storage updates in local mode
  const storageListener = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          onUpdate(parsed);
        }
      } catch {}
    }
  };
  window.addEventListener('storage', storageListener);

  return () => {
    isUnmounted = true;
    if (unsubscribeFirestore) unsubscribeFirestore();
    window.removeEventListener('storage', storageListener);
  };
}

// Helper for timeout
const timeoutPromise = <T>(promise: Promise<T>, ms = 2000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
  ]);
};

// Add a new question (both to Firestore and local fallback)
export async function submitQuestion(
  author: string,
  content: string,
  tag: 'product' | 'pricing' | 'process' | 'environment' | 'other'
): Promise<QAItem> {
  const newQuestion: QAItem = {
    id: 'q_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    author: author.trim() || 'Khán giả ẩn danh',
    content: content.trim(),
    tag,
    likes: 0,
    isPinned: false,
    isAnswered: false,
    createdAt: Date.now()
  };

  // Immediate local update so user sees it instantly
  const current = getLocalFallbackQuestions();
  const updated = [newQuestion, ...current];
  saveLocalFallbackQuestions(updated);

  // Try Firestore in background with timeout
  try {
    const docRef = await timeoutPromise(addDoc(collection(db, 'coffblock_questions'), {
      author: newQuestion.author,
      content: newQuestion.content,
      tag: newQuestion.tag,
      likes: 0,
      isPinned: false,
      isAnswered: false,
      createdAt: serverTimestamp()
    }), 2500);
    newQuestion.id = docRef.id;
  } catch (err) {
    console.warn('Firestore submit background fallback:', err);
  }

  return newQuestion;
}

// Toggle Upvote on a question
export async function upvoteQuestion(questionId: string, isCurrentlyLiked: boolean): Promise<number> {
  const delta = isCurrentlyLiked ? -1 : 1;
  setQuestionLiked(questionId, !isCurrentlyLiked);

  // Immediate local storage update
  const current = getLocalFallbackQuestions();
  let newLikes = 0;
  const updated = current.map(q => {
    if (q.id === questionId) {
      const updatedLikes = Math.max(0, q.likes + delta);
      newLikes = updatedLikes;
      return { ...q, likes: updatedLikes };
    }
    return q;
  });
  saveLocalFallbackQuestions(updated);

  // Try Firestore in background
  try {
    const docRef = doc(db, 'coffblock_questions', questionId);
    await timeoutPromise(updateDoc(docRef, {
      likes: increment(delta)
    }), 2000);
  } catch (err) {
    console.warn('Firestore upvote fallback:', err);
  }

  return newLikes;
}

// Speaker Dashboard Actions: Pin, Answer, Delete
export async function pinQuestion(questionId: string, isPinned: boolean) {
  const current = getLocalFallbackQuestions();
  const updated = current.map(q => q.id === questionId ? { ...q, isPinned } : q);
  saveLocalFallbackQuestions(updated);

  try {
    const docRef = doc(db, 'coffblock_questions', questionId);
    await timeoutPromise(updateDoc(docRef, { isPinned }), 2000);
  } catch (err) {
    console.warn('Firestore pin fallback:', err);
  }
}

export async function answerQuestion(questionId: string, answer: string, speakerName: string) {
  const current = getLocalFallbackQuestions();
  const updated = current.map(q => q.id === questionId ? { 
    ...q, 
    isAnswered: true, 
    answer: answer.trim(), 
    answeredBy: speakerName.trim() 
  } : q);
  saveLocalFallbackQuestions(updated);

  try {
    const docRef = doc(db, 'coffblock_questions', questionId);
    await timeoutPromise(updateDoc(docRef, { 
      isAnswered: true,
      answer: answer.trim(),
      answeredBy: speakerName.trim()
    }), 2000);
  } catch (err) {
    console.warn('Firestore answer fallback:', err);
  }
}

export async function removeQuestion(questionId: string) {
  try {
    const docRef = doc(db, 'coffblock_questions', questionId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore delete fallback:', err);
  }

  const current = getLocalFallbackQuestions();
  const updated = current.filter(q => q.id !== questionId);
  saveLocalFallbackQuestions(updated);
}
