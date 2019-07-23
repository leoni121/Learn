/* @flow */

import {
	noop,
	extend
} from 'shared/util'
import {
	warn as baseWarn,
	tip
} from 'core/util/debug'
import {
	generateCodeFrame
} from './codeframe'

type CompiledFunctionResult = {
	render: Function;
	staticRenderFns: Array < Function > ;
};

function createFunction(code, errors) {
	try {
		return new Function(code)
	} catch (err) {
		errors.push({
			err,
			code
		})
		return noop
	}
}

/**
 * 1、缓存编译结果，通过 createCompileToFunctionFn 函数内声明的 cache 常量实现。
	 2、调用 compile 函数将模板字符串转成渲染函数字符串
	 3、调用 createFunction 函数将渲染函数字符串转成真正的渲染函数
	 4、打印编译错误，包括：模板字符串 -> 渲染函数字符串 以及 渲染函数字符串 -> 渲染函数 这两个阶段的错误
	 ５、最后，真正的 模板字符串 到 渲染函数字符串 的编译工作实际上是通过调用 compile 函数来完成的，
	 		所以接下来我们的任务就是弄清楚 compile 函数。
 * @method createCompileToFunctionFn
 */
export function createCompileToFunctionFn(compile: Function): Function {
	const cache = Object.create(null)

	return function compileToFunctions(
		template: string,
		options ? : CompilerOptions,
		vm ? : Component
	): CompiledFunctionResult {
		options = extend({}, options)
		const warn = options.warn || baseWarn
		delete options.warn

		/* istanbul ignore if */
		/*
		 * 检测 new Function() 是否可用，并在某些情况下给你一个有用的提示。
		 */
		if (process.env.NODE_ENV !== 'production') {
			// detect possible CSP restriction
			try {
				new Function('return 1')
			} catch (e) {
				if (e.toString().match(/unsafe-eval|CSP/)) {
					warn(
						'It seems you are using the standalone build of Vue.js in an ' +
						'environment with Content Security Policy that prohibits unsafe-eval. ' +
						'The template compiler cannot work in this environment. Consider ' +
						'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
						'templates into render functions.'
					)
				}
			}
		}

		// check cache
		//　缓存字符串模板的编译结果，防止重复编译，提升性能
		const key = options.delimiters ?
			String(options.delimiters) + template :
			template
		if (cache[key]) {
			return cache[key]
		}

		// compile
		//　整个函数最核心的代码
		// compile 是通过闭包引用了来自 createCompileToFunctionFn 函数的形参，
		// 所以这里的 compile 就是调用 createCompileToFunctionFn 函数时传递过来的函数
		const compiled = compile(template, options)

		// check compilation errors/tips
		if (process.env.NODE_ENV !== 'production') {
			if (compiled.errors && compiled.errors.length) {
				if (options.outputSourceRange) {
					compiled.errors.forEach(e => {
						warn(
							`Error compiling template:\n\n${e.msg}\n\n` +
							generateCodeFrame(template, e.start, e.end),
							vm
						)
					})
				} else {
					warn(
						`Error compiling template:\n\n${template}\n\n` +
						compiled.errors.map(e => `- ${e}`).join('\n') + '\n',
						vm
					)
				}
			}
			if (compiled.tips && compiled.tips.length) {
				if (options.outputSourceRange) {
					compiled.tips.forEach(e => tip(e.msg, vm))
				} else {
					compiled.tips.forEach(msg => tip(msg, vm))
				}
			}
		}

		// turn code into functions
		const res = {}
		const fnGenErrors = []
		// render 属性，实际上就是最终生成的渲染函数
		// new Function(code)
		res.render = createFunction(compiled.render, fnGenErrors)
		res.staticRenderFns = compiled.staticRenderFns.map(code => {
			return createFunction(code, fnGenErrors)
		})

		// check function generation errors.
		// this should only happen if there is a bug in the compiler itself.
		// mostly for codegen development use
		/* istanbul ignore if */
		// 来打印在生成渲染函数过程中的错误，也就是上面定义
		// 的常量 fnGenErrors 中所收集的错误
		if (process.env.NODE_ENV !== 'production') {
			if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
				warn(
					`Failed to generate render function:\n\n` +
					fnGenErrors.map(({
						err,
						code
					}) => `${err.toString()} in\n\n${code}\n`).join('\n'),
					vm
				)
			}
		}

		//　缓存
		return (cache[key] = res)
	}
}