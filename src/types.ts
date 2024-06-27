export interface ApiGame{
  title:string,
  description:string,
  platform:string
  price: number
}

export interface ApiGames{
  [id:string]:ApiGame
}

export interface Game extends ApiGame{
  id:string

}

export interface ApiGame{
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