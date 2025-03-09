import { GameSettings } from '../types'

export class Obstacle {
  private ctx: CanvasRenderingContext2D
  private image: HTMLImageElement
  private x: number
  private y: number
  private width: number
  private height: number
  private speed: number

  constructor(ctx: CanvasRenderingContext2D, settings: GameSettings) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = '/sprite/obstacle/box.png' // пока что один объект
    this.width = 62
    this.height = 48
    this.x = 2400
    this.y = settings.canvasHeight - this.height - settings.bgOfsetY
    this.speed = settings.speed
  }

  update() {
    this.x -= this.speed * 2
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  getBounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height }
  }
}
