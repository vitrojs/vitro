/* IMPORT */

import type { ComponentIntrinsicElement, FN } from '../types'

/* MAIN */

const createComment: FN<[], Comment> = () => document.createComment('')

const createHTMLNode: FN<[ComponentIntrinsicElement], HTMLElement> = (
	element: ComponentIntrinsicElement,
) => document.createElement(element)

const createSVGNode: FN<[ComponentIntrinsicElement], Element> = (
	element: ComponentIntrinsicElement,
) => document.createElementNS('http://www.w3.org/2000/svg', element)

const createText: FN<[any], Text> = (value: any) =>
	document.createTextNode(value)

const createAsChildFragment: FN<[], DocumentFragment> = () =>
	document.createDocumentFragment()

/* EXPORT */

export {
	createAsChildFragment,
	createComment,
	createHTMLNode,
	createSVGNode,
	createText,
}
