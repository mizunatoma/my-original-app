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
                ? (<span>{data.log.activityName}</span>)
                : (<span>実行中なし</span>)
              }
            </div>
          </div>
          <button className="button bg-rose-200 hover:bg-rose-300 text-rose-800 w-full mt-1">停止</button>
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