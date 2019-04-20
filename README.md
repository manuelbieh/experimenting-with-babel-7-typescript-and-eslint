# Experimenting with Babel 7 + TypeScript + ESLint

The story of a (semi successful) attempt to get **Babel 7** with **TypeScript** and **ESLint** with `babel-eslint` to work nicely together.

A little bit of background info: I like to be cutting edge and that's why I like **Babel** a lot. It let's me use future JavaScript today. If there's a proposal for it, there's almost certainly a Babel plugin for it as well. What I also like is typed JavaScript. I used **Flow** a lot in the past but Flow rhymes with slow, and that's what it is: a memory eating, slow, unreliable monster.

I prefered Flow over **TypeScript** because I only wanted the **type checking** without going all-in on the whole TS ecosystem which always felt quite odd to me. I wanted to continue using all the tools I used over all the years. I wanted **Babel**, not **tsc**, I wanted **ESLint** not **TSLint** and I didn't want to use all the blah-blah-typescript-rewired-awesome-loader-yadayada hacks and workarounds either. In Flow it was as easy as `yarn add @babel/preset-flow` and that was basically it.

So I was thrilled when I first heard about the possibility to use **TypeScript** with **Babel 7** by installing `@babel/preset-typescript` - in the same way I was able to use **Flow** just by installing `@babel/preset-flow`. I was even more thrilled when I read about the plans of the TypeScript team on [dropping TSLint in favor of ESLint](https://eslint.org/blog/2019/01/future-typescript-eslint).

Until recently I used `pluggable-babel-eslint` together with `eslint-plugin-typescript` and "everything" worked in a way I liked but both are deprecated now and will no longer be maintained. The repos say _Babel-eslint supports TypeScript now_ (`pluggable-babel-eslint`) and _Use @typescript-eslint/eslint-plugin instead_ (`eslint-plugin-typescript`) which is only half the truth. The whole Babel+TypeScript+ESLint thing looks like a total mess to me at the moment.

## My goals with this experiment were to:

- use **Babel 7** for transpilation of **JSX** and **TypeScript** by using `@babel/preset-react` and `@babel/preset-typescript`
- use `babel-eslint` as **ESLint** parser so **ESLint** can understand **Babel** features like Optional Chaining which **TypeScript** does not understand
- use type definitions as replacement for **PropTypes** in **React** components
- use **TypeScript** for live type checking in **VSCode** and/or **Atom**, but only for things **TypeScript** does understand. Syntax that is later transpiled via Babel (like Optional Chaining) should ideally just be "ignored" without breaking the linting
- have all of this working with live linting in **VSCode** and **Atom** using **ESLint**

## Things that are working:

✅ Babel transpiles all files correctly and strips out all the type information

✅ I got live validation in **VSCode** working by adding the following line to my `settings.json`:

```json
"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
```

✅ I can use TypeScript types and interface as PropTypes replacement<br />
❌ … but in `babel-eslint@11.0.0-beta.0` I get `no-undef` errors for every type and interface I define

✅ The TypeScript parser built into **VSCode** is somehow able to ignore invalid **TypeScript** and still give me type checking for the correct parts of the code. The integrated TypeScript parser in **VSCode** seems to be more liberal than `tsc` which fails **entirely** on invalid syntax (e.g. when using syntax that's later transpiled via Babel).

## Things that are not working:

❌ `@typescript-eslint/parser` does not work in files with syntax unknown to **TypeScript**. Sure, neither **TypeScript** nor `@typescript-eslint/parser` care about the **Babel** config, but not only does it "not work", it breaks completely due to a parsing error (which is somehow logical …) so that all other **ESLint** errors are not shown in **VSCode** once a file contains non-TypeScript syntax. So using `@typescript-eslint/parser` is not an option as I want to continue non-TypeScript compatible Babel features without breaking the linter completely.

❌ Parsing errors can't be ignored when using `tsc` for type checking. Not by using `@ts-ignore` not by using `@ts-nocheck`. Once you use non-standard syntax in .ts/.tsx files, you can't type check them on the CLI via `tsc` anymore. For some reason it still works fine in **VSCode**.

❌ **ESLint** does not know about TypeScript globals. So `Pick<Type, 'a' | 'b'>` results in an error `[no-undef] 'Pick' is not defined`. That's kind of annoying and I found no other workaround than adding things like `Pick` or `ReturnType` to the `globals` object of the ESLint config. I have no idea how viable this is in larger projects. It worked fine in one of my previous projects with `pluggable-babel-eslint` so I guess it should not be that hard to get it working again.

Sure you could disable `no-undef` in ESLint since TypeScript also takes care of that. **Unless** you're using "unparseable" non-TypeScript syntax like, you know, Optional Chaining 🙄.

❌ ~~I don't know why, it worked already but it seems like I changed something in the eslintrc (or wherever) so that I now get `XYZ is not defined` when I use a `type XYZ` 😕~~ Ok, got it. Seems like `babel-eslint@11.0.0-beta.0` does not understand TypeScript keywords like `type` or `interface` anymore, not even with `@babel/preset-typescript` in the `.babelrc`.
