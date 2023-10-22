import type { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    primary: '#313131',
    secondary: '#1F2937',
    neutral: '#FFFFFF',
    background: '#F5F8FB',
    textPrimary: '#313131',
    textSecondary: '#D1D5DB',
    success: '#68D9B1',
    sidebar: '#202124',
    mint: '#43B69A',
    green: '#1A9A7B',
    black: '#202124',
    charcoal: '#2B3035',
    blue: '#3D9CD9',
    navy: '#036B98',
    labelmint: '#43B69A',
    labelblue: '#3D9CD9',
    red: '#EE6161',
    orange: '#F88B26'
  },
  btn: {
    submit: '#43B69A',
    active: '#43B69A',
    gray: '#7A7C82',
    navy: '#35404F'
  },
  post:{
    view: {
      header: '#1F2937',
    },
    write: {
      title: '#F3F4F6',
      subtitle: '#D1D5DB',
      content: '#D1D5DB',
      readonly: '#DEE1E7',
      submit: '#43B69A'
    },
    list: {
      title: '#F3F4F6',
      subtitle: '#D1D5DB',
      content: '#D1D5DB',
      button: '#4F46E5'
    },
  }
}
