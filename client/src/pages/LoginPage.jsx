import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ 로그인 성공!')
        localStorage.setItem('user', JSON.stringify(data.user)) // ✅ 저장
        setUser(data.user) // ✅ 전역 상태 업데이트
        navigate('/') // ✅ 홈으로 이동
      } else {
        setMessage(`❌ ${data}`)
      }
    } catch (error) {
      setMessage('서버 오류 발생')
      console.error(error)
    }
  }

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>
      <p style={{ marginTop: '10px' }}>{message}</p>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '60px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    width: '240px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    width: '260px',
    padding: '10px',
    backgroundColor: '#2a9d8f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default LoginPage
