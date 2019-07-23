/* @flow */

import he from 'he'
import {
	parseHTML
} from './html-parser'
import {
	parseText
} from './text-parser'
import {
	parseFilters
} from './filter-parser'
import {
	genAssignmentCode
} from '../directives/model'
import {
	extend,
	cached,
	no,
	camelize,
	hyphenate
} from 'shared/util'
import {
	isIE,
	isEdge,
	isServerRendering
} from 'core/util/env'

import {
	addProp,
	addAttr,
	baseWarn,
	addHandler,
	addDirective,
	getBindingAttr,
	getAndRemoveAttr,
	getRawBindingAttr,
	pluckModuleFunction,
	getAndRemoveAttrByRegex
} from '../helpers'

export const onRE = /^@|^v-on:/
export const dirRE = process.env.VBIND_PROP_SHORTHAND ?
	/^v-|^@|^:|^\./ :
	/^v-|^@|^:/
export const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
export const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
const stripParensRE = /^\(|\)$/g
const dynamicArgRE = /^\[.*\]$/

const argRE = /:(.*)$/
export const bindRE = /^:|^\.|^v-bind:/
const propBindRE = /^\./
const modifierRE = /\.[^.\]]+(?=[^\]]*$)/g

const slotRE = /^v-slot(:|$)|^#/

const lineBreakRE = /[\r\n]/
const whitespaceRE = /\s+/g

