'use client';

import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import { ReactNode } from "react";

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}