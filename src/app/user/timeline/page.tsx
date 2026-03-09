'use client'
import { useState } from "react";
import CurrentCategoryWidget from "./_components/CurrentCategoryWidget"
import CategoriesListWidget from "./_components/CategoriesListWidget"
import TimelineWidget from "./_components/TimelineWidget"

export default function Page() {
  const [someId, setSomeId] = useState("")

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <TimelineWidget />
        <div className="flex gap-6 flex-col">
          <CurrentCategoryWidget currentCategoryID={someId} />
          <CategoriesListWidget onSelectCategory={setSomeId} />
        </div>
      </div>
    </div>
  )
}