import React, { Dispatch, SetStateAction } from "react"
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
} from "@chakra-ui/react"

type DropdownMobileProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  value: string | number
  selected: (value: string | number) => void
  lists: { label: string; value: string | number }[]
  error: string
  label: string
  placeholder: string
  isRequired: boolean
}

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
    placeholder,
    isRequired,
  } = props

  return (
    <Box>
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
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
          onClick={onOpen}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent pb={10} borderTopRadius={10} border="1px solid #E5E5E5" shadow="2xl">
          <DrawerCloseButton />
          <DrawerHeader>{label}</DrawerHeader>

          <DrawerBody>
            <Input
              fontSize="sm"
              w="full"
              value={search}
              onChange={e => {
                setSearch(e.target.value)
              }}
            />
            {lists.map(item => {
              return (
                <React.Fragment key={item.value}>
                  <Box
                    py={2}
                    display="flex"
                    alignItems="center"
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
                  <Divider />
                </React.Fragment>
              )
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
