/* IMPORT */

import useRoot from '../hooks/use_root'
import type { Child, Disposer } from '../types'
import { setChild } from '../utils/setters'

/* MAIN */

const render = (child: Child, parent?: Element | null): Disposer => {
  if (!parent || !(parent instanceof HTMLElement))
    throw new Error('Invalid parent node')

  parent.textContent = ''

  return useRoot((dispose) => {
    setChild(parent, child)

    return (): void => {
      dispose()

      parent.textContent = ''
    }
  })
}

/* EXPORT */

export default render
