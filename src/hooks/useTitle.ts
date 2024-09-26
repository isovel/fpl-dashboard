import { useMemo } from 'react'

import { useHelmetStore } from '../state/common'

const useTitle = () => {
  const helmetStore = useHelmetStore((state) => state)
  const setTitle = useMemo(() => helmetStore.setTitle, [helmetStore.setTitle])
  const title = useMemo(() => helmetStore.title, [helmetStore.title])
  return { title, setTitle }
}

export default useTitle
