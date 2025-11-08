import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TreePage from './pages/TreePage'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null) // ✅ 로그인 상태 저장

  // 페이지 새로고침 시에도 로그인 유지
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f6fbff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ✅ 상단 네비게이션 */}
      <header
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 40px',
          boxSizing: 'border-box',
          backgroundColor: '#f6fbff',
          borderBottom: '1px solid #ddd',
        }}
      >
        {/* 🎄 제목을 클릭하면 홈으로 이동 */}
        <h3
          onClick={() => navigate('/')}
          style={{
            margin: 0,
            color: '#264653',
            fontWeight: '700',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#2a9d8f')}
          onMouseLeave={(e) => (e.target.style.color = '#264653')}
        >
          🎄 Christmas Tree SNS
        </h3>

        <div>
          {user ? (
            <>
              <span style={{ marginRight: '15px', color: '#333' }}>
                {user.username}님 환영합니다!
              </span>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#e63946',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  backgroundColor: '#2a9d8f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontWeight: '600',
                }}
              >
                로그인
              </button>

              <button
                onClick={() => navigate('/register')}
                style={{
                  backgroundColor: '#457b9d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </header>

      {/* ✅ 라우팅 영역 */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<TreePage user={user} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
