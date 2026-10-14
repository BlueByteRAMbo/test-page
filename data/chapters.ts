export interface ChapterCamera {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export interface ChapterData {
  id: string
  index: number
  number: string
  railLabel: string
  railSubtitle: string
  eyebrow: string
  titlePrefix: string
  titleItalic: string
  titleSuffix?: string
  description: string
  chips: string[]
  range: [number, number]
  camera: ChapterCamera
  actorPosition: [number, number, number]
}

export const CHAPTERS: ChapterData[] = [
  {
    id: 'hero',
    index: 0,
    number: '01',
    railLabel: 'Hero',
    railSubtitle: 'The physical envelope',
    eyebrow: 'EEXTRAMILE AI · AUTOMATED OUTREACH',
    titlePrefix: 'Manually emailing 300 recruiters takes a month. We do it',
    titleItalic: 'before lunch.',
    description: 'Find recruiters, write personalised emails, and send them from your Gmail — automatically.',
    chips: ['Heavy 300gsm cardstock', 'Direct Gmail dispatch', 'Automated follow-ups'],
    range: [0.00, 0.14],
    camera: {
      position: [0.35, 0.05, 4.8],
      target: [0.55, 0, 0],
      fov: 39,
    },
    actorPosition: [1.1, 0, 0],
  },
  {
    id: 'highlights',
    index: 1,
    number: '02',
    railLabel: 'Highlights',
    railSubtitle: 'Unfold your career',
    eyebrow: 'SET UP ONCE · CAREER EXTRACTION',
    titlePrefix: 'Your story,',
    titleItalic: 'powers your outreach.',
    description: 'Add a few career highlights once. We use them to write personalized emails for every recruiter — no repetitive copy-pasting.',
    chips: ['3-panel origami sheet', '4 verified milestones', 'Zero template fluff'],
    range: [0.14, 0.28],
    camera: {
      position: [0.35, 0.12, 4.4],
      target: [0.55, 0.05, 0],
      fov: 38,
    },
    actorPosition: [1.1, 0.1, 0],
  },
  {
    id: 'discovery',
    index: 2,
    number: '03',
    railLabel: 'Find Recruiters',
    railSubtitle: 'Origami plane in flight',
    eyebrow: 'RECRUITER DISCOVERY · TARGET LOCK',
    titlePrefix: 'We find verified recruiters at',
    titleItalic: 'your target companies.',
    description: 'Get ~11 recruiters per company with verified and predicted emails, all with transparent confidence scores.',
    chips: ['Faceted origami plane', 'Studio display workstation', '99% confidence lock'],
    range: [0.28, 0.44],
    camera: {
      position: [0.25, 0.25, 4.9],
      target: [0.6, 0.08, 0],
      fov: 40,
    },
    actorPosition: [1.1, 0.1, 0],
  },
  {
    id: 'personalize',
    index: 3,
    number: '04',
    railLabel: 'Personalise & Send',
    railSubtitle: 'Adaptive email composer',
    eyebrow: 'AI ADAPTATION · DIRECT GMAIL',
    titlePrefix: 'Personalised emails,',
    titleItalic: 'for every recruiter.',
    description: 'Your career highlights are turned into natural, role-specific emails with the right tone. Preview and tweak before anything leaves.',
    chips: ['Dynamic letter composer', 'Natural tone synthesis', 'One-click verification'],
    range: [0.44, 0.60],
    camera: {
      position: [0.35, 0.15, 4.6],
      target: [0.55, 0.05, 0],
      fov: 39,
    },
    actorPosition: [1.1, 0.05, 0],
  },
  {
    id: 'followup',
    index: 4,
    number: '05',
    railLabel: 'Smart Follow-ups',
    railSubtitle: 'Mechanical chronometer',
    eyebrow: 'LIFECYCLE CONTROL · CADENCE',
    titlePrefix: 'Track replies and',
    titleItalic: 'automate follow-ups.',
    description: 'Replies are tracked in real-time. Day 3 follow-up is queued for your review, and Day 4 sends automatically. A reply stops the follow-up instantly.',
    chips: ['Day 3 queued review', 'Day 4 automated send', 'Instant reply stop'],
    range: [0.60, 0.74],
    camera: {
      position: [0.35, 0.1, 4.3],
      target: [0.55, 0, 0],
      fov: 38,
    },
    actorPosition: [1.1, 0, 0],
  },
  {
    id: 'refund',
    index: 5,
    number: '06',
    railLabel: 'Bounce Refund',
    railSubtitle: 'Parabolic coin to vault',
    eyebrow: 'CREDIT RECOVERY · GUARANTEE',
    titlePrefix: 'If an email bounces,',
    titleItalic: 'your credit is refunded.',
    description: 'We detect qualifying hard bounces automatically, return your credit instantly, and refine the recruiter database for everyone.',
    chips: ['Instant 1-credit return', 'Executive credit vault', 'Zero penalty promise'],
    range: [0.74, 0.88],
    camera: {
      position: [0.35, 0.12, 4.7],
      target: [0.55, 0, 0],
      fov: 40,
    },
    actorPosition: [1.1, 0, 0],
  },
  {
    id: 'settle',
    index: 6,
    number: '07',
    railLabel: 'Ready to Start',
    railSubtitle: 'Transition to pricing',
    eyebrow: 'GET STARTED · 25 FREE CREDITS',
    titlePrefix: 'Everything you need to land your next',
    titleItalic: 'engineering interview.',
    description: 'No credit card required to begin. Launch your first targeted recruiter campaign in under two minutes.',
    chips: ['25 free credits', 'Direct Gmail connect', 'Never expires'],
    range: [0.88, 1.00],
    camera: {
      position: [0.35, -0.15, 5.1],
      target: [0.55, -0.3, 0],
      fov: 42,
    },
    actorPosition: [1.1, -0.25, 0],
  },
]