const invalidAttributeRE = /[\s"'<>\/=]/

/*
 * cached 函数我们前面遇到过，它的作用是接收一个函数作为参数并返回一个新的函数，
 * 新函数的功能与作为参数传递的函数功能相同，唯一不同的是新函数具有缓存值的功能，
 * 如果一个函数在接收相同参数的情况下所返回的值总是相同的，那么 cached 函数将
 * 会为该函数提供性能提升的优势。
 *
 * he.decode: HTML 实体解码函数
 */
const decodeHTMLCached = cached(he.decode)

export const emptySlotScopeToken = `_empty_`

// configurable state
// 平台化选项变量, 在parse 函数中，这些变量将被初始化一个值，这些值都是平台化
// 的编译器选项参数， 不同平台这些变量将被初始化的值是不同的。
export let warn: any
let delimiters
let transforms
let preTransforms
let postTransforms
let platformIsPreTag
let platformMustUseProp
let platformGetTagNamespace
let maybeComponent

/**
 * 创建一个元素的描述对象
 * @method createASTElement
 * @date   2019-06-19
 * @author NZQ
 * @param  {string}         tag    [sd]
 * @param  {attrs}         attrs  属性
 * @param  {currentParent} parent currentParent
 * @return {ASTElement}                AST
 */
export function createASTElement(
	tag: string,
	attrs: Array < ASTAttr > ,
	parent: ASTElement | void
): ASTElement {
	return {
		type: 1,
		tag,
		attrsList: attrs,
		attrsMap: makeAttrsMap(attrs),
		rawAttrsMap: {},
		parent,
		children: []
	}
}

/**
 * Convert HTML string to AST.
 */
export function parse(
	template: string,
	options: CompilerOptions
): ASTElement | void {
	warn = options.warn || baseWarn

	platformIsPreTag = options.isPreTag || no
	platformMustUseProp = options.mustUseProp || no
	platformGetTagNamespace = options.getTagNamespace || no
	const isReservedTag = options.isReservedTag || no
	maybeComponent = (el: ASTElement) => !!el.component || !isReservedTag(el.tag)

	transforms = pluckModuleFunction(options.modules, 'transformNode')
	preTransforms = pluckModuleFunction(options.modules, 'preTransformNode')
	postTransforms = pluckModuleFunction(options.modules, 'postTransformNode')

	delimiters = options.delimiters

	// 初始化一些变量的值，以及创建一些新的变量，其中包括 root 变量，
	// 该变量为 parse 函数的返回值，即 AST
	const stack = []
	const preserveWhitespace = options.preserveWhitespace !== false
	const whitespaceOption = options.whitespace
	let root
	let currentParent
	let inVPre = false
	let inPre = false
	let warned = false

	function warnOnce(msg, range) {
		if (!warned) {
			warned = true
			warn(msg, range)
		}
	}

	function closeElement(element) {
		trimEndingWhitespace(element)
		if (!inVPre && !element.processed) {
			element = processElement(element, options)
		}
		// tree management
		if (!stack.length && element !== root) {
			// allow root elements with v-if, v-else-if and v-else
			if (root.if && (element.elseif || element.else)) {
				if (process.env.NODE_ENV !== 'production') {
					checkRootConstraints(element)
				}
				addIfCondition(root, {
					exp: element.elseif,
					block: element
				})
			} else if (process.env.NODE_ENV !== 'production') {
				warnOnce(
					`Component template should contain exactly one root element. ` +
					`If you are using v-if on multiple elements, ` +
					`use v-else-if to chain them instead.`, {
						start: element.start
					}
				)
			}
		}
		if (currentParent && !element.forbidden) {
			if (element.elseif || element.else) {
				processIfConditions(element, currentParent)
			} else {
				if (element.slotScope) {
					// scoped slot
					// keep it in the children list so that v-else(-if) conditions can
					// find it as the prev node.
					const name = element.slotTarget || '"default"';
					(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
				}
				currentParent.children.push(element)
				element.parent = currentParent
			}
		}

		// final children cleanup
		// filter out scoped slots
		element.children = element.children.filter(c => !(c: any).slotScope)
		// remove trailing whitespace node again
		trimEndingWhitespace(element)

		// check pre state
		if (element.pre) {
			inVPre = false
		}
		if (platformIsPreTag(element.tag)) {
			inPre = false
		}
		// apply post-transforms
		for (let i = 0; i < postTransforms.length; i++) {
			postTransforms[i](element, options)
		}
	}

	// 
	function trimEndingWhitespace(el) {
		// remove trailing whitespace node
		if (!inPre) {
			let lastNode
			while (
				(lastNode = el.children[el.children.length - 1]) &&
				lastNode.type === 3 &&
				lastNode.text === ' '
			) {
				el.children.pop()
			}
		}
	}

	// 检测模板根元素是否符合要求，我们知道在编写 Vue 模板的时候会受到两种约束，
	// 首先模板必须有且仅有一个被渲染的根元素，第二不能使用 slot 标签和 template 标签作为模板的根元素
	// 这些限制都是出于 必须有且仅有一个根元素的　考虑
	function checkRootConstraints(el) {
		if (el.tag === 'slot' || el.tag === 'template') {
			warnOnce(
				`Cannot use <${el.tag}> as component root element because it may ` +
				'contain multiple nodes.', {
					start: el.start
				}
			)
		}
		// 根元素是不允许使用 v-for 指令的	
		if (el.attrsMap.hasOwnProperty('v-for')) {
			warnOnce(
				'Cannot use v-for on stateful component root element because ' +
				'it renders multiple elements.',
				el.rawAttrsMap['v-for']
			)
		}
	}

	/*
	 * 核心代码
	 * 
	 * parseHTML 函数的作用就是用来做词法分析的，
	 * 而 parse 函数的作用则是在词法分析的基础上做句法分析从而生成一棵 AST
	 */
	/*
	 * 1、start 钩子函数，在解析 html 字符串时每次遇到 开始标签 时就会调用该函数
	 * 2、end 钩子函数，在解析 html 字符串时每次遇到 结束标签 时就会调用该函数
	 * 3、chars 钩子函数，在解析 html 字符串时每次遇到 纯文本 时就会调用该函数
	 * 4、comment 钩子函数，在解析 html 字符串时每次遇到 注释节点 时就会调用该函数
	 */
	parseHTML(template, {
		warn,
		expectHTML: options.expectHTML,
		isUnaryTag: options.isUnaryTag,
		canBeLeftOpenTag: options.canBeLeftOpenTag,
		shouldDecodeNewlines: options.shouldDecodeNewlines,
		shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
		shouldKeepComment: options.comments,
		outputSourceRange: options.outputSourceRange,
		start(tag, attrs, unary, start, end) {
			// check namespace.
			// inherit parent ns if there is one
			//　尝试获取一个元素的命名空间，并将获取到的命名空间的名字赋值给 ns 常量
			const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

			// handle IE svg bug
			/* istanbul ignore if */
			//　ＩＥ处理
			if (isIE && ns === 'svg') {
				attrs = guardIESVGBug(attrs)
			}

			// 为当前元素创建了描述对象，并且元素描述对象的创建是通过 createASTElement 完成的，
			// 并将当前标签的元素描述对象赋值给 element 变量。紧接着检查当前元素是否存在命名空间 ns，
			// 如果存在则在元素对象上添加 ns 属性，其值为命名空间的值。
			let element: ASTElement = createASTElement(tag, attrs, currentParent)
			if (ns) {
				element.ns = ns
			}

			if (process.env.NODE_ENV !== 'production') {
				if (options.outputSourceRange) {
					element.start = start
					element.end = end
					element.rawAttrsMap = element.attrsList.reduce((cumulated, attr) => {
						cumulated[attr.name] = attr
						return cumulated
					}, {})
				}
				attrs.forEach(attr => {
					if (invalidAttributeRE.test(attr.name)) {
						warn(
							`Invalid dynamic argument expression: attribute names cannot contain ` +
							`spaces, quotes, <, >, / or =.`, {
								start: attr.start + attr.name.indexOf(`[`),
								end: attr.start + attr.name.length
							}
						)
					}
				})
			}

			// 非服务端渲染情况, 禁止在模板中使用的标签
			// <style> 标签和 <script> 都被认为是禁止的标签
			// Vue 并非禁止了所有的 <script> 元素
			if (isForbiddenTag(element) && !isServerRendering()) {
				element.forbidden = true
				process.env.NODE_ENV !== 'production' && warn(
					'Templates should only be responsible for mapping the state to the ' +
					'UI. Avoid placing tags with side-effects in your templates, such as ' +
					`<${tag}>` + ', as they will not be parsed.', {
						start: element.start
					}
				)
			}

			// apply pre-transforms
			// reTransforms 数组中的那些函数与 process* 系列函数唯一的区别就是平台化的区分
			for (let i = 0; i < preTransforms.length; i++) {
				element = preTransforms[i](element, options) || element
			}

			/*
			 * 开始大量调用 process* 系列的函数
			 * 		在元素描述对象上添加各种各样的具有标识作用的属性，就比如之前遇到的 ns 属性和 forbidden 属性，它们都能够对标签起到描述作用。
			 */

			if (!inVPre) {
				processPre(element)
				if (element.pre) {
					inVPre = true
				}
			}
			if (platformIsPreTag(element.tag)) {
				inPre = true
			}
			if (inVPre) {
				processRawAttrs(element)
			} else if (!element.processed) {
				// structural directives
				processFor(element)
				processIf(element)
				processOnce(element)
			}

			// 如果 root 不存在那说明当前元素应该就是根元素
			// 每当遇到一个非一元标签都会将该元素的描述对象添加到 stack 数组，
			// 并且 currentParent 始终存储的是 stack 栈顶的元素，即当前解析元素的父级
			if (!root) {
				root = element
				if (process.env.NODE_ENV !== 'production') {
					checkRootConstraints(root)
				}
			}

			// 非一元标签
			if (!unary) {
				currentParent = element
				stack.push(element)
			} else {
				closeElement(element)
			}
		},

		end(tag, start, end) {
			const element = stack[stack.length - 1]
			// pop stack
			stack.length -= 1
			currentParent = stack[stack.length - 1]
			if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
				element.end = end
			}
			closeElement(element)
		},

		chars(text: string, start: number, end: number) {
			if (!currentParent) {
				if (process.env.NODE_ENV !== 'production') {
					if (text === template) {
						warnOnce(
							'Component template requires a root element, rather than just text.', {
								start
							}
						)
					} else if ((text = text.trim())) {
						warnOnce(
							`text "${text}" outside root element will be ignored.`, {
								start
							}
						)
					}
				}
				return
			}
			// IE textarea placeholder bug
			/* istanbul ignore if */
			if (isIE &&
				currentParent.tag === 'textarea' &&
				currentParent.attrsMap.placeholder === text
			) {
				return
			}
			const children = currentParent.children
			if (inPre || text.trim()) {
				text = isTextTag(currentParent) ? text : decodeHTMLCached(text)
			} else if (!children.length) {
				// remove the whitespace-only node right after an opening tag
				text = ''
			} else if (whitespaceOption) {
				if (whitespaceOption === 'condense') {
					// in condense mode, remove the whitespace node if it contains
					// line break, otherwise condense to a single space
					text = lineBreakRE.test(text) ? '' : ' '
				} else {
					text = ' '
				}
			} else {
				text = preserveWhitespace ? ' ' : ''
			}
			if (text) {
				if (!inPre && whitespaceOption === 'condense') {
					// condense consecutive whitespaces into single space
					text = text.replace(whitespaceRE, ' ')
				}
				let res
				let child: ? ASTNode
				if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
					child = {
						type: 2,
						expression: res.expression,
						tokens: res.tokens,
						text
					}
				} else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
					child = {
						type: 3,
						text
					}
				}
				if (child) {
					if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
						child.start = start
						child.end = end
					}
					children.push(child)
				}
			}
		},
		comment(text: string, start, end) {
			// adding anyting as a sibling to the root node is forbidden
			// comments should still be allowed, but ignored
			if (currentParent) {
				const child: ASTText = {
					type: 3,
					text,
					isComment: true
				}
				if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
					child.start = start
					child.end = end
				}
				currentParent.children.push(child)
			}
		}
	})
	return root
}


