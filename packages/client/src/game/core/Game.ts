import { GameSettings } from '../types'
import { Backgournd } from './Background'
import { Coin } from './Coin'
import { Obstacle } from './Obstacle'
import { Player } from './Player'

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private player: Player
  private theme: Backgournd
  private obstacles: Obstacle[] = []
  private coin: Coin
  settings: GameSettings

  constructor(canvas: HTMLCanvasElement, settings: GameSettings) {
    this.canvas = canvas
    this.canvas.width = settings.canvasWidth
    this.canvas.height = settings.canvasHeight
    this.ctx = canvas.getContext('2d')!
    this.settings = settings

    this.theme = new Backgournd({
      ctx: this.ctx,
      settings: this.settings,
    })

    this.player = new Player({
      ctx: this.ctx,
      settings,
    })

    this.coin = new Coin({
      ctx: this.ctx,
      settings: this.settings,
    })

    this.obstacles.push(new Obstacle(this.ctx, settings))

    setInterval(() => {
      this.obstacles.push(new Obstacle(this.ctx, settings))
    }, 3000)

    this.animation()
  }

  checkCollision(player: Player, obstacle: Obstacle) {
    const p = player.getBounds()
    const o = obstacle.getBounds()

    return (
      p.x < o.x + o.width - 80 && // убираем часть фрейма после препятсвия у игрока
      p.x + p.width - 42 > o.x && // убираем часть фрейма перед препяствием к игрока
      p.y < o.y + o.height &&
      p.y + p.height > o.y
    )
  }

  updateObstacleWithPlayer() {
    this.obstacles.forEach((obstacle, index) => {
      obstacle.update()
      if (this.checkCollision(this.player, obstacle)) {
        alert('Game Over')
        location.reload()
      }

      if (obstacle.getBounds().x + obstacle.getBounds().width < 0) {
        this.obstacles.splice(index, 1)
      }
    })
  }

  animation = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.theme.animation()
    this.player.animation()
    this.obstacles.forEach(obstacle => obstacle.draw())

    this.coin.animation()

    this.updateObstacleWithPlayer()
    requestAnimationFrame(this.animation)
  }
}
