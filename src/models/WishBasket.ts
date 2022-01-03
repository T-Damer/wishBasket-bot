import { User } from '@/models/User'
import { getModelForClass, prop } from '@typegoose/typegoose'

type Wish = { title: string; completed: boolean }

export class WishBasket {
  @prop({ required: true, index: true })
  ownerId!: number

  @prop({ required: true, default: 'My first basket' })
  name!: string

  @prop({})
  items!: Wish[]
}

export const WishBasketModel = getModelForClass(WishBasket, {
  schemaOptions: { timestamps: true },
})

export async function findOrCreateBasket(name: string, ownerId: number) {
  let basket = await WishBasketModel.findOne({ name })
  if (!basket) {
    // Try/catch is used to avoid race conditions
    try {
      basket = await new WishBasketModel({ name, ownerId }).save()
    } catch (err) {
      basket = await WishBasketModel.findOne({ name })
    }
  }
  return basket
}

export async function addWishToBasket(user: User, wishName: string) {
  const wish: Wish = { title: wishName, completed: false }
  await WishBasketModel.updateOne(
    { owner: user.id, name: user.currentBasket },
    { $push: { items: wish } }
  )
}
