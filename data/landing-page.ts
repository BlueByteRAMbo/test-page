export interface StoryChapter {
  id: string
  number: string
  railLabel: string
  railSubtitle: string
  eyebrow: string
  titlePrefix: string
  titleItalic: string
  titleSuffix?: string
  description: string
  checkpoints: string[]
  metrics?: { label: string; value: string }
}

export const storyChapters: StoryChapter[] = [
  {
    id: 'hero',
    number: '01',
    railLabel: 'Hero',
    railSubtitle: 'The idea of Sheets',
    eyebrow: 'EEXTRAMILE AI · CONCEPT 3',
    titlePrefix: 'Manually emailing 300 recruiters takes a month. We do it',
    titleItalic: 'before lunch.',
    description: 'Find recruiters, write personalised emails, and send them from your Gmail — automatically.',
    checkpoints: [
      'Verified recruiter emails with transparent confidence scores',
      'AI email personalisation tailored to your real background',
      'Sent directly from your connected Gmail account',
      'Automatic Day 3 & 4 follow-ups with instant reply stopping'
    ],
    metrics: { label: 'Recruiter emails found this week', value: '704+' }
  },
  {
    id: 'highlights',
    number: '02',
    railLabel: 'Your highlights',
    railSubtitle: 'Turn your experience into outreach',
    eyebrow: 'SET UP ONCE · LAYER 01',
    titlePrefix: 'Your story,',
    titleItalic: 'powers your outreach.',
    description: 'Add a few career highlights once. We use them to write personalized emails for every recruiter — no repetitive copy-pasting.',
    checkpoints: [
      'Frontend Developer with 3+ years experience in scalable apps',
      'Built and deployed 2 major production projects with real-time sync',
      'Open to relocation and remote opportunities worldwide',
      'Deep passion for AI/ML and intuitive developer tooling'
    ]
  },
  {
    id: 'discovery',
    number: '03',
    railLabel: 'Find recruiters',
    railSubtitle: 'We find the right people for you',
    eyebrow: 'RECRUITER DISCOVERY · LAYER 02',
    titlePrefix: 'We find verified recruiters at',
    titleItalic: 'your target companies.',
    description: 'Get ~11 recruiters per company with verified and predicted emails, all with transparent confidence scores.',
    checkpoints: [
      'Target any company and target role in seconds',
      'Direct recruiter & talent acquisition partner discovery',
      '99% verified emails plus machine-learned predicted contacts',
      'Zero manual Google or LinkedIn digging required'
    ],
    metrics: { label: 'Average verified recruiters per target', value: '11' }
  },
  {
    id: 'personalize',
    number: '04',
    railLabel: 'Personalise',
    railSubtitle: 'AI writes emails that sound like you',
    eyebrow: 'AI ADAPTATION · LAYER 03',
    titlePrefix: 'Personalised emails,',
    titleItalic: 'for every recruiter.',
    description: 'Your career highlights are turned into natural, role-specific emails with the right tone. Preview and tweak before anything leaves.',
    checkpoints: [
      'Authentic highlight injection — no boilerplate templates',
      'Smart tone selector: Professional, Conversational, Short & crisp',
      'Full preview control and single-click edits',
      'High open and reply rates from hiring managers'
    ]
  },
  {
    id: 'send',
    number: '05',
    railLabel: 'Send from Gmail',
    railSubtitle: 'One click, 40 seconds',
    eyebrow: 'DELIVERY SYSTEM · LAYER 04',
    titlePrefix: 'Send directly from',
    titleItalic: 'your Gmail.',
    description: 'Emails are sent from your own connected Google account, so they land in the primary inbox, never spam, and look 100% natural.',
    checkpoints: [
      'Direct OAuth integration using secure Gmail API',
      'Authentic sender headers and genuine personal signature',
      'Batched delivery spaced naturally to safeguard domain health',
      'Average campaign dispatches in under 40 seconds'
    ],
    metrics: { label: 'Dispatch speed', value: '~40s' }
  },
  {
    id: 'tracking',
    number: '06',
    railLabel: 'Track replies & follow ups',
    railSubtitle: 'Day 3 review, Day 4 send',
    eyebrow: 'LIFECYCLE CONTROL · LAYER 05',
    titlePrefix: 'Track replies and',
    titleItalic: 'automate follow-ups.',
    description: 'Replies are tracked in real-time. Day 3 follow-up is queued for your review, and Day 4 sends automatically. A reply stops the follow-up instantly.',
    checkpoints: [
      'Real-time webhook notifications when recruiters respond',
      'Day 3 smart queued review notification in your dashboard',
      'Day 4 automated follow-up ensures no missed opportunities',
      'Instant thread suspension the exact second a reply lands'
    ]
  },
  {
    id: 'refund',
    number: '07',
    railLabel: 'Bounce handling',
    railSubtitle: 'Your credit comes back',
    eyebrow: 'CREDIT RECOVERY · LAYER 06',
    titlePrefix: 'If an email bounces,',
    titleItalic: 'your credit is refunded.',
    description: 'We detect qualifying hard bounces automatically, return your credit instantly, and refine the recruiter database for everyone.',
    checkpoints: [
      'Automated SMTP bounce telemetry and classification',
      '1 credit automatically credited back to your balance',
      'Recruiter database updated to filter stale email records',
      'Zero penalty for outdated corporate directories'
    ],
    metrics: { label: 'Credit refund rate on hard bounce', value: '100%' }
  },
  {
    id: 'pricing',
    number: '08',
    railLabel: 'Pricing & final CTA',
    railSubtitle: 'Simple, clear and honest',
    eyebrow: 'TRANSPARENT VALUE · FINAL STAGE',
    titlePrefix: 'Simple, transparent',
    titleItalic: 'pricing.',
    description: '1 credit = 1 email. Credits never expire. Start free, upgrade when you want more reach.',
    checkpoints: [
      '25 free credits to get started right now',
      'Credits never expire or lose value',
      'Unlimited company and role searches included',
      'All features included in every paid plan'
    ]
  }
]