/*
 * （１）、process* 系列函数的作用就是对 元素描述对象(el 对象) 做进一步处理，
 * 比如其中一个函数叫做 processPre，这个函数的作用就是用来检测 
 * el 元素是否拥有 v-pre 属性，如果有 v-pre 属性则会在 el
 *  描述对象上添加一个 pre 属性
 * （２）、非　ｐｒｏｃｅｓｓ　系列函数，例如 findPrevElement、makeAttrsMap 等等，
 * 这些函数实际上就是工具函数。
 */
function processPre(el) {
	if (getAndRemoveAttr(el, 'v-pre') != null) {
		el.pre = true
	}
}

function processRawAttrs(el) {
	const list = el.attrsList
	const len = list.length
	if (len) {
		const attrs: Array < ASTAttr > = el.attrs = new Array(len)
		for (let i = 0; i < len; i++) {
			attrs[i] = {
				name: list[i].name,
				value: JSON.stringify(list[i].value)
			}
			if (list[i].start != null) {
				attrs[i].start = list[i].start
				attrs[i].end = list[i].end
			}
		}
	} else if (!el.pre) {
		// non root node in pre blocks with no attributes
		el.plain = true
	}
}

export function processElement(
	element: ASTElement,
	options: CompilerOptions
) {
	processKey(element)

	// determine whether this is a plain element after
	// removing structural attributes
	element.plain = (
		!element.key &&
		!element.scopedSlots &&
		!element.attrsList.length
	)

	processRef(element)
	processSlotContent(element)
	processSlotOutlet(element)
	processComponent(element)
	for (let i = 0; i < transforms.length; i++) {
		element = transforms[i](element, options) || element
	}
	processAttrs(element)
	return element
}

