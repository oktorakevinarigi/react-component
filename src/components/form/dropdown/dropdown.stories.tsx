import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Box } from "@chakra-ui/react"

import { Dropdown, DropdownProps } from "./dropdown"

export default {
  title: "Components / Form / Dropdown",
  component: Dropdown,
} as Meta

type DeopdownStory = StoryObj<DropdownProps>

export const Mobile: DeopdownStory = {
  render: args => (
    <Box width="336px">
      <Dropdown {...args} isMobile />
    </Box>
  ),
  args: {
    label: "Dropdown",
    value: "",
    lists: [
      {
        label: "Satu",
        value: "1",
      },
    ],
    error: "",
    placeholder: "",
    isPortal: true,
    isRequired: false,
  },
}

export const Desktop: DeopdownStory = {
  render: args => (
    <Box width="760px">
      <Dropdown {...args} isMobile={false} />
    </Box>
  ),
  args: {
    ...Mobile.args,
  },
}
