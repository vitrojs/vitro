/* IMPORT */

import createElement from './create_element'
import type { Child, Component, Element } from '../types'
import { isArray, isObject } from '../utils/lang'

/* MAIN */

function h<P = {}>(component: Component<P>, child: Child): Element
function h<P = {}>(
  component: Component<P>,
  props?: P | null,
  ...children: Child[]
): Element
function h<P = {}>(
  component: Component<P>,
  props?: Child | P | null,
  ...children: Child[]
): Element {
  if (children.length || (isObject(props) && !isArray(props))) {
    return createElement(component, props as any, ...children) //TSC
  } else {
    return createElement(component, null, props as Child) //TSC
  }
}

/* EXPORT */

export default h
