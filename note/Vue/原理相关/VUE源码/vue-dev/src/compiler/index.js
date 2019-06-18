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