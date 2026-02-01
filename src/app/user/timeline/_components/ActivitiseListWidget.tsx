'use client'

import React from "react"

const ACTIVITIES = [
  { name: "仕事", color: "bg-rose-400" },
  { name: "学習", color: "bg-teal-400" },
  { name: "運動", color: "bg-indigo-400" },
  { name: "休憩", color: "bg-amber-400" }
]

export default function ActivitiseListWidget() {
  return (
    <div className="widget-card">

      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Activities</h2>
        <button className="button bg-orange-100 hover:bg-orange-200 text-orange-800">追加</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ACTIVITIES.map((activity) => (
          <div key={activity.name} className="activity-button">
            <div className={`activity-name ${activity.color}`}></div>
            <span className="text">{activity.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}