function processKey(el) {
	const exp = getBindingAttr(el, 'key')
	if (exp) {
		if (process.env.NODE_ENV !== 'production') {
			if (el.tag === 'template') {
				warn(
					`<template> cannot be keyed. Place the key on real elements instead.`,
					getRawBindingAttr(el, 'key')
				)
			}
			if (el.for) {
				const iterator = el.iterator2 || el.iterator1
				const parent = el.parent
				if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
					warn(
						`Do not use v-for index as key on <transition-group> children, ` +
						`this is the same as not using keys.`,
						getRawBindingAttr(el, 'key'),
						true /* tip */
					)
				}
			}
		}
		el.key = exp
	}
}

function processRef(el) {
	const ref = getBindingAttr(el, 'ref')
	if (ref) {
		el.ref = ref
		el.refInFor = checkInFor(el)
	}
}

export function processFor(el: ASTElement) {
	let exp
	if ((exp = getAndRemoveAttr(el, 'v-for'))) {
		const res = parseFor(exp)
		if (res) {
			extend(el, res)
		} else if (process.env.NODE_ENV !== 'production') {
			warn(
				`Invalid v-for expression: ${exp}`,
				el.rawAttrsMap['v-for']
			)
		}
	}
}

type ForParseResult = {
	for: string;
	alias: string;
	iterator1 ? : string;
	iterator2 ? : string;
};

