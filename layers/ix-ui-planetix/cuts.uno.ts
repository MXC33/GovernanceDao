import { handler as h } from '@unocss/preset-mini/utils'
import { Rule } from "unocss"

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