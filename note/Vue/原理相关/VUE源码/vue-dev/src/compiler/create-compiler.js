/* @flow */

import {
	extend
} from 'shared/util'
import {
	detectErrors
} from './error-detector'
import {
	createCompileToFunctionFn
} from './to-function'

// 使用 createCompilerCreator 函数创建出针对于不同平台的编译器了
export function createCompilerCreator(baseCompile: Function): Function {
	// 也就是这个 createCompiler 函数
	return function createCompiler(baseOptions: CompilerOptions) {
		//　定义了 compile 函数，然后返回一个对象，这个对象包含了 
		// compile 函数本身，同时包含了 compileToFunctions 函数
		/*
		 * 模板字符串(template)和选项参数(options)
		 *
		 * 1、生成最终编译器选项 finalOptions
		 * 2、对错误的收集
		 * 3、调用 baseCompile 编译模板
		 */
		function compile(
			template: string,
			options ? : CompilerOptions
		): CompiledResult {
			//　finalOptions 才是最终的编译选项参数
			const finalOptions = Object.create(baseOptions)
			const errors = []
			const tips = []

			let warn = (msg, range, tip) => {
				(tip ? tips : errors).push(msg)
			}

			if (options) {
				if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
					// $flow-disable-line
					const leadingSpaceLength = template.match(/^\s*/)[0].length

					warn = (msg, range, tip) => {
						const data: WarningMessage = {
							msg
						}
						if (range) {
							if (range.start != null) {
								data.start = range.start + leadingSpaceLength
							}
							if (range.end != null) {
								data.end = range.end + leadingSpaceLength
							}
						}
						(tip ? tips : errors).push(data)
					}
				}
				/*
				 * 以把 baseOptions 理解为编译器的默认选项或者基本选项，
				 * 而 options 是用来提供定制能力的扩展选项。
				 *
				 *  options 对象混合到 finalOptions
				 */
				// merge custom modules
				if (options.modules) {
					finalOptions.modules =
						(baseOptions.modules || []).concat(options.modules)
				}
				// merge custom directives
				if (options.directives) {
					finalOptions.directives = extend(
						Object.create(baseOptions.directives || null),
						options.directives
					)
				}
				// copy other options
				for (const key in options) {
					if (key !== 'modules' && key !== 'directives') {
						finalOptions[key] = options[key]
					}
				}
			}

			finalOptions.warn = warn

			/*
			 * compile 函数对模板的编译是委托 baseCompile 完成的。
			 * baseCompile 函数是 createCompilerCreator 函数的形参，是在 src/compiler/index.js 
			 * 文件中调用 createCompilerCreator 创建 '编译器创建者' 的创建者时 传递过来的
			 */
			const compiled = baseCompile(template.trim(), finalOptions)

			/*
			 * 用来通过抽象语法树来检查模板中是否存在错误表达式的，通过 detectErrors 函数实现
			 */
			if (process.env.NODE_ENV !== 'production') {
				detectErrors(compiled.ast, warn)
			}
			compiled.errors = errors
			compiled.tips = tips
			// compiled 是 baseCompile 对模板的编译结果
			return compiled
		}

		//　这里的 compileToFunctions 属性就是 platforms/web/compiler/index.js 
		// 文件中解构出来的 compileToFunctions
		/*
		 * compile 函数生成的是字符串形式的代码，而 compileToFunctions 
		 * 生成的才是真正可执行的代码，并且 compileToFunctions 函数本身
		 * 是使用 src/compiler/to-function.js 文件中的 
		 * createCompileToFunctionFn 函数根据 compile 生成
		 */
		return {
			compile,
			// compileToFunctions 函数其实准确的讲它应该是 
			// createCompileToFunctionFn 函数的返回值
			// compileToFunctions 函数中调用了 compile 函数
			compileToFunctions: createCompileToFunctionFn(compile)
		}
	}
}