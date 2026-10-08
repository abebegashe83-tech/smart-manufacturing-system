import './App.css'
import { useEffect, useState } from 'react'

import { fetchCompanyOverview, fetchProductCategories, submitInquiry } from './services/api'

const navItems = ['Home', 'About Us', 'Our Businesses', 'Products', 'Contact']

const supportLinks = [
  { label: 'Call', href: 'tel:+251946313131', icon: '☎' },
  { label: 'Email', href: 'mailto:superdoubletgeneraltradingplc@gmail.com', icon: '✉' },
  { label: 'WhatsApp', href: 'https://wa.me/251946313131', icon: 'WA' },
]

const fallbackBusinessAreas = [
  { title: 'Rodas Paint', description: 'High-performance paint and protective coating solutions for construction, industrial, and commercial use.' },
  { title: 'Water Products', description: 'Water-related products including storage systems, fiberglass tanks, and durable water handling solutions.' },
  { title: 'Metal Products', description: 'Precision manufacturing and industrial metal components for infrastructure and operational demands.' },
  { title: 'Other Manufacturing', description: 'Additional industrial products such as marble, solar energy, and waterproofing solutions.' },
]

const fallbackProductCategories = [
  'Paint Products',
  'Fiberglass Water Tanks',
  'Bathroom Equipment',
  'Kitchen Sinks',
  'Marble Products',
  'Solar Energy Products',
  'Waterproofing Products',
]

const productHighlights = [
  {
    title: 'Paint Products',
    description: 'Industrial and decorative coatings for construction and commercial applications.',
    image: 'https://rodaspaint.com/img/super/paint/enamel/Enamel.webp',
  },
  {
    title: 'Fiberglass Water Tanks',
    description: 'Durable fiberglass tanks for reliable water storage in residential, commercial, and industrial settings.',
    image: 'https://rodaspaint.com/img/super/fiber/waterTanker/without_size/25000.webp',
  },
  {
    title: 'Solar Energy',
    description: 'Clean energy-focused industrial solutions for modern infrastructure requirements.',
    image: 'https://rodaspaint.com/img/super/otherSectors/solar3.webp',
  },
  {
    title: 'Marble Products',
    description: 'Finishing and decorative material options for contemporary design and construction.',
    image: 'https://rodaspaint.com/img/super/otherSectors/marble.webp',
  },
  {
    title: 'Waterproofing Products',
    description: 'Protective systems for surfaces that require long-term moisture resistance and durability.',
    image: 'https://rodaspaint.com/img/super/otherSectors/waterproffing2.webp',
  },
]

const metrics = [
  { value: 'Industrial', label: 'Focus' },
  { value: 'Reliable', label: 'Performance' },
  { value: 'Ethiopia', label: 'Built for' },
]

const companyDetails = {
  email: 'superdoubletgeneraltradingplc@gmail.com',
  phone: '+251946313131',
  location: 'Addis Ababa, Ethiopia',
  slogan: 'We Trust In God!!!',
}

const initialFormState = {
  name: '',
  email: '',
  company: '',
  message: '',
}

