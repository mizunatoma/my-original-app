'use client'

import CurrentActivityWidget from "./_components/CurrentActivityWidget"
import ActivitiseListWidget from "./_components/ActivitiseListWidget"
import TimelineWidget from "./_components/TimelineWidget"

export default function Page() {
  return (
    <div>
      <div className="flex">
        <CurrentActivityWidget />
        <ActivitiseListWidget />
      </div >

      <TimelineWidget />
    </div >
  )
}