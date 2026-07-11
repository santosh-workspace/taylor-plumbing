import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapContainer, TileLayer, Circle, Marker, Tooltip, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Wrench, Siren, Flame,
  Phone, Mail, MapPin, ArrowUpRight, Menu, X,
  ShieldCheck, Upload, CheckCircle2, CalendarCheck,
  Droplet, UserRound, ChevronLeft, ChevronRight, Expand, Star,
} from 'lucide-react'
import logo from './assets/logo.png'
import galleryBoilerInstall from './assets/gallery-boiler-install.jpg'

/* Blurred backdrop photos used behind section content - kept subtle via a heavy blur + tint overlay */
const SECTION_IMAGES = {
  features: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=2400&q=60',
  services: 'https://images.unsplash.com/photo-1650551182956-47efa0f90b64?auto=format&fit=crop&w=2400&q=60',
  gallery: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=2400&q=60',
  reviews: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=2400&q=60',
}

/* ============================== SECTION BACKDROP ============================== */
/* `strong` = more tint, for sections where body text sits directly on the photo with no card behind it */
function SectionBg({ image, dark, strong, faint }) {
  const overlayClass = dark
    ? (faint ? 'bg-deep/55' : strong ? 'bg-deep/78' : 'bg-deep/62')
    : (faint ? 'bg-background/40' : strong ? 'bg-background/82' : 'bg-background/65')
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="kenburns-bg h-full w-full object-cover"
        style={{ filter: 'blur(9px)' }}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  )
}

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const BUSINESS = {
  name: 'Taylor Plumbing & Heating',
  legalName: 'Taylor Plumbing & Heating Installation Ltd',
  phoneDisplay: '07961 766 105',
  phoneTel: '+447961766105',
  emergencyDisplay: '07961 766 105',
  emergencyTel: '+447961766105',
  email: 'info@taylor-plumbing.com',
  address: '9 St Marys Plain, Norwich, Norfolk NR3 3AF',
  coverage: 'Emergency line open 24/7, 365 days a year',
  googleReviewsUrl: 'https://www.google.com/maps?cid=14595251315771121978',
  googleRating: 4.9,
}

const WHATSAPP_URL = `https://wa.me/${BUSINESS.phoneTel.replace('+', '')}?text=${encodeURIComponent("Hi, I'd like to get a quote for a plumbing/heating job.")}`

/* WhatsApp's official glyph - links out to a pre-filled chat with the business number */
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.696 4.61 1.897 6.482L4 29l7.73-1.865A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.78 9.78 0 0 1-4.988-1.365l-.358-.213-4.588 1.107 1.128-4.47-.234-.372A9.78 9.78 0 0 1 5.273 15c0-5.912 4.815-10.727 10.73-10.727 5.916 0 10.73 4.815 10.73 10.727 0 5.913-4.814 10.818-10.73 10.818Zm5.885-8.04c-.322-.161-1.906-.94-2.202-1.048-.295-.108-.51-.161-.724.161-.214.322-.83 1.048-1.018 1.263-.188.215-.375.242-.697.081-.322-.161-1.36-.501-2.591-1.598-.958-.855-1.605-1.91-1.793-2.232-.188-.322-.02-.496.141-.656.145-.144.322-.375.483-.563.161-.188.214-.322.322-.537.107-.215.053-.402-.027-.563-.08-.161-.723-1.744-.991-2.388-.261-.627-.526-.542-.723-.552l-.617-.011a1.18 1.18 0 0 0-.858.402c-.295.322-1.126 1.1-1.126 2.683 0 1.583 1.153 3.112 1.313 3.327.161.215 2.267 3.463 5.494 4.856.768.332 1.367.53 1.834.678.77.245 1.47.21 2.024.128.618-.092 1.906-.78 2.174-1.532.268-.752.268-1.397.188-1.532-.08-.134-.295-.215-.617-.376Z" />
    </svg>
  )
}

