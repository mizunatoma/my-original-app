'use client'

import React, { useState, useEffect } from "react"

type RunnningApiResponse =
  | { running: false }
  | {
    running: true
    log: {
      id: string
      activityId: string
      activityName: string
      colorToken: string
      startAt: string
    }
  }

export default function CurrentActivityWidget() {

  const [data, setData] = useState<RunnningApiResponse | null>(null)

  useEffect(() => {
    fetch('/api/timeline/running')
      .then(res => res.json())
      .then((json: RunnningApiResponse) => {
        setData(json);
      })
  }, [])

  return (
    <div>
      <div className="widget-card">
        <h2 className="section-title">現在のActivity</h2>

        {/*実行中Activity*/}
        <div className="flex flex-col gap-3 bg-rose-50 rounded-xl p-4 mb-4">

          <div className="flex items-center gap-3 w-full">
            <div className="w-3 h-3 bg-rose-400 rounded-full shadow-sm flex-shrink-0" />
            <div className="flex flex-col">
              {data?.running
                ? (
                  <div className="flex flex-col">
                    <span>{data.log.activityName}</span>
                    <span className="text-xs text-gray-500">開始：{new Date(data.log.startAt).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} </span>
                  </div>
                )
                : (<span>実行中なし</span>)
              }
            </div>
          </div>
          <button
            className="button bg-rose-200 hover:bg-rose-300 text-rose-800 w-full mt-1"
            disabled={!data?.running}
            onClick={async () => {
              await fetch('/api/timeline/end', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activityId: data?.running && data.log.activityId }),
              })
              setData({ running: false })
            }}
          >停止</button>
        </div>

        {/*任意メモ*/}
        <div className="relative">
          <textarea
            className="w-full h-24 bg-gray-50 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all resize-none placeholder-gray-400"
            placeholder="(任意)終了時にメモを残します"
          />
        </div>
      </div>
    </div>
  )
}