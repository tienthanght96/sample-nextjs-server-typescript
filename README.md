

### Install and run


```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## The idea behind the example

Use the [@zeit/next-typescript](https://github.com/zeit/next-plugins/tree/master/packages/next-typescript) plugin to inject [@babel/preset-typescript](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript) into Next.js, allowing for fast TypeScript transpilation. It also implements a `tsconfig.json` as recommended by [the @zeit/next-typescript plugin page](https://github.com/zeit/next-plugins/tree/master/packages/next-typescript/#readme).

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this in your `test` scripts, say, for your CI process.
# sample-nextjs-server-typescript
