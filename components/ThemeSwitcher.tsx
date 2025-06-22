'use client' // <<< ESTA É A LINHA QUE CORRIGE TUDO

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect só roda no cliente, então isso evita erros de "hydration mismatch"
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Para evitar que o layout "pule", podemos renderizar um placeholder
    return <div className="w-[125px] h-[42px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
    </button>
  )
}