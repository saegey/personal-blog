import { useEffect, useState } from 'react'

type ThemePreference = 'system' | 'light' | 'dark'
const storageKey = 'saegey-theme-preference'

const applyPreference = (preference: ThemePreference) => {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  if (preference !== 'system') root.classList.add(preference)
}

const ThemeControl = () => {
  const [preference, setPreference] = useState<ThemePreference>('system')

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) as ThemePreference | null
    const next = saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system'
    setPreference(next)
    applyPreference(next)
  }, [])

  const updatePreference = (next: ThemePreference) => {
    setPreference(next)
    window.localStorage.setItem(storageKey, next)
    applyPreference(next)
  }

  return <label className="flex items-center gap-2 font-condensed text-xs uppercase tracking-label text-muted">
    Theme
    <select value={preference} onChange={event => updatePreference(event.target.value as ThemePreference)} className="bg-transparent font-condensed text-xs uppercase tracking-label text-ink outline-none">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
}

export default ThemeControl
