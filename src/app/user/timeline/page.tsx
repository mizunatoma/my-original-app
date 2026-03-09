'use client'
import { useState } from "react";
import CurrentCategoryWidget from "./_components/CurrentCategoryWidget"
import CategoriesListWidget from "./_components/CategoriesListWidget"
import TimelineWidget from "./_components/TimelineWidget"

export default function Page() {

  // 同じカテゴリーを連続でSTARTできるよう count を持たせる（値が変わると useEffect が再発火する）
  const [selected, setSelected] = useState({ id: "", count: 0 })

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <TimelineWidget />
        <div className="flex gap-6 flex-col">
          <CurrentCategoryWidget currentCategoryID={selected} />
          <CategoriesListWidget onSelectCategory={setSelected} />
        </div>
      </div>
    </div>
  )
}