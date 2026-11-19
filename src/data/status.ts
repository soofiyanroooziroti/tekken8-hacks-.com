/** ISO date (YYYY-MM-DD) — edit when you publish a status refresh. */
export const STATUS_LAST_UPDATED = '2026-11-19';

export type StatusTone = 'green' | 'red' | 'blue';

export interface StatusLegendItem {
  tone: StatusTone;
  label: string;
  meaning: string;
}

export interface StatusPatchEntry {
  build: string;
  when: string;
  summary: string;
}

export interface StatusCheatUpdateEntry {
  when: string;
  summary: string;
  todo?: boolean;
}

export const STATUS_TONE: StatusTone = 'green';

export const STATUS_TONE_LABELS: Record<StatusTone, string> = {
  green: 'Ready',
  blue: 'Updating',
  red: 'Paused',
};

export function getStatusLabel(tone: StatusTone = STATUS_TONE): string {
  return STATUS_TONE_LABELS[tone];
}

export const STATUS_LABEL = getStatusLabel();

export const STATUS_GAME_BUILD = 'Tekken 8 v3.03.01';
export const STATUS_GAME_BUILD_RELEASE = '12 Nov 2026 patch, PC';

export const STATUS_REQUIREMENTS = [
  'Windows 10 or 11 (64-bit)',
  'Tekken 8 on Steam',
  'Latest graphics drivers',
] as const;

export const STATUS_LEGEND: StatusLegendItem[] = [
  { tone: 'green', label: 'Ready', meaning: 'The current build is updated.' },
  { tone: 'blue', label: 'Updating', meaning: 'Our team is working on it, not ready yet.' },
  { tone: 'red', label: 'Paused', meaning: "Not updated, don't launch." },
];

export const STATUS_GAME_PATCHES: StatusPatchEntry[] = [
  {
    build: 'Tekken 8 v3.03.01',
    when: '12 Nov 2026',
    summary: 'Adds Roger Jr. as a playable character, Tekken Fight Pass Round 12 and character move fixes.',
  },
  {
    build: 'Tekken 8 v3.02.02',
    when: '10 Sep 2026',
    summary: 'Corrects Bob behavior introduced in v3.02.01 and fixes some issues.',
  },
];

const statusCheatUpdates: StatusCheatUpdateEntry[] = [
  {
    when: '19 Nov 2026',
    summary: 'Loader compatibility check for Tekken 8 v3.03.01.',
  },
];

export function getStatusCheatUpdates(): StatusCheatUpdateEntry[] {
  return [...statusCheatUpdates];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Format YYYY-MM-DD as "10 Nov 2026". */
export function formatStatusUpdated(isoDate: string = STATUS_LAST_UPDATED): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const label = MONTHS[month - 1];
  if (!label) return isoDate;
  return `${day} ${label} ${year}`;
}

/** Muted meta beside the status pill. */
export function formatLastUpdatedLine(isoDate: string = STATUS_LAST_UPDATED): string {
  return `Last updated ${formatStatusUpdated(isoDate)}`;
}

/** Pill label from current STATUS_TONE. */
export function formatStatusPillLabel(tone: StatusTone = STATUS_TONE): string {
  return getStatusLabel(tone);
}