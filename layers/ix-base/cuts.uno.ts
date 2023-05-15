import { colorResolver, handler as h } from '@unocss/preset-mini/utils'
import { toEscapedSelector as e } from 'unocss'

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
      z-index: 1;
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

  [/^frame-(xs|sm|md|lg)$/, ([, size]) => {
    const px = sizeMap[size] ?? sizeMap['md']
    const pixSize = h.bracket.global.px(px)

    return {
      '--cut-depth': pixSize
    }
  }]
]




export const cutRules: Rule[] = [
  [/^cut-(xs|sm|md|lg)$/, ([, size]) => {
    const sizeMap: Record<string, string> = {
      xs: '4',
      sm: '8',
      md: '12',
      lg: '24'
    }
    const px = sizeMap[size] ?? sizeMap['md']
    const pixSize = h.bracket.global.px(px)

    return {
      '--cut-depth': `${pixSize}`,
      "--cut-top-right-bottom-left": '0 0, calc(100% - var(--cut-depth)) 0, 100% var(--cut-depth), 100% 100%, var(--cut-depth) 100%, 0 calc(100% - var(--cut-depth));',
      '--cut-top-left-bottom-right': '0 var(--cut-depth), var(--cut-depth) 0, 100% 0, 100% calc(100% - var(--cut-depth)), calc(100% - var(--cut-depth)) 100%, 0 100%;',

      '--cut-top-left': '0 var(--cut-depth), var(--cut-depth) 0, 100% 0, 100% 100%, 0 100%;',

      '--cut-top-right': '0 0, calc(100% - var(--cut-depth)) 0, 100% var(--cut-depth), 100% 100%, 0 100%;',

      '--cut-bottom-right': '0 0, 100% 0, 100% calc(100% - var(--cut-depth)), calc(100% - var(--cut-depth)) 100%, 0 100%;',

      '--cut-bottom-left': '0 0, 100% 0, 100% 100%, var(--cut-depth) 100%, 0 calc(100% - var(--cut-depth));',

      '--cut-dent-top-right': '0 0, calc(100% - var(--cut-dent-depth-a)) 0%, calc(100% - var(--cut-dent-depth-b)) var(--dent-depth), 100% var(--dent-depth), 100% 100%, 0 100%;'
    }
  }]
]