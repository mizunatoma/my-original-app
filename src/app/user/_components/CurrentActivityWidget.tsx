'use client'

import React from "react"

export default function CurrentActivityWidget() {
  return (
    <div>

      <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-orange-50/50">
        <h2 className="text-gray-600 font-bold mb-4 text-sm">現在のActivity</h2>

        {/*実行中Activity*/}
        <div className="flex items-center justify-between bg-rose-50 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-700 text-sm">本業</span>
            <span className="text-xs text-gray-500 mt-0.5">開始: 17:05経過 /0分</span>
          </div>
          <button
            className="bg-rose-200 hover:bg-rose-300 text-rose-800 px-6 py-1.5 rounded-full text-xs font-bold transition-colors"
          >停止</button>
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