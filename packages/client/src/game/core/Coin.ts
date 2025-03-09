import { CoinProps, GameSettings } from '../types'

export class Coin {
  ctx: CanvasRenderingContext2D
  settings: GameSettings
  iamgeCoin: HTMLImageElement
  width: number
  height: number
  frameX = 0
  frames = 4
  frameWidth: number
  gameFrame = 0

  constructor(props: CoinProps) {
    const { ctx, settings } = props
    this.ctx = ctx
    this.settings = settings
    this.iamgeCoin = new Image()
    this.iamgeCoin.src = '/sprite/coin.png'
    this.width = 199
    this.height = 50
    this.frameWidth = this.width / this.frames
    console.log(this.iamgeCoin, this.frameWidth)
  }

  animation() {
    this.frameX = Math.floor((this.gameFrame / 10) % this.frames)

    this.ctx.drawImage(
      this.iamgeCoin,
      this.frameX * this.frameWidth,
      this.height,
      this.frameWidth,
      this.height,
      100,
      100,
      this.frameWidth,
      this.height
    )

    this.gameFrame++
  }
}
