import test from 'node:test';
import assert from 'node:assert/strict';
import { sortQuestions, QAItem, generateAnonymousNick } from './qaLogic';

test('sortQuestions prioritizes pinned questions and high upvotes', () => {
  const items: QAItem[] = [
    { id: '1', author: 'A', content: 'Normal question', tag: 'product', likes: 2, isPinned: false, isAnswered: false, createdAt: 100 },
    { id: '2', author: 'B', content: 'Popular question', tag: 'pricing', likes: 10, isPinned: false, isAnswered: false, createdAt: 200 },
    { id: '3', author: 'C', content: 'Pinned question', tag: 'process', likes: 1, isPinned: true, isAnswered: false, createdAt: 50 },
    { id: '4', author: 'D', content: 'Answered question', tag: 'product', likes: 20, isPinned: false, isAnswered: true, createdAt: 300 },
  ];

  const sorted = sortQuestions(items, 'all', '');
  assert.equal(sorted[0].id, '3', 'Pinned question should be first');
  assert.equal(sorted[1].id, '2', 'Popular unanswered question should be second');
  assert.equal(sorted[2].id, '1', 'Normal question should be third');
  assert.equal(sorted[3].id, '4', 'Answered question should come after pending');
});

test('sortQuestions filters by tag and search term', () => {
  const items: QAItem[] = [
    { id: '1', author: 'Thu Hà', content: 'Cassava binder ratio', tag: 'process', likes: 0, isPinned: false, isAnswered: false, createdAt: 100 },
    { id: '2', author: 'Audience', content: 'How much does it cost in USD?', tag: 'pricing', likes: 0, isPinned: false, isAnswered: false, createdAt: 200 },
  ];

  const filteredTag = sortQuestions(items, 'pricing', '');
  assert.equal(filteredTag.length, 1);
  assert.equal(filteredTag[0].id, '2');

  const filteredSearch = sortQuestions(items, 'all', 'Cassava');
  assert.equal(filteredSearch.length, 1);
  assert.equal(filteredSearch[0].id, '1');
});

test('generateAnonymousNick produces valid strings', () => {
  const nickVi = generateAnonymousNick('vi');
  assert.ok(nickVi.length > 5);
  const nickEn = generateAnonymousNick('en');
  assert.ok(nickEn.length > 5);
});
