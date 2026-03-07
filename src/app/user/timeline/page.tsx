'use client'
import { useState } from "react";
import CurrentActivityWidget from "./_components/CurrentActivityWidget"
import ActivitiseListWidget from "./_components/ActivitiseListWidget"
import TimelineWidget from "./_components/TimelineWidget"

export default function Page() {
  const [someId, setSomeId] = useState("")

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimelineWidget />
        <div className="">
          <CurrentActivityWidget currentActivityID={someId} />
          <ActivitiseListWidget onSelectActivity={setSomeId} />
        </div>
      </div>
    </div>
  )
}