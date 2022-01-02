import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import addBasket from '@/handlers/addBasket'
import addWish from '@/handlers/addWish'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleLanguage from '@/handlers/language'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import sendHelp from '@/handlers/help'
import startMongo from '@/helpers/startMongo'

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
  // Commands
  bot.command(['help', 'start'], sendHelp)
  bot.command('language', handleLanguage)
  bot.command('addBasket', (ctx) => {
    void ctx.reply('Send me a name for your basket')
  })

  bot.command('addWish', (ctx) => {
    void ctx.reply('Send me a wish')
  })
  bot.on('msg:text', async (ctx) => {
    if (ctx.basketName) {
      await addWish(ctx)
    } else {
      console.log(ctx.basketName)
      await addBasket(ctx)
    }
  })
  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot, Infinity)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
