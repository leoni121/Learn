/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

import {
	makeMap,
	no
} from 'shared/util'
import {
	isNonPhrasingTag
} from 'web/compiler/util'
import {
	unicodeRegExp
} from 'core/util/lang'

// Regular Expressions for parsing tags and attributes
// 用来匹配标签的属性(attributes)的
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being pased as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// Special Elements (can contain anything)
// 检测给定的标签名字是不是纯文本标签（包括：script、style、textarea）
export const isPlainTextElement = makeMap('script,style,textarea', true)
const reCache = {}

const decodingMap = {
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&amp;': '&',
	'&#10;': '\n',
	'&#9;': '\t',
	'&#39;': "'"
}
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g

// #5992
const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'

function decodeAttr(value, shouldDecodeNewlines) {
	const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
	return value.replace(re, match => decodingMap[match])
}

/**
 * 主函数, parseHTML 函数分为三个部分:
 *  第一部分即函数开头定义的一些常量和变量，
 *  第二部分是一个 while 循环，
 *  第三部分则是 while 循环之后定义的一些函数。
 *
 * 解析：
 *  过读取字符流配合正则一点一点的解析字符串，直到整个字符串都被解析完毕为止。
 *  并且每当遇到一个特定的 token 时都会调用相应的钩子函数，
 *  同时将有用的参数传递过去。比如每当遇到一个开始标签都会调用 
 *  options.start 钩子函数，并传递给该钩子五个参数
 * @method parseHTML
 * @date   2019-06-18
 * @author NZQ
 * @param  {ｈｔｍｌ}   html    HTML
 * @param  {options}   options 配置项
 */
