// hooks | libraries
import {createContext} from 'react'

export const FileContext = createContext({
    files: null,
    setFiles: (): void => {},
    getFiles: async (): Promise<void> => {}
})