export interface SubHeaderObject {
  title: string,
  description: string,
  image: string,
  useLink: boolean,
  link: string
}

export interface CategoryHeaderObject {
  title: string,
  subHeaders : SubHeaderObject[]
}

export interface AllCategoryHeaderObject {
  categoryHeaderObject : CategoryHeaderObject[]
}

export const useSiteHeader = () => {
  const OnClickSubHeader = (title:string) => {
    switch(title) {
      case 'Swap':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'Polygon':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'IXT/USDT':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'IXT/MATIC':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'Lend Capital':
        return window.location.href = 'https://dashboard.ix.foundation/'
    }
  }

  return {
    OnClickSubHeader
  }
}



