import { useEffect, useState } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const christmas = new Date(now.getFullYear(), 11, 25, 0, 0, 0) // 🎄 12월 25일
      if (now > christmas) christmas.setFullYear(now.getFullYear() + 1)
      const diff = christmas - now

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const mins = Math.floor((diff / (1000 * 60)) % 60)
      const secs = Math.floor((diff / 1000) % 60)

      setTimeLeft({ days, hours, mins, secs })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={styles.container}>
      <h2 style={styles.text}>
        🎅 크리스마스까지{' '}
        <span style={{ color: '#e63946' }}>{timeLeft.days}</span>일{' '}
        <span style={{ color: '#1d3557' }}>
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.mins).padStart(2, '0')}:
          {String(timeLeft.secs).padStart(2, '0')}
        </span>{' '}
        남았습니다! 🎁
      </h2>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '10px 0',
    backgroundColor: '#fff0f0',
    borderBottom: '2px dashed #e63946',
  },
  text: {
    fontWeight: '700',
    color: '#264653',
  },
}
