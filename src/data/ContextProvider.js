import React, { cloneElement } from 'react';

// import providers
import { ExportedProvider } from './path/to/provider';

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

export function ContextProvider({ children }) {
  return (
    <ProviderComposer
      // add providers to array of contexts
      contexts={
        [
          // <ExportedProvider/>
        ]
      }
    >
      {children}
    </ProviderComposer>
  );
}
