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
  [/^frame(?:-(.+))?$/, ([, d], { rawSelector }) => {
    const selector = e(rawSelector)
    const px = sizeMap['md']
    const pixSize = h.bracket.global.px(px)

    const pseudoBase = `
      height: var(--un-frame-gap);
      content: '';
      display: block;
      position: absolute;
      pointer-events: none;
      z-index: 2;
      left: 0;
      right: 0;`

    return `
    ${selector} {
      --un-frame-gap: ${pixSize};
      --un-frame-color: #636363;
      --un-frame-width: 1px;
      position: relative;
    }

    ${selector}:before {
      ${pseudoBase}
      border: 1px solid var(--un-frame-color);
      border-bottom: 0;
      top: 0;
    }

    ${selector}:after {
      ${pseudoBase}
      border: 1px solid var(--un-frame-color);
      border-top: 0;
      bottom: 0;
    }`
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

export const cutRules: Rule<Theme>[] = [
  ...Positions.map(p => [`cut-${p}`, getCut(p)] as Rule<Theme>),
  ...Sizes.map(s => [`cut-s-${s}`, getCutDepth(s)] as Rule<Theme>),

  [/^cut-opacity-(.+)$/, ([, op]) => {
    return {
      '--cut-opacity': Number(op) / 100,
    }
  }],
  [/^cut-b-(.+)$/, (arr, { theme, constructCSS, rawSelector }: RuleContext<Theme>) => {
    const [_, body] = arr

    if (!body)
      return

    const data = parseColor(body, theme)
    if (!data)
      return

    const { cssColor } = data

    if (!cssColor)
      return

    const colorString = colorToString(cssColor, 'var(--cut-opacity)')

    const defaultSelector = constructCSS({})
    const selectors = defaultSelector.split("{")

    const mediaParameterIndex = selectors.findIndex((item) => item.includes("@media"))
    let mediaSelector = ""

    if (mediaParameterIndex == 0 && selectors.length >= 3) {
      const selector = selectors.shift()
      if (selector)
        mediaSelector = selector + " {"
    }
    const mediaEndBracket = mediaSelector == "" ? "" : "}"

    const attributedSelector = selectors.shift()

    return `
      ${mediaSelector}
        .is-not-paint-supported ${attributedSelector} {
          border: 1px solid ${colorString} !important;
        }

      .is-paint-supported ${attributedSelector} {
        --cut-border: 1px;
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
      ${mediaEndBracket}
    `
  }],
]