'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Sparkles,
  Check,
  Search,
  Building2,
  Mail,
  Send,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Coins,
  CheckCircle2,
  Paperclip,
  Maximize2,
  Minus,
  X,
  Laptop,
  TrendingUp,
  User,
  Shield,
  Zap,
  Award
} from 'lucide-react'

export default function UnifiedSheetsStory() {
  const stageContainerRef = useRef<HTMLDivElement>(null)
  const pinViewportRef = useRef<HTMLDivElement>(null)

  // Active scene index for telemetry
  const [activeScene, setActiveScene] = useState(0)

  // Credit balance state
  const [creditBalance, setCreditBalance] = useState(50)
  const creditCountNumberRef = useRef<HTMLSpanElement>(null)

  // ---------------------------------------------------------------------------
  // ACTOR REFS
  // ---------------------------------------------------------------------------
  // Act 1 & 2: Luxury Envelope & 3-Panel Origami Folding Letter
  const envelopeContainerRef = useRef<HTMLDivElement>(null)
  const envelopeFlapRef = useRef<HTMLDivElement>(null)
  const waxSealRef = useRef<HTMLDivElement>(null)
  const paperContainerRef = useRef<HTMLDivElement>(null)
  const paperTopPanelRef = useRef<HTMLDivElement>(null)
  const paperMidPanelRef = useRef<HTMLDivElement>(null)
  const paperBottomPanelRef = useRef<HTMLDivElement>(null)
  const tick1Ref = useRef<SVGSVGElement>(null)
  const tick2Ref = useRef<SVGSVGElement>(null)
  const tick3Ref = useRef<SVGSVGElement>(null)
  const tick4Ref = useRef<SVGSVGElement>(null)
  const tick4PillRef = useRef<HTMLDivElement>(null)
  const verifiedBadgeStampRef = useRef<HTMLDivElement>(null)

  // Act 3 & 4: 3D Origami Airplane & Sleek Studio Displays
  const airplaneRef = useRef<HTMLDivElement>(null)
  const airplaneShadowRef = useRef<HTMLDivElement>(null)
  const monitorsStageRef = useRef<HTMLDivElement>(null)
  const monitorARef = useRef<HTMLDivElement>(null)
  const monitorBRef = useRef<HTMLDivElement>(null)
  const monitorCRef = useRef<HTMLDivElement>(null)
  const emailHighlightRef = useRef<HTMLDivElement>(null)
  const emailVerifiedBadgeRef = useRef<HTMLDivElement>(null)
  const scanBeamRef = useRef<HTMLDivElement>(null)

  // Act 5 & 6: Studio Display Morph into Frosted Email Composer
  const floatingEmailChipRef = useRef<HTMLDivElement>(null)
  const emailDraftModalRef = useRef<HTMLDivElement>(null)
  const composerToPillRef = useRef<HTMLSpanElement>(null)
  const typingWordsRef = useRef<HTMLSpanElement[]>([])
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Act 7: Multi-Monitor Delivery Badges
  const badgeARef = useRef<HTMLDivElement>(null)
  const badgeBRef = useRef<HTMLDivElement>(null)
  const badgeCRef = useRef<HTMLDivElement>(null)

  // Act 8: Precision Mechanical Chronometer
  const clockContainerRef = useRef<HTMLDivElement>(null)
  const clockHourHandRef = useRef<SVGLineElement>(null)
  const clockMinuteHandRef = useRef<SVGLineElement>(null)
  const timelineNode3Ref = useRef<HTMLDivElement>(null)
  const timelineNode4Ref = useRef<HTMLDivElement>(null)

  // Act 9: Bounce Intercept, Minted 3D Gold Coin, Executive Credit Vault
  const bounceStageRef = useRef<HTMLDivElement>(null)
  const bounceCrossRef = useRef<HTMLDivElement>(null)
  const mintedGoldCoinRef = useRef<HTMLDivElement>(null)
  const executiveVaultRef = useRef<HTMLDivElement>(null)
  const balanceDisplayRef = useRef<HTMLDivElement>(null)
  const balancePlusBadgeRef = useRef<HTMLDivElement>(null)
  const telemetryBarRef = useRef<HTMLDivElement>(null)

  // Narrative text refs
  const narrativeTextsRef = useRef<(HTMLDivElement | null)[]>([])

  // The 9 continuous narrative beats matching the screenplay
  const storyBeats = [
    {
      id: 'hero',
      badge: '01 · THE OUTREACH ENVELOPE',
      titlePrefix: 'Manually emailing 300 recruiters takes a month.',
      titleItalic: 'We do it before lunch.',
      description: 'Your entire personalized recruiter outreach journey begins with a single floating email envelope.',
      hasCta: true,
    },
    {
      id: 'highlights',
      badge: '02 · YOUR HIGHLIGHTS EXTRACTION',
      titlePrefix: 'Your story,',
      titleItalic: 'powers your outreach.',
      description: 'The envelope opens, and your credentials slide out from the pocket. Each milestone is verified and checked one by one.',
    },
    {
      id: 'plane_dispatch',
      badge: '03 · 3D ORIGAMI DISPATCH',
      titlePrefix: 'Folded into flight,',
      titleItalic: 'aimed at target companies.',
      description: 'The verified sheet folds, seals back inside the envelope pocket, mounts on a 3D origami airplane, and takes flight.',
    },
    {
      id: 'recruiter_monitors',
      badge: '04 · TARGET RECRUITER DISCOVERY',
      titlePrefix: 'Landing directly on',
      titleItalic: 'recruiters’ workstations.',
      description: 'The airplane impacts Recruiter A’s screen, which zooms out to reveal 3 candidate decision makers across the company.',
    },
    {
      id: 'zoom_confirmed',
      badge: '05 · HIGH-CONFIDENCE MATCH',
      titlePrefix: 'Focusing on verified',
      titleItalic: 'talent partners.',
      description: 'The view tracks into Sarah Chen with 99% verified confidence, illuminating her direct email address with glowing selection.',
    },
    {
      id: 'typing_email',
      badge: '06 · ADAPTIVE AI PERSONALISATION',
      titlePrefix: 'Personalised emails,',
      titleItalic: 'typed word by word.',
      description: 'Her address floats into the "To:" field as your highlights are dynamically drafted into a natural pitch and dispatched.',
    },
    {
      id: 'multi_notifications',
      badge: '07 · INBOX NOTIFICATIONS ARRIVE',
      titlePrefix: 'Delivered straight to',
      titleItalic: 'their active inboxes.',
      description: 'The envelope soars to each monitor. Live notification badges pop onto their screens indicating delivery.',
    },
    {
      id: 'timeline_followup',
      badge: '08 · 4-DAY AUTOMATED FOLLOW-UPS',
      titlePrefix: 'Automated follow-ups',
      titleItalic: 'spaced over 4 days.',
      description: 'As the clock spins through Day 3 and Day 4, smart nudges are queued and dispatched if no response has been detected.',
    },
    {
      id: 'bounce_refund',
      badge: '09 · BOUNCE SHIELD & COIN REFUND',
      titlePrefix: 'If an email bounces,',
      titleItalic: 'your credit is refunded.',
      description: 'A hard bounce triggers immediate detection. The bounced screen compresses into a credit coin that returns to your wallet.',
    },
  ]

  // Concise email words strictly bounded to avoid overflow
  const emailWords = [
    'Hi', 'Sarah,', 'noticed', 'Google', 'expanding', 'frontend', 'infrastructure.',
    'With', '3 years experience', 'and', '2 production systems', 'deployed,', 'would', 'love',
    '10 minutes', 'to', 'discuss', 'alignment', 'with', 'your', 'open', 'roles.'
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = stageContainerRef.current
    const pin = pinViewportRef.current
    if (!container || !pin) return

    const tl = gsap.timeline({ paused: true })

    // Helper: Seamless cross-fade narrative slide-wipe
    const transitionNarrative = (fromIdx: number, toIdx: number, position: string) => {
      const fromEl = narrativeTextsRef.current[fromIdx]
      const toEl = narrativeTextsRef.current[toIdx]
      if (toEl) {
        tl.set(toEl, { display: 'flex', opacity: 0, y: 15 }, position)
        tl.to(toEl, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, `${position}+=0.1`)
      }
      if (fromEl) {
        tl.to(fromEl, { y: -15, opacity: 0, duration: 0.3, ease: 'power2.in' }, position)
        tl.set(fromEl, { display: 'none' }, `${position}+=0.35`)
      }
    }

    // -------------------------------------------------------------------------
    // INITIAL SETUP (Frame 0: Paper is PHYSICALLY INSIDE the envelope pocket)
    // -------------------------------------------------------------------------
    gsap.set(envelopeContainerRef.current, { display: 'flex', visibility: 'visible', opacity: 1, scale: 1, z: 0, y: 0, rotateY: 8, rotateX: 6 })
    gsap.set(envelopeFlapRef.current, { rotateX: 0, zIndex: 25 })
    gsap.set(waxSealRef.current, { scale: 1, opacity: 1 })
    
    // Paper is folded in thirds and seated cleanly INSIDE the pocket sleeve
    gsap.set(paperContainerRef.current, { y: 40, opacity: 1, scale: 0.9 })
    gsap.set(paperTopPanelRef.current, { rotateX: 180 })
    gsap.set(paperBottomPanelRef.current, { rotateX: -180 })
    gsap.set([tick1Ref.current, tick2Ref.current, tick3Ref.current, tick4Ref.current], { strokeDashoffset: 40, opacity: 0 })
    gsap.set(tick4PillRef.current, { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: 'rgba(17, 17, 17, 0.08)' })
    gsap.set(verifiedBadgeStampRef.current, { scale: 0, opacity: 0 })

    // Ensure all subsequent actors are strictly HIDDEN at frame 0
    gsap.set(airplaneRef.current, { display: 'none', visibility: 'hidden', opacity: 0, scale: 0.5 })
    gsap.set(monitorsStageRef.current, { display: 'none', visibility: 'hidden', opacity: 0, scale: 1.35, x: 40, z: 40 })
    gsap.set([monitorARef.current, monitorCRef.current], { opacity: 1, filter: 'blur(0px)' })
    gsap.set(emailHighlightRef.current, { backgroundColor: 'transparent', borderColor: 'transparent', boxShadow: 'none' })
    gsap.set(scanBeamRef.current, { x: -160, opacity: 0 })
    gsap.set(emailVerifiedBadgeRef.current, { scale: 0, opacity: 0 })

    gsap.set(floatingEmailChipRef.current, { display: 'none', visibility: 'hidden', opacity: 0, scale: 0.8 })
    gsap.set(emailDraftModalRef.current, { display: 'none', visibility: 'hidden', opacity: 0, scale: 0.85 })
    gsap.set(composerToPillRef.current, { opacity: 0, scale: 0.6 })
    typingWordsRef.current.forEach((w) => {
      if (w) gsap.set(w, { opacity: 0, display: 'none' })
    })
    gsap.set(cursorRef.current, { opacity: 0, x: 160, y: 120 })

    gsap.set([badgeARef.current, badgeBRef.current, badgeCRef.current], { opacity: 0, scale: 0.2 })
    gsap.set(clockContainerRef.current, { display: 'none', visibility: 'hidden', opacity: 0, scale: 0.85 })
    gsap.set(timelineNode3Ref.current, { opacity: 0.3, scale: 0.95 })
    gsap.set(timelineNode4Ref.current, { opacity: 0.3, scale: 0.95 })

    gsap.set(bounceStageRef.current, { display: 'none', visibility: 'hidden', opacity: 0, scale: 0.9 })
    gsap.set(mintedGoldCoinRef.current, { display: 'none', visibility: 'hidden', opacity: 0, scale: 0.4 })
    gsap.set(executiveVaultRef.current, { display: 'none', visibility: 'hidden', opacity: 0, x: 60 })
    gsap.set(balancePlusBadgeRef.current, { opacity: 0, y: 10, scale: 0.8 })

    // Setup initial narrative texts (only beat 0 is visible)
    narrativeTextsRef.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          display: i === 0 ? 'flex' : 'none',
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 25,
        })
      }
    })

    // =========================================================================
    // SCENE 1 -> 2: ENVELOPE OPENS, PAPER EMERGES FROM POCKET & UNFOLDS
    // =========================================================================
    tl.addLabel('scene_1')
    tl.to({}, { duration: 0.5 }) // Hold on Hero Envelope

    transitionNarrative(0, 1, 'step_1_2')

    // Flap breaks wax seal and rotates backwards in 3D (-180deg)
    tl.to(waxSealRef.current, { scale: 0.8, opacity: 0, duration: 0.3 }, 'step_1_2')
    tl.to(envelopeFlapRef.current, {
      rotateX: -180,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 'step_1_2')
    tl.set(envelopeFlapRef.current, { zIndex: 2 }, 'step_1_2+=0.4') // Place behind paper once opened

    // Paper PHYSICALLY RISES OUT OF THE POCKET SLEEVE
    tl.to(paperContainerRef.current, {
      y: -160,
      scale: 1.05,
      duration: 1.1,
      ease: 'power2.out',
    }, 'step_1_2+=0.3')

    // As paper clears the envelope mouth, Top and Bottom panels unfold!
    tl.to(paperTopPanelRef.current, {
      rotateX: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, 'step_1_2+=0.6')
    tl.to(paperBottomPanelRef.current, {
      rotateX: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, 'step_1_2+=0.6')

    // Checkmarks draw on one-by-one with realistic pen stroke
    tl.to(tick1Ref.current, { opacity: 1, strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 'step_1_2+=1.1')
    tl.to(tick2Ref.current, { opacity: 1, strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 'step_1_2+=1.4')
    tl.to(tick3Ref.current, { opacity: 1, strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 'step_1_2+=1.7')
    tl.to(tick4Ref.current, { opacity: 1, strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 'step_1_2+=2.0')
    tl.to(tick4PillRef.current, {
      backgroundColor: 'rgba(220, 252, 231, 0.95)',
      borderColor: '#16a34a',
      duration: 0.4,
    }, 'step_1_2+=2.0')
    tl.to(verifiedBadgeStampRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(2)',
    }, 'step_1_2+=2.15')

    // =========================================================================
    // SCENE 2 -> 3: PHYSICAL FOLDING IN THIRDS, INTO POCKET, MOUNT ON PLANE
    // =========================================================================
    tl.addLabel('scene_2')
    tl.to({}, { duration: 0.6 }) // Hold on completed highlights

    transitionNarrative(1, 2, 'step_2_3')

    // 1. Top Panel folds down 180° along crease
    tl.to(paperTopPanelRef.current, {
      rotateX: 180,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 'step_2_3')

    // 2. Bottom Panel folds up 180° along crease
    tl.to(paperBottomPanelRef.current, {
      rotateX: -180,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 'step_2_3+=0.25')

    // 3. Folded paper slides directly back DOWN into the pocket sleeve
    tl.to(paperContainerRef.current, {
      y: 40,
      scale: 0.9,
      duration: 0.65,
      ease: 'power2.in',
    }, 'step_2_3+=0.75')

    // 4. Envelope flap swings shut over the pocket
    tl.set(envelopeFlapRef.current, { zIndex: 25 }, 'step_2_3+=1.2')
    tl.to(envelopeFlapRef.current, {
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 'step_2_3+=1.2')
    tl.to(waxSealRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'back.out(2)',
    }, 'step_2_3+=1.55')

    // 5. Sealed envelope docks onto the 3D origami airplane
    tl.to(envelopeContainerRef.current, {
      scale: 0.42,
      rotateX: 25,
      rotateZ: -12,
      y: -15,
      duration: 0.6,
      ease: 'power2.in',
    }, 'step_2_3+=1.8')

    // 6. 3D Airplane emerges carrying the mail and takes flight
    tl.set(airplaneRef.current, { display: 'block', visibility: 'visible' }, 'step_2_3+=2.0')
    tl.fromTo(airplaneRef.current,
      { opacity: 0, scale: 0.5, x: -70, y: 15, rotateZ: -15, rotateX: 30, rotateY: -10 },
      { opacity: 1, scale: 1.1, x: 0, y: -25, rotateZ: 12, rotateX: 15, rotateY: 8, duration: 0.8, ease: 'power2.out' },
      'step_2_3+=2.0'
    )
    tl.to(envelopeContainerRef.current, { opacity: 0, display: 'none', duration: 0.25 }, 'step_2_3+=2.3')

    // =========================================================================
    // SCENE 3 -> 4: AIRPLANE DIVES INTO STUDIO DISPLAY & CAMERA ZOOMS OUT
    // =========================================================================
    tl.addLabel('scene_3')
    tl.to({}, { duration: 0.6 }) // Hold on flight

    transitionNarrative(2, 3, 'step_3_4')

    // Airplane accelerates directly toward Recruiter A screen
    tl.to(airplaneRef.current, {
      x: 140,
      y: 15,
      scale: 0.35,
      rotateZ: 25,
      rotateX: -10,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    }, 'step_3_4')
    tl.set(airplaneRef.current, { display: 'none' }, 'step_3_4+=0.6')

    // Studio Displays appear smoothly zoomed in where plane landed (scale 1.35x)
    tl.set(monitorsStageRef.current, { display: 'flex', visibility: 'visible', opacity: 1, scale: 1.35, x: 40 }, 'step_3_4+=0.5')

    // PURE PHYSICAL ZOOM-OUT (Camera pulls back from Recruiter A, revealing all 3 Studio Displays)
    tl.to(monitorsStageRef.current, {
      scale: 1,
      x: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 'step_3_4+=0.6')

    // =========================================================================
    // SCENE 4 -> 5: ZOOM INTO SARAH CHEN & ULTRA-PROMINENT EMAIL HIGHLIGHT
    // =========================================================================
    tl.addLabel('scene_4')
    tl.to({}, { duration: 0.7 }) // Hold on 3 monitors view

    transitionNarrative(3, 4, 'step_4_5')

    // Camera zooms smoothly into Monitor B (Sarah Chen - 99% Verified)
    tl.to(monitorsStageRef.current, {
      scale: 1.55,
      x: 0,
      y: -10,
      z: 70,
      duration: 0.9,
      ease: 'power2.inOut',
    }, 'step_4_5')

    // Blur adjacent monitors
    tl.to([monitorARef.current, monitorCRef.current], {
      opacity: 0.2,
      filter: 'blur(4px)',
      duration: 0.8,
    }, 'step_4_5')

    // Scanning laser beam sweeps down Sarah Chen's display
    tl.fromTo(scanBeamRef.current,
      { x: -160, opacity: 1 },
      { x: 160, opacity: 0, duration: 0.7, ease: 'power1.inOut' },
      'step_4_5+=0.5'
    )

    // ULTRA-PROMINENT EMAIL HIGHLIGHTING
    tl.to(emailHighlightRef.current, {
      backgroundColor: '#16a34a',
      color: '#ffffff',
      borderColor: '#22c55e',
      boxShadow: '0 0 35px rgba(22, 163, 74, 0.75), 0 0 70px rgba(34, 197, 94, 0.35)',
      scale: 1.08,
      duration: 0.6,
      ease: 'power2.out',
    }, 'step_4_5+=0.7')

    // Verified badge stamp pops out
    tl.to(emailVerifiedBadgeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(2)',
    }, 'step_4_5+=0.9')

    // =========================================================================
    // SCENE 5 -> 6: EMAIL LIFTS OFF SCREEN & MONITORS MORPH INTO COMPOSER
    // =========================================================================
    tl.addLabel('scene_5')
    tl.to({}, { duration: 1.0 }) // Hold on highlighted confirmed match

    transitionNarrative(4, 5, 'step_5_6')

    // Highlighted email chip lifts off screen in 3D
    tl.set(floatingEmailChipRef.current, {
      display: 'flex',
      visibility: 'visible',
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1.08,
      z: 80,
    }, 'step_5_6')
    tl.to(emailHighlightRef.current, { opacity: 0, duration: 0.2 }, 'step_5_6')

    // Studio Displays chassis morphs into the frosted email composer
    tl.to(monitorsStageRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, 'step_5_6')
    tl.set(monitorsStageRef.current, { display: 'none' }, 'step_5_6+=0.5')

    // Email composer enters expanding from the monitor center
    tl.set(emailDraftModalRef.current, { display: 'block', visibility: 'visible' }, 'step_5_6+=0.45')
    tl.fromTo(emailDraftModalRef.current,
      { opacity: 0, scale: 0.82, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      'step_5_6+=0.5'
    )

    // Floating email chip glides into "To:" slot
    tl.to(floatingEmailChipRef.current, {
      x: -60,
      y: -95,
      scale: 0.85,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 'step_5_6+=0.5')
    tl.to(composerToPillRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'back.out(2)',
    }, 'step_5_6+=0.9')
    tl.to(floatingEmailChipRef.current, { opacity: 0, display: 'none', duration: 0.1 }, 'step_5_6+=0.95')

    // Word-by-word email body typing animation (strictly inside container)
    typingWordsRef.current.forEach((wordSpan, wIdx) => {
      if (wordSpan) {
        tl.to(wordSpan, {
          opacity: 1,
          display: 'inline',
          duration: 0.04,
        }, `step_5_6+=${1.1 + wIdx * 0.05}`)
      }
    })

    // Pointer cursor moves onto the Send button
    tl.fromTo(cursorRef.current,
      { opacity: 0, x: 120, y: 90 },
      { opacity: 1, x: 0, y: 0, duration: 0.45, ease: 'power2.out' },
      'step_5_6+=2.4'
    )

    // Send button gets clicked (physical button depression)
    tl.to(sendButtonRef.current, {
      scale: 0.9,
      backgroundColor: '#15803d',
      duration: 0.15,
      yoyo: true,
      repeat: 1,
    }, 'step_5_6+=2.85')

    // =========================================================================
    // SCENE 6 -> 7: COMPOSER FOLDS INTO ENVELOPE, ON PLANE, TO MONITORS WITH RED BADGES
    // =========================================================================
    tl.addLabel('scene_6')
    tl.to({}, { duration: 0.6 }) // Hold on sent email

    transitionNarrative(5, 6, 'step_6_7')

    // Composer collapses into folded letter
    tl.to(cursorRef.current, { opacity: 0, duration: 0.2 }, 'step_6_7')
    tl.to(emailDraftModalRef.current, {
      scale: 0.35,
      y: -30,
      rotateX: 60,
      opacity: 0.7,
      duration: 0.5,
      ease: 'power2.in',
    }, 'step_6_7')

    // Envelope appears below to receive it
    tl.set(envelopeContainerRef.current, { display: 'flex', visibility: 'visible', scale: 0.4, y: 35, opacity: 0 }, 'step_6_7+=0.3')
    tl.to(envelopeContainerRef.current, { opacity: 1, scale: 0.5, y: 10, duration: 0.4 }, 'step_6_7+=0.3')
    tl.set(envelopeFlapRef.current, { rotateX: -180 }, 'step_6_7+=0.3')

    // Letter slides into envelope
    tl.to(emailDraftModalRef.current, {
      y: 10,
      scale: 0.2,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    }, 'step_6_7+=0.5')
    tl.set(emailDraftModalRef.current, { display: 'none' }, 'step_6_7+=0.85')

    // Flap seals shut
    tl.to(envelopeFlapRef.current, {
      rotateX: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 'step_6_7+=0.8')

    // Envelope morphs into the airplane
    tl.to(envelopeContainerRef.current, { scale: 0.25, opacity: 0, duration: 0.3 }, 'step_6_7+=1.1')
    tl.set(envelopeContainerRef.current, { display: 'none' }, 'step_6_7+=1.4')

    tl.set(airplaneRef.current, { display: 'block', visibility: 'visible' }, 'step_6_7+=1.1')
    tl.fromTo(airplaneRef.current,
      { opacity: 0, x: -140, y: -40, scale: 0.6, rotateZ: 20 },
      { opacity: 1, x: 0, y: 0, scale: 0.9, rotateZ: 0, duration: 0.6, ease: 'power2.out' },
      'step_6_7+=1.1'
    )

    // 3 Monitors reappear in sharp focus
    tl.set(monitorsStageRef.current, { display: 'flex', visibility: 'visible', opacity: 0, scale: 0.9, x: 0, y: 0 }, 'step_6_7+=1.4')
    tl.to(monitorsStageRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 'step_6_7+=1.4')
    tl.to([monitorARef.current, monitorCRef.current], { opacity: 1, filter: 'blur(0px)', duration: 0.4 }, 'step_6_7+=1.4')

    // Airplane swoops across Monitor A, B, C
    tl.to(airplaneRef.current, {
      x: 180,
      y: 15,
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: 'power1.inOut',
    }, 'step_6_7+=1.6')
    tl.set(airplaneRef.current, { display: 'none' }, 'step_6_7+=2.4')

    // RED NOTIFICATION BADGES (🔴 1) pop onto all 3 computers!
    tl.to(badgeARef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 'step_6_7+=1.8')
    tl.to(badgeBRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 'step_6_7+=2.0')
    tl.to(badgeCRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 'step_6_7+=2.2')

    // =========================================================================
    // SCENE 7 -> 8: MONITORS MERGE INTO PRECISION MECHANICAL CHRONOMETER
    // =========================================================================
    tl.addLabel('scene_7')
    tl.to({}, { duration: 0.7 }) // Hold on red badges

    transitionNarrative(6, 7, 'step_7_8')

    // Monitors fold inward towards center into a circular casing
    tl.to(monitorsStageRef.current, {
      scale: 0.35,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, 'step_7_8')
    tl.set(monitorsStageRef.current, { display: 'none' }, 'step_7_8+=0.5')

    // Precision Chronometer stage appears expanding from center
    tl.set(clockContainerRef.current, { display: 'flex', visibility: 'visible', opacity: 0, scale: 0.85 }, 'step_7_8+=0.35')
    tl.to(clockContainerRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 'step_7_8+=0.4')

    // Chronometer hands spin through Day 1, 2, 3
    tl.to(clockHourHandRef.current, {
      rotate: 720,
      duration: 1.0,
      ease: 'power1.inOut',
      transformOrigin: '50px 50px',
    }, 'step_7_8+=0.5')
    tl.to(clockMinuteHandRef.current, {
      rotate: 4320,
      duration: 1.0,
      ease: 'power1.inOut',
      transformOrigin: '50px 50px',
    }, 'step_7_8+=0.5')

    // Day 3 node appears: "Intelligent follow-up synthesized"
    tl.to(timelineNode3Ref.current, {
      opacity: 1,
      scale: 1,
      backgroundColor: 'rgba(254, 243, 199, 0.95)',
      borderColor: '#d97706',
      duration: 0.4,
      ease: 'back.out(1.5)',
    }, 'step_7_8+=1.2')

    // Hands spin further to Day 4!
    tl.to(clockHourHandRef.current, {
      rotate: 1080,
      duration: 0.8,
      ease: 'power1.inOut',
      transformOrigin: '50px 50px',
    }, 'step_7_8+=1.6')
    tl.to(clockMinuteHandRef.current, {
      rotate: 6480,
      duration: 0.8,
      ease: 'power1.inOut',
      transformOrigin: '50px 50px',
    }, 'step_7_8+=1.6')

    // Day 4 node lights up: "Auto follow-up sent"
    tl.to(timelineNode4Ref.current, {
      opacity: 1,
      scale: 1,
      backgroundColor: 'rgba(220, 252, 231, 0.95)',
      borderColor: '#16a34a',
      duration: 0.4,
      ease: 'back.out(1.5)',
    }, 'step_7_8+=2.0')

    // =========================================================================
    // SCENE 8 -> 9: BOUNCE INTERCEPT, MINTED 3D GOLD COIN, EXECUTIVE CREDIT VAULT (+1)
    // =========================================================================
    tl.addLabel('scene_8')
    tl.to({}, { duration: 0.7 }) // Hold on timeline

    transitionNarrative(7, 8, 'step_8_9')

    // Chronometer folds out
    tl.to(clockContainerRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.in',
    }, 'step_8_9')
    tl.set(clockContainerRef.current, { display: 'none' }, 'step_8_9+=0.5')

    // Realistic Bounce Intercept Stage arrives at center-left (x: -60)
    tl.set(bounceStageRef.current, { display: 'flex', visibility: 'visible', opacity: 0, scale: 0.85, x: -60 }, 'step_8_9+=0.25')
    tl.to(bounceStageRef.current, {
      opacity: 1,
      scale: 1,
      x: -60,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
    }, 'step_8_9+=0.3')

    // Blinking red cross icon on bounced email
    tl.to(bounceCrossRef.current, {
      opacity: 1,
      scale: 1.25,
      duration: 0.15,
      yoyo: true,
      repeat: 4,
      ease: 'power1.inOut',
    }, 'step_8_9+=0.55')

    // Bounced screen compresses into a heavy, minted 3D Gold Coin on left!
    tl.to(bounceStageRef.current, {
      scale: 0.15,
      borderRadius: '9999px',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, 'step_8_9+=1.0')
    tl.set(bounceStageRef.current, { display: 'none' }, 'step_8_9+=1.5')

    // Minted 3D Gold Coin emerges directly where bounce screen collapsed (x: -60)
    tl.set(mintedGoldCoinRef.current, { display: 'block', visibility: 'visible', opacity: 0, x: -60, y: 0, scale: 0.4 }, 'step_8_9+=1.2')
    tl.to(mintedGoldCoinRef.current, {
      opacity: 1,
      x: -30,
      y: -60,
      scale: 1.35,
      rotateY: 360,
      duration: 0.5,
      ease: 'power2.out',
    }, 'step_8_9+=1.3')

    // Executive Credit Vault enters smoothly on the right (x: 90)
    tl.set(executiveVaultRef.current, { display: 'flex', visibility: 'visible', opacity: 0, x: 150 }, 'step_8_9+=1.1')
    tl.to(executiveVaultRef.current, {
      opacity: 1,
      x: 90,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.4)',
    }, 'step_8_9+=1.2')

    // Parabolic arc into vault with second 360° rotation
    tl.to(mintedGoldCoinRef.current, {
      x: 90,
      y: 0,
      scale: 0.35,
      rotateY: 720,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, 'step_8_9+=1.8')
    tl.set(mintedGoldCoinRef.current, { display: 'none' }, 'step_8_9+=2.3')

    // DYNAMIC CREDIT COUNT INCREMENT: 50 -> 51 Credits
    const balanceCounter = { val: 50 }
    tl.to(balanceCounter, {
      val: 51,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: () => {
        const rounded = Math.round(balanceCounter.val)
        setCreditBalance(rounded)
        if (creditCountNumberRef.current) {
          creditCountNumberRef.current.innerText = String(rounded)
        }
      },
    }, 'step_8_9+=2.2')

    // Executive Vault pulses with emerald glow
    tl.to(balanceDisplayRef.current, {
      scale: 1.08,
      boxShadow: '0 0 35px rgba(22, 163, 74, 0.45), 0 0 70px rgba(34, 197, 94, 0.25)',
      borderColor: '#16a34a',
      duration: 0.25,
      yoyo: true,
      repeat: 1,
    }, 'step_8_9+=2.2')

    // +1 Refunded badge pops up proudly
    tl.to(balancePlusBadgeRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(2)',
    }, 'step_8_9+=2.4')

    // Hold on final refund state
    tl.addLabel('scene_9')
    tl.to({}, { duration: 1.0 })

    // Fade telemetry bar slightly before Section 10
    tl.to(telemetryBarRef.current, { opacity: 0, duration: 0.4 }, 'scene_9+=0.4')

    // -------------------------------------------------------------------------
    // SCROLLTRIGGER PIN & SYNCHRONIZATION
    // -------------------------------------------------------------------------
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=7000',
      pin: pin,
      scrub: 0.8,
      animation: tl,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress
        // Accurate scene checkpoints matching the timeline screenplay
        const sceneCheckpoints = [0, 0.08, 0.18, 0.30, 0.42, 0.54, 0.68, 0.80, 0.90]
        let beatIndex = 0
        for (let i = sceneCheckpoints.length - 1; i >= 0; i--) {
          if (p >= sceneCheckpoints[i]) {
            beatIndex = i
            break
          }
        }
        setActiveScene(beatIndex)
      },
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [])

  return (
    <section id="how-it-works" ref={stageContainerRef} className="relative w-full bg-[#f4f3ef] z-20 overflow-visible">
      {/* 
        Pinned 100vh Viewport
      */}
      <div
        ref={pinViewportRef}
        className="w-full h-screen relative flex items-center justify-center overflow-hidden"
        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
      >
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none paper-pattern opacity-70" />
        <div
          className="absolute w-[800px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(209, 250, 229, 0.3) 0%, rgba(236, 253, 245, 0.1) 50%, transparent 70%)' }}
        />

        {/* Floating Pedestal Shadow beneath the 3D Stage */}
        <div className="stage-pedestal" />

        {/* Main 2-Column Content Layout */}
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full z-10 pointer-events-none">
          
          {/* =========================================================================
              LEFT COLUMN: ZERO-OVERLAP EDITORIAL NARRATIVE
              ========================================================================= */}
          <div className="lg:col-span-5 relative h-[320px] sm:h-[360px] flex items-center pointer-events-auto select-none">
            {storyBeats.map((b, idx) => (
              <div
                key={b.id}
                ref={(el) => {
                  narrativeTextsRef.current[idx] = el
                }}
                className="w-full absolute inset-0 flex flex-col justify-center"
                style={{ display: idx === 0 ? 'flex' : 'none' }}
              >
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                  {b.badge}
                </div>

                {/* Editorial Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#111111] leading-[1.12] tracking-tight mb-4">
                  {b.titlePrefix}{' '}
                  <span className="font-serif-italic font-normal text-[#16a34a]">
                    {b.titleItalic}
                  </span>
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#626660] leading-relaxed mb-6 max-w-md">
                  {b.description}
                </p>

                {/* Hero Proof & CTA on Scene 1 */}
                {b.hasCta && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <a
                        href="https://app.eextramile.com"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#16a34a]/25 transition-all hover:scale-105"
                      >
                        <span>Start for free</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-[#111111]/[0.08]">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">SC</div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">MR</div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">EW</div>
                      </div>
                      <span className="text-xs text-[#626660] font-medium">
                        Join <strong className="text-[#111111]">10,000+ job seekers</strong> landing interviews
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PHYSICAL METAMORPHOSIS STAGE
              ========================================================================= */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div
              className="relative w-full max-w-[540px] h-[480px] flex items-center justify-center"
              style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
            >

              {/* -------------------------------------------------------------------
                  ACTOR A: LUXURY ENVELOPE WITH REAL POCKET & 3-PANEL ORIGAMI LETTER
                  ------------------------------------------------------------------- */}
              <div
                ref={envelopeContainerRef}
                className="absolute flex items-center justify-center z-30 select-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Envelope Body with Inset Clip: infinite top/left/right, strictly clipped at bottom! */}
                <div
                  className="relative w-[340px] h-[220px]"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1200px',
                    clipPath: 'inset(-400px -60px 0px -60px)',
                  }}
                >
                  {/* 1. Envelope Back Wall (Layer z: 1) */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#f5f3ec] to-[#e7e3d6] border border-[#d5d0c2] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)]"
                    style={{ transform: 'translateZ(0px)', zIndex: 1 }}
                  >
                    {/* Interior Envelope Throat Pattern */}
                    <div className="absolute inset-2 rounded-xl bg-[#eeebe2] opacity-80" />
                  </div>

                  {/* 2. Envelope Flap (Hinged at top: 0, z: 2 when open backwards, z: 25 when closed) */}
                  <div
                    ref={envelopeFlapRef}
                    className="absolute top-0 inset-x-0 h-[128px] origin-top pointer-events-none"
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'top center', zIndex: 25 }}
                  >
                    <svg width="340" height="128" viewBox="0 0 340 128" className="w-full h-full drop-shadow-md">
                      <polygon points="0,0 340,0 170,124" fill="#fcfbfa" stroke="#dcd7ca" strokeWidth="1" />
                    </svg>

                    {/* Wax Seal Medallion */}
                    <div
                      ref={waxSealRef}
                      className="absolute left-1/2 -translate-x-1/2 top-[98px] w-7 h-7 rounded-full bg-gradient-to-tr from-[#dc2626] via-[#ef4444] to-[#f87171] shadow-md flex items-center justify-center text-white font-bold text-[9px] border-2 border-red-300"
                    >
                      M
                    </div>
                  </div>

                  {/* 3. The 3-Panel Origami Stationery Letter (Layer z: 5 - Sits physically inside pocket!) */}
                  <div
                    ref={paperContainerRef}
                    className="absolute left-1/2 -translate-x-1/2 w-[295px] select-none"
                    style={{ transformStyle: 'preserve-3d', zIndex: 5, top: '25px' }}
                  >
                    {/* Top Panel (Third 1) - Hinge at bottom for downward folding */}
                    <div
                      ref={paperTopPanelRef}
                      className="w-full h-[95px] p-3.5 bg-[#faf9f6] border border-[#e2ded4] rounded-t-2xl shadow-sm relative overflow-hidden flex flex-col justify-between"
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'bottom center',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div className="flex items-center justify-between border-b border-[#111111]/[0.06] pb-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                          <Sparkles className="w-3.5 h-3.5 text-[#16a34a]" />
                          <span>Your Highlights</span>
                        </div>
                        <div
                          ref={verifiedBadgeStampRef}
                          className="text-[9px] font-bold uppercase tracking-wider bg-[#16a34a] text-white px-2 py-0.5 rounded shadow-xs"
                        >
                          Verified
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/90 border border-[#111111]/[0.04]">
                        <div className="w-3.5 h-3.5 rounded bg-[#16a34a] text-white flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ref={tick1Ref} style={{ strokeDashoffset: 40, strokeDasharray: 40 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[10.5px] font-medium text-[#111111]">3+ years frontend development</span>
                      </div>
                    </div>

                    {/* Middle Panel (Third 2) - Stationary Anchor */}
                    <div
                      ref={paperMidPanelRef}
                      className="w-full h-[105px] p-3.5 bg-[#faf9f6] border-x border-[#e2ded4] relative shadow-sm flex flex-col justify-center gap-2"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

                      <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/90 border border-[#111111]/[0.04]">
                        <div className="w-3.5 h-3.5 rounded bg-[#16a34a] text-white flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ref={tick2Ref} style={{ strokeDashoffset: 40, strokeDasharray: 40 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[10.5px] font-medium text-[#111111]">Built 2 major production systems</span>
                      </div>

                      <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/90 border border-[#111111]/[0.04]">
                        <div className="w-3.5 h-3.5 rounded bg-[#16a34a] text-white flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ref={tick3Ref} style={{ strokeDashoffset: 40, strokeDasharray: 40 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[10.5px] font-medium text-[#111111]">Open to relocation worldwide</span>
                      </div>
                    </div>

                    {/* Bottom Panel (Third 3) - Hinge at top for upward folding */}
                    <div
                      ref={paperBottomPanelRef}
                      className="w-full h-[95px] p-3.5 bg-[#faf9f6] border border-[#e2ded4] rounded-b-2xl shadow-sm relative overflow-hidden flex flex-col justify-between"
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'top center',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div
                        ref={tick4PillRef}
                        className="flex items-center gap-2 p-1.5 rounded-lg border transition-colors text-[#15803d]"
                      >
                        <div className="w-3.5 h-3.5 rounded bg-[#16a34a] text-white flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ref={tick4Ref} style={{ strokeDashoffset: 40, strokeDasharray: 40 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[10.5px] font-bold">Passionate about AI/ML & tooling</span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-[#8e928c] pt-1 border-t border-[#111111]/[0.04]">
                        <span className="flex items-center gap-1 font-mono">
                          <ShieldCheck className="w-3 h-3 text-[#16a34a]" /> Verified Profile
                        </span>
                        <span className="text-[#16a34a] font-semibold">100% Match Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Envelope Front Pocket (Layer z: 10 - Physically in front of the lower paper!) */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[145px] rounded-b-2xl pointer-events-none overflow-hidden"
                    style={{ transform: 'translateZ(10px)', zIndex: 10 }}
                  >
                    <svg width="340" height="145" viewBox="0 0 340 145" className="w-full h-full drop-shadow-sm">
                      {/* V-neck pocket throat */}
                      <polygon points="0,145 340,145 340,15 170,45 0,15" fill="#fcfbfa" stroke="#ded9cc" strokeWidth="1" />
                      {/* Left side triangle */}
                      <polygon points="0,15 0,145 170,45" fill="#f8f6ef" />
                      {/* Right side triangle */}
                      <polygon points="340,15 340,145 170,45" fill="#f4f1e7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ACTOR B: REAL 3D ORIGAMI PAPER AIRPLANE WITH FACETED GEOMETRY
                  ------------------------------------------------------------------- */}
              <div
                ref={airplaneRef}
                className="absolute z-40 select-none pointer-events-none"
                style={{ display: 'none', visibility: 'hidden', opacity: 0, transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-[160px] h-[120px] flex items-center justify-center">
                  {/* Dynamic Floor Shadow */}
                  <div
                    ref={airplaneShadowRef}
                    className="absolute bottom-[-15px] w-[130px] h-[25px] rounded-full bg-black/15 blur-md"
                  />

                  {/* 3D Faceted Origami Paper Plane SVG */}
                  <svg width="160" height="120" viewBox="0 0 160 120" className="drop-shadow-2xl">
                    {/* Left Wing (Light Facing) */}
                    <polygon points="80,8 10,105 80,88" fill="url(#wingLightGrad)" stroke="#16a34a" strokeWidth="0.8" />
                    {/* Right Wing (Shaded) */}
                    <polygon points="80,8 150,105 80,88" fill="url(#wingDarkGrad)" stroke="#16a34a" strokeWidth="0.8" />
                    {/* Keel Spine Underbody */}
                    <polygon points="80,8 80,88 74,115" fill="#d6d2c7" />
                    <polygon points="80,8 80,88 86,115" fill="#c4bfb2" />
                    {/* Emerald Wing Accent Stripe */}
                    <polygon points="80,45 60,75 75,72" fill="#16a34a" opacity="0.85" />
                    <polygon points="80,45 100,75 85,72" fill="#15803d" opacity="0.85" />
                    {/* Red Dispatch Seal Dot */}
                    <circle cx="80" cy="50" r="4.5" fill="#ea4335" />

                    <defs>
                      <linearGradient id="wingLightGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#edeae1" />
                      </linearGradient>
                      <linearGradient id="wingDarkGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f3f0e6" />
                        <stop offset="100%" stopColor="#dcd8cb" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ACTOR C: 3 PRECISION WORKSTATION DISPLAYS (Apple Studio Display Aesthetics)
                  ------------------------------------------------------------------- */}
              <div
                ref={monitorsStageRef}
                className="absolute inset-0 flex items-center justify-center gap-4 z-20"
                style={{ display: 'none', visibility: 'hidden', opacity: 0, transformStyle: 'preserve-3d' }}
              >
                {/* STUDIO DISPLAY A (Left): Michael Rodriguez (72%) */}
                <div
                  ref={monitorARef}
                  className="w-[165px] flex flex-col items-center select-none relative"
                >
                  {/* Aluminum Display Enclosure */}
                  <div className="w-full h-[126px] rounded-2xl bg-gradient-to-b from-[#2a2c30] to-[#1a1c1e] p-2 shadow-2xl border border-white/10 ring-1 ring-black/40 flex flex-col justify-between relative overflow-hidden">
                    {/* Glass Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                    <div className="flex items-center justify-between text-[7px] text-gray-400 border-b border-gray-700/80 pb-1">
                      <span className="font-semibold text-gray-300">Google · Talent Suite</span>
                      <span className="text-amber-400 font-bold">72%</span>
                    </div>

                    <div className="bg-[#0f1115] rounded-xl p-2 text-center flex flex-col items-center border border-gray-800">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-bold text-[8px] flex items-center justify-center mb-1 shadow-sm">MR</div>
                      <div className="text-[8.5px] font-bold text-white">Michael Rodriguez</div>
                      <div className="text-[7px] text-gray-400 truncate w-full font-mono">m.rodriguez@google.com</div>
                    </div>

                    <div className="flex justify-end relative">
                      <div className="p-1 rounded-md bg-gray-800 text-white relative border border-gray-700">
                        <Mail className="w-2.5 h-2.5 text-gray-300" />
                        <div
                          ref={badgeARef}
                          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 text-white text-[6px] font-bold flex items-center justify-center animate-pulse shadow-xs"
                        >
                          1
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Machined Cantilever Stand */}
                  <div className="w-7 h-5 bg-gradient-to-b from-[#3a3d42] to-[#25272a] -mt-0.5 rounded-b-md shadow-inner flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111315] shadow-inner" />
                  </div>
                  <div className="w-14 h-1.5 bg-gradient-to-r from-[#202225] via-[#3a3d42] to-[#202225] rounded-full shadow-md" />
                </div>

                {/* STUDIO DISPLAY B (Center): Sarah Chen (99% Verified Decision Maker) */}
                <div
                  ref={monitorBRef}
                  className="w-[195px] flex flex-col items-center select-none relative z-30"
                >
                  {/* Aluminum Display Enclosure with Vivid Emerald Focus Border */}
                  <div className="w-full h-[148px] rounded-2xl bg-gradient-to-b from-[#1f2937] to-[#111827] p-2.5 shadow-2xl border-2 border-[#16a34a] ring-2 ring-[#16a34a]/30 flex flex-col justify-between relative overflow-hidden">
                    {/* Laser Scan Beam */}
                    <div
                      ref={scanBeamRef}
                      className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none"
                    />

                    <div className="flex items-center justify-between text-[8px] text-gray-300 border-b border-gray-700/80 pb-1">
                      <span className="font-semibold text-white flex items-center gap-1">
                        <Building2 className="w-2.5 h-2.5 text-emerald-400" /> Google · Eng Recruiter
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5" /> 99% Verified
                      </span>
                    </div>

                    <div className="bg-[#0b0f17] rounded-xl p-2.5 text-center flex flex-col items-center border border-gray-800 shadow-sm relative">
                      {/* Floating Verified Decision Maker Badge */}
                      <div
                        ref={emailVerifiedBadgeRef}
                        className="absolute -top-3 px-2 py-0.5 bg-gradient-to-r from-[#16a34a] to-[#10b981] text-white text-[7px] font-bold uppercase tracking-wider rounded-full shadow-lg border border-emerald-300"
                      >
                        ✓ Confirmed Recruiter
                      </div>

                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-bold text-[9px] flex items-center justify-center mb-1 mt-0.5 shadow-md">SC</div>
                      <div className="text-[9.5px] font-bold text-white">Sarah Chen</div>

                      {/* Prominent Selection Email Pill with Targeting Brackets */}
                      <div
                        ref={emailHighlightRef}
                        className="text-[9px] font-mono px-2.5 py-1 rounded-md transition-all truncate w-full mt-1 font-semibold text-gray-200 border border-gray-700"
                      >
                        sarah.chen@google.com
                      </div>
                    </div>

                    <div className="flex justify-end relative">
                      <div className="p-1.5 rounded-md bg-gray-800 text-white relative border border-gray-700">
                        <Mail className="w-3 h-3 text-[#16a34a]" />
                        <div
                          ref={badgeBRef}
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 text-white text-[7px] font-bold flex items-center justify-center animate-pulse shadow-xs"
                        >
                          1
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Machined Cantilever Stand */}
                  <div className="w-8 h-5 bg-gradient-to-b from-[#3a3d42] to-[#25272a] -mt-0.5 rounded-b-md shadow-inner flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#111315] shadow-inner" />
                  </div>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-[#202225] via-[#3a3d42] to-[#202225] rounded-full shadow-md" />
                </div>

                {/* STUDIO DISPLAY C (Right): Emily Watson (61%) */}
                <div
                  ref={monitorCRef}
                  className="w-[165px] flex flex-col items-center select-none relative"
                >
                  {/* Aluminum Display Enclosure */}
                  <div className="w-full h-[126px] rounded-2xl bg-gradient-to-b from-[#2a2c30] to-[#1a1c1e] p-2 shadow-2xl border border-white/10 ring-1 ring-black/40 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                    <div className="flex items-center justify-between text-[7px] text-gray-400 border-b border-gray-700/80 pb-1">
                      <span className="font-semibold text-gray-300">Google · Talent Suite</span>
                      <span className="text-amber-400 font-bold">61%</span>
                    </div>

                    <div className="bg-[#0f1115] rounded-xl p-2 text-center flex flex-col items-center border border-gray-800">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-[8px] flex items-center justify-center mb-1 shadow-sm">EW</div>
                      <div className="text-[8.5px] font-bold text-white">Emily Watson</div>
                      <div className="text-[7px] text-gray-400 truncate w-full font-mono">emily.watson@google.com</div>
                    </div>

                    <div className="flex justify-end relative">
                      <div className="p-1 rounded-md bg-gray-800 text-white relative border border-gray-700">
                        <Mail className="w-2.5 h-2.5 text-gray-300" />
                        <div
                          ref={badgeCRef}
                          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 text-white text-[6px] font-bold flex items-center justify-center animate-pulse shadow-xs"
                        >
                          1
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Machined Cantilever Stand */}
                  <div className="w-7 h-5 bg-gradient-to-b from-[#3a3d42] to-[#25272a] -mt-0.5 rounded-b-md shadow-inner flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111315] shadow-inner" />
                  </div>
                  <div className="w-14 h-1.5 bg-gradient-to-r from-[#202225] via-[#3a3d42] to-[#202225] rounded-full shadow-md" />
                </div>
              </div>

              {/* Floating Email Address Chip in Transition */}
              <div
                ref={floatingEmailChipRef}
                className="absolute z-50 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#16a34a] to-[#10b981] text-white font-mono text-[10px] font-bold shadow-2xl pointer-events-none border border-emerald-300"
                style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
              >
                sarah.chen@google.com
              </div>

              {/* -------------------------------------------------------------------
                  ACTOR D: FROSTED EXECUTIVE EMAIL COMPOSER (Strictly Constrained)
                  ------------------------------------------------------------------- */}
              <div
                ref={emailDraftModalRef}
                className="absolute w-[420px] p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#111111]/10 shadow-[0_30px_70px_rgba(0,0,0,0.12)] z-30 select-none overflow-hidden"
                style={{ display: 'none', visibility: 'hidden', opacity: 0, transformStyle: 'preserve-3d' }}
              >
                {/* Header Window Controls */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#111111]/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center text-red-500 font-bold text-[10px] shadow-xs">M</div>
                    <span className="text-xs font-semibold text-[#111111]">New Message</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8e928c]">
                    <Minus className="w-3.5 h-3.5 hover:text-[#111111] transition-colors" />
                    <Maximize2 className="w-3 h-3 hover:text-[#111111] transition-colors" />
                    <X className="w-3.5 h-3.5 hover:text-[#111111] transition-colors" />
                  </div>
                </div>

                {/* Recipient & Subject Header */}
                <div className="space-y-1.5 pb-2.5 mb-2.5 border-b border-[#111111]/[0.06] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#8e928c] w-12 font-medium">To:</span>
                    <span
                      ref={composerToPillRef}
                      className="font-mono text-[#111111] bg-[#dcfce7] border border-[#16a34a]/30 px-2 py-0.5 rounded text-[10px] font-bold"
                    >
                      sarah.chen@google.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8e928c] w-12 font-medium">Subject:</span>
                    <span className="font-medium text-[#111111] text-[10.5px]">Frontend Engineer opportunities at Google</span>
                  </div>
                </div>

                {/* Email Body - STRICTLY CONSTRAINED TO AVOID OVERFLOW */}
                <div className="min-h-[95px] max-h-[105px] overflow-hidden text-[11px] leading-[1.55] text-[#333333] break-words">
                  {emailWords.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      ref={(el) => {
                        if (el) typingWordsRef.current[wIdx] = el
                      }}
                      className={`inline-block mr-1 ${
                        word.includes('years') || word.includes('production')
                          ? 'bg-[#dcfce7] text-[#15803d] font-semibold px-1 py-0.2 rounded border border-[#16a34a]/30'
                          : ''
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                  <span className="inline-block w-1.5 h-3 bg-[#16a34a] ml-1 animate-pulse" />
                </div>

                {/* Send Button & Cursor */}
                <div className="mt-2.5 pt-2.5 border-t border-[#111111]/[0.06] flex items-center justify-between relative">
                  <div className="flex items-center gap-2">
                    <button
                      ref={sendButtonRef}
                      className="px-4 py-1.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#16a34a]/25 transition-all"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send</span>
                    </button>
                    <Paperclip className="w-3.5 h-3.5 text-[#8e928c]" />
                  </div>

                  <div
                    ref={cursorRef}
                    className="absolute left-6 top-1 pointer-events-none z-50 text-[#111111]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111" stroke="#ffffff" strokeWidth="1.5">
                      <polygon points="3,3 3,21 8,16 13,22 16,20 11,14 18,14" />
                    </svg>
                  </div>

                  <span className="text-[10px] text-[#8e928c] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#16a34a]" /> Google OAuth ready
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ACTOR E: PRECISION MECHANICAL CHRONOMETER (4-Day Smart Follow-Up)
                  ------------------------------------------------------------------- */}
              <div
                ref={clockContainerRef}
                className="absolute w-[450px] p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#111111]/10 shadow-[0_30px_70px_rgba(0,0,0,0.12)] z-20 select-none flex flex-col items-center"
                style={{ display: 'none', visibility: 'hidden', opacity: 0, transformStyle: 'preserve-3d' }}
              >
                {/* Brushed Titanium Chronometer Dial */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#0b0f17] border-4 border-[#374151] shadow-[inset_0_4px_10px_rgba(0,0,0,0.6),0_10px_25px_rgba(0,0,0,0.2)] flex items-center justify-center mb-4">
                  <svg width="96" height="96" viewBox="0 0 100 100" className="absolute inset-0">
                    {/* Minute Indices */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="6"
                        x2="50"
                        y2="12"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        transform={`rotate(${deg} 50 50)`}
                      />
                    ))}
                    {/* Hour Hand */}
                    <line
                      ref={clockHourHandRef}
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="28"
                      stroke="#ffffff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Emerald Minute Hand */}
                    <line
                      ref={clockMinuteHandRef}
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="18"
                      stroke="#16a34a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="50" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
                  </svg>
                  
                  <span className="absolute -bottom-2.5 px-2.5 py-0.5 bg-gradient-to-r from-[#16a34a] to-[#10b981] text-white text-[9px] font-bold rounded-full shadow-md border border-emerald-300">
                    Smart Chrono
                  </span>
                </div>

                {/* 4-Day Stepped Timeline */}
                <div className="w-full grid grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#dcfce7] border border-[#16a34a]/30 text-center shadow-xs">
                    <span className="text-[9px] font-bold text-[#15803d]">Day 0</span>
                    <div className="text-[10px] font-bold text-[#15803d]">Dispatched</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f4f3ef] text-center border border-[#111111]/[0.04]">
                    <span className="text-[9px] font-bold text-[#8e928c]">Day 1-2</span>
                    <div className="text-[10px] font-bold text-[#111111]">Awaiting</div>
                  </div>
                  <div ref={timelineNode3Ref} className="p-2.5 rounded-xl border transition-all text-center">
                    <span className="text-[9px] font-bold text-[#d97706]">Day 3</span>
                    <div className="text-[10px] font-bold text-[#d97706]">Synthesized</div>
                  </div>
                  <div ref={timelineNode4Ref} className="p-2.5 rounded-xl border transition-all text-center">
                    <span className="text-[9px] font-bold text-[#15803d]">Day 4</span>
                    <div className="text-[10px] font-bold text-[#15803d]">Auto-Nudge</div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ACTOR F: REALISTIC BOUNCE INTERCEPT, MINTED 3D GOLD COIN, EXECUTIVE VAULT
                  ------------------------------------------------------------------- */}
              <div
                ref={bounceStageRef}
                className="absolute inset-0 flex items-center justify-center z-20"
                style={{ display: 'none', visibility: 'hidden', opacity: 0, transformStyle: 'preserve-3d' }}
              >
                <div className="w-[320px] p-6 rounded-3xl bg-white border-2 border-red-300 shadow-[0_25px_60px_rgba(239,68,68,0.15)] text-center relative select-none">
                  {/* Blinking Intercept Shield */}
                  <div
                    ref={bounceCrossRef}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-100 to-rose-50 text-red-600 flex items-center justify-center mx-auto mb-2.5 border border-red-300 shadow-sm"
                  >
                    <AlertCircle className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div className="text-xs font-bold text-red-600 mb-1 flex items-center justify-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Delivery Intercept · Bounced
                  </div>
                  <div className="text-[11px] font-mono text-[#626660] bg-red-50/80 p-2 rounded-xl mb-2 border border-red-100">
                    550 5.1.1: Recipient address rejected
                  </div>
                  <div className="text-[10px] text-red-600 font-semibold flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" /> Auto-converting into instant credit refund...
                  </div>
                </div>
              </div>

              {/* Minted Heavy 3D Metallic Gold Coin */}
              <div
                ref={mintedGoldCoinRef}
                className="absolute z-40 select-none pointer-events-none"
                style={{ display: 'none', visibility: 'hidden', opacity: 0, transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(217,119,6,0.5)]">
                  {/* Coin Face with Radial Gold Finish and Milled Edge */}
                  <div
                    className="w-16 h-16 rounded-full border-2 border-[#fef08a] flex flex-col items-center justify-center text-white font-extrabold shadow-inner"
                    style={{
                      background: 'conic-gradient(from 180deg at 50% 50%, #fde047, #f59e0b, #d97706, #fde047, #b45309, #fde047)',
                    }}
                  >
                    <div className="w-13 h-13 rounded-full border border-yellow-200/60 flex flex-col items-center justify-center">
                      <span className="text-sm tracking-tighter drop-shadow-md text-amber-950 font-black">+1</span>
                      <span className="text-[7.5px] uppercase tracking-widest text-amber-900 font-bold -mt-0.5">Credit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Credit Vault & Account Card (NO CARTOON AVATARS) */}
              <div
                ref={executiveVaultRef}
                className="absolute right-0 flex flex-col items-center z-30 select-none"
                style={{ display: 'none', visibility: 'hidden', opacity: 0, transformStyle: 'preserve-3d' }}
              >
                {/* Executive Account Profile Card */}
                <div
                  ref={balanceDisplayRef}
                  className="w-[200px] p-4 rounded-3xl bg-gradient-to-b from-[#1f2937] to-[#111827] border border-gray-700 shadow-2xl text-center transition-all relative overflow-hidden"
                >
                  {/* Subtle Inner Glass Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />

                  {/* Profile Header */}
                  <div className="flex items-center gap-2 pb-2 mb-2 border-b border-gray-700/80">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                      AM
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-white flex items-center gap-1">
                        Alex Miller <Award className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-[8.5px] text-gray-400">Pro Account · Verified</div>
                    </div>
                  </div>

                  {/* Vault Balance Display */}
                  <div className="text-center my-1.5">
                    <div className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                      Available Credit Vault
                    </div>
                    <div className="text-lg font-bold text-white font-mono flex items-center justify-center gap-1">
                      <span ref={creditCountNumberRef} className="text-emerald-400 text-xl font-extrabold">
                        {creditBalance}
                      </span>
                      <span className="text-xs text-gray-300 font-normal">Credits</span>
                    </div>
                  </div>

                  {/* Celebratory +1 Refunded Tag */}
                  <div
                    ref={balancePlusBadgeRef}
                    className="mt-1 text-[9px] text-[#15803d] font-bold bg-[#dcfce7] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-[#16a34a]/30 shadow-sm"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" /> +1 Refunded (0.3s)
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Continuous Telemetry Line */}
        <div ref={telemetryBarRef} className="absolute bottom-4 left-0 right-0 z-40 px-6 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#8e928c]">
            <div className="flex items-center gap-2 pointer-events-auto bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#111111]/[0.08] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
              <span className="font-medium text-[#111111]">
                Scroll continuously to play the 3D pipeline video
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#111111]/[0.08] shadow-xs font-mono text-[11px]">
              <span>Scene:</span>
              <span className="font-bold text-[#16a34a]">
                0{activeScene + 1} / 09 · {storyBeats[activeScene]?.badge.split('·')[1]?.trim() || 'Workflow'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