export function parseFor(exp: string): ? ForParseResult {
	const inMatch = exp.match(forAliasRE)
	if (!inMatch) return
	const res = {}
	res.for = inMatch[2].trim()
	const alias = inMatch[1].trim().replace(stripParensRE, '')
	const iteratorMatch = alias.match(forIteratorRE)
	if (iteratorMatch) {
		res.alias = alias.replace(forIteratorRE, '').trim()
		res.iterator1 = iteratorMatch[1].trim()
		if (iteratorMatch[2]) {
			res.iterator2 = iteratorMatch[2].trim()
		}
	} else {
		res.alias = alias
	}
	return res
}

function processIf(el) {
	const exp = getAndRemoveAttr(el, 'v-if')
	if (exp) {
		el.if = exp
		addIfCondition(el, {
			exp: exp,
			block: el
		})
	} else {
		if (getAndRemoveAttr(el, 'v-else') != null) {
			el.else = true
		}
		const elseif = getAndRemoveAttr(el, 'v-else-if')
		if (elseif) {
			el.elseif = elseif
		}
	}
}

/*
 * 通过 findPrevElement 函数找到当前元素的前一个元素描述对象，并将其赋值给 prev 常量，
 * 接着进入 if 条件语句，判断当前元素的前一个元素是否使用了 v-if 指令，我们知道对于使用了 
 * v-else-if 或 v-else 指令的元素来讲，他们的前一个元素必然需要使用相符的 v-if 指令才行。
 * 如果前一个元素确实使用了 v-if 指令，那么则会调用 addIfCondition 函数将当前元素描述对象
 * 添加到前一个元素的 ifConditions 数组中。如果前一个元素没有使用 v-if 指令，那么此时将会进
 * 入 else...if 条件语句的判断，即如果是非生产环境下，会打印警告信息提示开发者没有相符的使用了 
 * v-if 指令的元素。
 */
function processIfConditions(el, parent) {
	const prev = findPrevElement(parent.children)
	if (prev && prev.if) {
		addIfCondition(prev, {
			exp: el.elseif,
			block: el
		})
	} else if (process.env.NODE_ENV !== 'production') {
		warn(
			`v-${el.elseif ? ('else-if="' + el.elseif + '"') : 'else'} ` +
			`used on element <${el.tag}> without corresponding v-if.`,
			el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
		)
	}
}

function findPrevElement(children: Array < any > ) : ASTElement | void {
	let i = children.length
	while (i--) {
		if (children[i].type === 1) {
			return children[i]
		} else {
			if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
				warn(
					`text "${children[i].text.trim()}" between v-if and v-else(-if) ` +
					`will be ignored.`,
					children[i]
				)
			}
			children.pop()
		}
	}
}

