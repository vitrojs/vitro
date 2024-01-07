import { createElement } from '../methods'
import type { Child, Component, FunctionMaybe } from '../types'
import { isArray, isNode } from '../utils/lang'
import { setProps } from '../utils/setters'

/* -------------------------------------------------------------------------------------------------
 * Polymorphic
 * -----------------------------------------------------------------------------------------------*/

export interface AsChildProp {
  /** Whether the component should render as its direct `As` child component. */
  asChild?: boolean
}

/**
 * A utility component that render either a direct `<As>` child or its `as` prop.
 */
export function Polymorphic<P = {}>({
  as,
  asChild,
  props,
  children,
  ...others
}: {
  as: Component<P>
  asChild?: boolean
  props?: FunctionMaybe<P | null>
  children?: Child
}) {
  const _children = typeof children === 'function' ? children() : children

  if (asChild) {
    if (isNode(_children)) {
      if (isArray(_children)) {
        for (const it of _children) {
          setProps(it as HTMLElement, others)
        }
      } else {
        setProps(_children as HTMLElement, others)
      }
      return () => _children
    }
  }
  return createElement(as, others as any, children)
}
