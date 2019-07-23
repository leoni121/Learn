/* @flow */

import {
	baseOptions
} from './options'
import {
	createCompiler
} from 'compiler/index'

// compileToFunctions 函数其实准确的讲它应该是
// createCompileToFunctionFn 函数的返回值
const {
	compile,
	compileToFunctions
} = createCompiler(baseOptions)

export {
	compile,
	compileToFunctions
}