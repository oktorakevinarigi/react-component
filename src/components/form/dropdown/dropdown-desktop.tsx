import React, { Dispatch, SetStateAction } from "react"
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
} from "@chakra-ui/react"

type DropdownDesktopProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  error: string
  label: string
  placeholder: string
  isPortal: boolean
  isRequired: boolean
}

type ContentParam = {
  search: string
  lists: { label: string; value: string | number }[]
  value: string | number
  setSearch: Dispatch<SetStateAction<string>>
  selected: (value: string | number) => void
}

function Content({ search, lists, value, setSearch, selected }: ContentParam) {
  return (
    <PopoverContent minW="full" bg="white" shadow="xl" border="1px" borderColor="gray.200">
      <Box m={2} position="fixed" right={0} left={0} bg="white">
        <Input
          borderRadius="8px"
          focusBorderColor="primary.400"
          border="1px"
          _placeholder={{
            fontWeight: "300",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "-0.015em",
            color: "gray.400",
          }}
          borderColor="gray.300"
          fontSize="sm"
          w="full"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
      </Box>
      <Box mt={16} maxH={350} overflowY="auto" w="100%">
        {lists.map(item => {
          return (
            <Box
              key={item.value}
              py={2}
              display="flex"
              alignItems="center"
              px={3}
              width="100%"
              onClick={() => {
                selected(item.value)
              }}
              {...(value === item.value && { bg: "#e1f2f3" })}
              _hover={{
                backgroundColor: "#e1f2f3",
                cursor: "pointer",
              }}
            >
              {item.label}
            </Box>
          )
        })}
      </Box>
    </PopoverContent>
  )
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
    placeholder,
    isPortal,
    isRequired,
  } = props

  return (
    <Box position="relative" w="full">
      <Popover placement="bottom-start" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <FormControl isInvalid={!!error} isRequired={isRequired}>
            <FormLabel
              style={{
                fontWeight: "300",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-0.015em",
                color: "gray.400",
              }}
            >
              {label}
            </FormLabel>
            <Input
              borderRadius="8px"
              focusBorderColor="primary.400"
              height="48px"
              border="1px"
              borderColor="gray.300"
              readOnly
              value={lists.find(x => x.value === value)?.label || ""}
              _invalid={{ borderWidth: "2px", borderColor: "#E53E3E" }}
              placeholder={placeholder}
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
            />
          </Portal>
        ) : (
          <Content
            search={search}
            lists={lists}
            value={value}
            setSearch={setSearch}
            selected={selected}
          />
        )}
      </Popover>
    </Box>
  )
}
