'use client'
import React, { useState, useEffect } from "react";

type ActivitiesResponse = {
  activities: {
    id: string
    name: string
    colorToken?: string
  }[]
};

export default function ActivitiseListWidget() {
  const [activities, setActivities] = useState<ActivitiesResponse['activities']>([])

  useEffect(() => {
    fetch('/api/timeline/activities')
      .then(res => res.json())
      .then((json: ActivitiesResponse) => {
        setActivities(json.activities);
      })
  }, [])

  return (
    <div className="widget-card">

      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Activities</h2>
        <button className="button bg-orange-100 hover:bg-orange-200 text-orange-800">追加</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <div key={activity.name} className="activity-button">
            <div className={`activity-name ${activity.colorToken}`}></div>
            <span className="text">{activity.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}