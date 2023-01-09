export interface ProductModel {
  id: string,
  amount: number,
  brand: string,
  category: string,         //? possible options: "accessories" | "BMX" | "city" | "clothing" | "cross trekking" | "e-bike" | "fixi" | "gear" | "gravel" | "gyerek" | "MTB" | "road" | "tandem"
  description: string,
  imgUrl: string,
  imgUrl2: string,
  name: string,
  price: number
}