/* Google's official 4-colour "G" mark - used only to attribute the rating below to Google, linking out to the real listing */
function GoogleGIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Areas', href: '#areas' },
  { label: 'Our Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

/* Mirrors the old site's own nav structure: Plumbing / Central Heating / Emergency Plumber */
const MAIN_SERVICES = [
  {
    icon: Wrench,
    title: 'Plumbing',
    tagline: 'General plumbing, start to finish',
    text: 'General plumbing is one of our main services. Whether it’s a leaking tap, a burst pipe or a full bathroom installation, we have everything covered - no job is too small.',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=2400&q=80',
    bullets: ['Leaks, burst pipes & overflows', 'Taps, tanks & cylinders', 'Pump replacement & cold-water filtering', 'Service & maintenance contracts'],
  },
  {
    icon: Flame,
    title: 'Central Heating',
    tagline: 'Specialist installation & servicing',
    text: 'A specialist central heating installation and service company, offering the deep expertise and high level of customer service you’d expect from a leader in the field.',
    image: 'https://images.unsplash.com/photo-1650551182991-b07558247564?auto=format&fit=crop&w=2400&q=80',
    bullets: ['New high-efficiency boilers & pipework', 'Radiators, TRVs & underfloor heating', 'Powerflushing & unvented cylinders', 'Landlord gas safety certificates'],
    subServices: [
      {
        title: 'Boiler Breakdowns – Fault Finding Process',
        text: 'A systematic check of flow and return pipes, the boiler flame, flue position, system pressure and controls - so the fault is found fast, not guessed at.',
        image: 'https://images.unsplash.com/photo-1703041555997-f51216e6a532?auto=format&fit=crop&w=2400&q=80',
      },
      {
        title: 'Central Heating Repair and Installation Services',
        text: 'New boiler, radiators, heating controls and pipework - fitted, powerflushed, pressure tested and signed off with a Gas Safe certificate.',
        image: 'https://images.unsplash.com/photo-1613063457061-eecde6f4b20d?auto=format&fit=crop&w=2400&q=80',
      },
    ],
  },
  {
    icon: Siren,
    title: 'Emergency Plumber',
    tagline: 'Fast response, 24hr / 365',
    text: 'Fast-response local emergency plumbers, 24 hours a day, 365 days a year - and we only charge from time of arrival.',
    image: 'https://images.unsplash.com/photo-1676210134190-3f2c0d5cf58d?auto=format&fit=crop&w=2400&q=80',
    bullets: ['Boiler breakdowns - combi, conventional & condensing', 'Radiators & pipes', 'Leaks & burst pipes', 'Target response: within 2 hours'],
  },
]

// 24/7 Taylor Plumbing & Heating Installations, Norwich (from the business's Google Maps listing)
const SERVICE_CENTER = [52.6338826, 1.2907295]
const SERVICE_RADIUS_KM = 10
const SERVICE_BOUNDS = [
  [SERVICE_CENTER[0] - SERVICE_RADIUS_KM / 111, SERVICE_CENTER[1] - SERVICE_RADIUS_KM / (111 * Math.cos((SERVICE_CENTER[0] * Math.PI) / 180))],
  [SERVICE_CENTER[0] + SERVICE_RADIUS_KM / 111, SERVICE_CENTER[1] + SERVICE_RADIUS_KM / (111 * Math.cos((SERVICE_CENTER[0] * Math.PI) / 180))],
]

const norwichPinIcon = L.divIcon({
  className: '',
  html: '<span class="map-pin-dot ring-pulse"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

/* Real customer reviews, copied verbatim (minor typo fixes only) from the business's Google listing */
const TESTIMONIALS = [
  {
    name: 'Pippa Lain-Smith',
    rating: 5,
    text: "Our boiler started leaking water on a Saturday afternoon. We found Taylor Plumbing and Heating via a Google search and I'm very glad we did. Clynton arrived within 2 hours to make the boiler safe. He explained what was wrong with it and we discussed options for repair or replacement. He provided a quote for a new boiler and, because his schedule was already full for the week, he offered to work on a Sunday so that we wouldn't be without hot water for too long. He is professional, polite and friendly and he's definitely going to be our go-to heating engineer and plumber from now on.",
  },
  {
    name: 'Richard Taylor',
    rating: 5,
    text: 'Had major plumbing issues following a water softener malfunction which meant taps, toilets, showers etc not working and under time pressure to get things sorted. Clynton put everything right to the tight timescale required and rectified some other long-standing plumbing issues as well. Would highly recommend him, very personable, understanding and accommodating, will definitely use him again. Many, many thanks.',
  },
  {
    name: 'Fay Harvey',
    rating: 5,
    text: "10/10 would recommend them to anyone and everyone! I had a new boiler installed after buying my first house and the service was personal and considerate, the work neat, fast and professional. All the rubbish was taken away and everything made good and tidy. They did an amazing job and I couldn't be happier with the service I received. I'm relieved I've found a local heating engineer I can trust, I'll be using them for many years to come!",
  },
  {
    name: 'William Riley',
    rating: 5,
    text: "We had some gas work done at very short notice and it turned into a 2 part job that was a little more complicated. He just got on with it and didn't complain once. Also, when initially called around for quotes for capping my gas stove, the quotes ranged up to £300... he was cheapest by far and did a brilliant and professional job. Will DEFINITELY use again in the future.",
  },
  {
    name: 'Aaron Stock',
    rating: 5,
    text: 'Great service and very reliable, would definitely use again!',
  },
]

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=80', title: 'Commercial pipework upgrade', place: 'Norwich city centre' },
  { img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80', title: 'Full bathroom refit', place: 'Thorpe St Andrew' },
  { img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1000&q=80', title: 'Tap & mixer replacement', place: 'Norwich' },
  { img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80', title: 'Ensuite renovation', place: 'Norwich' },
  { img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80', title: 'Boiler service call-out', place: 'Norfolk' },
  { img: galleryBoilerInstall, title: 'Combi boiler installation', place: 'Norfolk' },
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
            <img src={logo} alt="Taylor Plumbing & Heating" className="h-9 w-auto drop-shadow-sm" />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`lift-on-hover font-body text-sm font-medium ${
                  scrolled ? 'text-muted hover:text-accent' : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="magnetic-btn hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/30"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="text-xs font-semibold">WhatsApp</span>
            </a>
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              aria-label={`Call ${BUSINESS.phoneDisplay}`}
              className="magnetic-btn hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-primary text-ink shadow-md shadow-primary/30"
            >
              <Phone className="h-4 w-4" />
              <span className="text-xs font-semibold">Call</span>
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
            <img src={logo} alt="Taylor Plumbing & Heating" className="h-9 w-auto drop-shadow-sm" />
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
                className="font-display text-3xl font-semibold text-white/90 hover:text-primary-light transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-auto flex gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="magnetic-btn flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-full font-semibold"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              onClick={() => setOpen(false)}
              className="magnetic-btn flex-1 inline-flex items-center justify-center gap-2 bg-primary text-ink px-6 py-4 rounded-full font-semibold"
            >
              <Phone className="h-5 w-5" /> Call now
            </a>
          </div>
        </div>
      )}
    </>
  )
}

/* ============================== HERO ============================== */
function Hero({ onOpenQuote }) {
  const ref = useRef(null)
  const parallaxRef = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.85, stagger: 0.12, ease: 'power3.out' })
      gsap.to(parallaxRef.current, {
        y: 70,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <div ref={parallaxRef} className="absolute -inset-y-20 inset-x-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1676210134188-4c05dd172f89?auto=format&fit=crop&w=1920&q=80"
          alt="Plumbing engineer repairing pipework under a sink"
          className="kenburns-bg h-full w-full object-cover brightness-[0.55]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/45 to-deep/75" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep/60 to-transparent" />

      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="pointer-events-none absolute top-24 right-6 sm:right-16 hidden sm:block">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{ top: `${i * 46}px`, right: `${(i % 2) * 60}px`, animationDelay: `${i * 0.8}s` }}
          >
            <Droplet className="text-primary-light/40" style={{ width: 26 - i * 3, height: 26 - i * 3 }} strokeWidth={2.2} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-meta font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary-light mb-6">
          Plumbing &amp; Heating Engineers &middot; Norwich, Norfolk
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95] max-w-5xl text-balance">
          <span className="hero-line-1 block">Fixed right,</span>
          <span className="hero-line-2 block font-serif italic font-medium text-primary-light">the first time</span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-white/75 text-base sm:text-lg leading-relaxed">
          Taylor Plumbing &amp; Heating brings fully qualified, Gas Safe registered engineers to homes across
          Norwich and Norfolk - honest pricing, no call-out charge on scheduled work, and a 24-hour
          emergency line when you need us most.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenQuote}
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-ink px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/30"
          >
            Get a Free Quote <ArrowUpRight className="h-4 w-4" />
          </button>
          <a
            href={`tel:${BUSINESS.emergencyTel}`}
            className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-6 py-3.5 rounded-full font-semibold border border-white/15"
          >
            <Siren className="h-4 w-4" /> Emergency {BUSINESS.emergencyDisplay}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/60 via-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}

/* ============================== ABOUT ============================== */
function About() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.about-in', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-12 gap-12 items-center">
        <div className="about-in lg:col-span-7">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-4">Welcome</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mb-6 text-balance">
            Welcome to <span className="font-serif italic font-medium text-primary-dark">Taylor Plumbing &amp; Heating</span>
          </h2>
          <div className="space-y-4 text-muted leading-relaxed max-w-xl">
            <p>
              Taylor Plumbing &amp; Heating only uses reliable, experienced tradesmen - so you can count on the
              quality of every job we do. We're not your usual plumbing company: no late arrivals, no rip-off
              pricing, just honest work done right.
            </p>
            <p>Better quality doesn't mean a bigger bill - with us, it simply means a better service for you.</p>
          </div>
        </div>
        <div className="about-in lg:col-span-5">
          <div className="relative rounded-4xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1676210134050-6f12c6898395?auto=format&fit=crop&w=1200&q=80"
              alt="Taylor Plumbing & Heating engineer at work"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-ink">
                <ShieldCheck className="h-5 w-5" strokeWidth={2.3} />
              </span>
              <p className="text-white font-display font-semibold text-sm leading-tight">Gas Safe registered &amp; fully insured engineers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =================== FEATURE 3a: Dispatch shuffler =================== */
function JobDispatchPreview() {
  const cards = [
    { name: 'M. Taylor', dept: 'Boiler Breakdown', slot: 'Today - en route, 18 min' },
    { name: 'J. Fenner', dept: 'Leak & Burst Pipe', slot: 'Today - arriving 2:30 PM' },
    { name: 'R. Osei', dept: 'Bathroom Install', slot: 'Tomorrow - 8:00 AM' },
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
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <UserRound className="h-5 w-5" strokeWidth={2.3} />
              </span>
              <div>
                <p className="font-display font-semibold text-sm text-ink leading-tight">{c.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{c.dept}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/5 px-3 py-2">
              <CalendarCheck className="h-4 w-4 text-accent" />
              <span className="font-mono text-xs text-accent-dark">{c.slot}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* =============== FEATURE 3b: Signature animation - Response monitor =============== */
function ResponseMonitor() {
  const statuses = ['Call received', 'Engineer dispatched', 'On the way', 'Job complete']
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
      style={{ background: 'linear-gradient(180deg, #EAF2FA 0%, #D3E5F3 70%, #BED5EC 100%)' }}
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
        @keyframes flow-dash { to { stroke-dashoffset: -240; } }
      `}</style>

      <div className="absolute -top-6 -left-4 h-24 w-24 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-8 right-2 h-20 w-20 rounded-full bg-white/50 blur-2xl" />

      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-2 z-20">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent-dark/80">Response Monitor</span>
        <span className="font-mono text-[9px] text-accent-dark/70">avg 1h 48m</span>
      </div>

      <svg className="absolute top-7 left-1/2 -translate-x-1/2 z-10" width="150" height="16" viewBox="0 0 150 16">
        <rect x="0" y="4" width="150" height="8" rx="4" fill="#154FB8" />
        <rect x="8" y="6" width="134" height="4" rx="2" fill="#5C9DF5" opacity="0.7" />
        <circle cx="12" cy="8" r="2" fill="#EAF2FA" />
        <circle cx="138" cy="8" r="2" fill="#EAF2FA" />
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
              <stop offset="0%" stopColor="#5C9DF5" />
              <stop offset="55%" stopColor="#2E7DEF" />
              <stop offset="100%" stopColor="#154FB8" />
            </linearGradient>
          </defs>
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" fill={`url(#cg${i})`} />
          <path d="M9.5 16.5c-.3-1.4.3-2.6 1.3-3.7" stroke="#EAF6FD" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" fill="none" />
        </svg>
      ))}

      <svg className="absolute bottom-8 inset-x-0 z-10" width="100%" height="34" viewBox="0 0 240 34" preserveAspectRatio="none">
        <path
          d="M0 20 H40 l6 -14 l6 26 l6 -12 H120 l6 -14 l6 26 l6 -12 H240"
          fill="none"
          stroke="#154FB8"
          strokeWidth="2"
          strokeDasharray="240"
          style={{ animation: prefersReducedMotion ? 'none' : 'flow-dash 3s linear infinite' }}
          opacity="0.55"
        />
      </svg>

      {[20, 50, 80].map((l, i) => (
        <span
          key={i}
          className="absolute z-0 rounded-full border border-accent/50"
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
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 ring-pulse" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span key={idx} className="font-mono text-[10px] text-accent-dark" style={{ animation: 'rain-fadein 0.5s ease' }}>
          {statuses[idx]}
        </span>
      </div>
    </div>
  )
}

/* =============== FEATURE 3c: Cursor + booking preview =============== */
function BookingPreview() {
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
              i === targetDay && clicked ? 'bg-accent text-white scale-110' :
              i === targetDay ? 'bg-accent/10 text-accent-dark' : 'bg-background text-muted'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {confirmed ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-2.5" style={{ animation: 'rain-fadein 0.4s ease' }}>
          <CheckCircle2 className="h-4 w-4 text-accent" />
          <span className="font-body text-xs text-accent-dark font-medium">Booked - 12 July, 10:30 AM</span>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-background px-3 py-2.5">
          <CalendarCheck className="h-4 w-4 text-muted" />
          <span className="font-body text-xs text-muted">Choosing your slot...</span>
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
      eyebrow: 'Fast Dispatch',
      title: 'The right engineer, sent fast',
      comp: <JobDispatchPreview />,
      text: 'Tell us the problem and we will get a qualified engineer on the way - no waiting around for a callback.',
      bullets: ['Target 2-hour response', 'Gas Safe registered engineers'],
    },
    {
      eyebrow: 'Always On Call',
      title: 'Help around the clock',
      comp: <ResponseMonitor />,
      text: 'From your first call to a completed repair, we keep you updated at every step - day or night.',
      bullets: ['24/7, 365 days a year', 'Clear updates, no guesswork'],
    },
    {
      eyebrow: 'Simple Booking',
      title: 'Book a job in a few taps',
      comp: <BookingPreview />,
      text: 'Arrange scheduled work online or by phone - pick a slot, confirm, and we will be there.',
      bullets: ['Online & phone booking', 'No call-out charge on scheduled work'],
    },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden">
      <SectionBg image={SECTION_IMAGES.features} />
      <div className="relative z-10 py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-4">Why homeowners call us first</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-balance">
            Straightforward service, <span className="font-serif italic font-medium text-accent">every time</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div key={i} className="feature-card rounded-3xl bg-surface border border-divider p-6 sm:p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-1.5">{c.eyebrow}</p>
              <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5 tracking-tight">{c.title}</h3>
              {c.comp}
              <p className="mt-5 text-muted text-sm leading-relaxed">{c.text}</p>
              <ul className="mt-4 space-y-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
  const ref = useRef(null)
  const pillars = [
    { label: 'Emergency call-outs', end: 24, suffix: '/7', desc: 'Emergency plumbers on call every hour of every day, 365 days a year - Norwich and across Norfolk.' },
    { label: 'Target response time', end: 2, suffix: 'hr', desc: 'From your call to an engineer at the door - our target response time for emergency call-outs.' },
    { label: 'Guarantee on all work', end: 12, suffix: 'mo', desc: 'Every repair and installation is backed by our workmanship guarantee, so you can relax once we leave.' },
  ]
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.pillar-in', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section id="approach" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.2s' }} />
      <style>{`@keyframes pillar-sweep {0%{transform:translateX(-100%);}50%{transform:translateX(100%);}100%{transform:translateX(100%);}}`}</style>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-3 lg:divide-x divide-divider gap-12 lg:gap-0">
          {pillars.map((p, i) => (
            <div key={i} className={`pillar-in transition-transform duration-500 hover:-translate-y-1.5 ${i > 0 ? 'lg:pl-12' : ''}`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">{p.label}</p>
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
      n: '01', eyebrow: 'Call, Click or Message',
      title: "Tell us what's wrong",
      text: 'Ring our 24-hour line or send an enquiry online. Describe the problem and we will give you honest, upfront guidance before anyone sets foot on site.',
      bullets: ['24/7 emergency line', 'No call-out charge on scheduled work'],
      img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      n: '02', eyebrow: 'Diagnose & Repair',
      title: 'Straight-talking diagnosis',
      text: 'Our Gas Safe registered engineers arrive on time, find the fault and explain your options clearly before any work begins - no surprises on the invoice.',
      bullets: ['Fully qualified, insured engineers', 'Fair, upfront pricing'],
      img: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=80',
    },
    {
      n: '03', eyebrow: 'Finish & Guarantee',
      title: 'A tidy job, guaranteed',
      text: 'Every job is completed to a high standard, the site is left clean, and the work is backed by our 12-month guarantee.',
      bullets: ['12-month workmanship guarantee', 'Tidy site, clear invoice'],
      img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
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
    <section id="process" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-4">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-4">How it works</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter max-w-2xl text-balance">
          Three simple steps to a <span className="font-serif italic font-medium text-accent">problem solved</span>
        </h2>
      </div>
      <div className="relative z-10">
        {steps.map((s) => (
          <div key={s.n} className="protocol-card sticky top-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
            <div className="grid lg:grid-cols-5 gap-8 rounded-4xl bg-surface border border-divider p-6 sm:p-10 shadow-xl overflow-hidden">
              <div className="lg:col-span-3 flex flex-col justify-center">
                <span className="font-display text-5xl font-bold text-primary/20">{s.n}</span>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mt-4 mb-2">{s.eyebrow}</p>
                <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight mb-4">{s.title}</h3>
                <p className="text-muted leading-relaxed max-w-lg mb-5">{s.text}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" /> {b}
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
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      })
      gsap.from('.svc-sub', {
        scrollTrigger: { trigger: '.svc-sub-row', start: 'top 85%', once: true },
        y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const heating = MAIN_SERVICES.find((s) => s.subServices)

  return (
    <section id="services" ref={ref} className="relative overflow-hidden bg-deep text-white py-24 sm:py-32">
      <SectionBg image={SECTION_IMAGES.services} dark faint />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-14">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary-light mb-4">Our Services</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter max-w-2xl text-balance">
          Complete plumbing &amp; heating, <span className="font-serif italic font-medium text-primary-light">under one roof</span>
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MAIN_SERVICES.map((s) => (
            <div key={s.title} className="svc-tile group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
              <div className="relative h-48 overflow-hidden">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/10 to-transparent" />
                <span className="absolute bottom-4 left-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary text-ink shadow-lg">
                  <s.icon className="h-6 w-6" strokeWidth={2.3} />
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-light mb-1.5">{s.tagline}</p>
                <h3 className="font-display text-xl font-semibold mb-2.5 tracking-tight">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{s.text}</p>
                <ul className="mt-auto space-y-2 pt-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/75">
                      <CheckCircle2 className="h-4 w-4 text-primary-light shrink-0 mt-0.5" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {heating && (
          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Central Heating in detail</p>
            <div className="svc-sub-row grid sm:grid-cols-2 gap-6">
              {heating.subServices.map((sub) => (
                <div key={sub.title} className="svc-sub group relative rounded-3xl overflow-hidden border border-white/10 min-h-[220px]">
                  <img src={sub.image} alt={sub.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-deep/10" />
                  <div className="relative p-6 sm:p-8 flex flex-col justify-end h-full">
                    <h3 className="font-display text-lg sm:text-xl font-semibold mb-2 tracking-tight text-white">{sub.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">{sub.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ============================== SERVICE AREAS ============================== */
function ServiceAreas() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.areas-in', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="areas" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="areas-in">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-4">Service Areas</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mb-5 text-balance">
            Local engineers across <span className="font-serif italic font-medium text-accent">Norwich &amp; Norfolk</span>
          </h2>
          <p className="text-muted leading-relaxed max-w-lg mb-8">
            Based in Norwich, our boiler servicing, maintenance and installation work covers the city and
            surrounding villages within a 10km radius. If you're just outside that circle, we can often
            still help - just ask.
          </p>
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            className="magnetic-btn inline-flex items-center gap-2 bg-deep text-white px-6 py-3.5 rounded-full font-semibold"
          >
            <Phone className="h-4 w-4" /> Check we cover you &middot; {BUSINESS.phoneDisplay}
          </a>
        </div>

        <div className="areas-in relative aspect-square rounded-4xl bg-deep overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute top-4 left-4 z-[1000] rounded-full bg-deep/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-white/80">
            10km service radius
          </div>
          <MapContainer
            bounds={SERVICE_BOUNDS}
            boundsOptions={{ padding: [24, 24] }}
            scrollWheelZoom={false}
            zoomControl={false}
            className="leaflet-dark h-full w-full"
          >
            <ZoomControl position="topright" />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            />
            <Circle
              center={SERVICE_CENTER}
              radius={SERVICE_RADIUS_KM * 1000}
              pathOptions={{ color: '#146B9E', weight: 2, dashArray: '6 6', fillColor: '#146B9E', fillOpacity: 0.12 }}
            />
            <Marker position={SERVICE_CENTER} icon={norwichPinIcon}>
              <Tooltip permanent direction="top" offset={[0, -6]} className="pin-tooltip">
                Norwich
              </Tooltip>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  )
}

/* ============================== GALLERY + LIGHTBOX ============================== */
function Lightbox({ items, index, onClose, onNav }) {
  const boxRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNav])

  useEffect(() => {
    if (prefersReducedMotion || !boxRef.current) return
    gsap.fromTo(boxRef.current, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
  }, [index])

  const item = items[index]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-deep/90 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1) }}
        className="absolute left-2 sm:left-8 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1) }}
        className="absolute right-2 sm:right-8 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div ref={boxRef} className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={item.img} alt={item.title} className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl" />
        <div className="mt-4 text-center">
          <p className="font-display text-lg sm:text-xl font-semibold text-white">{item.title}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 mt-1">{item.place}</p>
        </div>
      </div>
    </div>
  )
}

function Gallery() {
  const ref = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.work-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const navigate = (dir) => setActive((i) => (i + dir + GALLERY.length) % GALLERY.length)

  return (
    <section id="work" ref={ref} className="relative overflow-hidden">
      <SectionBg image={SECTION_IMAGES.gallery} />
      <div className="relative z-10 py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-4">Recent Work</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-balance">
            A few jobs we're <span className="font-serif italic font-medium text-accent">proud of</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              className="work-tile group relative aspect-[4/3] overflow-hidden rounded-2xl border border-divider text-left"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/0 to-deep/0 opacity-70 group-hover:opacity-90 transition-opacity" />
              <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="font-display text-sm sm:text-base font-semibold text-white leading-tight">{item.title}</p>
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/60 mt-1">{item.place}</p>
              </div>
            </button>
          ))}
        </div>

        {active !== null && (
          <Lightbox items={GALLERY} index={active} onClose={() => setActive(null)} onNav={navigate} />
        )}
      </div>
    </section>
  )
}

/* ============================== TESTIMONIALS ============================== */
function ReviewStars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" strokeWidth={1.5} />
      ))}
    </div>
  )
}

function Testimonials() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.review-in', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.review-card', {
        scrollTrigger: { trigger: '.review-grid', start: 'top 85%', once: true },
        y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="reviews" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <SectionBg image={SECTION_IMAGES.reviews} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="review-in flex flex-col items-center text-center mb-14">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-4">Google Reviews</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mb-8 text-balance max-w-2xl">
            Rated <span className="font-serif italic font-medium text-accent">{BUSINESS.googleRating} out of 5</span> by real customers
          </h2>

          <div className="inline-flex items-center gap-4 rounded-full bg-surface border border-divider shadow-md pl-5 pr-2 py-2">
            <GoogleGIcon className="h-6 w-6 shrink-0" />
            <ReviewStars count={5} />
            <span className="font-display font-bold text-ink">{BUSINESS.googleRating}/5</span>
            <a
              href={BUSINESS.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-deep text-white px-4 py-2 rounded-full font-semibold text-xs"
            >
              Read on Google <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="review-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="review-card rounded-3xl bg-surface border border-divider p-6 shadow-sm flex flex-col h-full">
              <ReviewStars count={t.rating} />
              <p className="mt-4 text-ink/80 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-divider">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent font-display font-semibold">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display font-semibold text-sm text-ink leading-tight">{t.name}</p>
                  <p className="text-muted text-xs">Google review</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function QuoteForm() {
  const [status, setStatus] = useState('idle')
  const [files, setFiles] = useState([])
  const inputCls = 'w-full rounded-xl border border-divider bg-background px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition'

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)
    try {
      const attachments = await Promise.all(
        files.map(async (f) => ({ filename: f.name, content: await fileToBase64(f) }))
      )
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone'),
          jobType: form.get('jobType'),
          message: form.get('message'),
          attachments,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
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

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent mb-5">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="font-display text-2xl font-bold mb-2">Thank you!</h3>
        <p className="text-muted max-w-sm">We've received your request. Our team will call you back shortly to arrange a visit.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name"><input required name="name" type="text" className={inputCls} placeholder="Your name" /></Field>
        <Field label="Email"><input required name="email" type="email" className={inputCls} placeholder="you@email.com" /></Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone"><input required name="phone" type="tel" className={inputCls} placeholder="07000 000000" /></Field>
        <Field label="Job type"><input name="jobType" type="text" className={inputCls} placeholder="e.g. Boiler repair, leak, bathroom install" /></Field>
      </div>
      <Field label="Describe the problem">
        <textarea name="message" rows={5} className={inputCls} placeholder="Tell us what's happening and when it started..." />
      </Field>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="rounded-xl border-2 border-dashed border-divider bg-background px-4 py-6 text-center"
      >
        <label className="cursor-pointer flex flex-col items-center gap-2">
          <Upload className="h-6 w-6 text-accent" />
          <span className="text-sm text-muted">Drop photos of the leak or fault here, or <span className="text-accent font-medium">browse</span></span>
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

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong sending your request - please try again, or call us on {BUSINESS.phoneDisplay}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="magnetic-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-ink px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/30 disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending...' : 'Request a Callback'}
        {status !== 'sending' && <ArrowUpRight className="h-4 w-4" />}
      </button>
    </form>
  )
}

/* ============================== QUOTE MODAL ============================== */
function QuoteModal({ open, onClose }) {
  const boxRef = useRef(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open || prefersReducedMotion || !boxRef.current) return
    gsap.fromTo(boxRef.current, { y: 24, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-deep/80 backdrop-blur-md p-4 py-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={boxRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-surface border border-divider p-6 sm:p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-deep text-white shadow-lg hover:bg-deep/90 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-2">Get a Free Quote</p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Tell us what&apos;s going on
        </h3>
        <QuoteForm />
      </div>
    </div>
  )
}

function ContactForm() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-in', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-12 gap-12">
        <div className="contact-in lg:col-span-5">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-4">Get in touch</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mb-6 text-balance">
            Book a job or ask a question
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md">
            Share your details and we will call you back to confirm. For a burst pipe, boiler breakdown or any
            urgent issue, please call our 24-hour line directly.
          </p>

          <div className="space-y-4">
            <a href={`tel:${BUSINESS.phoneTel}`} className="flex items-center gap-4 rounded-2xl bg-surface border border-divider p-4 lift-on-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent"><Phone className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Office</p>
                <p className="font-display font-semibold text-ink">{BUSINESS.phoneDisplay}</p>
              </div>
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 rounded-2xl bg-surface border border-divider p-4 lift-on-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent"><Mail className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Email</p>
                <p className="font-display font-semibold text-ink">{BUSINESS.email}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl bg-surface border border-divider p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent"><MapPin className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Visit us</p>
                <p className="font-display font-semibold text-ink text-sm leading-snug">{BUSINESS.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-in lg:col-span-7">
          <div className="rounded-3xl bg-surface border border-divider p-6 sm:p-8 shadow-lg">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== FOOTER ============================== */
function Footer({ onOpenQuote }) {
  return (
    <footer className="bg-deep text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <img src={logo} alt="Taylor Plumbing & Heating" className="h-11 w-auto" />
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
            Reliable plumbing and heating engineers serving Norwich and Norfolk - honest pricing, no rip-offs,
            day or night.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">Emergency line open now</span>
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Services</p>
          <ul className="space-y-2.5">
            {MAIN_SERVICES.map((s) => (
              <li key={s.title}><a href="#services" className="text-white/70 hover:text-primary-light text-sm transition-colors">{s.title}</a></li>
            ))}
            <li><a href="#services" className="text-white/70 hover:text-primary-light text-sm transition-colors">Boiler Fault Finding</a></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Company</p>
          <ul className="space-y-2.5">
            <li><a href="#approach" className="text-white/70 hover:text-primary-light text-sm transition-colors">Why Choose Us</a></li>
            <li><a href="#process" className="text-white/70 hover:text-primary-light text-sm transition-colors">How It Works</a></li>
            <li><a href="#areas" className="text-white/70 hover:text-primary-light text-sm transition-colors">Service Areas</a></li>
            <li><a href="#work" className="text-white/70 hover:text-primary-light text-sm transition-colors">Recent Work</a></li>
            <li><a href="#reviews" className="text-white/70 hover:text-primary-light text-sm transition-colors">Google Reviews</a></li>
            <li><button type="button" onClick={onOpenQuote} className="text-white/70 hover:text-primary-light text-sm transition-colors">Get a Free Quote</button></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-primary-light">{BUSINESS.phoneDisplay}</a></li>
            <li><a href={`tel:${BUSINESS.emergencyTel}`} className="hover:text-primary-light">Emergency {BUSINESS.emergencyDisplay}</a></li>
            <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-primary-light">{BUSINESS.email}</a></li>
            <li className="text-white/50 leading-relaxed">{BUSINESS.address}</li>
            <li className="text-white/50">{BUSINESS.coverage}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">(c) {new Date().getFullYear()} {BUSINESS.legalName}, Norwich. All rights reserved.</p>
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
  const [quoteOpen, setQuoteOpen] = useState(false)
  const openQuote = () => setQuoteOpen(true)

  useEffect(() => {
    // Google Fonts load with display=swap, so headings reflow (and section
    // heights shift) after ScrollTrigger's initial measurement. Re-measure
    // once fonts and images have actually settled, not after a guessed delay -
    // otherwise trigger points drift out of sync with the final layout and
    // scroll-in sections below the fold can get stuck invisible on first load.
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero onOpenQuote={openQuote} />
        <About />
        <ServicesGrid />
        <Features />
        <Pillars />
        <Protocol />
        <ServiceAreas />
        <Gallery />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer onOpenQuote={openQuote} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  )
}
