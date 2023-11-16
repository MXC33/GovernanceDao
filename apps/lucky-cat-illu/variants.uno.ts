import { VariantObject } from "@unocss/core"
import { variantGetParameter } from '@unocss/preset-mini/utils'

export const stateOnMatcher: VariantObject = {
  name: 'state-on-matcher',
  match(matcher, ctx) {
    //@ts-ignore
    const variant = variantGetParameter('on-', matcher, ctx.generator.config.separators)

    if (variant) {
      const [match, rest] = variant
      return {
        matcher: rest,
        selector: s => `${s}[${match}]:not([${match}="false"])`,
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
