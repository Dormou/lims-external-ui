import { useMemo, useState } from 'react'

interface UseSearchProps<T> {
  initSearch?: string
  data: T[] | undefined
  filterFn: (value: T, search: string) => boolean
  sortFn?: (a: T, b: T) => number
}

export const useSearch = <T>({
  initSearch = '',
  data = [],
  filterFn,
  sortFn,
}: UseSearchProps<T>) => {
  const [search, setSearch] = useState<string>(initSearch)

  const result = useMemo(() => {
    if (!data || data.length === 0) return []
    if (sortFn)
      return data
        .filter((item) => filterFn(item, search))
        .sort((a, b) => sortFn(a, b))
    else return data.filter((item) => filterFn(item, search))
  }, [data, search])

  return {
    search,
    setSearch,
    result,
    isSearch: search !== '',
  }
}
