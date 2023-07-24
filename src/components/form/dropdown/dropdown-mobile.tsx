import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  Flex,
  type FormControlProps,
  type FormLabelProps,
  type InputProps,
  type FlexProps,
} from "@chakra-ui/react";

type DropdownMobileProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  value: string | number;
  selected: (value: string | number) => void;
  lists: { label: string; value: string | number }[];
  error: string;
  label: string;

  formControl?: FormControlProps;
  styleLabel?: FormLabelProps;
  styleInput?: InputProps;
  styleSearch?: InputProps;
  styleListItem?: FlexProps;
};

export function DropdownMobile(props: DropdownMobileProps) {
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

    formControl,
    styleLabel,
    styleInput,
    styleSearch,
    styleListItem,
  } = props;

  return (
    <Box>
      <FormControl isInvalid={!!error} {...formControl}>
        <FormLabel {...styleLabel}>{label}</FormLabel>
        <Input
          readOnly
          value={lists.find(x => x.value === value)?.label || ""}
          onClick={onOpen}
          {...styleInput}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent pb={10} borderTopRadius={10}>
          <DrawerCloseButton />
          <DrawerHeader>{label}</DrawerHeader>

          <DrawerBody>
            <Input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
              {...styleSearch}
            />
            {lists.map(item => {
              return (
                <React.Fragment key={item.value}>
                  <Flex
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
                  <Divider />
                </React.Fragment>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
