export interface PipelineLayer {
  id: string
  number: string
  stepTag: string
  titlePrefix: string
  titleItalic: string
  titleSuffix?: string
  description: string
  checkpoints: string[]
  eyebrow: string
}

export const pipelineLayers: PipelineLayer[] = [
  {
    id: 'hero',
    number: '01',
    stepTag: '01 Hero · The idea of Sheets',
    eyebrow: 'EEXTRAMILE AI · CONCEPT 3',
    titlePrefix: 'Manually emailing 300 recruiters takes a month. We do it',
    titleItalic: 'before lunch.',
    description: 'Find recruiters, write personalised emails, and send them from your Gmail — automatically.',
    checkpoints: [
      'Verified recruiter emails with transparent confidence scores',
      'AI email personalisation tailored to your real background',
      'Sent directly from your connected Gmail account',
    ],
  },
  {
    id: 'highlights',
    number: '02',
    stepTag: '02 Your highlights · Turn your experience into outreach',
    eyebrow: 'SET UP ONCE · FIRST LAYER',
    titlePrefix: 'Your story,',
    titleItalic: 'powers your outreach.',
    description: 'Add a few highlights once. We use them to write personalised emails for every recruiter.',
    checkpoints: [
      'Frontend Developer with 3 years of experience',
      'Built and deployed 2 major projects',
      'Open to relocation',
      'Interested in AI/ML and scalable systems',
    ],
  },
  {
    id: 'discovery',
    number: '03',
    stepTag: '03 Find recruiters · We find the right people for you',
    eyebrow: 'RECRUITER DISCOVERY · THE STACK BRANCHES',
    titlePrefix: 'We find verified recruiters at',
    titleItalic: 'your',
    titleSuffix: 'target companies.',
    description: 'Get ~11 recruiters per company with verified and predicted emails, all with confidence scores.',
    checkpoints: [
      'Target any company and target role in seconds',
      'Direct recruiter & talent acquisition partner discovery',
      '99% verified emails plus machine-learned predicted contacts',
    ],
  },
  {
    id: 'personalise',
    number: '04',
    stepTag: '04 Personalise · AI writes emails that sound like you',
    eyebrow: 'PERSONALIZED EMAIL · MOST IMPORTANT TRANSFORMATION',
    titlePrefix: 'Personalised emails,',
    titleItalic: 'for every recruiter.',
    description: 'Your highlights are turned into natural, role-specific emails with the right tone.',
    checkpoints: [
      'Tailored tone options: Professional, Conversational, Short & crisp',
      'Key phrases highlighted in pale green to show where your experience is used',
      'Full preview control and single-click edits before sending',
    ],
  },
  {
    id: 'send',
    number: '05',
    stepTag: '05 Send from Gmail · One click, 40 seconds',
    eyebrow: 'SEND FROM GMAIL · ACTION PHASE',
    titlePrefix: 'Send directly from',
    titleItalic: 'your Gmail.',
    description: 'Emails are sent from your own account, so they look natural and personal.',
    checkpoints: [
      'Sent via official Google OAuth API from your connected address',
      'Dispatches in under 40 seconds with natural delivery spacing',
      'Lands directly in recruiter primary inboxes, zero spam folder risk',
    ],
  },
  {
    id: 'tracking',
    number: '06',
    stepTag: '06 Track replies & follow ups · Day 3 review, Day 4 send',
    eyebrow: 'REPLY TRACKING · REAL-TIME TELEMETRY',
    titlePrefix: 'Track replies and',
    titleItalic: 'automate follow-ups.',
    description: 'Replies are tracked in real time. Day 3 follow-up is queued for your review, and Day 4 sends automatically. A reply stops the follow-up.',
    checkpoints: [
      'Email sent on Day 0 with delivery confirmation',
      'Day 3 follow-up queued in dashboard for quick review',
      'Day 4 follow-up sent automatically if no response detected',
      'Instant thread stoppage the second a recruiter replies',
    ],
  },
  {
    id: 'refund',
    number: '07',
    stepTag: '07 Bounce handling · Your credit comes back',
    eyebrow: 'BOUNCE & CREDIT REFUND · RETURN JOURNEY',
    titlePrefix: 'If an email bounces,',
    titleItalic: 'your credit is refunded.',
    description: 'We detect hard bounces, return your credit automatically and use the result to improve the database.',
    checkpoints: [
      'Automated SMTP bounce telemetry detects invalid mailboxes',
      '1 credit automatically returned to your account balance',
      'Recruiter database updated so future campaigns stay clean',
    ],
  },
]
