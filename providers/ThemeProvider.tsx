'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Nós não precisamos mais do 'ThemeProviderProps' aqui.
// O tipo para 'children' já é conhecido pelo React.
interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    // Passamos as propriedades diretamente aqui, sem precisar do tipo complexo.
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    )
}