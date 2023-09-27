import { run, bench} from 'mitata'


import { renderToString as reactRender } from 'react-dom/server'
import { jsx as reactRuntime } from 'react/jsx-runtime'
import preactRender from 'preact-render-to-string'
import { h as preactRuntime} from 'preact'

const { ITER = 40 } = process.env

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function renderJSX ({ runtime: jsx }) {
  jsx('body', {
    children: [
      jsx('h1', { key: 'h1', children: 'Hello, world'}),
      jsx('h2', { key: 'h2', children: `Here are the next ${ITER} fibonacci numbers`}),
      jsx('section', {
        key: 'section',
        children: Array(+ITER)
          .fill()
          .map((_, i) => (
            jsx('p', { key: i , children: `Fibonacci ${i}: ${fibonacci(i)}`})
          ))
      })
    ]})
}

bench(`Fibonacci ${ITER}`, () => {
  fibonacci(ITER)
})

bench(`React Render to string ${ITER}`, async () => {
  await reactRender(renderJSX({ runtime: reactRuntime }))
})

bench(`Preact Render to string ${ITER}`, async () => {
  await preactRender(renderJSX({ runtime: preactRuntime }))
})

await run()
