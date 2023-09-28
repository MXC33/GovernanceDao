import { VariantObject } from "@unocss/core"
import { variantGetParameter } from '@unocss/preset-mini/utils'

export const parentClassMatcher: VariantObject = {
  name: 'parent-class-matcher',

  match: (matcher, ctx) => {
    const variant = variantGetParameter('parent-', matcher, ctx.generator.config.separators)
    // 'parent-is-paint-supported:'

    if (variant) {
      const [match, rest] = variant
      const parentSelector = `.${match}`
      return {
        matcher: rest,
        // parent: parentSelector,
        selector: s => `${parentSelector} ${s}`,
      }
    }
  }
}

export const stateOnMatcher: VariantObject = {
  name: 'state-on-matcher',
  match(matcher, ctx) {
    //@ts-ignore
    const variant = variantGetParameter('on-', matcher, ctx.generator.config.separators)

    if (variant) {
      const [match, rest] = variant
      return {
        matcher: rest,
        selector: s => `${s}[${match}="true"]`,
      }
    }
  },
  multiPass: true
}

export const stateMatcher: VariantObject = {
  name: 'state-matcher',
  match(matcher, ctx) {
    //@ts-ignore
    const variant = variantGetParameter('s-', matcher, ctx.generator.config.separators)
    if (variant) {
      const [match, rest] = variant
      return {
        matcher: rest,
        selector: s => `${s}[state="${match}"]`,
      }
    }
  },
}