function App() {
  const [companyOverview, setCompanyOverview] = useState({})
  const [productCategories, setProductCategories] = useState([])
  const [form, setForm] = useState(initialFormState)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitFeedback, setSubmitFeedback] = useState({ type: '', message: '' })

  useEffect(() => {
    let isMounted = true

    Promise.allSettled([fetchCompanyOverview(), fetchProductCategories()]).then(([companyResult, productResult]) => {
      if (!isMounted) {
        return
      }

      if (companyResult.status === 'fulfilled' && companyResult.value) {
        setCompanyOverview(companyResult.value)
      }

      if (productResult.status === 'fulfilled' && productResult.value?.categories) {
        setProductCategories(productResult.value.categories)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const businessAreas = companyOverview.business_areas?.length
    ? companyOverview.business_areas.map((title, index) => ({
        title,
        description: fallbackBusinessAreas[index]?.description || 'Industrial solutions built to support growing infrastructure and operations.',
      }))
    : fallbackBusinessAreas

  const categories = productCategories.length
    ? productCategories.map((item) => item.name || item)
    : fallbackProductCategories

  const companyName = companyOverview.name || 'SUPER DOUBLE T'
  const companyTagline = companyOverview.tagline || 'Quality Products. Stronger Industries.'
  const companySupportMessage = companyOverview.supporting_message || 'Manufactured for Ethiopia, built for lasting performance.'

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const requiredFields = ['name', 'email', 'company', 'message']
    const missingField = requiredFields.find((field) => !form[field]?.trim())

    if (missingField) {
      setSubmitFeedback({
        type: 'error',
        message: 'Please complete all required fields before submitting your inquiry.',
      })
      return
    }

    setSubmitting(true)
    setSubmitFeedback({ type: '', message: '' })

    try {
      const response = await submitInquiry(form)
      setSubmitFeedback({
        type: 'success',
        message: response.message || 'Inquiry sent successfully. We will contact you soon.',
      })
      setForm(initialFormState)
    } catch (error) {
      setSubmitFeedback({
        type: 'error',
        message: error.message || 'We could not send your inquiry right now. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="container-shell flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-sm font-bold tracking-wide text-white">
              SDT
            </div>
            <div>
              <p className="text-lg font-black tracking-[0.24em] text-navy">{companyName}</p>
            </div>
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={item === 'Home' ? '#home' : `#${item.toLowerCase().replace(/\s+/g, '-')}`} className="transition-colors hover:text-accent">
                {item}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#bf4d1d] lg:inline-flex">
            REQUEST QUOTE
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
            </span>
          </button>
        </div>
        {isMenuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="container-shell flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '#home' : `#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
          {supportLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <section id="home" className="relative isolate overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,105,43,0.25),_transparent_35%),linear-gradient(90deg,rgba(15,23,42,0.8),rgba(15,23,42,0.5))]"></div>
          <div className="container-shell relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
            <div>
              <span className="section-kicker border-white/20 bg-white/10 text-white">Manufacturing Excellence</span>
              <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {companyTagline}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {companySupportMessage}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#products" className="rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#bf4d1d]">
                  Explore Products
                </a>
                <a href="#contact" className="rounded-md border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Request a Quote
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/25">
                <img
                  src="/assets/images/factory-hero.svg"
                  alt="Industrial manufacturing facility"
                  className="h-[300px] w-full object-cover sm:h-[380px] lg:h-[430px]"
                />
              </div>
              <div className="absolute -bottom-6 left-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:-bottom-7 sm:left-6 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Trusted Manufacturing</p>
                <p className="mt-1 text-lg font-black text-navy sm:mt-2 sm:text-2xl">Industrial Solutions</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Our business areas" className="border-b border-slate-200 bg-white">
          <div className="container-shell grid grid-cols-2 divide-x divide-slate-200 py-5 sm:grid-cols-4 sm:py-6">
            {businessAreas.map((area) => (
              <a
                key={area.title}
                href="#our-businesses"
                className="group flex min-h-14 items-center gap-3 px-3 py-2 transition-colors hover:text-accent sm:px-5"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent transition-transform group-hover:scale-125"></span>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-accent">{area.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="our-businesses" className="py-20">
          <div className="container-shell">
            <div className="max-w-2xl">
              <p className="section-kicker">Our Businesses</p>
              <h2 className="section-title">Built around industrial growth and dependable supply.</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {businessAreas.map((area) => (
                <article key={area.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-industrial">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-xl text-accent">
                    {area.title.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{area.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about-us" className="bg-white py-20">
          <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="section-kicker">About Us</p>
              <h2 className="section-title">A dedicated Ethiopian manufacturing company with deep industrial roots.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {companyName} is a leading industrial trading and manufacturing company serving construction and infrastructure needs across Ethiopia.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                The business focuses on dependable supply, quality manufacturing, and practical solutions in paint, water, metal, and other essential industrial categories.
              </p>
              <div className="mt-6 text-lg font-semibold tracking-[0.15em] text-accent uppercase">
                {companyDetails.slogan}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Key manufacturing focus</h3>
              <ul className="mt-6 space-y-4 text-slate-700">
                {categories.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="products" className="py-20">
          <div className="container-shell">
            <div className="max-w-2xl">
              <p className="section-kicker">Featured Products</p>
              <h2 className="section-title">Solutions for construction, water, and industrial use.</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {productHighlights.map((product) => (
                <article key={product.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-industrial">
                  <div className="overflow-hidden bg-slate-100">
                    <img src={product.image} alt={product.title} loading="lazy" className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-accent">{product.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why Choose Us</p>
              <h2 className="section-title">Industrial capability with practical value.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                We focus on products, manufacturing, and supply partnerships that support stronger operations across key sectors.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <p className="text-3xl font-black text-navy">{metric.value}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="section-kicker">Quality & Service</p>
              <h2 className="section-title">Built for dependable supply and long-term performance.</h2>
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-lg font-bold text-slate-900">Material reliability</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">We emphasize durable products that suit Ethiopia’s construction, water, and manufacturing demands.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-lg font-bold text-slate-900">Customer-focused support</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">Our team works closely with clients to match practical needs, project goals, and delivery expectations.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-lg font-bold text-slate-900">Commercial value</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">From paint systems to water and structural products, we deliver solutions designed to perform over time.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Project Inquiry</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Fast Response</span>
              </div>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                  <input id="name" name="name" type="text" autoComplete="name" maxLength={150} required value={form.name} onChange={handleInputChange} placeholder="Your name" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-accent" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleInputChange} placeholder="name@email.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-accent" />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-700">Company</label>
                  <input id="company" name="company" type="text" autoComplete="organization" maxLength={200} required value={form.company} onChange={handleInputChange} placeholder="Company name" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-accent" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                  <textarea id="message" name="message" rows="4" required value={form.message} onChange={handleInputChange} placeholder="Tell us about your requirement" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-accent"></textarea>
                </div>
                {submitFeedback.message && (
                  <p role="status" aria-live="polite" className={`rounded-lg px-3 py-2 text-sm ${submitFeedback.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {submitFeedback.message}
                  </p>
                )}
                <button type="submit" disabled={submitting} className="w-full rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#bf4d1d] disabled:cursor-not-allowed disabled:opacity-70">
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container-shell">
            <div className="max-w-2xl">
              <p className="section-kicker">Contact</p>
              <h2 className="section-title">Let’s discuss your next industrial requirement.</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Location</p>
                <p className="mt-4 text-lg font-bold text-slate-900">{companyDetails.location}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Email</p>
                <a href={`mailto:${companyDetails.email}`} className="mt-4 block text-lg font-bold text-slate-900 hover:text-accent">
                  {companyDetails.email}
                </a>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Phone</p>
                <a href={`tel:${companyDetails.phone.replace(/\s+/g, '')}`} className="mt-4 block text-lg font-bold text-slate-900 hover:text-accent">
                  {companyDetails.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
