'use client'
import React, { useState, useEffect } from "react"
import { TimelineActivityDTO, TimelineAPI } from "@/types/api";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TimelogWidget() {
  const hours = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ... 23]

  const [activities, setActivities] = useState<TimelineActivityDTO[]>([]);
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
  }, [date]);

  return (
    <div className="widget-card h-[900px] flex flex-col">
      <div className="flex justify-between">
        <h2 className="section-title">Time Logs</h2>
        <div className="flex gap-2">
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
      </div>

      {/* 時間軸のグリッド */}
      <div className="grid grid-rows-24 h-[1440px]">
        {hours.map((hour) => (
          <div key={hour} className="border-b border-gray-100 flex">

            {/* 左側：時刻表示 */}
            <div className="w-16 text-xs text-gray-400 font-mono py-2 pr-4 text-right">
              {String(hour).padStart(2, '0')}:00
            </div>

            {/* 右側：記録一覧 */}
            <div className="flex-1 border-l border-gray-50 hover:bg-gray-50 transition-colors relative">
              {activities.map((activity) => {
                if (activity.endAt === null) return
                const start = new Date(activity.startAt);
                const end = new Date(activity.endAt);

                if (start.getHours() === hour) {
                  const top = start.getMinutes()
                  const height = end.getMinutes() - top
                  return (
                    <div
                      key={activity.id}
                      className="time-logs bg-100 border-rose-400 text-rose-800 mb-1 absolute "
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      {activity.title}
                    </div>
                  )
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div >

  )
}