export function parseHTML(html, options) {
	// 定义一些常量和变量
	// 在 while 循环中处理 html 字符流的时候每当遇到一个 非一元标签，都会将该开始标签 push 到该数组
	const stack = []
	// boolean
	const expectHTML = options.expectHTML
	// 检测一个标签是否是一元标签
	const isUnaryTag = options.isUnaryTag || no
	const canBeLeftOpenTag = options.canBeLeftOpenTag || no
	let index = 0
	// lastTag, 存储着 stack 栈顶的元素
	let last, lastTag
	// 开启一个 while 循环，循环结束的条件是 html 为空，即 html 被 parse 完毕
	while (html) {
		last = html
		// Make sure we're not in a plaintext content element like script/style
		/*
        1、可能是注释节点：<!-- -->
        2、可能是条件注释节点：<![ ]>
        3、可能是 doctype：<!DOCTYPE >
        4、可能是结束标签：</xxx>
        5、可能是开始标签：<xxx>
        6、可能只是一个单纯的字符串：<abcdefg
     */
		if (!lastTag || !isPlainTextElement(lastTag)) {
			// 确保即将 parse 的内容不是在纯文本标签里 (script,style,textarea)

			// html 字符串中左尖括号(<)第一次出现的位置
			let textEnd = html.indexOf('<')
			// 字符 < 为字符串的第一个字符，所以会优先作为 注释标签、
			// 条件注释、开始标识 以及 结束标签 处理
			if (textEnd === 0) {
				// Comment:
				// 有可能是注释节点
				if (comment.test(html)) {
					const commentEnd = html.indexOf('-->')

					if (commentEnd >= 0) {
						// options.shouldKeepComment 的值就是 Vue 选项 comments 的值
						if (options.shouldKeepComment) {
							// 最终 html.substring 获取到的内容是不包含注释节点的起始(<!--)和结束(-->)的
							options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
						}
						// 将已经 parse 完毕的字符串剔除
						advance(commentEnd + 3)
						continue
					}
				}

				// http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
				// 有可能是条件注释节点
				if (conditionalComment.test(html)) {
					const conditionalEnd = html.indexOf(']>')

					if (conditionalEnd >= 0) {
						advance(conditionalEnd + 2)
						continue
					}
				}

				// Doctype:
				// doctype 节点
				const doctypeMatch = html.match(doctype)
				if (doctypeMatch) {
					advance(doctypeMatch[0].length)
					continue
				}

				// End tag:
				const endTagMatch = html.match(endTag)
				// 结束标签
				if (endTagMatch) {
					const curIndex = index
					advance(endTagMatch[0].length)
					parseEndTag(endTagMatch[1], curIndex, index)
					continue
				}

				// Start tag:
				const startTagMatch = parseStartTag()
				//　开始标签
				if (startTagMatch) {
					handleStartTag(startTagMatch)
					if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
						advance(1)
					}
					continue
				}
			}

			let text, rest, next
			// 处理那些第一个字符是 < 但没有成功匹配标签，或第一个字符不是 < 的字符串
			// html = '0<1<2'
			if (textEnd >= 0) {
				rest = html.slice(textEnd)
				while (
					!endTag.test(rest) &&
					!startTagOpen.test(rest) &&
					!comment.test(rest) &&
					!conditionalComment.test(rest)
				) {
					// < in plain text, be forgiving and treat it as text
					next = rest.indexOf('<', 1)
					if (next < 0) break
					textEnd += next
					rest = html.slice(textEnd)
				}
				text = html.substring(0, textEnd)
			}

			// 将整个 html 字符串作为文本处理
			if (textEnd < 0) {
				text = html
			}

			if (text) {
				advance(text.length)
			}

			if (options.chars && text) {
				options.chars(text, index - text.length, index)
			}
		} else { // lastTag && isPlainTextElement(lastTag)
			// 最近一次遇到的非一元标签是纯文本标签(即：script,style,textarea 标签)
			// 即将 parse 的内容是在纯文本标签里 (script,style,textarea)
			let endTagLength = 0
			const stackedTag = lastTag.toLowerCase()
			const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
			const rest = html.replace(reStackedTag, function(all, text, endTag) {
				endTagLength = endTag.length
				if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
					text = text
						.replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
						.replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
				}
				if (shouldIgnoreFirstNewline(stackedTag, text)) {
					text = text.slice(1)
				}
				if (options.chars) {
					options.chars(text)
				}
				return ''
			})
			index += html.length - rest.length
			html = rest
			parseEndTag(stackedTag, index - endTagLength, index)
		}

		// 两者相等，则说明字符串 html 在经历循环体的代码之后没有任何改变，
		// 此时会把 html 字符串作为纯文本对待
		if (html === last) {
			options.chars && options.chars(html)
			if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
				options.warn(`Mal-formatted tag at end of template: "${html}"`, {
					start: index + html.length
				})
			}
			break
		}
	}

	// Clean up any remaining tags
	parseEndTag()

	function advance(n) {
		index += n
		html = html.substring(n)
	}

	// parseStartTag 函数用来 parse 开始标签
	function parseStartTag() {
		const start = html.match(startTagOpen)
		if (start) {
			const match = {
				tagName: start[1],
				attrs: [],
				start: index
			}
			advance(start[0].length)
			let end, attr
			// 没有匹配到开始标签的结束部分，并且匹配到了开始标签中的属性
			// 匹配到开始标签的结束部分 或者 匹配不到属性 的时候循环才会停止。
			while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
				attr.start = index
				advance(attr[0].length)
				attr.end = index
				match.attrs.push(attr)
			}
			if (end) {
				match.unarySlash = end[1]
				advance(end[0].length)
				match.end = index
				return match
			}
		}
	}

	// handleStartTag 函数用来处理开始标签的解析(parseStartTag)结果，
	// 接收 parseStartTag 函数的返回值作为参数。
	function handleStartTag(match) {
		const tagName = match.tagName
		const unarySlash = match.unarySlash

		if (expectHTML) {
			if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
				parseEndTag(lastTag)
			}
			if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
				parseEndTag(tagName)
			}
		}

		const unary = isUnaryTag(tagName) || !!unarySlash

		const l = match.attrs.length
		const attrs = new Array(l)
		for (let i = 0; i < l; i++) {
			const args = match.attrs[i]
			const value = args[3] || args[4] || args[5] || ''
			const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href' ?
				options.shouldDecodeNewlinesForHref :
				options.shouldDecodeNewlines
			attrs[i] = {
				name: args[1],
				value: decodeAttr(value, shouldDecodeNewlines)
			}
			if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
				attrs[i].start = args.start + args[0].match(/^\s*/).length
				attrs[i].end = args.end
			}
		}

		if (!unary) {
			stack.push({
				tag: tagName,
				lowerCasedTag: tagName.toLowerCase(),
				attrs: attrs,
				start: match.start,
				end: match.end
			})
			lastTag = tagName
		}

		if (options.start) {
			options.start(tagName, attrs, unary, match.start, match.end)
		}
	}

	// parseEndTag 函数用来 parse 结束标签
	/*
	 * 作用：
	 *  检测是否缺少闭合标签
	 *  处理 stack 栈中剩余的标签
	 *  解析 </br> 与 </p> 标签，与浏览器的行为相同
	 */
	function parseEndTag(tagName, start, end) {
		let pos, lowerCasedTagName
		if (start == null) start = index
		if (end == null) end = index

		// Find the closest opened tag of the same type
		if (tagName) {
			lowerCasedTagName = tagName.toLowerCase()
			for (pos = stack.length - 1; pos >= 0; pos--) {
				if (stack[pos].lowerCasedTag === lowerCasedTagName) {
					break
				}
			}
		} else {
			// If no tag name is provided, clean shop
			pos = 0
		}

		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (let i = stack.length - 1; i >= pos; i--) {
				if (process.env.NODE_ENV !== 'production' &&
					(i > pos || !tagName) &&
					options.warn
				) {
					options.warn(
						`tag <${stack[i].tag}> has no matching end tag.`, {
							start: stack[i].start,
							end: stack[i].end
						}
					)
				}
				if (options.end) {
					options.end(stack[i].tag, start, end)
				}
			}

			// Remove the open elements from the stack
			stack.length = pos
			lastTag = pos && stack[pos - 1].tag
		} else if (lowerCasedTagName === 'br') {
			if (options.start) {
				options.start(tagName, [], true, start, end)
			}
		} else if (lowerCasedTagName === 'p') {
			if (options.start) {
				options.start(tagName, [], false, start, end)
			}
			if (options.end) {
				options.end(tagName, start, end)
			}
		}
	}
}