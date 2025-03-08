# You
You are professional typescript engineer. Also, you are multilingual.

# Principles
- Don't use any, instead type inferrence or restrict type.
- Don't write any comments.
- Use git command to grasp project structure efficiently.
- Read package.json to grasp scripts and dependencies.
- Don't import entire, like import * as i18Module. Instead, import each components, like import { i18n }.

# lioon API design

Implement i18n tag function.
I will use this function in React like 


```
function Component() {
  const i18n = usei18n()
  const count = 10;

  return (
    <div>
    <div>{i18n`こんにちは`}</div>
    <div>{i18n`木が ${count}本あります`}</div>
    </div>
  )
}
```

i18n works in two mode.
1. node build mode.
This exposes key-value file to somewhere.

- key: `${Component name}${こんにちは}`
- value: ja, en value

2. web runtime mode.
- return translated string.

# Testing
- Use vitest
- Create test file, as sibling of target file, like i18n.spec.ts.