export const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    frequency: 'forever',
    credits: '25 credits',
    costPerEmail: 'Free forever',
    popular: false,
    cta: 'Get started free',
    ctaLink: 'https://app.eextramile.com',
    features: [
      { text: '25 recruiter emails', included: true },
      { text: 'AI email personalisation', included: true },
      { text: 'Sent from your Gmail', included: true },
      { text: 'Reply tracking', included: true },
      { text: 'Email confidence scoring', included: false },
      { text: 'Auto follow-up day 3 & 4', included: false },
      { text: 'Bounce detection & refunds', included: false },
      { text: 'Priority pipeline speed', included: false },
    ]
  },
  {
    name: 'Starter',
    price: '$7',
    frequency: 'one-time',
    credits: '100 credits',
    costPerEmail: '~$0.07 per email',
    popular: false,
    cta: 'Get Starter',
    ctaLink: 'https://app.eextramile.com',
    features: [
      { text: '100 recruiter emails', included: true },
      { text: 'AI email personalisation', included: true },
      { text: 'Sent from your Gmail', included: true },
      { text: 'Reply tracking', included: true },
      { text: 'Email confidence scoring', included: true },
      { text: 'Auto follow-up day 3 & 4', included: false },
      { text: 'Bounce detection & refunds', included: false },
      { text: 'Priority pipeline speed', included: false },
    ]
  },
  {
    name: 'Growth',
    price: '$20',
    frequency: 'one-time',
    credits: '500 credits',
    costPerEmail: '~$0.04 per email',
    popular: true,
    badge: 'Most popular',
    cta: 'Get Growth',
    ctaLink: 'https://app.eextramile.com',
    features: [
      { text: '500 recruiter emails', included: true },
      { text: 'AI email personalisation', included: true },
      { text: 'Sent from your Gmail', included: true },
      { text: 'Reply tracking', included: true },
      { text: 'Email confidence scoring', included: true },
      { text: 'Auto follow-up day 3 & 4', included: true },
      { text: 'Bounce detection & refunds', included: true },
      { text: 'Priority pipeline speed', included: false },
    ]
  },
  {
    name: 'Pro',
    price: '$35',
    frequency: 'one-time',
    credits: '1,000 credits',
    costPerEmail: '~$0.035 per email',
    popular: false,
    cta: 'Get Pro',
    ctaLink: 'https://app.eextramile.com',
    features: [
      { text: '1,000 recruiter emails', included: true },
      { text: 'AI email personalisation', included: true },
      { text: 'Sent from your Gmail', included: true },
      { text: 'Reply tracking', included: true },
      { text: 'Email confidence scoring', included: true },
      { text: 'Auto follow-up day 3 & 4', included: true },
      { text: 'Bounce detection & refunds', included: true },
      { text: 'Priority pipeline speed', included: true },
    ]
  }
]

