
export type SimpleTableRowContent = string | undefined | number | null

export interface SimpleTableRow {
  items: SimpleTableRowContent[]
}

export interface SimpleTableColumn {
  width?: number | 'auto',
  id?: string,
  title: string
}

export const useSimpleTable = () => {
  const getColStyles = (columns: SimpleTableColumn[]) => {
    const columnStyles = columns.map((item) => {
      if (!item.width)
        return 'minmax(150px, 1fr)'

      if (item.width == 'auto')
        return 'minmax(max-content, auto)'

      else
        return `minmax(${item.width}px, 2fr)`
    }).join(' ')

    return {
      'grid-template-columns': columnStyles
    }
  }

  return {
    getColStyles
  }
}