export function addIfCondition(el: ASTElement, condition: ASTIfCondition) {
	if (!el.ifConditions) {
		el.ifConditions = []
	}
	el.ifConditions.push(condition)
}

function processOnce(el) {
	const once = getAndRemoveAttr(el, 'v-once')
	if (once != null) {
		el.once = true
	}
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent(el) {
	let slotScope
	if (el.tag === 'template') {
		slotScope = getAndRemoveAttr(el, 'scope')
		/* istanbul ignore if */
		if (process.env.NODE_ENV !== 'production' && slotScope) {
			warn(
				`the "scope" attribute for scoped slots have been deprecated and ` +
				`replaced by "slot-scope" since 2.5. The new "slot-scope" attribute ` +
				`can also be used on plain elements in addition to <template> to ` +
				`denote scoped slots.`,
				el.rawAttrsMap['scope'],
				true
			)
		}
		el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope')
	} else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
		/* istanbul ignore if */
		if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
			warn(
				`Ambiguous combined usage of slot-scope and v-for on <${el.tag}> ` +
				`(v-for takes higher priority). Use a wrapper <template> for the ` +
				`scoped slot to make it clearer.`,
				el.rawAttrsMap['slot-scope'],
				true
			)
		}
		el.slotScope = slotScope
	}

	// slot="xxx"
	const slotTarget = getBindingAttr(el, 'slot')
	if (slotTarget) {
		el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget
		el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot'])
		// preserve slot as an attribute for native shadow DOM compat
		// only for non-scoped slots.
		if (el.tag !== 'template' && !el.slotScope) {
			addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'))
		}
	}

	// 2.6 v-slot syntax
	if (process.env.NEW_SLOT_SYNTAX) {
		if (el.tag === 'template') {
			// v-slot on <template>
			const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
			if (slotBinding) {
				if (process.env.NODE_ENV !== 'production') {
					if (el.slotTarget || el.slotScope) {
						warn(
							`Unexpected mixed usage of different slot syntaxes.`,
							el
						)
					}
					if (el.parent && !maybeComponent(el.parent)) {
						warn(
							`<template v-slot> can only appear at the root level inside ` +
							`the receiving the component`,
							el
						)
					}
				}
				const {
					name,
					dynamic
				} = getSlotName(slotBinding)
				el.slotTarget = name
				el.slotTargetDynamic = dynamic
				el.slotScope = slotBinding.value || emptySlotScopeToken // force it into a scoped slot for perf
			}
		} else {
			// v-slot on component, denotes default slot
			const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
			if (slotBinding) {
				if (process.env.NODE_ENV !== 'production') {
					if (!maybeComponent(el)) {
						warn(
							`v-slot can only be used on components or <template>.`,
							slotBinding
						)
					}
					if (el.slotScope || el.slotTarget) {
						warn(
							`Unexpected mixed usage of different slot syntaxes.`,
							el
						)
					}
					if (el.scopedSlots) {
						warn(
							`To avoid scope ambiguity, the default slot should also use ` +
							`<template> syntax when there are other named slots.`,
							slotBinding
						)
					}
				}
				// add the component's children to its default slot
				const slots = el.scopedSlots || (el.scopedSlots = {})
				const {
					name,
					dynamic
				} = getSlotName(slotBinding)
				const slotContainer = slots[name] = createASTElement('template', [], el)
				slotContainer.slotTarget = name
				slotContainer.slotTargetDynamic = dynamic
				slotContainer.children = el.children.filter((c: any) => {
					if (!c.slotScope) {
						c.parent = slotContainer
						return true
					}
				})
				slotContainer.slotScope = slotBinding.value || emptySlotScopeToken
				// remove children as they are returned from scopedSlots now
				el.children = []
				// mark el non-plain so data gets generated
				el.plain = false
			}
		}
	}
}

