import { Scenes } from '@/helpers/scenes'
import { Context } from 'telegraf'

export default function end(ctx: Context) {
  ctx.state.scene = Scenes.blank
  return ctx.replyWithHTML(ctx.i18n.t('afterWishes'))
}
