import React from 'react'

type Component = ({ children }: any) => JSX.Element

export const withProvider = (Provider: Component) => {
  return function Component<Props>(Component: Component) {
    return function ReactComponent(props: Props) {
      return (
        <Provider>
          <Component {...props} />
        </Provider>
      )
    }
  }
}
