'use client'
import React, { useState, useEffect } from "react";

type ActivitiesResponse = {
  activities: {
    id: string
    name: string
    colorToken?: string
  }[]
};

type Props = {
  onSelectActivity: (id: string) => void
}

const COLOR_OPTIONS = [
  "bg-rose-400",
  "bg-teal-400",
  "bg-indigo-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-pink-400",
]

export default function ActivitiseListWidget({ onSelectActivity }: Props) {
  const [activities, setActivities] = useState<ActivitiesResponse['activities']>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const fetchActivities = async () => {
    const res = await fetch('/api/timeline/activities')
    const json = await res.json()
    setActivities(json.activities)
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <div className="widget-card">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Activities</h2>
        <button
          className="button bg-orange-100 hover:bg-orange-200 text-orange-800"
          onClick={() => setIsOpen(true)}
        >追加</button>
      </div>

      {/* Activityリスト */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <div key={activity.name} className="activity-button" onClick={() => onSelectActivity(activity.id)}>
            <div className={`activity-name ${activity.colorToken}`}></div>
            <span className="text">{activity.name}</span>
          </div>
        ))}
      </div>

      {/* activity追加のモーダル*/}
      {isOpen &&
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          {/*activity名の入力*/}
          <div className="bg-white rounded-lg flex flex-col gap-4 p-6">
            <h2 className="text-lg font-bold text-gray-400">New Activity</h2>
            <input
              className="border border-gray-400 rounded w-full p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Activity's name"
            />

            {/*色選択*/}
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((c) => {
                return (
                  <div
                    key={c}
                    className={`${c} w-6 h-6 rounded-full ${c === color ? "border-2 border-gray-500" : ""}`}
                    onClick={() => { setColor(c) }}
                  />)
              })}
            </div>

            {/*キャンセル・保存ボタン*/}
            <div className="justify-between flex w-full">
              <button
                className="rounded  border border-gray-400 px-3"
                onClick={() => {
                  setIsOpen(false)
                  setName("")
                }}
              >キャンセル</button>

              <button
                className="rounded  border bg-red-400 text-white px-3"
                onClick={async () => {
                  await fetch('/api/timeline/activities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, colorToken: color })
                  })
                  fetchActivities()
                  setIsOpen(false)
                  setName("")
                }}
              >保存</button>
            </div>
          </div>
        </div>}
    </div>
  )
}