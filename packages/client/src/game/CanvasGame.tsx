import { useEffect, useRef } from 'react'
import { Game } from './core/Game'

const CanvasGame = () => {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement | null
    if (canvas) {
      const width = window.innerWidth
      const height = 720

      new Game(canvas, {
        playerId: 'player_2',
        themeId: 'theme_1',
        canvasWidth: width,
        canvasHeight: height,
        speed: 1,
        timeElapsed: 0,
        bgOfsetY: 120,
      })
    }
  }, [])

  return <canvas ref={ref}></canvas>
}

export default CanvasGame
