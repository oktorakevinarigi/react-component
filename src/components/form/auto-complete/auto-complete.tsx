import React, { useState, useRef, useEffect } from "react";
import {
  type FormControlProps,
  type FormLabelProps,
  type InputProps,
  type TextProps,
} from "@chakra-ui/react";

import { useDebounce } from "@utils";
import { AutoCompleteDesktop } from "./auto-complete-desktop";

type ListItemType = { id: string; label: string };
export type AutoCompleteProps = {
  isMobile: boolean;
  label?: string;
  value?: { id: string; label: string };
  lists?: ListItemType[];
  onScrollEnd?: (e: Event) => void;
  hasLoadMore?: boolean;
  isLoading?: boolean;
  onSelect?: (data: ListItemType) => void;
  onSearch?: (text: string) => void;

  formControlProps?: FormControlProps;
  labelProps?: FormLabelProps;
  inputProps?: InputProps;
  searchProps?: InputProps;
  listItemProps?: TextProps;
};

export function AutoComplete(props: AutoCompleteProps) {
  const {
    label,
    value = { label: "", id: "" },
    lists = [],
    onScrollEnd,
    hasLoadMore = false,
    isLoading = false,
    onSelect,
    onSearch,

    formControlProps,
    labelProps,
    inputProps,
    searchProps,
    listItemProps,
  } = props;
  const [stateForm, setStateForm] = useState({ isList: false });
  const [search, setSearch] = useState("");
  const deb = useDebounce(search, 500);

  const boxListRef = useRef<HTMLDivElement | null>(null);
  let debounceTimer: ReturnType<typeof setTimeout>;

  function debounce(callback: () => void) {
    window.clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, 1000);
  }

  function handlerOnScrollEnd(event: Event) {
    const { scrollHeight, clientHeight, scrollTop } = event.target as HTMLElement;
    const hiddenHeight = scrollHeight - clientHeight;
    debounce(() => {
      if (scrollTop > hiddenHeight * 0.7 && hasLoadMore && onScrollEnd) {
        console.log("panggil");
        onScrollEnd(event);
      }
    });
  }

  useEffect(() => {
    if (boxListRef.current) {
      boxListRef.current.addEventListener("scroll", handlerOnScrollEnd);
    }
    return () => {
      if (boxListRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        boxListRef.current.removeEventListener("scroll", handlerOnScrollEnd);
      }
    };
  });

  useEffect(() => {
    function handlerClickToogle(event: Event) {
      const container = document.getElementById("container") as HTMLElement;
      if (!container.contains(event.target as HTMLElement)) {
        handleState("isList", false);
        setSearch("");
      }
    }

    document.addEventListener("click", handlerClickToogle);
    return () => {
      document.removeEventListener("click", handlerClickToogle);
    };
  }, []);

  useEffect(() => {
    onSearch;
  }, [deb, onSearch]);

  function handleState(field: string, value: boolean) {
    setStateForm(prev => ({ ...prev, [field]: value }));
  }

  function onSelectItem(data: ListItemType) {
    if (onSelect) {
      onSelect(data);
    }
    handleState("isList", false);
  }

  const newProps = {
    label,
    value,
    lists,
    stateForm,
    handleState,
    boxListRef,
    isLoading,
    onSelectItem,
    setSearch,
    search,
    hasLoadMore,

    formControlProps,
    labelProps,
    inputProps,
    searchProps,
    listItemProps,
  };
  return <AutoCompleteDesktop {...newProps} />;
}
