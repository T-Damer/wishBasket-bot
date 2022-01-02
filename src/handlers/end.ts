import Context from '@/models/Context'

export default function end(ctx: Context) {
  return ctx.replyWithLocalization(ctx.i18n.t('afterWishes'))
}
