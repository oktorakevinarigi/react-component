import React, { useState } from "react"
import { useDebounce } from "@utils"
import { DropdownDesktop } from "./dropdown-desktop"
import { DropdownMobile } from "./dropdown-mobile"

export type DropdownProps = {
  isMobile: boolean
  label?: string
  value?: string | number
  onSelected?: (value: string | number) => void
  lists?: { label: string; value: string | number }[]
  error?: string
  placeholder?: string
  isPortal?: boolean
  isRequired?: boolean
}

export function Dropdown(props: DropdownProps) {
  const {
    isMobile,
    value = "",
    onSelected,
    lists = [],
    error = "",
    label = "",
    placeholder = "",
    isPortal = true,
    isRequired = false,
  } = props
  const [isOpen, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const deb = useDebounce(search, 500)

  function selected(valueSelected: string | number) {
    setOpen(false)
    setSearch("")
    if (onSelected) {
      onSelected(valueSelected)
    }
  }

  const newProps = {
    search,
    setSearch,
    lists: lists.filter(item => item.label.toLowerCase().includes(deb.toLowerCase())),
    value,
    selected,
    isOpen,
    onOpen: () => {
      setOpen(true)
    },
    onClose: () => {
      setOpen(false)
    },
    error,
    label,
    placeholder,
    isPortal,
    isRequired,
  }
  if (isMobile) {
    return <DropdownMobile {...newProps} />
  }
  return <DropdownDesktop {...newProps} />
}
