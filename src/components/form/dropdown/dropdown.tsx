import React, { useState } from "react";
import {
  useDisclosure,
  type FormControlProps,
  type FormLabelProps,
  type InputProps,
  type FlexProps,
} from "@chakra-ui/react";

import { useDebounce } from "@utils";
import { DropdownDesktop } from "./dropdown-desktop";
import { DropdownMobile } from "./dropdown-mobile";

export type DropdownProps = {
  isMobile: boolean;
  label?: string;
  value?: string | number;
  onSelected?: (value: string | number) => void;
  lists?: { label: string; value: string | number }[];
  error?: string;
  isPortal?: boolean;
  formControl?: FormControlProps;
  styleLabel?: FormLabelProps;
  styleInput?: InputProps;
  styleSearch?: InputProps;
  styleListItem?: FlexProps;
};

export function Dropdown(props: DropdownProps) {
  const {
    isMobile,
    value = "",
    onSelected,
    lists = [],
    error = "",
    label = "",
    isPortal = true,

    formControl,
    styleLabel,
    styleInput,
    styleSearch,
    styleListItem,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const deb = useDebounce(search, 500);

  function selected(valueSelected: string | number) {
    onClose();
    setSearch("");
    if (onSelected) {
      onSelected(valueSelected);
    }
  }

  const newProps = {
    search,
    setSearch,
    lists: lists.filter(item => item.label.toLowerCase().includes(deb.toLowerCase())),
    value,
    selected,
    isOpen,
    onOpen,
    onClose,
    error,
    label,
    isPortal,

    formControl,
    styleLabel,
    styleInput,
    styleSearch,
    styleListItem,
  };
  if (isMobile) {
    return <DropdownMobile {...newProps} />;
  }
  return <DropdownDesktop {...newProps} />;
}
