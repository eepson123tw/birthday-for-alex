import { useKeyboardControls } from '@react-three/drei'
import useGame from './stores/useGame.jsx'
import { useEffect, useRef, useState } from 'react'
import { addEffect } from '@react-three/fiber'
import { playAudio } from './utils/playAudio.js'
export default function Interface() {
  const time = useRef()
  const [showTime, setShowTime] = useState(true)

  const restart = useGame((state) => state.restart)
  const phase = useGame((state) => state.phase)

  const forward = useKeyboardControls((state) => state.forward)
  const backward = useKeyboardControls((state) => state.backward)
  const leftward = useKeyboardControls((state) => state.leftward)
  const rightward = useKeyboardControls((state) => state.rightward)
  const jump = useKeyboardControls((state) => state.jump)

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState()

      let elapsedTime = 0

      if (state.phase === 'playing') elapsedTime = Date.now() - state.startTime
      else if (state.phase === 'ended')
        elapsedTime = state.endTime - state.startTime

      elapsedTime /= 1000
      elapsedTime = elapsedTime.toFixed(2)

      if (time.current) time.current.textContent = elapsedTime
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setShowTime(false)
    }, 5000)
  })

  return (
    <div className='interface'>
      {/* Time */}
      {showTime && (
        <div className='time'>
          <p>
            思い出の<span style={{ color: '#E87A90' }}>欠片</span>
          </p>
          <p>
            回憶的<span style={{ color: '#E87A90' }}>碎片</span>
          </p>
        </div>
      )}

      {/* Controls */}
      <div className='controls'>
        <div className='raw'>
          <div className={`key ${forward ? 'active' : ''}`}>W</div>
        </div>
        <div className='raw'>
          <div className={`key ${leftward ? 'active' : ''}`}>A</div>
          <div className={`key ${backward ? 'active' : ''}`}>S</div>
          <div className={`key ${rightward ? 'active' : ''}`}>D</div>
        </div>
      </div>
    </div>
  )
}
