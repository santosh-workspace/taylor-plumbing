import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Stethoscope, Ambulance, HeartPulse, Baby, Microscope, Activity,
  Phone, Mail, MapPin, ArrowUpRight, Menu, X,
  ShieldCheck, Award, Clock, Upload, CheckCircle2, CalendarCheck,
  Plus, UserRound,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const HOSPITAL = {
  name: 'Santkrupa Hospital ',
  phoneDisplay: '+91 20 4123 5678',
  phoneTel: '+912041235678',
  emergencyDisplay: '+91 90000 11222',
  emergencyTel: '+919000011222',
  email: 'care@Santkrupa Hospitalhospital.in',
  address: 'Alandi Road, Near Alandi Devachi, Pune, Maharashtra 412105',
  opdHours: 'OPD: Mon-Sat, 9:00 AM - 8:00 PM',
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Departments', href: '#services' },
  { label: 'Why Us', href: '#approach' },
  { label: 'Patient Journey', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  { icon: Stethoscope, title: 'General Medicine & OPD', text: 'Expert physician consultations for fever, infections, diabetes, hypertension and everyday health concerns - with short waiting times.' },
  { icon: Ambulance, title: 'Emergency & Trauma (24/7)', text: 'Round-the-clock casualty and ambulance services with a rapid-response team ready every hour of every day.' },
  { icon: HeartPulse, title: 'Cardiology & Health Checks', text: 'ECG, 2D-echo and preventive health packages to keep your heart and whole body in check.' },
  { icon: Baby, title: 'Maternity & Child Care', text: 'Safe deliveries, antenatal care, paediatrics and immunisation in a warm, family-friendly setting.' },
  { icon: Activity, title: 'Surgery & Orthopedics', text: 'Modern operation theatres for general, laparoscopic and orthopaedic procedures by experienced surgeons.' },
  { icon: Microscope, title: 'Diagnostics & Pathology', text: 'In-house pathology lab, digital X-ray and sonography deliver accurate reports without the wait.' },
]

/* ============================== NAVBAR ============================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white shadow-md shadow-primary/30">
              <Plus className="h-5 w-5" strokeWidth={2.6} />
            </span>
            <span className={`font-display font-bold text-lg tracking-tight ${scrolled ? 'text-ink' : 'text-white'}`}>
              Santkrupa Hospital 
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`lift-on-hover font-body text-sm font-medium ${
                  scrolled ? 'text-muted hover:text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="magnetic-btn hidden sm:inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md shadow-primary/30"
            >
              Book Appointment <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className={`lg:hidden grid h-9 w-9 place-items-center rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] bg-deep/90 backdrop-blur-2xl flex flex-col p-8">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-white font-display font-bold text-lg">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary">
                <Plus className="h-5 w-5" strokeWidth={2.6} />
              </span>
              Santkrupa Hospital
            </span>
            <button onClick={() => setOpen(false)} className="text-white grid h-9 w-9 place-items-center" aria-label="Close menu">
              <X className="h-7 w-7" />
            </button>
          </div>
          <div className="flex flex-col gap-6 mt-16">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-white/90 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-auto magnetic-btn inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold"
          >
            Book Appointment <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </>
  )
}

/* ============================== HERO ============================== */
function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.85, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=80"
        alt="Hospital care team"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/45 to-deep/75" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep/60 to-transparent" />

      <div className="pointer-events-none absolute top-24 right-6 sm:right-16 hidden sm:block">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{ top: `${i * 46}px`, right: `${(i % 2) * 60}px`, animationDelay: `${i * 0.8}s` }}
          >
            <Plus className="text-primary-light/40" style={{ width: 26 - i * 3, height: 26 - i * 3 }} strokeWidth={2.4} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-meta font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary-light mb-6">
          Multispecialty Hospital &middot; Alandi, Pune
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95] max-w-5xl text-balance">
          <span className="hero-line-1 block">Care that feels</span>
          <span className="hero-line-2 block font-serif italic font-medium text-primary-light">like family</span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-white/75 text-base sm:text-lg leading-relaxed">
          Santkrupa Hospital  brings trusted doctors, 24/7 emergency services and modern
          diagnostics to the heart of Alandi - compassionate treatment, close to home.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/30"
          >
            Book Appointment <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={`tel:${HOSPITAL.emergencyTel}`}
            className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-6 py-3.5 rounded-full font-semibold border border-white/15"
          >
            <Ambulance className="h-4 w-4" /> Emergency {HOSPITAL.emergencyDisplay}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  )
}

