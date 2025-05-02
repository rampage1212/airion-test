"use client";

import { ChakraProvider as ChakraUIProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function ChakraProvider({ children }: { children: ReactNode }) {
  return <ChakraUIProvider>{children}</ChakraUIProvider>;
}
