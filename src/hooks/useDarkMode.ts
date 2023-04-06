import { useLayoutEffect, useState } from 'react'

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  useLayoutEffect(() => {
    const classList = document.documentElement.classList
    const darkClass = 'dark'
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialState = classList.contains(darkClass) || prefersDark
    setIsDark(initialState)
  }, [])

  const toggleDarkMode = () => {
    setIsDark((prevIsDark) => {
      const newState = !prevIsDark
      document.documentElement.classList.toggle('dark', newState)
      return newState
    })
  }

  return { isDark, toggleDarkMode }
}
