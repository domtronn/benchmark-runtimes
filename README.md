# Runtime analysis

There have been changes recently with runtime choice for Node like environments, namely

1. [NodeJS 20](https://nodejs.org/en/blog/announcements/v20-release-announce)
2. [Deno](https://deno.com/)
3. [Bun](https://bun.sh/)

Where requests/s is a good proxy metric for performance, I wanted to see how the runtimes handled actual computation complexity

## The complexity

First test is a tail call recursive Fibonacci implementation

```js
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

Secondly we combine that with some React render to string

```jsx
renderToString(
    <body>
        <h1>Hello, world</h1>
        <h2>Here are the next X fibonacci numbers</h2>
        <section>
            <p>Fibonacci 0: 0</p>
            <p>Fibonacci 1: 0</p>
            <!-- ... -->
            <p>Fibonacci X: ???</p>
        </section>
    </body>
)
```

## Running it

```
make install
make run # ITER=40 - Number of iterations of fibonacci to call
```
