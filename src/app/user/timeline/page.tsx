'use client'

import CurrentActivityWidget from "./_components/CurrentActivityWidget"
import ActivitiseListWidget from "./_components/ActivitiseListWidget"
import TimelineWidget from "./_components/TimelineWidget"

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CurrentActivityWidget />
        </div>
        <div className="md:col-span-2">
          <ActivitiseListWidget />
        </div>
      </div>
      <TimelineWidget />
    </div>
  )
}