function getSlotName(binding) {
	let name = binding.name.replace(slotRE, '')
	if (!name) {
		if (binding.name[0] !== '#') {
			name = 'default'
		} else if (process.env.NODE_ENV !== 'production') {
			warn(
				`v-slot shorthand syntax requires a slot name.`,
				binding
			)
		}
	}
	return dynamicArgRE.test(name)
		// dynamic [name]
		?
		{
			name: name.slice(1, -1),
			dynamic: true
		}
		// static name
		:
		{
			name: `"${name}"`,
			dynamic: false
		}
}

// handle <slot/> outlets
function processSlotOutlet(el) {
	if (el.tag === 'slot') {
		el.slotName = getBindingAttr(el, 'name')
		if (process.env.NODE_ENV !== 'production' && el.key) {
			warn(
				`\`key\` does not work on <slot> because slots are abstract outlets ` +
				`and can possibly expand into multiple elements. ` +
				`Use the key on a wrapping element instead.`,
				getRawBindingAttr(el, 'key')
			)
		}
	}
}

function processComponent(el) {
	let binding
	if ((binding = getBindingAttr(el, 'is'))) {
		el.component = binding
	}
	if (getAndRemoveAttr(el, 'inline-template') != null) {
		el.inlineTemplate = true
	}
}

function processAttrs(el) {
	const list = el.attrsList
	let i, l, name, rawName, value, modifiers, syncGen, isDynamic
	for (i = 0, l = list.length; i < l; i++) {
		name = rawName = list[i].name
		value = list[i].value
		if (dirRE.test(name)) {
			// mark element as dynamic
			el.hasBindings = true
			// modifiers
			modifiers = parseModifiers(name.replace(dirRE, ''))
			// support .foo shorthand syntax for the .prop modifier
			if (process.env.VBIND_PROP_SHORTHAND && propBindRE.test(name)) {
				(modifiers || (modifiers = {})).prop = true
				name = `.` + name.slice(1).replace(modifierRE, '')
			} else if (modifiers) {
				name = name.replace(modifierRE, '')
			}
			if (bindRE.test(name)) { // v-bind
				name = name.replace(bindRE, '')
				value = parseFilters(value)
				isDynamic = dynamicArgRE.test(name)
				if (isDynamic) {
					name = name.slice(1, -1)
				}
				if (
					process.env.NODE_ENV !== 'production' &&
					value.trim().length === 0
				) {
					warn(
						`The value for a v-bind expression cannot be empty. Found in "v-bind:${name}"`
					)
				}
				if (modifiers) {
					if (modifiers.prop && !isDynamic) {
						name = camelize(name)
						if (name === 'innerHtml') name = 'innerHTML'
					}
					if (modifiers.camel && !isDynamic) {
						name = camelize(name)
					}
					if (modifiers.sync) {
						syncGen = genAssignmentCode(value, `$event`)
						if (!isDynamic) {
							addHandler(
								el,
								`update:${camelize(name)}`,
								syncGen,
								null,
								false,
								warn,
								list[i]
							)
							if (hyphenate(name) !== camelize(name)) {
								addHandler(
									el,
									`update:${hyphenate(name)}`,
									syncGen,
									null,
									false,
									warn,
									list[i]
								)
							}
						} else {
							// handler w/ dynamic event name
							addHandler(
								el,
								`"update:"+(${name})`,
								syncGen,
								null,
								false,
								warn,
								list[i],
								true // dynamic
							)
						}
					}
				}
				if ((modifiers && modifiers.prop) || (
						!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
					)) {
					addProp(el, name, value, list[i], isDynamic)
				} else {
					addAttr(el, name, value, list[i], isDynamic)
				}
			} else if (onRE.test(name)) { // v-on
				name = name.replace(onRE, '')
				isDynamic = dynamicArgRE.test(name)
				if (isDynamic) {
					name = name.slice(1, -1)
				}
				addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic)
			} else { // normal directives
				name = name.replace(dirRE, '')
				// parse arg
				const argMatch = name.match(argRE)
				let arg = argMatch && argMatch[1]
				isDynamic = false
				if (arg) {
					name = name.slice(0, -(arg.length + 1))
					if (dynamicArgRE.test(arg)) {
						arg = arg.slice(1, -1)
						isDynamic = true
					}
				}
				addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i])
				if (process.env.NODE_ENV !== 'production' && name === 'model') {
					checkForAliasModel(el, value)
				}
			}
		} else {
			// literal attribute
			if (process.env.NODE_ENV !== 'production') {
				const res = parseText(value, delimiters)
				if (res) {
					warn(
						`${name}="${value}": ` +
						'Interpolation inside attributes has been removed. ' +
						'Use v-bind or the colon shorthand instead. For example, ' +
						'instead of <div id="{{ val }}">, use <div :id="val">.',
						list[i]
					)
				}
			}
			addAttr(el, name, JSON.stringify(value), list[i])
			// #6887 firefox doesn't update muted state if set via attribute
			// even immediately after element creation
			if (!el.component &&
				name === 'muted' &&
				platformMustUseProp(el.tag, el.attrsMap.type, name)) {
				addProp(el, name, 'true', list[i])
			}
		}
	}
}

