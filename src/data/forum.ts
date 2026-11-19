export interface ForumComment {
  author: string;
  age: string;
  postedAt?: string;
  score: number;
  body: string;
  developer?: boolean;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  description: string;
  author: string;
  age: string;
  date: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
  closed?: boolean;
}

export const FORUM_DEVELOPER = 'Tekken 8 Hacks';

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

export const FORUM_CATEGORY_KEYS: Record<string, string> = {
  General: 'general',
  'Guides & Builds': 'guidesbuilds',
  'Patch Talk': 'patchtalk',
  Community: 'community',
};

export function forumCategoryFilterKey(category: string): string {
  return FORUM_CATEGORY_KEYS[category] ?? category.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function countComments(comments: ForumComment[]): number {
  return comments.reduce(
    (total, comment) => total + 1 + (comment.replies ? countComments(comment.replies) : 0),
    0,
  );
}

function withCounts(post: Omit<ForumPost, 'commentsCount'>): ForumPost {
  return { ...post, commentsCount: countComments(post.comments) };
}

export function forumLastReply(comments: ForumComment[]): { author: string; age: string } | null {
  let last: ForumComment | null = null;
  const walk = (list: ForumComment[]) => {
    for (const comment of list) {
      if (!last || !last.postedAt || (comment.postedAt && comment.postedAt > last.postedAt)) {
        last = comment;
      }
      if (comment.replies?.length) walk(comment.replies);
    }
  };
  walk(comments);
  return last ? { author: last.author, age: last.age } : null;
}

const rawPosts: Array<Omit<ForumPost, 'commentsCount'>> = [
  {
    slug: 'frame-data-in-training',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Frame data in Practice: what should I turn on first?',
    excerpt: 'The product lists Frame separate from Punish and Combo. Which readout belongs in a first Training session?',
    description: 'Frame data in Practice: what should I turn on first? Example replies and the linked Tekken 8 guide.',
    author: 'JinMain',
    age: '18 Nov, 2:00 PM',
    date: '2026-11-18',
    upvotes: 0,
    flair: 'Frame',
    sourceTitle: 'Tekken Overlay for Tekken 8',
    sourcePath: '/blog/tekken-overlay-for-tekken-8/',
    closed: true,
    body: [
      'The product lists Frame separate from Punish and Combo. Which readout belongs in a first Training session?',
      'I want one panel I can actually read between blocks, not every option at once.',
    ],
    comments: [
      {
        author: 'Orbit',
        age: '18 Nov, 3:00 PM',
        score: 0,
        body: 'Frame is the timing readout. Leave Punish and Combo off until you can name the hit you just saw. The overlay guide says the same thing: one panel, then play.',
        postedAt: '2026-11-18T10:00:00.000Z',
        replies: [
          {
            author: 'JinMain',
            age: '18 Nov, 4:00 PM',
            score: 0,
            body: 'So Frame is not the punish window itself?',
            postedAt: '2026-11-18T11:00:00.000Z',
            replies: [
              {
                author: 'Orbit',
                age: '18 Nov, 5:00 PM',
                score: 0,
                body: 'Right. Frame is the timing read. Punish is the window cue. They are separate rows on the product page.',
                postedAt: '2026-11-18T12:00:00.000Z',
              },
            ],
          },
        ],
      },
      {
        author: 'LarsFan',
        age: '18 Nov, 6:00 PM',
        score: 0,
        body: 'I started with Frame in Practice only. Adding Heat on the same day made the screen too busy.',
        postedAt: '2026-11-18T13:00:00.000Z',
      },
      {
        author: 'PatchWatcher',
        age: '18 Nov, 8:00 PM',
        score: 0,
        body: 'The linked overlay article is the one that explains keeping a single readable panel.',
        postedAt: '2026-11-18T15:00:00.000Z',
      },
    ],
  },
  {
    slug: 'heat-overlay-basics',
    category: 'General',
    categoryTone: 'purple',
    title: 'What does the Heat overlay show?',
    excerpt: 'Heat is its own row. Is that a ranked-only panel, or does it belong in Training too?',
    description: 'What does the Heat overlay show? Example discussion for the Heat module on Windows PC.',
    author: 'LarsFan',
    age: '17 Nov, 8:00 PM',
    date: '2026-11-17',
    upvotes: 0,
    flair: 'Heat',
    sourceTitle: 'Top Tekken 8 Mods',
    sourcePath: '/blog/tekken-8-mods/',
    body: [
      'Heat is its own row on the product page. Is that panel only for ranked, or is it useful in Training?',
      'I do not want it covering the character.',
    ],
    comments: [
      {
        author: 'NinaLab',
        age: '17 Nov, 9:00 PM',
        score: 0,
        body: 'Use it in Training first. Heat is a callout for the Heat system, not a replacement for Frame or Punish. If you cannot see the limbs, move the panel.',
        postedAt: '2026-11-17T16:00:00.000Z',
        replies: [
          {
            author: 'LarsFan',
            age: '17 Nov, 10:00 PM',
            score: 0,
            body: 'So I should not turn Heat on just because Frame is already on.',
            postedAt: '2026-11-17T17:00:00.000Z',
          },
        ],
      },
      {
        author: 'Orbit',
        age: '17 Nov, 11:00 PM',
        score: 0,
        body: 'The mods article makes the same split: a readout only counts if you look at it. Heat you never check should stay off.',
        postedAt: '2026-11-17T18:00:00.000Z',
      },
    ],
  },
  {
    slug: 'punish-window-cues',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Punish cues versus a combo route',
    excerpt: 'Punish and Combo are both listed. I am not sure which one I should practice when a block actually connects.',
    description: 'Punish cues versus a combo route. Example replies and the linked Tekken 8 combos guide.',
    author: 'NinaLab',
    age: '16 Nov, 4:00 PM',
    date: '2026-11-16',
    upvotes: 0,
    flair: 'Punish',
    sourceTitle: 'Essential Tekken 8 Combos Guide',
    sourcePath: '/blog/essential-tekken-8-combos-guide/',
    closed: true,
    body: [
      'Punish and Combo are both on the product page. After a blocked string, which module is the one I should be reading?',
      'I keep starting a route before I know the punish is there.',
    ],
    comments: [
      {
        author: 'JinMain',
        age: '16 Nov, 5:00 PM',
        score: 0,
        body: 'Punish is the window cue. Combo is the routing helper after you already have the hit. Do not treat them as the same button.',
        postedAt: '2026-11-16T12:00:00.000Z',
        replies: [
          {
            author: 'NinaLab',
            age: '16 Nov, 6:00 PM',
            score: 0,
            body: 'So the route comes after the window, not instead of it.',
            postedAt: '2026-11-16T13:00:00.000Z',
            replies: [
              {
                author: 'JinMain',
                age: '16 Nov, 7:00 PM',
                score: 0,
                body: 'Yes. The combos guide says the same thing: confirm the hit, then use one ender you already trust.',
                postedAt: '2026-11-16T14:00:00.000Z',
              },
            ],
          },
        ],
      },
      {
        author: 'KingPlayer',
        age: '16 Nov, 8:00 PM',
        score: 0,
        body: 'I leave Combo collapsed until Punish is boring. Otherwise I chase a route I have not earned.',
        postedAt: '2026-11-16T15:00:00.000Z',
      },
    ],
  },
  {
    slug: 'combo-routing-one-card',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Combo module: one route or a whole tree?',
    excerpt: 'The Combo row is a routing helper. How many branches belong on the card I take into a set?',
    description: 'Combo module: one route or a whole tree? Example replies and the King combo flow chart guide.',
    author: 'KingPlayer',
    age: '15 Nov, 1:00 PM',
    date: '2026-11-15',
    upvotes: 0,
    flair: 'Combo',
    sourceTitle: 'King Combo Flow Chart for Tekken 8',
    sourcePath: '/blog/king-combo-flow-chart-tekken-8/',
    body: [
      'The Combo feature is a routing helper for the character I picked. Should I store every branch, or one starter and one ender?',
      'A wide chart is what I drop in ranked.',
    ],
    comments: [
      {
        author: 'ClaudioLab',
        age: '15 Nov, 2:00 PM',
        score: 0,
        body: 'One starter, one confirm, one ender. The flow-chart article is a small tree on purpose. Extra branches wait until the first one is dull.',
        postedAt: '2026-11-15T09:00:00.000Z',
        replies: [
          {
            author: 'KingPlayer',
            age: '15 Nov, 3:00 PM',
            score: 0,
            body: 'That matches what I was afraid of. The module is a reminder, not a second move list.',
            postedAt: '2026-11-15T10:00:00.000Z',
          },
        ],
      },
      {
        author: 'HwoarangMain',
        age: '15 Nov, 5:00 PM',
        score: 0,
        body: 'I keep stance routes off that card until the entry is something I choose on purpose. Combo does not fix a random stance.',
        postedAt: '2026-11-15T12:00:00.000Z',
      },
      {
        author: 'NinaLab',
        age: '15 Nov, 7:00 PM',
        score: 0,
        body: 'Punish still comes first. Combo is what you open after the hit, not during the guess.',
        postedAt: '2026-11-15T14:00:00.000Z',
      },
    ],
  },
  {
    slug: 'stream-proof-overlay-captures',
    category: 'Community',
    categoryTone: 'green',
    title: 'Stream-proof overlay before a capture',
    excerpt: 'Stream-proof overlay is listed with the other modules. What should I check before I record a session?',
    description: 'Stream-proof overlay before a capture. Example replies and the linked Tekken overlay guide.',
    author: 'ReplayEd',
    age: '14 Nov, 6:00 PM',
    date: '2026-11-14',
    upvotes: 0,
    flair: 'Stream-proof',
    sourceTitle: 'Tekken Overlay for Tekken 8',
    sourcePath: '/blog/tekken-overlay-for-tekken-8/',
    closed: true,
    body: [
      'Stream-proof overlay is its own row. I want the panel while I play and a clean capture afterward.',
      'Should I confirm the recording, or only the live view?',
    ],
    comments: [
      {
        author: 'Orbit',
        age: '14 Nov, 7:00 PM',
        score: 0,
        body: 'Turn stream-proof overlay on before you capture, then watch the file. The live view is not the recording. The overlay guide says to confirm the capture itself.',
        postedAt: '2026-11-14T14:00:00.000Z',
        replies: [
          {
            author: 'ReplayEd',
            age: '14 Nov, 8:00 PM',
            score: 0,
            body: 'So a checkbox I never test in the file is not enough.',
            postedAt: '2026-11-14T15:00:00.000Z',
          },
        ],
      },
      {
        author: 'JinMain',
        age: '14 Nov, 9:00 PM',
        score: 0,
        body: 'Frame, Heat, and Punish can stay on for you. Stream-proof is the option that keeps that panel out of the capture on supported setups.',
        postedAt: '2026-11-14T16:00:00.000Z',
      },
    ],
  },
  {
    slug: 'status-ready-after-patch',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Ready status after the Tekken 8 v3.03.01 note',
    excerpt: 'The status page lists Tekken 8 v3.03.01 and Ready. Should I open the loader on the old config?',
    description: 'Ready status after the Tekken 8 v3.03.01 note. Example replies about the status labels and a fresh portal build.',
    author: 'PatchWatcher',
    age: '13 Nov, 11:00 AM',
    date: '2026-11-13',
    upvotes: 0,
    flair: 'Status',
    sourceTitle: 'Top Tekken 8 Mods',
    sourcePath: '/blog/tekken-8-mods/',
    closed: true,
    body: [
      'Status shows Tekken 8 v3.03.01 and Ready. Do I keep yesterday’s config, or pull the portal build first?',
      'I want the three labels in one place: Ready, Updating, Paused.',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '13 Nov, 12:00 PM',
        score: 0,
        developer: true,
        body: 'Ready means the listed build matches the current PC client. Use the portal build from that status line. Updating means wait. Paused means leave the loader closed.',
        postedAt: '2026-11-13T07:00:00.000Z',
        replies: [
          {
            author: 'PatchWatcher',
            age: '13 Nov, 1:00 PM',
            score: 0,
            body: 'And the saved config—compare it to the module list instead of assuming every toggle still matches?',
            postedAt: '2026-11-13T08:00:00.000Z',
          },
        ],
      },
      {
        author: 'Orbit',
        age: '13 Nov, 3:00 PM',
        score: 0,
        body: 'The mods note is the habit I use after a client update: one option at a time, then a set. Do not stack a new panel on patch day.',
        postedAt: '2026-11-13T10:00:00.000Z',
      },
    ],
  },
];

export const forumPosts: ForumPost[] = rawPosts.map(withCounts);

export function getForumPost(slug: string) {
  return forumPosts.find((post) => post.slug === slug);
}