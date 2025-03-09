import { ThemeProps, GameSettings, TypeDataTheme } from '../types'
import { getThemeSprite } from './sprites'

export class Backgournd {
  themesImages: TypeDataTheme[]
  ctx: CanvasRenderingContext2D
  settings: GameSettings
  width: number
  height: number
  gameSpeed: number

  constructor(props: ThemeProps) {
    const { ctx, settings } = props
    this.ctx = ctx
    this.themesImages = getThemeSprite(settings.themeId)
    this.width = 2400
    this.height = this.themesImages[0].image.height
    this.gameSpeed = settings.speed
    this.settings = settings
  }

  draw(props: TypeDataTheme) {
    this.ctx.drawImage(props.image, props.x, 0, this.width, this.height)
    this.ctx.drawImage(
      props.image,
      props.x + this.width,
      0,
      this.width,
      this.height
    )

    if (props.x <= -this.width) {
      props.x = 0
    }

    props.x -= this.gameSpeed * props.speedModifier
  }

  animation = () => {
    this.themesImages.forEach(layer => {
      this.draw(layer)
    })
  }
}
