/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    screens: {
      'fold': { 'max': '300px' },
      'mobile': '320px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    colors: {
      brand: {
        primary: 'var(--color-emerald-500)',
        secondary: 'var(--color-gray-400)'
      },
      hover: {
        primary: 'var(--color-emerald-700)',
        secondary: 'var(--color-gray-500)',
        danger: 'var(--color-red-600)'
      },
      disabled: {
        primary: 'var(--color-emerald-50)',
        secondary: 'var(--color-gray-300)',
        danger: 'var(--color-red-200)'
      },
      color: {
        dark: 'var(--color-gray-800)',
        medium: 'var(--color-gray-600)',
        bland: 'var(--color-gray-300)',
        light: 'var(--color-white)',
        disabled: 'var(--color-gray-400)',
        primary: 'var(--color-emerald-700)',
        brand_primary: 'var(--color-emerald-500)'
      },
      support: {
        warning: 'var(--color-amber-500)',
        danger: 'var(--color-red-500)',
        success: 'var(--color-green-500)',
        info: 'var(--color-blue-500)'
      },
      bg: {
        '01': 'var(--color-gray-100)',
        '02': 'var(--color-white)',
        '03': 'var(--color-emerald-50)',
        '04': 'var(--color-emerald-200)',
        '05': 'var(--color-gray-400)',
        border: 'var(--color-gray-300)',
        'main': 'var(--bg-color-main)'
      },
      transparent: 'transparent',
      current: 'current',
      inherit: 'inherit'
    },
    extend: {
      colors: {
        ...colors,
        purple: {
          24: '#24033F '
        },
        primary: {
          50: '#B3C0FC',
          100: '#9FB0FC',
          200: '#7890FA',
          300: '#516FF9',
          400: '#294FF8',
          500: '#0832EF',
          600: '#072AC8',
          700: '#051F92',
          800: '#03135C',
          850: '#181647',
          900: '#010825'
        },

        sb: {
          dark: '#0f161f',
          gray: '#8697a2',
          orange: '#ff4f0f',
          light: '#f7f7f7',
          blue: '#0f75bd',
          red: '#ff4e64',
          'deep-purple': '#24033f',
          'light-purple': '#4b1679',
          'purple': '#3e0d68',
          'text-purple': '#a18eb4'
        },
        secondary: {
          50: '#FCE9FD',
          100: '#F9D7EF',
          200: '#F3B4D3',
          300: '#EE91B7',
          400: '#E86D9B',
          500: '#E34A7F',
          600: '#D4215C',
          700: '#A4194B',
          800: '#731239',
          900: '#420A28'
        }
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding'
      },
      height: {
        '100v': '100vh',
        'header': 'var(--height-header)',
        'main-content': 'var(--height-main-content)',
        'height-top-summary': 'var(--height-top-summary)',
        'arrow-sidebar': 'var(--width-arrow-sidebar)'
      },
      width: {
        'arrow-sidebar': 'var(--width-arrow-sidebar)'
      },
      maxWidth: {
        'arrow-sidebar': 'var(--width-arrow-sidebar)'
      },
      minHeight: {
        '100v': '100vh',
        'header': 'var(--height-header)',
        'main-content': 'var(--height-main-content)',
        'height-top-summary': 'var(--height-top-summary)'
      },
      maxHeight: {
        'arrow-sidebar': 'var(--width-arrow-sidebar)'
      },
      spacing: {
        'size-button-01': 'var(--size-l)',
        'size-button-02': 'var(--size-m)',
        'size-dropdown': 'var(--size-xl)',
        'size-input': 'var(--size-l)',
        'editor-icon': 'var(--padding-icon-editor)'
      },
      fontWeight: {
        'xl': 'var(--font-weight-xl)',
        'l': 'var(--font-weight-l)',
        'm': 'var(--font-weight-m)',
        'base': 'var(--font-weight-base)'
      },
      fontSize: {
        'icons': '20px',
        'heading-01': ['var(--font-size-4xl)',
          {
            fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-02': ['var(--font-size-2xl)',
          {
            fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-03': ['var(--font-size-xl)',
          {
            fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-04': ['var(--font-size-l)',
          {
            fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-05': ['var(--font-size-m)',
          {
            fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-06': ['var(--font-size-base)',
          {
            fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'body-01': ['var(--font-size-base)',
          {
            fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'body-02': ['var(--font-size-m)',
          {
            fontWeight: 'var(--font-weight-l)',
            lineHeight: 'var(--font-height-24)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'body-03': ['var(--font-size-s)',
          {
            fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'button': ['var(--font-size-base)',
          {
            fontWeight: 'var(--font-weight-l)',
            lineHeight: 'var(--font-height-custom)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'label': ['var(--font-size-m)',
          {
            fontWeight: 'var(--font-weight-l)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'error': ['var(--font-size-s)',
          {
            fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'link': ['var(--font-size-base)',
          {
            fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-underline)'
          }
        ],
        'code_mirror': ['var(--font-size-base)',
          {
            fontWeight: 'var(--font-size-m)',
            lineHeight: 'var(--font-height-150)',
            fontStyle: 'var(--font-style-normal)'
          }
        ]
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'shadow-1': '0px 1px 4px rgba(0, 0, 0, 0.2)',
        'shadow-2': '0px 2px 10px rgba(0, 0, 0, 0.2)',
        'input': '0 0 0 1px var(--color-emerald-500) '
      },
      borderRadius: {
        'pill': 'var(--radius-pill)',
        'circle': 'var(--radius-circle)',
        'm': 'var(--radius-rounded-m)',
        's': 'var(--radius-rounded-s)',
        'sharp': 'var(--radius-sharp)',
        '5px': 'var(--radius-5px)'
      }
    }
  },
  plugins: []
}
