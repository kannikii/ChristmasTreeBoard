import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MyTreesPage({ user }) {
  const [trees, setTrees] = useState([])
  const [treeType, setTreeType] = useState('PUBLIC')
  const [treeName, setTreeName] = useState('')
  const navigate = useNavigate()

  // ✅ 내 트리 목록 불러오기
  useEffect(() => {
    if (!user) return
    fetch(`http://localhost:3000/users/${user.id}/trees`)
      .then((res) => res.json())
      .then((data) => setTrees(data))
      .catch((err) => console.error(err))
  }, [user])

  // ✅ 트리 생성
  const handleCreateTree = async () => {
    if (!treeName.trim()) return alert('트리 이름을 입력하세요.')

    try {
      const res = await fetch('http://localhost:3000/trees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner_id: user.id,
          tree_name: treeName,
          tree_type: treeType,
        }),
      })

      const newTree = await res.json()
      if (!res.ok) throw new Error(newTree.message || '트리 생성 실패')

      // ✅ 자동 참여 등록
      await fetch(`http://localhost:3000/trees/${newTree.tree_id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, tree_key: newTree.tree_key }),
      })

      // ✅ 생성 후 리스트 갱신
      setTrees((prev) => [...prev, newTree])
      setTreeName('')

      // ✅ 개인 트리의 경우 공유키 표시
      if (newTree.tree_type === 'PRIVATE') {
        const shareText = `🎄 개인 트리 초대 코드: ${newTree.tree_key}`
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(newTree.tree_key)
          alert(`${shareText}\n(코드가 클립보드에 복사되었습니다!)`)
        } else {
          alert(shareText)
        }
      } else {
        alert('공용 트리 생성 완료!')
      }
    } catch (err) {
      console.error(err)
      alert('트리 생성 중 오류가 발생했습니다.')
    }
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <h3>로그인 후 이용 가능합니다.</h3>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h2>{user.username}님의 트리 목록 🎄</h2>

      {/* ✅ 트리 생성 폼 */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="트리 이름 입력"
          value={treeName}
          onChange={(e) => setTreeName(e.target.value)}
          style={styles.input}
        />
        <select
          value={treeType}
          onChange={(e) => setTreeType(e.target.value)}
          style={styles.select}
        >
          <option value="PUBLIC">공용 트리</option>
          <option value="PRIVATE">개인 트리</option>
        </select>
        <button onClick={handleCreateTree} style={styles.button}>
          트리 생성
        </button>
      </div>

      {/* ✅ 트리 목록 표시 */}
      <ul style={styles.treeList}>
        {trees.map((t) => (
          <li key={t.tree_id} style={styles.treeItem}>
            <strong>{t.tree_name}</strong> <br />
            {t.tree_type === 'PUBLIC' ? '🌍 공용 트리' : '🔒 개인 트리'}
            <br />
            {t.tree_type === 'PRIVATE' && (
              <small>초대 코드: {t.tree_key}</small>
            )}
            <br />
            <button
              onClick={() => navigate(`/tree/${t.tree_id}`)} // ✅ 트리 페이지로 이동
              style={styles.viewBtn}
            >
              트리로 이동
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    padding: '6px',
    width: '200px',
    marginRight: '10px',
  },
  select: {
    padding: '6px',
    marginRight: '10px',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#2a9d8f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  treeList: {
    listStyle: 'none',
    padding: 0,
  },
  treeItem: {
    margin: '20px auto',
    padding: '15px',
    borderRadius: '12px',
    width: '300px',
    background: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  viewBtn: {
    marginTop: '10px',
    padding: '6px 12px',
    backgroundColor: '#264653',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default MyTreesPage
