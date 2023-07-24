import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

export interface UIProviderProps {
  children: React.ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
