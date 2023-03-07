import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "white",
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: { current: 'light' },
    layout: "centered",
  },
}

export default preview
