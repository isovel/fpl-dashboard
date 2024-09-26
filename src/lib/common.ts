import { useEffect } from 'react'

export const compare = (a: unknown) => (b: unknown) => a === b

export const ForceCrash = () => {
  useEffect(() => {
    throw new Error('Forced crash')
  })

  return null
}