function checkInFor(el: ASTElement): boolean {
	let parent = el
	while (parent) {
		if (parent.for !== undefined) {
			return true
		}
		parent = parent.parent
	}
	return false
}

function parseModifiers(name: string): Object | void {
	const match = name.match(modifierRE)
	if (match) {
		const ret = {}
		match.forEach(m => {
			ret[m.slice(1)] = true
		})
		return ret
	}
}

/**
 * 将标签的属性数组转换成名值对一一对象的对象
 * @method makeAttrsMap
 * @date   2019-06-19
 * @author NZQ
 * @param  {attrs}     attrs  属性数组		
 * @return {Object}           对象
 */
function makeAttrsMap(attrs: Array < Object > ): Object {
	const map = {}
	for (let i = 0, l = attrs.length; i < l; i++) {
		if (
			process.env.NODE_ENV !== 'production' &&
			map[attrs[i].name] && !isIE && !isEdge
		) {
			warn('duplicate attribute: ' + attrs[i].name, attrs[i])
		}
		// [{name:'', value: ''}] => {[name]: [value]}
		map[attrs[i].name] = attrs[i].value
	}
	return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag(el): boolean {
	return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag(el): boolean {
	//允许　
	/*
	 * <script type="text/x-template" id="hello-world-template">
		  <p>Hello hello hello</p>
		</script>
	 */
	return (
		el.tag === 'style' ||
		(el.tag === 'script' && (
			!el.attrsMap.type ||
			el.attrsMap.type === 'text/javascript'
		))
	)
}

const ieNSBug = /^xmlns:NS\d+/
const ieNSPrefix = /^NS\d+:/

/* istanbul ignore next */
function guardIESVGBug(attrs) {
	const res = []
	for (let i = 0; i < attrs.length; i++) {
		const attr = attrs[i]
		if (!ieNSBug.test(attr.name)) {
			attr.name = attr.name.replace(ieNSPrefix, '')
			res.push(attr)
		}
	}
	return res
}

function checkForAliasModel(el, value) {
	let _el = el
	while (_el) {
		if (_el.for && _el.alias === value) {
			warn(
				`<${el.tag} v-model="${value}">: ` +
				`You are binding v-model directly to a v-for iteration alias. ` +
				`This will not be able to modify the v-for source array because ` +
				`writing to the alias is like modifying a function local variable. ` +
				`Consider using an array of objects and use v-model on an object property instead.`,
				el.rawAttrsMap['v-model']
			)
		}
		_el = _el.parent
	}
}