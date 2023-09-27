import { run, bench } from 'mitata'

import { renderToString } from 'react-dom/server'
import { jsx } from 'react/jsx-runtime'

const ITER = +(Bun.env.ITER || 40)

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

bench(`Fibonacci ${ITER}`, () => {
  fibonacci(ITER)
})

bench(`Render to string ${ITER}`, async () => {
  await renderToString([
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
  ])
})

await run()
