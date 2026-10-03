import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      // Check hovered element
      const target = e.target.closest('[data-cursor], a, button, input, select');
      if (target) {
        const customCursorAttr = target.getAttribute('data-cursor');
        if (customCursorAttr === 'view') {
          setCursorType('view');
          setCursorText('VIEW');
        } else if (customCursorAttr === 'explore') {
          setCursorType('view');
          setCursorText('EXPLORE');
        } else if (customCursorAttr === 'add') {
          setCursorType('view');
          setCursorText('+ ADD');
        } else {
          setCursorType('button');
          setCursorText('');
        }
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth follower interpolation
    let currentX = -100;
    let currentY = -100;

    const loop = () => {
      currentX += (pos.x - currentX) * 0.18;
      currentY += (pos.y - currentY) * 0.18;
      setFollowerPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          opacity: cursorType === 'view' ? 0 : 1
        }}
      />
      <div
        className={`custom-cursor-follower ${cursorType === 'view' ? 'cursor-hover-view' : ''} ${cursorType === 'button' ? 'cursor-hover-button' : ''}`}
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0) translate(-50%, -50%)`
        }}
      >
        {cursorText}
      </div>
    </>
  );
}
