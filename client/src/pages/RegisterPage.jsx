import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.text()

      if (response.ok) {
        setMessage('✅ 회원가입 성공! 로그인 페이지로 이동합니다.')
        // 1. 잠깐 메시지 보여준 후 1초 뒤 이동
        setTimeout(() => navigate('/login'), 1000)
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
      <h2>회원가입</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
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
          회원가입
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
    backgroundColor: '#457b9d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default RegisterPage
