import { prop, getModelForClass } from '@typegoose/typegoose'

type BasketItems = string[]

export class WishBasket {
  @prop({ required: true, index: true })
  owner: string

  @prop({ required: true, default: 'my basket' })
  name: string

  @prop({ required: true, default: {} })
  items: BasketItems
}

const WishBasketModel = getModelForClass(WishBasket, {
  schemaOptions: { timestamps: true },
})

export async function findOrCreateBasket(name: string) {
  let basket = await WishBasketModel.findOne({ name })
  if (!basket) {
    // Try/catch is used to avoid race conditions
    try {
      basket = await new WishBasketModel({ name }).save()
    } catch (err) {
      basket = await WishBasketModel.findOne({ name })
    }
  }
  return basket
}

export async function addWish(basketName: string, wishName: string) {
  await WishBasketModel.updateOne(
    { name: basketName },
    { $push: { items: wishName } }
  )
}
