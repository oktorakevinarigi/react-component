import React, { ReactElement } from "react";
import type { Preview } from "@storybook/react";
import { DocsContainer, DocsContainerProps } from "@storybook/addon-docs";

import { UIProvider } from "../src/ui";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: { current: 'light' },
    layout: "centered",
    docs: {
      container: ({
        children,
        context,
      }: DocsContainerProps & { children: ReactElement }) => (
        <DocsContainer context={context}>
          <UIProvider>{children}</UIProvider>
        </DocsContainer>
      ),
    },
  },
};

export default preview;
