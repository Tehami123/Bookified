import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <main className="max-h-screen bg-[var(--bg-tertiary)] pt-28 mb-10 mt-10 p-6 md:p-10">
      <section className="mx-auto max-w-7xl rounded-3xl bg-[var(--bg-secondary)] p-6 md:p-10 shadow-soft-lg border border-[var(--border-medium)]">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_.8fr] items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)]">Your Library</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)]">Your Library</h1>
            <p className="max-w-md text-base md:text-lg text-[var(--text-secondary)]">
              Convert your books into interactive AI conversations. Upload a PDF, process data, and chat with your knowledge base instantly.
            </p>
            <button className="rounded-xl bg-[var(--color-brand)] px-6 py-2.5 text-white font-semibold shadow-soft hover:bg-[var(--color-brand-hover)] transition duration-200">
              + Add new book
            </button>
          </div>

          <div className="flex justify-center">
            <div className="relative h-[260px] w-[260px] md:h-[320px] md:w-[320px]">
              <Image
                src="/assets/assets/Gemini_Generated_Image_jlix6fjlix6fjlix (1) 1.png"
                alt="Vintage books and globe"
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-2xl"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--bg-card)] p-5 shadow-soft-lg border border-[var(--border-subtle)]">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Getting started</h2>
            <ol className="space-y-3 text-sm md:text-base text-[var(--text-secondary)]">
              <li className="flex gap-3 items-start">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-[var(--accent)] text-center font-bold text-[var(--text-primary)]">1</div>
                <span>Upload PDF — add your book file.</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-[var(--accent)] text-center font-bold text-[var(--text-primary)]">2</div>
                <span>AI processing — analyze the content.</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-[var(--accent)] text-center font-bold text-[var(--text-primary)]">3</div>
                <span>Voice chat — discuss with AI.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HeroSection
