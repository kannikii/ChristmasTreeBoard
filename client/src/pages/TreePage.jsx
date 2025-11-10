import { useState, useRef } from 'react'
import treeImage from '../assets/tree.png'
import { useParams } from 'react-router-dom'
import Countdown from '../components/Countdown'

function TreePage({ user }) {
    const [notes, setNotes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [newNote, setNewNote] = useState('')
    const [clickPos, setClickPos] = useState({ x: 0, y: 0 })
    const treeRef = useRef(null)
    const { treeID } = useParams()
    const handleTreeClick = (e) => {
        if (!user) {
            alert('로그인이 필요합니다!')
            window.location.href = '/login'
            return
        }

        const rect = treeRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // ✅ 삼각형(트리) 내부 클릭만 허용
        const treeCenterX = rect.width / 2
        const height = rect.height
        const baseWidth = rect.width
        const leftEdge = treeCenterX - (baseWidth / height) * y
        const rightEdge = treeCenterX + (baseWidth / height) * y

        if (x < leftEdge || x > rightEdge) return

        setClickPos({ x, y })
        setShowModal(true)
    }

    const handleSubmit = () => {
        if (!newNote.trim()) return
        const newItem = {
            message: newNote,
            x: clickPos.x,
            y: clickPos.y,
        }
        setNotes([...notes, newItem])
        setShowModal(false)
        setNewNote('')
    }

    return (
        <>
            {/* ✅ 카운트다운을 페이지 최상단에 추가 */}
            <Countdown />

            {/* ✅ 기존 트리 렌더링 코드 */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    backgroundColor: '#ffffff',
                }}
            >
                <div
                    ref={treeRef}
                    onClick={handleTreeClick}
                    style={{
                        position: 'relative',
                        backgroundImage: `url(${treeImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        width: '550px',
                        height: '700px',
                    }}
                >
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: note.y - 10,
                                left: note.x - 10,
                                backgroundColor: 'yellow',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                            }}
                        ></div>
                    ))}
                </div>

                {showModal && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '300px',
                            }}
                        >
                            <h3>메모 작성</h3>
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                rows="4"
                                style={{ width: '100%' }}
                            />
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={handleSubmit}>작성</button>
                                <button onClick={() => setShowModal(false)}>취소</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TreePage
