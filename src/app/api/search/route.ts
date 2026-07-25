import { createFromSource } from 'fumadocs-core/search/server';
import { docsSource } from '@/lib/docs/source';

const chineseTokenizer = {
  language: 'zh-CN',
  normalizationCache: new Map<string, string>(),
  tokenize(raw: string) {
    const normalized = raw.normalize('NFKC').toLocaleLowerCase('zh-CN');
    return normalized.match(/[\p{Script=Han}]|[a-z0-9]+/gu) ?? [];
  },
};

const search = createFromSource(docsSource, {
  tokenizer: chineseTokenizer,
});

export const GET = search.GET;