/* =================== FEATURE 3a: Appointment shuffler =================== */
function AppointmentShuffler() {
  const cards = [
    { name: 'Dr. A. Deshmukh', dept: 'General Medicine', slot: 'Today - 10:30 AM' },
    { name: 'Dr. S. Kulkarni', dept: 'Paediatrics', slot: 'Today - 12:15 PM' },
    { name: 'Dr. R. Pawar', dept: 'Orthopedics', slot: 'Tomorrow - 9:00 AM' },
  ]
  const [order, setOrder] = useState([0, 1, 2])
  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setOrder((o) => [o[1], o[2], o[0]]), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {order.map((cardIdx, pos) => {
        const c = cards[cardIdx]
        const styles = [
          { scale: 1, y: 0, blur: 0, op: 1, z: 30 },
          { scale: 0.94, y: 14, blur: 2, op: 0.7, z: 20 },
          { scale: 0.88, y: 28, blur: 4, op: 0.45, z: 10 },
        ][pos]
        return (
          <div
            key={cardIdx}
            className="absolute inset-x-0 top-2 mx-auto w-[92%] rounded-2xl border border-divider bg-surface p-4 shadow-lg transition-all duration-700"
            style={{
              transform: `scale(${styles.scale}) translateY(${styles.y}px)`,
              filter: `blur(${styles.blur}px)`,
              opacity: styles.op,
              zIndex: styles.z,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <UserRound className="h-5 w-5" strokeWidth={2.3} />
              </span>
              <div>
                <p className="font-display font-semibold text-sm text-ink leading-tight">{c.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{c.dept}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
              <CalendarCheck className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs text-primary-dark">{c.slot}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* =============== FEATURE 3b: Signature animation - Vitals monitor =============== */
function VitalsMonitor() {
  const statuses = ['Vitals stable', 'Patient admitted', 'Care in progress', 'Recovered']
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setIdx((i) => (i + 1) % statuses.length), 2300)
    return () => clearInterval(id)
  }, [])

  const drops = [
    { left: 16, delay: 0, dur: 3.0, size: 15 },
    { left: 30, delay: 1.1, dur: 3.4, size: 12 },
    { left: 44, delay: 0.5, dur: 2.8, size: 17 },
    { left: 58, delay: 1.7, dur: 3.6, size: 13 },
    { left: 70, delay: 0.9, dur: 3.1, size: 15 },
    { left: 82, delay: 2.1, dur: 3.3, size: 11 },
    { left: 50, delay: 2.6, dur: 2.9, size: 14 },
  ]

  return (
    <div
      className="relative h-44 w-full overflow-hidden rounded-3xl"
      style={{ background: 'linear-gradient(180deg, #EAF7FA 0%, #D3EEF3 70%, #BEE4EC 100%)' }}
    >
      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(-50%, -12px); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 118px); opacity: 0; }
        }
        @keyframes rain-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes rain-fadein { from { opacity: 0; transform: translateY(2px);} to {opacity:1;transform:translateY(0);} }
        @keyframes ecg-dash { to { stroke-dashoffset: -240; } }
      `}</style>

      <div className="absolute -top-6 -left-4 h-24 w-24 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-8 right-2 h-20 w-20 rounded-full bg-white/50 blur-2xl" />

      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-2 z-20">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary-dark/80">Vitals Monitor</span>
        <span className="font-mono text-[9px] text-primary-dark/70">72 bpm</span>
      </div>

      <svg className="absolute top-7 left-1/2 -translate-x-1/2 z-10" width="150" height="16" viewBox="0 0 150 16">
        <rect x="0" y="4" width="150" height="8" rx="4" fill="#0B8494" />
        <rect x="8" y="6" width="134" height="4" rx="2" fill="#5FC7D4" opacity="0.7" />
        <circle cx="12" cy="8" r="2" fill="#EAF7FA" />
        <circle cx="138" cy="8" r="2" fill="#EAF7FA" />
      </svg>

      {drops.map((d, i) => (
        <svg
          key={i}
          className="absolute z-10"
          style={{
            left: `${d.left}%`,
            top: '30px',
            width: d.size,
            height: d.size,
            animation: prefersReducedMotion ? 'none' : `rain-fall ${d.dur}s ${d.delay}s cubic-bezier(0.5,0,0.7,1) infinite`,
          }}
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id={`cg${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5FC7D4" />
              <stop offset="55%" stopColor="#0EA5B7" />
              <stop offset="100%" stopColor="#0B8494" />
            </linearGradient>
          </defs>
          <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" fill={`url(#cg${i})`} />
          <rect x="10" y="4" width="1.6" height="4" rx="0.8" fill="#EAFBFD" opacity="0.8" />
        </svg>
      ))}

      <svg className="absolute bottom-8 inset-x-0 z-10" width="100%" height="34" viewBox="0 0 240 34" preserveAspectRatio="none">
        <path
          d="M0 20 H40 l6 -14 l6 26 l6 -12 H120 l6 -14 l6 26 l6 -12 H240"
          fill="none"
          stroke="#0B8494"
          strokeWidth="2"
          strokeDasharray="240"
          style={{ animation: prefersReducedMotion ? 'none' : 'ecg-dash 3s linear infinite' }}
          opacity="0.55"
        />
      </svg>

      {[20, 50, 80].map((l, i) => (
        <span
          key={i}
          className="absolute z-0 rounded-full border border-primary/50"
          style={{
            left: `${l}%`,
            bottom: '18px',
            width: 10,
            height: 10,
            animation: prefersReducedMotion ? 'none' : `rain-ripple ${2.8 + i * 0.4}s ${i * 0.6}s ease-out infinite`,
          }}
        />
      ))}

      <div className="absolute bottom-0 inset-x-0 flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm z-20">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 ring-pulse" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span key={idx} className="font-mono text-[10px] text-primary-dark" style={{ animation: 'rain-fadein 0.5s ease' }}>
          {statuses[idx]}
        </span>
      </div>
    </div>
  )
}

