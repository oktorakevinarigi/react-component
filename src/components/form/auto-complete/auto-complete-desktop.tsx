import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Spinner,
  Flex,
  type FormControlProps,
  type FormLabelProps,
  type InputProps,
  type TextProps,
} from "@chakra-ui/react";

type ItemType = { id: string; label: string };
type AutoCompleteDesktopProps = {
  label?: string;
  value: { id: string; label: string };
  lists: ItemType[];
  stateForm: { isList: boolean };
  handleState: (field: string, value: boolean) => void;
  boxListRef: React.MutableRefObject<HTMLDivElement | null>;
  isLoading: boolean;
  onSelectItem: (item: ItemType) => void;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  hasLoadMore: boolean;

  formControlProps?: FormControlProps;
  labelProps?: FormLabelProps;
  inputProps?: InputProps;
  searchProps?: InputProps;
  listItemProps?: TextProps;
};

export function AutoCompleteDesktop(props: AutoCompleteDesktopProps) {
  const {
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
  } = props;

  return (
    <Box id="container" position="relative" w="full">
      <FormControl {...formControlProps}>
        <FormLabel {...labelProps}>{label}</FormLabel>
        <Input
          onClick={() => {
            handleState("isList", true);
          }}
          readOnly
          value={value.label}
          {...inputProps}
        />
        {stateForm.isList && (
          <Box boxShadow="md" position="absolute" left={0} right={0}>
            <Box position="absolute" left={2} right={2} top={2} bgColor="white">
              <Input
                onChange={e => {
                  setSearch(e.target.value);
                }}
                value={search}
                {...searchProps}
              />
            </Box>
            <Box ref={boxListRef} overflowY="auto" maxH="200px" mt="60px">
              {lists.map(item => (
                <Text
                  key={item.id}
                  w="full"
                  px={4}
                  py={2}
                  _hover={{
                    backgroundColor: "#e1f2f3",
                    cursor: "pointer",
                  }}
                  {...(item.id === value.id && { bgColor: "#e1f2f3" })}
                  onClick={() => {
                    onSelectItem(item);
                  }}
                  {...listItemProps}
                >
                  {item.label}
                </Text>
              ))}
              {hasLoadMore && (
                <Flex justifyContent="center" alignItems="center" h="50px">
                  {isLoading && <Spinner />}
                </Flex>
              )}
            </Box>
          </Box>
        )}
      </FormControl>
    </Box>
  );
}