export const testimonials = [
  {
    quote: "I sent 40 emails before lunch and got two interview screens scheduled by Wednesday. Emails go out from my own Gmail, so recruiters actually see them.",
    author: "Alex Morgan",
    role: "Senior Software Engineer",
    company: "Hired at Series B Fintech",
    avatar: "AM",
    color: "#2563eb",
    stars: 5
  },
  {
    quote: "The auto follow-up on day 4 is what actually got me a response from Stripe. The recruiter said she had missed my first email. That follow-up closed the loop.",
    author: "Leila T.",
    role: "Frontend Engineer",
    company: "Berlin, Germany",
    avatar: "LT",
    color: "#16a34a",
    stars: 5,
    highlight: true
  },
  {
    quote: "I targeted 12 companies in one sitting. The emails were personalised to my background — not generic spam. Recruiters noticed immediately.",
    author: "Sam R.",
    role: "Data Scientist",
    company: "Toronto, Canada",
    avatar: "SR",
    color: "#7c3aed",
    stars: 5
  },
  {
    quote: "Spent $7 to test it. Got a reply within 48 hours from a senior recruiter at a high-growth startup. Best $7 I've ever spent on my job search.",
    author: "Jamie C.",
    role: "Fullstack Developer",
    company: "Austin, TX",
    avatar: "JC",
    color: "#d97706",
    stars: 5
  }
]

export const faqs = [
  {
    q: 'Does it send emails from my Gmail account?',
    a: 'Yes — emails are sent directly from your personal Gmail account via official Google OAuth. You stay in complete control of what goes out, and replies appear right in your normal Gmail inbox.'
  },
  {
    q: 'How does it find recruiter email addresses?',
    a: 'We use a combination of automated search to find recruiter LinkedIn profiles, verification services to confirm corporate email schemas, and an AI pattern-learning system to predict the rest. Every email is clearly marked with Verified or Predicted status and confidence scores.'
  },
  {
    q: 'What happens if an email bounces?',
    a: 'We detect qualifying hard bounces automatically via Gmail telemetry and instantly refund 1 credit for that email. We also update our system to prune invalid contacts for future searches.'
  },
  {
    q: 'Is my Gmail account safe?',
    a: 'Yes. We only request the minimum OAuth scopes needed (gmail.send and metadata reading). Your token is encrypted with enterprise-grade keys and never exposed. We never read your private inbox emails.'
  },
  {
    q: 'What is a credit?',
    a: 'One credit = one personalised recruiter email sent from your Gmail. Credits never expire. You get 25 free credits upon sign up with no credit card required.'
  },
  {
    q: 'How is the follow-up handled?',
    a: 'On Day 3, a follow-up draft is queued for your review. On Day 4, if no reply has been detected, it sends automatically — unless you disable or customize it. As soon as a recruiter replies, all pending follow-ups stop immediately.'
  }
]
