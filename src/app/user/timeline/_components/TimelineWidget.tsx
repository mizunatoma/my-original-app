'use client'
import React, { useState, useEffect } from "react"
import { TimelogDTO, TimelineAPI } from "@/types/api";
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  timelineKey: { count: number }
}

export default function TimelogWidget({ timelineKey }: Props) {
  const hours = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ... 23]

  const [activities, setActivities] = useState<TimelogDTO[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const fetchActivities = async () => {
    try {
      const res = await fetch(`/api/timeline?date=${date}`);
      const data: TimelineAPI.Get.Response = await res.json();
      setActivities(data.activities || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, [date, timelineKey]);

  return (
    <div className="widget-card h-[calc(100vh-140px)] flex flex-col ">
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            const d = new Date(date)
            d.setDate(d.getDate() - 1)
            setDate(d.toISOString().split("T")[0])
          }}
        ><ChevronLeft size={16} /></button>
        <button>{date}</button>
        <button
          onClick={() => {
            const d = new Date(date)
            d.setDate(d.getDate() + 1)
            setDate(d.toISOString().split("T")[0])
          }}><ChevronRight size={16} /></button>
      </div>

      <div className="h-[1440px] relative overflow-y-auto">

        {/* 左側：時刻表示 */}
        {hours.map((hour) => (
          <div key={hour} className="border-b border-gray-100 flex h-[60px]">
            <div className="w-16 text-xs text-gray-400 font-mono py-2 pr-4 text-right">
              {String(hour).padStart(2, '0')}:00
            </div>
          </div>
        ))}

        {/* 右側：記録一覧 */}
        {activities.map((activity) => {
          if (activity.endAt === null) return
          const start = new Date(activity.startAt);
          const end = new Date(activity.endAt);
          const startMinutes = start.getHours() * 60 + start.getMinutes();
          const endMinutes = end.getHours() * 60 + end.getMinutes();
          const height = endMinutes - startMinutes

          return (
            <div
              key={activity.id}
              className={`truncate top-0 left-16 right-0 h-full p-1 text-xs bg-100 mb-1 rounded-md absolute ${activity.category.colorToken}`}
              style={{ top: `${startMinutes}px`, height: `${height}px` }}
            >
              {activity.title}
            </div>
          )
        })}

      </div>
    </div >

  )
}