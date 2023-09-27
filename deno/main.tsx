import { h as preactRuntime } from 'https://esm.sh/preact'
import preactRender from 'https://esm.sh/preact-render-to-string'

import JSX from "https://esm.sh/react/jsx-runtime";
import { renderToString as reactRender } from "https://esm.sh/react-dom/server";

// @ts-ignore
const { jsx: reactRuntime } = JSX

const ITER = +(Deno.env.get("ITER") || 40)

function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function renderJSX ({ runtime: jsx }: { runtime: any }) {
  jsx('body', {
    children: [
      jsx('h1', { key: 'h1', children: 'Hello, world'}),
      jsx('h2', { key: 'h2', children: `Here are the next ${ITER} fibonacci numbers`}),
      jsx('section', {
        key: 'section',
        children: Array(+ITER)
          .fill('')
          .map((_, i) => (
            jsx('p', { key: i , children: `Fibonacci ${i}: ${fibonacci(i)}`})
          ))
      })
    ]})
}

Deno.bench(`Fibonacci ${ITER}`, () => {
  fibonacci(ITER)
})

Deno.bench(`React Render to string ${ITER}`, async () => {
  // @ts-ignore
  await reactRender(renderJSX({ runtime: reactRuntime }))
})

Deno.bench(`Preact Render to string ${ITER}`, async () => {
  // @ts-ignore
  await preactRender(renderJSX({ runtime: preactRuntime }))
})
