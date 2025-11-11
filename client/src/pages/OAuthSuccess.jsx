import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function OAuthSuccess({ setUser }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const encodedUser = params.get('user')

    if (!encodedUser) {
      navigate('/login', { replace: true })
      return
    }

    try {
      const normalized = encodedUser.replace(/-/g, '+').replace(/_/g, '/')
      const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
      const decodedString = atob(padded)
      const userData = JSON.parse(decodedString)

      if (!userData?.id) {
        throw new Error('잘못된 사용자 정보')
      }

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      navigate('/', { replace: true })
    } catch (error) {
      console.error('OAuth 파싱 실패', error)
      navigate('/login', { replace: true })
    }
  }, [location.search, navigate, setUser])

  return (
    <div className="pixel-form-container">
      <div className="pixel-form-box">
        <h2 className="pixel-form-title">로그인 처리 중...</h2>
        <p className="pixel-link">잠시만 기다려 주세요.</p>
      </div>
    </div>
  )
}

export default OAuthSuccess
