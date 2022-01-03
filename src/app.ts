import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import addBasket from '@/handlers/baskets'
import addWish, { completeWish, sendWishes } from '@/handlers/wishes'
import attachUser from '@/middlewares/attachUser'
import basketMenu, { sendBasketMenu } from '@/menus/basket'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleLanguage from '@/handlers/language'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import sendHelp from '@/handlers/help'
import startMongo from '@/helpers/startMongo'
import wishMenu from '@/menus/wish'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  bot
    // Middlewares
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    // Menus
    .use(languageMenu)
    .use(basketMenu)
    .use(wishMenu)
  // Commands
  bot.command(['help', 'start'], sendHelp)
  bot.command('language', handleLanguage)
  bot.command(
    ['addBasket', 'createBasket'],
    async (ctx) => await addBasket(ctx)
  )
  bot.command(['addWish', 'createWish'], async (ctx) => await addWish(ctx))
  bot.command('checkWishes', async (ctx) =>
    ctx.dbuser.currentBasket ? await sendWishes(ctx) : await sendBasketMenu(ctx)
  )
  bot.command('completeWish', async (ctx) =>
    ctx.dbuser.currentBasket
      ? await completeWish(ctx)
      : await sendBasketMenu(ctx)
  )
  // bot.command('share', async (ctx) => await shareWithFriend(ctx, ctx.match)))
  bot.command(
    ['selectBasket', 'chooseBasket', 'currentBasket'],
    async (ctx) => await sendBasketMenu(ctx)
  )
  // Handle choosing the basket
  bot.on('callback_query:data', async (ctx) => {
    await ctx.answerCallbackQuery({
      text: `Selected the ${ctx.callbackQuery.data} basket`,
    })
  })

  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot, Infinity)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
