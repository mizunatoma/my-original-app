'use client'
import React from "react"

export default function TimelogWidget() {
  const hours = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ... 23]

  return (
    <div className="widget-card h-[900px] flex flex-col">
      <h2 className="section-title">Time Logs</h2>

      {/* 時間軸のグリッド */}
      <div className="grid grid-rows-24 h-[1300px]">
        {hours.map((hour) => (
          <div key={hour} className="border-b border-gray-100 flex">
            {/* 左側：時刻表示 */}
            <div className="w-16 text-xs text-gray-400 font-mono py-2 pr-4 text-right">
              {String(hour).padStart(2, '0')}:00
            </div>

            {/* 右側：記録一覧 */}
            <div className="flex-1 relative border-l border-gray-50 hover:bg-gray-50 transition-colors">

              {hour === 9 && (
                <div className="time-logs bg-rose-100 border-rose-400 text-rose-800">
                  朝会 (9:00 - 10:00)
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>

  )
}