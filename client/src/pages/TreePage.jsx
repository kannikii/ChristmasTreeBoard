import { useState, useEffect, useRef } from 'react';

function TreePage() {
  const [clickPos, setClickPos] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const treeRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/tree.png';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      setImageLoaded(true);
    };
  }, []);

  const handleTreeClick = (e) => {
    if (!imageLoaded) return;
    if (e.target.tagName !== 'IMG') return;

    const imgElement = treeRef.current;
    const rect = imgElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(
      Math.floor((x / rect.width) * canvas.width),
      Math.floor((y / rect.height) * canvas.height),
      1,
      1
    ).data;

    if (pixel[3] === 0) return; // 투명 영역 클릭 무시

    setClickPos({ x, y });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f6fbff',
        width: '100vw',
        height: '100vh',
      }}
    >
      <h1 style={{ color: '#333', fontWeight: '700' }}>🎄 Christmas Tree SNS</h1>
      <p style={{ color: '#555' }}>
        트리 내부를 클릭해 메모를 작성해보세요.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          position: 'relative',
        }}
      >
        <img
          ref={treeRef}
          src="/tree.png"
          alt="Christmas Tree"
          onClick={handleTreeClick}
          style={{
            width: 'auto',
            height: '90%',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        />

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {showModal && clickPos && (
          <div
            style={{
              position: 'absolute',
              top: clickPos.y,
              left: clickPos.x,
              transform: 'translate(-50%, -100%)',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              width: '220px',
            }}
          >
            <h4 style={{ margin: '0 0 8px' }}>메모 작성</h4>
            <textarea
              placeholder="메시지를 입력하세요..."
              style={{
                width: '100%',
                height: '80px',
                resize: 'none',
                borderRadius: '6px',
                padding: '6px',
                border: '1px solid #ccc',
              }}
            />
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: '#999',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                취소
              </button>
              <button
                style={{
                  backgroundColor: '#2a9d8f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  marginLeft: '6px',
                  cursor: 'pointer',
                }}
              >
                저장
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TreePage;
