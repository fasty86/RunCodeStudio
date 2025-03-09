//sprites
export interface SpriteFrameData {
  frameX: number
  frameY: number
  frames: number
}

export interface PlayerAnimations {
  run: SpriteFrameData
  jump: SpriteFrameData
  attack: SpriteFrameData
  dead: SpriteFrameData
}

export interface PlayerSpriteData {
  image: HTMLImageElement
  frameWidth: number
  frameHeight: number
  animations: PlayerAnimations
}

//game
export type GameSettings = {
  playerId: string
  themeId: string
  speed: number
  timeElapsed: number
  canvasWidth: number
  canvasHeight: number
  bgOfsetY: 120
}

//player
export interface PlayerProps {
  ctx: CanvasRenderingContext2D
  settings: GameSettings
}

//coin
export type CoinProps = PlayerProps

//theme
export type ThemeProps = PlayerProps

export interface TypeDataTheme {
  image: HTMLImageElement
  x: number
  speedModifier: number
}
