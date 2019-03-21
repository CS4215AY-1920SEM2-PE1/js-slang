import * as es from 'estree'
import { AllowedDeclarations } from '../types'

export const locationDummyNode = (line: number, column: number) =>
  literal('Dummy', { start: { line, column }, end: { line, column } })

export const identifier = (name: string): es.Identifier => ({
  type: 'Identifier',
  name
})

export const literal = (value: string | number | boolean, loc?: es.SourceLocation): es.Literal => ({
  type: 'Literal',
  value,
  loc
})

export const memberExpression = (
  object: es.Expression,
  propertyString: string
): es.MemberExpression => ({
  type: 'MemberExpression',
  object,
  computed: false,
  property: identifier(propertyString)
})

export const declaration = (
  name: string,
  kind: AllowedDeclarations,
  init: es.Expression,
  loc?: es.SourceLocation
): es.VariableDeclaration => ({
  type: 'VariableDeclaration',
  declarations: [
    {
      type: 'VariableDeclarator',
      id: identifier(name),
      init
    }
  ],
  kind,
  loc
})

export const constantDeclaration = (name: string, init: es.Expression, loc?: es.SourceLocation) =>
  declaration(name, 'const', init, loc)

export const callExpression = (
  callee: es.Expression,
  args: es.Expression[],
  loc?: es.SourceLocation
): es.CallExpression => ({
  type: 'CallExpression',
  callee,
  arguments: args,
  loc
})

export const expressionStatement = (
  expression: es.Expression,
  loc?: es.SourceLocation
): es.ExpressionStatement => ({
  type: 'ExpressionStatement',
  expression,
  loc
})

export const blockArrowFunction = (
  params: es.Identifier[],
  body: es.Statement[] | es.BlockStatement
): es.ArrowFunctionExpression => ({
  type: 'ArrowFunctionExpression',
  expression: false,
  generator: false,
  params,
  body: Array.isArray(body) ? blockStatement(body) : body
})

export const blockStatement = (
  body: es.Statement[],
  loc?: es.SourceLocation
): es.BlockStatement => ({
  type: 'BlockStatement',
  body,
  loc
})

export const program = (
  body: Array<es.Statement | es.ModuleDeclaration>,
  loc?: es.SourceLocation
): es.Program => ({
  type: 'Program',
  body,
  loc,
  sourceType: 'module'
})

export const returnStatement = (argument: es.Expression): es.ReturnStatement => ({
  type: 'ReturnStatement',
  argument
})

export const property = (key: string, value: es.Expression): es.Property => ({
  type: 'Property',
  method: false,
  shorthand: false,
  computed: false,
  key: identifier(key),
  value,
  kind: 'init'
})

export const objectExpression = (properties: es.Property[]): es.ObjectExpression => ({
  type: 'ObjectExpression',
  properties
})

export const mutateToCallExpression = (
  node: es.Node,
  callee: es.Expression,
  args: es.Expression[]
) => {
  node.type = 'CallExpression'
  node = node as es.CallExpression
  node.callee = callee
  node.arguments = args
}

export const logicalExpression = (
  operator: es.LogicalOperator,
  left: es.Expression,
  right: es.Expression,
  loc?: es.SourceLocation
): es.LogicalExpression => ({
  type: 'LogicalExpression',
  operator,
  left,
  right,
  loc
})

export const conditionalExpression = (
  test: es.Expression,
  consequent: es.Expression,
  alternate: es.Expression,
  loc?: es.SourceLocation
): es.ConditionalExpression => ({
  type: 'ConditionalExpression',
  test,
  consequent,
  alternate,
  loc
})

export const arrayExpression = (elements: es.Expression[]): es.ArrayExpression => ({
  type: 'ArrayExpression',
  elements
})

export const binaryExpression = (
  operator: es.BinaryOperator,
  left: es.Expression,
  right: es.Expression,
  loc?: es.SourceLocation
): es.BinaryExpression => ({
  type: 'BinaryExpression',
  operator,
  left,
  right,
  loc
})