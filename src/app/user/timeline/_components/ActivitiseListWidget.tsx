'use client'

import React from "react"

export default function ActivitiseListWidget() {
  return (
    <div className="widget-card">

      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Activities</h2>
        <button className="button bg-orange-100 hover:bg-orange-200 text-orange-800">追加</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="activity-button">
          <div className="activity-name bg-rose-400"></div>
          <span className="activity-name-text">仕事</span>
        </div>
        <div className="activity-button">
          <div className="activity-name bg-teal-400"></div>
          <span className="activity-name-text">学習</span>
        </div>
        <div className="activity-button">
          <div className="activity-name bg-indigo-400"></div>
          <span className="activity-name-text">運動</span>
        </div>
        <div className="activity-button">
          <div className="activity-name bg-amber-400"></div>
          <span className="activity-name-text">休憩</span>
        </div>
      </div>

    </div>
  )
}