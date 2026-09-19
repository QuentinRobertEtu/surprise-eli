'use client'

import { useState } from 'react'

const months = [
  {
    name: 'Janvier',
    year: '2027',
    kind: 'reveal',
    image: '/images/mariage-elisa.png',
    event: 'Le mariage des Robert',
  },
  { name: 'Février', year: '2027', kind: 'plain' },
  { name: 'Mars', year: '2027', kind: 'plain' },
  {
    name: 'Avril',
    year: '2027',
    kind: 'reveal',
    image: '/images/souvenir-elisa.png',
    event: 'Weekend à Paris pour nos 5 ans feat. Olivia Rodrigo',
  },
]

function LockIcon({ unlocked }: { unlocked: boolean }) {
  return (
    <svg className="lock-icon" viewBox="0 0 32 36" aria-hidden="true">
      <path
        className="lock-shackle"
        d={unlocked ? 'M9 15V9a7 7 0 0 1 12.8-3.9' : 'M9 15V9a7 7 0 0 1 14 0v6'}
      />
      <rect x="5" y="14" width="22" height="17" rx="3" />
      <circle cx="16" cy="22" r="1.8" />
      <path d="M16 24v3" />
    </svg>
  )
}

export default function Page() {
  const [revealed, setRevealed] = useState<number[]>([])

  function reveal(index: number) {
    if (months[index].kind !== 'reveal') return
    setRevealed((current) => [...new Set([...current, index])])
  }

  return (
    <main className="memory-page">
      <div className="page-decoration page-decoration-left" aria-hidden="true" />
      <div className="page-decoration page-decoration-right" aria-hidden="true" />
      <header className="intro">
        <p className="eyebrow">Pour 2027, voici</p>
        <h1>Les quatre mois d&apos;Elisa.</h1>
      </header>

      <section className="months-grid" aria-label="Les quatre premiers mois de 2027">
        {months.map((month, index) => {
          const isReveal = month.kind === 'reveal'
          const isRevealed = revealed.includes(index)
          return (
            <button
              key={month.name}
              type="button"
              className={`month-card ${isReveal ? 'is-reveal' : 'is-plain'} ${isRevealed ? 'is-revealed' : ''}`}
              onClick={() => reveal(index)}
              aria-label={isReveal ? `${month.name} ${month.year}, révéler le souvenir` : `${month.name} ${month.year}, à découvrir`}
              aria-pressed={isRevealed}
            >
              {isReveal && (
                <div className="card-photo" style={{ backgroundImage: `url(${month.image})` }} aria-hidden="true" />
              )}
              <span className="card-wash" aria-hidden="true" />
              <span className="card-content">
                <span className="month-label">
                  <span className="month-name">{month.name}</span>
                  <span className="month-year">{month.year}</span>
                </span>
                <span className="card-rule" aria-hidden="true" />
                {isReveal ? (
                  <>
                    <span className="lock-wrap"><LockIcon unlocked={isRevealed} /></span>
                    <span className="event-copy">{isRevealed ? month.event : '?'}</span>
                    <span className="tap-copy">{isRevealed ? 'Souvenir révélé' : 'Cliquer pour découvrir'}</span>
                  </>
                ) : (
                  <>
                    <span className="quiet-question">?</span>
                    <span className="quiet-note">À venir</span>
                  </>
                )}
              </span>
            </button>
          )
        })}
      </section>

      <footer className="footer-note">
        <span className="footer-line" />
        <span>Je t'aime</span>
        <span className="footer-line" />
      </footer>
    </main>
  )
}
