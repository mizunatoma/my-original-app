'use client'

import CurrentActivityWidget from "./_components/CurrentActivityWidget"
import ActivityShortcutsWidget from "./_components/ActivityShortcutsWidget"

export default function Page() {
  return (
    <div className="flex flex-control items-center pt-10 px-4">
      <div className="w-full max-w-3xl">
        <CurrentActivityWidget />
        <ActivityShortcutsWidget />
      </div>
    </div>
  )
}