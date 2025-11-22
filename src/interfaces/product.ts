import { Brand } from "./brand"
import { CategoryI } from "./category"

export interface ProductI {
  sold: number
  images: string[]
  subcategory: CategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}


