import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [bright, setBright] = useState(false)
  const toggle = () => setBright(p => !p)
  return (
    <ThemeContext.Provider value={{ bright, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
