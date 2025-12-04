'use client'
import { Trans } from '@lingui/react/macro'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <p className="flex justify-center py-1 before:content-['light'] dark:before:content-['dark']" />
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value='system'>
          <Trans>System</Trans>
        </option>
        <option value='dark'>
          <Trans>Dark</Trans>
        </option>
        <option value='light'>
          <Trans>Light</Trans>
        </option>
      </select>
    </div>
  )
}
