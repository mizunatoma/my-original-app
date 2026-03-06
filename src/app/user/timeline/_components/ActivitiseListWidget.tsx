'use client'
import React, { useState, useEffect } from "react";

type ActivitiesResponse = {
  activities: {
    id: string
    name: string
    colorToken?: string
  }[]
};

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

export default function ActivitiseListWidget() {
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
          <div key={activity.name} className="activity-button">
            <div className={`activity-name ${activity.colorToken}`}></div>
            <span className="text">{activity.name}</span>
          </div>
        ))}
      </div>

      {/* activity追加のモーダル*/}
      {isOpen &&
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="タスク名"
          />

          <div className="flex ">
            {COLOR_OPTIONS.map((color) => {
              return (
                <div
                  key={color}
                  className={`${color} w-6 h-6 rounded-full`}
                  onClick={() => setColor(color)}
                />)
            })}
          </div>

          <div className="flex flex-col">
            <button onClick={() => setIsOpen(false)}>キャンセル</button>
            <button
              onClick={async () => {
                await fetch('/api/timeline/activities', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, colorToken: color })
                })
                fetchActivities()
                setIsOpen(false)
              }}
            >保存</button>
          </div>
        </div>}
    </div>
  )
}