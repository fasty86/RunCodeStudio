import {
  GameSettings,
  PlayerAnimations,
  PlayerProps,
  PlayerSpriteData,
} from '../types'
import { getPlayerSprite } from './sprites'

export class Player {
  private ctx: CanvasRenderingContext2D
  private gameFrame = 0
  private frameWidth: number
  private frameHeight: number
  private staggerFrame: number
  private frameX = 0
  private frames = 0
  private frameY = 0
  private settings: GameSettings
  private sprite: PlayerSpriteData
  private playerImage: HTMLImageElement
  private velocityY = 0
  private gravity = 0.2
  private isJumping = false
  private defaultY: number
  private y: number
  private x: number

  constructor(props: PlayerProps) {
    const { ctx, settings } = props

    this.ctx = ctx
    this.sprite = getPlayerSprite(settings.playerId)

    this.settings = settings
    this.staggerFrame = 5 + (5 - settings.speed)
    this.playerImage = this.sprite.image
    this.frameWidth = this.sprite.frameWidth
    this.frameHeight = this.sprite.frameHeight

    this.x = 24
    this.defaultY =
      this.settings.canvasHeight - (this.frameHeight + this.settings.bgOfsetY)
    this.y = this.defaultY //тут подогнал 120 - высота земли, (пока не понял как найти)

    document.addEventListener('keydown', this._events)

    this.setAnimation('run')
  }

  setAnimation(key: keyof PlayerAnimations) {
    const adnimation = this.sprite.animations[key]
    this.gameFrame = 0
    this.frameX = adnimation.frameX
    this.frameY = adnimation.frameY
    this.frames = adnimation.frames
  }

  _events = (e: KeyboardEvent) => {
    if (e.code === 'Space' && !this.isJumping) {
      this.velocityY = -10
      this.isJumping = true
      this.setAnimation('jump')
      this.frameX = 0
      this.frames = 12
    }

    if (e.code === 'KeyK') {
      this.setAnimation('attack')
    }
  }

  drawJump() {
    if (!this.isJumping) return
    this.y += this.velocityY
    this.velocityY += this.gravity

    if (this.y >= this.defaultY) {
      this.y = this.defaultY
      this.velocityY = 0
      this.isJumping = false
      this.setAnimation('run')
    }
  }

  drawAttac() {
    if (this.frameX === this.frames - 1) {
      this.setAnimation('run')
    }
  }

  animation = () => {
    this.frameX = Math.floor((this.gameFrame / this.staggerFrame) % this.frames)
    // console.log(this.frames)
    this.drawJump()

    this.ctx.drawImage(
      this.playerImage,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    )

    this.gameFrame++
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.frameWidth,
      height: this.frameHeight,
    }
  }
}
