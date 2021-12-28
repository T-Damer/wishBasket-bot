import { Context } from 'telegraf'

export function properMessage(ctx: Context) {
  if (!('text' in ctx.message))
    return ctx.replyWithHTML(ctx.i18n.t('notProperBasketName'))
  return ctx.message.text
}