/* =============== FEATURE 3c: Cursor + scheduler =============== */
function AppointmentScheduler() {
  const days = ['09', '10', '11', '12', '13', '14', '15']
  const [step, setStep] = useState(0)
  const targetDay = 3
  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1400)
    return () => clearInterval(id)
  }, [])

  const cursorPos =
    step === 0 ? { x: 20, y: 20 } :
    step >= 1 ? { x: 118, y: 70 } : { x: 20, y: 20 }
  const clicked = step === 2
  const confirmed = step >= 3

  return (
    <div className="relative h-44 w-full rounded-3xl border border-divider bg-surface p-4 overflow-hidden">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Select a slot</p>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <div
            key={d}
            className={`grid place-items-center rounded-lg py-2 text-xs font-mono transition-all duration-300 ${
              i === targetDay && clicked ? 'bg-primary text-white scale-110' :
              i === targetDay ? 'bg-primary/10 text-primary-dark' : 'bg-background text-muted'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {confirmed ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2.5" style={{ animation: 'rain-fadein 0.4s ease' }}>
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="font-body text-xs text-primary-dark font-medium">Slot booked - 12 July, 10:30 AM</span>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-background px-3 py-2.5">
          <CalendarCheck className="h-4 w-4 text-muted" />
          <span className="font-body text-xs text-muted">Choosing your appointment...</span>
        </div>
      )}

      <svg
        className="absolute z-30 transition-all duration-700 ease-out drop-shadow"
        style={{ left: cursorPos.x, top: cursorPos.y, transform: clicked ? 'scale(0.85)' : 'scale(1)' }}
        width="20" height="20" viewBox="0 0 24 24" fill="none"
      >
        <path d="M4 2l6 16 2.5-6.5L19 9z" fill="#12222A" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ============================== FEATURES ============================== */
function Features() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: 'Easy Access',
      title: 'See the right doctor, sooner',
      comp: <AppointmentShuffler />,
      text: 'Choose from our panel of specialists and reserve a slot that suits you.',
      bullets: ['Short OPD waiting times', 'Specialist referrals in-house'],
    },
    {
      eyebrow: 'Always Monitoring',
      title: 'Your safety, watched closely',
      comp: <VitalsMonitor />,
      text: 'From admission to recovery, our clinical team tracks every vital sign with care.',
      bullets: ['24/7 nursing observation', 'Modern monitoring equipment'],
    },
    {
      eyebrow: 'Simple Booking',
      title: 'Appointments in a few taps',
      comp: <AppointmentScheduler />,
      text: 'Book online or call us - pick a date, confirm, and you are set.',
      bullets: ['Online & phone booking', 'Instant confirmation'],
    },
  ]

  return (
    <section ref={ref} className="relative py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="max-w-2xl mb-14">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary mb-4">What we do best</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-balance">
          Healthcare built around <span className="font-serif italic font-medium text-primary">you</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="feature-card rounded-3xl bg-surface border border-divider p-6 sm:p-8 shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-1.5">{c.eyebrow}</p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5 tracking-tight">{c.title}</h3>
            {c.comp}
            <p className="mt-5 text-muted text-sm leading-relaxed">{c.text}</p>
            <ul className="mt-4 space-y-2">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ============================== COUNTUP ============================== */
function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTs = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - startTs) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(end * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])
  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>
}

/* ============================== PILLARS ============================== */
function Pillars() {
  const pillars = [
    { label: 'Serving Alandi since 1999', end: 25, suffix: '+', desc: 'Over two and a half decades of trusted, compassionate care for families across Alandi and Pune.' },
    { label: 'Emergency response', end: 24, suffix: '/7', desc: 'Casualty, ambulance and critical-care teams on duty every hour, every single day of the year.' },
    { label: 'Patients cared for', end: 200, suffix: 'K+', desc: 'Hundreds of thousands of consultations, procedures and recoveries - and counting.' },
  ]
  return (
    <section id="approach" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <style>{`@keyframes pillar-sweep {0%{transform:translateX(-100%);}50%{transform:translateX(100%);}100%{transform:translateX(100%);}}`}</style>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-3 lg:divide-x divide-divider gap-12 lg:gap-0">
          {pillars.map((p, i) => (
            <div key={i} className={`${i > 0 ? 'lg:pl-12' : ''}`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">{p.label}</p>
              <div className="font-display text-6xl sm:text-7xl font-bold tracking-tighter gradient-text">
                <CountUp end={p.end} suffix={p.suffix} />
              </div>
              <div className="relative h-px w-full overflow-hidden my-5">
                <div className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: 'pillar-sweep 3s ease-in-out infinite' }} />
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-xs">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================== PROTOCOL ============================== */
function Protocol() {
  const ref = useRef(null)
  const steps = [
    {
      n: '01', eyebrow: 'Register & Consult',
      title: 'Walk in or book ahead',
      text: 'Register at the front desk or online. Meet the right specialist quickly, with your history and concerns heard in full.',
      bullets: ['Online & walk-in registration', 'Minimal waiting time'],
      img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80',
    },
    {
      n: '02', eyebrow: 'Diagnose & Treat',
      title: 'Accurate, in-house diagnostics',
      text: 'Lab tests, imaging and expert evaluation happen under one roof, so your treatment plan starts without delay.',
      bullets: ['Pathology, X-ray & sonography', 'Clear, honest guidance'],
      img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    },
    {
      n: '03', eyebrow: 'Recover & Follow-up',
      title: 'Care that continues at home',
      text: 'From discharge instructions to follow-up visits, we stay with you through a complete, comfortable recovery.',
      bullets: ['Structured follow-up plans', 'Reachable care team'],
      img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=100', end: '+=500', scrub: 1 },
          scale: 0.92, filter: 'blur(6px) saturate(0.7)', opacity: 0.5, ease: 'none',
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={ref} className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-4">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary mb-4">Your patient journey</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter max-w-2xl text-balance">
          Three simple steps to <span className="font-serif italic font-medium text-primary">better health</span>
        </h2>
      </div>
      <div className="relative">
        {steps.map((s) => (
          <div key={s.n} className="protocol-card sticky top-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
            <div className="grid lg:grid-cols-5 gap-8 rounded-4xl bg-surface border border-divider p-6 sm:p-10 shadow-xl overflow-hidden">
              <div className="lg:col-span-3 flex flex-col justify-center">
                <span className="font-display text-5xl font-bold text-primary/20">{s.n}</span>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-4 mb-2">{s.eyebrow}</p>
                <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight mb-4">{s.title}</h3>
                <p className="text-muted leading-relaxed max-w-lg mb-5">{s.text}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2">
                <img src={s.img} alt={s.title} className="h-56 lg:h-full w-full rounded-2xl object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ============================== SERVICES GRID ============================== */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={ref} className="bg-deep text-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-14">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary-light mb-4">Departments</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter max-w-2xl text-balance">
          Comprehensive care under <span className="font-serif italic font-medium text-primary-light">one roof</span>
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {SERVICES.map((s) => (
            <div key={s.title} className="svc-tile group bg-deep p-8 sm:p-10 transition-colors hover:bg-white/[0.03]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary-light mb-5 transition-transform group-hover:scale-110">
                <s.icon className="h-6 w-6" strokeWidth={2.3} />
              </span>
              <h3 className="font-display text-xl font-semibold mb-2.5 tracking-tight">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================== TRUST SIGNALS ============================== */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const badges = [
    { icon: ShieldCheck, title: 'Hygiene & Safety First', sub: 'Strict infection-control and sterilisation protocols across every ward and OT.' },
    { icon: Award, title: 'Experienced Specialists', sub: 'A trusted panel of consultants and surgeons with decades of combined experience.' },
    { icon: Clock, title: '24/7 Emergency Care', sub: 'Casualty, ambulance and critical care available round the clock, every day.' },
  ]

  return (
    <section ref={ref} className="py-24 sm:py-32 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid lg:grid-cols-3 gap-6">
        {badges.map((b, i) => (
          <div
            key={b.title}
            className="rounded-2xl bg-surface border border-divider p-7 shadow-sm lift-on-hover transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transitionDelay: `${i * 0.12}s` }}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
              <b.icon className="h-6 w-6" strokeWidth={2.3} />
            </span>
            <h3 className="font-display text-lg font-semibold mb-2">{b.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{b.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ============================== CONTACT FORM ============================== */
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [files, setFiles] = useState([])
  const inputCls = 'w-full rounded-xl border border-divider bg-background px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition'

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }
  const onDrop = (e) => {
    e.preventDefault()
    const list = [...e.dataTransfer.files].filter((f) => f.type.startsWith('image/')).slice(0, 5 - files.length)
    setFiles((prev) => [...prev, ...list])
  }
  const onPick = (e) => {
    const list = [...e.target.files].filter((f) => f.type.startsWith('image/')).slice(0, 5 - files.length)
    setFiles((prev) => [...prev, ...list])
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary mb-4">Get in touch</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mb-6 text-balance">
            Book an appointment or ask a question
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md">
            Share your details and our front-desk team will call you back to confirm. For emergencies, please call our 24/7 line directly.
          </p>

          <div className="space-y-4">
            <a href={`tel:${HOSPITAL.phoneTel}`} className="flex items-center gap-4 rounded-2xl bg-surface border border-divider p-4 lift-on-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Phone className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Reception</p>
                <p className="font-display font-semibold text-ink">{HOSPITAL.phoneDisplay}</p>
              </div>
            </a>
            <a href={`mailto:${HOSPITAL.email}`} className="flex items-center gap-4 rounded-2xl bg-surface border border-divider p-4 lift-on-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Email</p>
                <p className="font-display font-semibold text-ink">{HOSPITAL.email}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl bg-surface border border-divider p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Visit us</p>
                <p className="font-display font-semibold text-ink text-sm leading-snug">{HOSPITAL.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-surface border border-divider p-6 sm:p-8 shadow-lg">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary mb-5">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="font-display text-2xl font-bold mb-2">Thank you!</h3>
                <p className="text-muted max-w-sm">We have received your request. Our team will call you back shortly to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name"><input required type="text" className={inputCls} placeholder="Your name" /></Field>
                  <Field label="Email"><input required type="email" className={inputCls} placeholder="you@email.com" /></Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone"><input required type="tel" className={inputCls} placeholder="+91 90000 00000" /></Field>
                  <Field label="Department"><input type="text" className={inputCls} placeholder="e.g. General Medicine" /></Field>
                </div>
                <Field label="How can we help?">
                  <textarea rows={5} className={inputCls} placeholder="Describe your concern or preferred appointment time..." />
                </Field>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  className="rounded-xl border-2 border-dashed border-divider bg-background px-4 py-6 text-center"
                >
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-6 w-6 text-primary" />
                    <span className="text-sm text-muted">Drop reports / prescriptions here, or <span className="text-primary font-medium">browse</span></span>
                    <span className="font-mono text-[10px] text-muted/70">Images only - up to 5 files</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={onPick} />
                  </label>
                  {files.length > 0 && (
                    <ul className="mt-4 space-y-1.5 text-left">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between rounded-lg bg-surface border border-divider px-3 py-1.5 text-xs">
                          <span className="truncate text-ink/80">{f.name}</span>
                          <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-muted hover:text-red-500">
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="magnetic-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/30 disabled:opacity-70"
                >
                  {status === 'sending' ? 'Sending...' : 'Request Appointment'}
                  {status !== 'sending' && <ArrowUpRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== FOOTER ============================== */
function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
              <Plus className="h-5 w-5" strokeWidth={2.6} />
            </span>
            <span className="font-display font-bold text-lg">Santkrupa Hospital</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
            Compassionate multispecialty care serving Alandi and greater Pune - close to home, open around the clock.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">Emergency open now</span>
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Departments</p>
          <ul className="space-y-2.5">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.title}><a href="#services" className="text-white/70 hover:text-primary-light text-sm transition-colors">{s.title}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Hospital</p>
          <ul className="space-y-2.5">
            <li><a href="#approach" className="text-white/70 hover:text-primary-light text-sm transition-colors">Why Choose Us</a></li>
            <li><a href="#process" className="text-white/70 hover:text-primary-light text-sm transition-colors">Patient Journey</a></li>
            <li><a href="#services" className="text-white/70 hover:text-primary-light text-sm transition-colors">Departments</a></li>
            <li><a href="#contact" className="text-white/70 hover:text-primary-light text-sm transition-colors">Book Appointment</a></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><a href={`tel:${HOSPITAL.phoneTel}`} className="hover:text-primary-light">{HOSPITAL.phoneDisplay}</a></li>
            <li><a href={`tel:${HOSPITAL.emergencyTel}`} className="hover:text-primary-light">Emergency {HOSPITAL.emergencyDisplay}</a></li>
            <li><a href={`mailto:${HOSPITAL.email}`} className="hover:text-primary-light">{HOSPITAL.email}</a></li>
            <li className="text-white/50 leading-relaxed">{HOSPITAL.address}</li>
            <li className="text-white/50">{HOSPITAL.opdHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">(c) {new Date().getFullYear()} Santkrupa Hospital, Alandi, Pune. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/50 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/50 hover:text-white text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================== APP ============================== */
export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
