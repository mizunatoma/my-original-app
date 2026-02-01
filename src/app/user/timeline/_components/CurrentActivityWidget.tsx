'use client'

import React from "react"

export default function CurrentActivityWidget() {
  return (
    <div>
      <div className="widget-card">
        <h2 className="section-tilte">現在のActivity</h2>

        {/*実行中Activity*/}
        <div className="flex items-center justify-between bg-rose-50 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-700 text-sm">本業</span>
            <span className="text-xs text-gray-500 mt-0.5">開始: 17:05</span>
            <span className="text-xs text-gray-500 mt-0.5">経過 / 10分</span>
          </div>
          <button className="button bg-rose-200 hover:bg-rose-300 text-rose-800">停止</button>
        </div>

        {/*任意メモ*/}
        <div className="relative">
          <textarea
            className="w-full h-24 bg-gray-50 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus-ring-rose-100 transition-all resize-none placeholder-gray-400"
            placeholder="(任意)終了時にメモを残します"
          />
        </div>
      </div>
    </div>
  )
}