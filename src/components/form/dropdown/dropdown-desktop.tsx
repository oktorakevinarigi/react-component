import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Portal,
  Flex,
  type FormControlProps,
  type FormLabelProps,
  type InputProps,
  type FlexProps,
} from "@chakra-ui/react";

type DropdownDesktopProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  error: string;
  label: string;
  isPortal: boolean;
  formControl?: FormControlProps;
  styleLabel?: FormLabelProps;
  styleInput?: InputProps;
  styleSearch?: InputProps;
  styleListItem?: FlexProps;
};

type ContentParam = {
  search: string;
  lists: { label: string; value: string | number }[];
  value: string | number;
  setSearch: Dispatch<SetStateAction<string>>;
  selected: (value: string | number) => void;
  styleSearch?: InputProps;
  styleListItem?: FlexProps;
};

function Content({
  search,
  lists,
  value,
  setSearch,
  selected,
  styleSearch,
  styleListItem,
}: ContentParam) {
  return (
    <PopoverContent minW="full" bg="white" shadow="xl" border="1px" borderColor="gray.200" pb={5}>
      <Box m={2} position="absolute" right={0} left={0} top={0} bg="white">
        <Input
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          {...styleSearch}
        />
      </Box>
      <Box mt={5} maxH="200px" w="full" overflowY="auto">
        {lists.map(item => {
          return (
            <Flex
              key={item.value}
              onClick={() => {
                selected(item.value);
              }}
              {...(value === item.value && { bg: "#e1f2f3" })}
              py={2}
              w="full"
              alignItems="center"
              _hover={{
                backgroundColor: "#e1f2f3",
                cursor: "pointer",
              }}
              {...styleListItem}
            >
              {item.label}
            </Flex>
          );
        })}
      </Box>
    </PopoverContent>
  );
}

export function DropdownDesktop(props: DropdownDesktopProps & ContentParam) {
  const {
    isOpen,
    onOpen,
    onClose,
    lists,
    search,
    setSearch,
    value,
    selected,
    error,
    label,
    isPortal,
    formControl,
    styleLabel,
    styleInput,
    styleSearch,
    styleListItem,
  } = props;

  return (
    <Box position="relative" w="full">
      <Popover placement="bottom-start" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <FormControl isInvalid={!!error} {...formControl}>
            <FormLabel {...styleLabel}>{label}</FormLabel>
            <Input
              readOnly
              value={lists.find(x => x.value === value)?.label || ""}
              {...styleInput}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
        </PopoverTrigger>
        {isPortal ? (
          <Portal>
            <Content
              search={search}
              lists={lists}
              value={value}
              setSearch={setSearch}
              selected={selected}
              styleSearch={styleSearch}
              styleListItem={styleListItem}
            />
          </Portal>
        ) : (
          <Content
            search={search}
            lists={lists}
            value={value}
            setSearch={setSearch}
            selected={selected}
            styleSearch={styleSearch}
            styleListItem={styleListItem}
          />
        )}
      </Popover>
    </Box>
  );
}
