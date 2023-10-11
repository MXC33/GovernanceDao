import { colorResolver, handler as h, parseColor, colorToString } from '@unocss/preset-mini/utils'
import { RuleContext, toEscapedSelector as e } from 'unocss'
import type { Theme } from '@unocss/preset-mini'
import { Rule } from "unocss"

const sizeMap: Record<string, string> = {
  xs: '4',
  sm: '8',
  md: '12',
  lg: '24'
}

export const frameRules: Rule[] = [
  [/^frame(?:-(.+))?$/, ([, d], ruleContext) => {
    const px = sizeMap['md']
    const pixSize = h.bracket.global.px(px)
    const { wrappedMediaSelector, attributedSelector } = getSelector(ruleContext)

    const pseudoBase = `
      height: var(--un-frame-gap);
      content: '';
      display: block;
      position: absolute;
      pointer-events: none;
      z-index: 4;
      left: 0;
      right: 0;`

    return wrappedMediaSelector(`
      ${attributedSelector} {
        --un-frame-gap: ${pixSize};
        --un-frame-color: #636363;
        --un-frame-width: 1px;
        position: relative;
      }

      ${attributedSelector}:before {
        ${pseudoBase}
        border: 1px solid var(--un-frame-color);
        border-bottom: 0;
        top: 0;
        transition: 200ms all;
      }

      ${attributedSelector}:after {
        ${pseudoBase}
        border: 1px solid var(--un-frame-color);
        border-top: 0;
        bottom: 0;
        transition: 200ms all;
      }`
    )
  }],

  [/^frame-(.+)$/, colorResolver('--un-frame-color', 'frame-color'), { autocomplete: 'frame-$colors' }],

  [/^frame-none$/, ([]) => {
    return {
      '--un-frame-color': 'transparent'
    }
  }],

  [/^frame-(xs|sm|md|lg)$/, ([, size]) => {
    const px = sizeMap[size] ?? sizeMap['md']
    const pixSize = h.bracket.global.px(px)

    return {
      '--un-frame-gap': pixSize
    }
  }]
]

const Sizes = ['xs', 'sm', 'md', 'lg'] as const
type Size = typeof Sizes[number]

const SizePxMap: Record<Size, string> = {
  'xs': '4',
  'sm': '8',
  'md': '12',
  'lg': '24'
}

const Positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-left-bottom-right'] as const
type Position = typeof Positions[number]

const getCutDepth = (size: Size) => {
  const px = SizePxMap[size]
  const pixSize = h.bracket.global.px(px)

  return {
    '--cut-depth': `${pixSize}`
  }
}

const getCut = (position: Position, size: Size = 'md') => {
  if (!Positions.includes(position))
    return

  const path = `var(--cut-${position});`
  const depth = getCutDepth(size)

  return {
    ...depth,
    '--cut-opacity': 1,
    '--cut-path': path,
    '--cut-top-right-bottom-left': '0 0, calc(100% - var(--cut-depth)) 0, 100% var(--cut-depth), 100% 100%, var(--cut-depth) 100%, 0 calc(100% - var(--cut-depth));',
    '--cut-top-left-bottom-right': '0 var(--cut-depth), var(--cut-depth) 0, 100% 0, 100% calc(100% - var(--cut-depth)), calc(100% - var(--cut-depth)) 100%, 0 100%;',
    '--cut-top-left': '0 var(--cut-depth), var(--cut-depth) 0, 100% 0, 100% 100%, 0 100%;',
    '--cut-top-right': '0 0, calc(100% - var(--cut-depth)) 0, 100% var(--cut-depth), 100% 100%, 0 100%;',
    '--cut-bottom-right': '0 0, 100% 0, 100% calc(100% - var(--cut-depth)), calc(100% - var(--cut-depth)) 100%, 0 100%;',
    '--cut-bottom-left': '0 0, 100% 0, 100% 100%, var(--cut-depth) 100%, 0 calc(100% - var(--cut-depth));',
    '--cut-dent-top-right': '0 0, calc(100% - var(--cut-dent-depth-a)) 0%, calc(100% - var(--cut-dent-depth-b)) var(--dent-depth), 100% var(--dent-depth), 100% 100%, 0 100%;'
  }
}

const getSelector = ({ constructCSS, variantHandlers, variantMatch }: RuleContext<Theme>) => {
  const defaultSelector = constructCSS({})
  const selectors = defaultSelector.split("{")
  const mediaParameterIndex = selectors.findIndex((item) => item.includes("@media"))
  let mediaSelector = ""

  if (mediaParameterIndex == 0 && selectors.length >= 3) {
    const selector = selectors.shift()
    if (selector)
      mediaSelector = selector + " {"
  }

  const mediaEndSelector = mediaSelector == "" ? "" : "}"

  const attributedSelector = selectors.shift()

  // Unfortunately this doesn't handle variantMatches right now for some weird reason...

  const wrappedMediaSelector = (style: string) => `
    ${mediaSelector}
      ${style}
    ${mediaEndSelector}
  `

  return {
    attributedSelector,
    wrappedMediaSelector
  }

}

export const cutRules: Rule<Theme>[] = [
  ...Positions.map(p => [`cut-${p}`, getCut(p)] as Rule<Theme>),
  ...Sizes.map(s => [`cut-s-${s}`, getCutDepth(s)] as Rule<Theme>),

  [/^cut-opacity-(.+)$/, ([, op]) => {
    return {
      '--cut-opacity': Number(op) / 100,
    }
  }],
  [/^cut$/, (_, ruleContext) => {
    const { wrappedMediaSelector, attributedSelector } = getSelector(ruleContext)

    return wrappedMediaSelector(`
        .is-paint-supported ${attributedSelector} {
          clip-path: polygon(var(--cut-path));
        }`)
  }],
  [/^cut-b-(.+)$/, (arr, ruleContext) => {
    const { theme } = ruleContext
    const [_, body] = arr

    if (!body)
      return

    const data = parseColor(body, theme)
    if (!data)
      return

    const { cssColor, color } = data

    if (!cssColor && !color)
      return

    const colorString = cssColor ? colorToString(cssColor, 'var(--cut-opacity)') : color

    const { wrappedMediaSelector, attributedSelector } = getSelector(ruleContext)

    return wrappedMediaSelector(`
      .is-not-paint-supported ${attributedSelector} {
        border: 1px solid ${colorString} !important;
      }

      .is-paint-supported ${attributedSelector} {
        --cut-border: 1.5px;
        border: 0;
        clip-path: polygon(var(--cut-path));
        position: relative;
      }

      .is-paint-supported ${attributedSelector}:before {
        content: "";
        display: block;
        position: absolute;
        inset: 0;
        mask: paint(cut-corners);
        pointer-events: none;
        transition: background 150ms;
        background: ${colorString};
      }
    `)
  }],
]