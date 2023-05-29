export interface SubHeaderObject {
  title: string,
  description: string,
  image: string,
  link: string
}

export interface CategoryHeaderObject {
  title: string,
  subHeaders : SubHeaderObject[]
}