import { Context } from 'telegraf'

export function addWish(ctx: Context) {
  ctx.state.scene = 'addWish'
  return ctx.replyWithHTML(ctx.i18n.t('addWish'))
}
