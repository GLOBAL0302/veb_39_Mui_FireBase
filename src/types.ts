export interface Game{
  id:string,
  title:string,
  description:string,
  platform:string
  price: number
}


export interface  GameMutation{
  title:string,
  description:string,
  platform:string,
  price:string
}