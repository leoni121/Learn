/* @flow */

import {
	parse
} from './parser/index'
import {
	optimize
} from './optimizer'
import {
	generate
} from './codegen/index'
import {
	createCompilerCreator
} from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
// nzq_mark
// createCompilerCreator 编译器创建者　的创建者，　来源于src/compiler/create-compiler.js
/*
 * createCompilerCreator　返回的　createCompiler　函数中的
 *  compile 函数对模板的编译是委托 baseCompile 完成的
 *  创建的就是 web 平台下的编译器
 */
export const createCompiler = createCompilerCreator(function baseCompile(
	template: string,
	options: CompilerOptions
): CompiledResult {
	//　词法分析 -> 句法分析 -> 代码生成

	// 构建抽象语法树的工作就是创建一个类似能够描述节点关系的对象树，
	// 节点与节点之间通过 parent 和 children 建立联系，
	// 每个节点的 type 属性用来标识该节点的类别，比如 type 为 1 代表该节点为元素节点，
	// type 为 2 代表该节点为文本节点，这只是人为的一个规定，你可以用任何方便的方式加以区分。
	const ast = parse(template.trim(), options)
	if (options.optimize !== false) {
		optimize(ast, options)
	}
	const code = generate(ast, options)
	return {
		ast,
		render: code.render,
		staticRenderFns: code.staticRenderFns
	}
})