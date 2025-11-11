import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../components/PixelForm.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('error') === 'google') {
      setMessage('❌ 구글 로그인에 실패했습니다. 다시 시도해주세요.')
    }
  }, [location.search])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
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

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`
  }

  return (
    <div className="pixel-form-container">
      <div className="pixel-form-box">
        <h2 className="pixel-form-title">로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pixel-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pixel-input"
          />
          <button type="submit" className="pixel-button">
            로그인
          </button>
        </form>
        <p className="oauth-divider">OR</p>
        <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
          🔐 구글로 로그인
        </button>
        {message && <p className="pixel-link">{message}</p>}
        <p className="pixel-link action" onClick={() => navigate('/register')}>
          아직 계정이 없다면? 회원가입
        </p>
      </div>
    </div>
  )
}

export default LoginPage
