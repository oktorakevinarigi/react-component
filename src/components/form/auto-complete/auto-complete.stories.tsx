import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Box } from "@chakra-ui/react"

import { AutoComplete, AutoCompleteProps } from "./auto-complete"

export default {
  title: "Components / Form / Auto Complete",
  component: AutoComplete,
} as Meta

type AutoCompleteStory = StoryObj<AutoCompleteProps>

export const Desktop: AutoCompleteStory = {
  render: args => (
    <Box width="760px">
      <AutoComplete {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    lists: [],
    onScrollEnd: () => undefined,
  },
}
