// components/ThemeToggleButton.tsx
'use client'
import { useTheme } from 'next-themes'
import { Button } from '@mantine/core'

export function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()

    return (
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle Theme
        </Button>
    )
}