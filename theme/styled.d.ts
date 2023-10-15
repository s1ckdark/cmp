import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      neutral: string
      background: string
      textPrimary: string
      textSecondary: string
      success: string,
      sidebar: string,
      mint: string,
      green: string,
      black: string,
      charcoal: string,
      blue: string,
      navy: string,
      labelmint: string,
      labelblue: string,
      red: string,
      orange: string
    },
    btn: {
      submit: string,
      active: string,
      gray: string,
      navy: string,
      text: string
    },
    post:{
      view: {
        header: string,
      },
      write: {
        title: string,
        subtitle: string,
        content: string,
        readonly: string,
        submit: string
      },
      list: {
        title: string,
        subtitle: string,
        content: string,
        button: string
      },
    }
  }
}
