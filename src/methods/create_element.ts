/* IMPORT */

import type { Child, Component, Element, Props } from '../types'
import {
  createAsChildFragment,
  createHTMLNode,
  createSVGNode,
} from '../utils/creators'
import {
  isFunction,
  isNil,
  isNode,
  isSVGElement,
  isString,
  isVoidChild,
} from '../utils/lang'
import { setProps } from '../utils/setters'
import untrack from './untrack'
import wrapElement from './wrap_element'

/* MAIN */

// It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some cases

const createElement = <P = {}>(
  component: Component<P>,
  _props?: P | null,
  ..._children: Child[]
): Element => {
  const props: Props = _props || {}

  const { children: __children, key, asChild, ref } = props //TSC
  const children =
    _children.length === 1
      ? _children[0]
      : _children.length === 0
        ? __children
        : _children

  if (isFunction(component)) {
    if (!isNil(children)) props.children = children
    if (!isNil(ref)) props.ref = ref

    return wrapElement(() => {
      return untrack(() => component.call(component, props as P)) //TSC
    })
  } else if (isString(component)) {
    const isSVG = isSVGElement(component)

    const isAsChild = !isSVG && asChild

    if (!isVoidChild(children)) props.children = children
    if (!isNil(ref)) props.ref = ref

    return wrapElement((): Child => {
      const child = isAsChild
        ? createAsChildFragment()
        : isSVG
          ? createSVGNode(component)
          : createHTMLNode(component) //TSC

      if (isSVG) child['isSVG'] = true

      untrack(() => setProps(child, props, isAsChild))

      return child
    })
  } else if (isNode(component)) {
    return wrapElement(() => component)
  } else {
    throw new Error('Invalid component')
  }
}

/* EXPORT */

export default createElement
