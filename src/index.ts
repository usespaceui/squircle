import plugin from 'tailwindcss/plugin'
import { workletCode } from './worklet'

export function initSquircle() {
  if (typeof window !== 'undefined') {
    if ('registerProperty' in CSS) {
      try {
        // @ts-ignore
        CSS.registerProperty({
          name: '--tw-squircle-w',
          syntax: '<length> | <percentage>',
          inherits: true,
          initialValue: '0px',
        })
        // @ts-ignore
        CSS.registerProperty({
          name: '--tw-squircle-smooth',
          syntax: '<number>',
          inherits: true,
          initialValue: '0.6',
        })
      } catch (e) {}
    }

    if ('paintWorklet' in CSS) {
      const dataUri = `data:application/javascript;charset=utf8,${encodeURIComponent(workletCode)}`
      // @ts-ignore
      CSS.paintWorklet.addModule(dataUri).catch((e: any) => console.error('Squircle worklet failed', e))
    }
  }
}

export default plugin(function ({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      squircle: (value: string, { modifier }: any) => {
        let smooth = 0.6
        if (modifier) {
          const parsed = parseFloat(modifier)
          if (!isNaN(parsed)) {
            smooth = parsed / 100
          }
        }

        return {
          'border-radius': value,
          '--tw-squircle-w': value,
          '--tw-squircle-smooth': smooth.toString(),
          '@supports (mask-image: paint(squircle))': {
            'border-radius': '0',
            'mask-image': 'paint(squircle)',
          },
          '&[class~="border"], &[class*=" border-"], &[class^="border-"]': {
            '@supports (mask-image: paint(squircle))': {
              'border-image-source': 'paint(squircle-border)',
              'border-image-slice': '0 fill',
              'border-image-outset': 'var(--tw-squircle-outset, 1)',
            },
          },
          'a&, input&, a &, input &': {
            '@supports (mask-image: paint(squircle))': {
              'border-radius': value,
              'mask-image': 'none',
              'background-image': 'paint(squircle)',
              'border-image-source': 'none',
            },
          },
        }
      },
    },
    {
      values: theme('borderRadius'),
      modifiers: {
        '0': '0',
        '20': '20',
        '40': '40',
        '60': '60',
        '80': '80',
        '100': '100',
      },
    },
  )
})
