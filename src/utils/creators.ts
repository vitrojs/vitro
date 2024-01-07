/* IMPORT */

import type { ComponentIntrinsicElement, FN } from '../types'

/* MAIN */

const createComment: FN<[], Comment> = document.createComment.bind(document, '')

const createHTMLNode: FN<[ComponentIntrinsicElement], HTMLElement> =
  document.createElement.bind(document)

const createSVGNode: FN<[ComponentIntrinsicElement], Element> =
  document.createElementNS.bind(document, 'http://www.w3.org/2000/svg')

const createText: FN<[any], Text> = document.createTextNode.bind(document)

const createAsChildFragment: FN<[], DocumentFragment> =
  document.createDocumentFragment.bind(document)

/* EXPORT */

export {
  createAsChildFragment,
  createComment,
  createHTMLNode,
  createSVGNode,
  createText,
}
