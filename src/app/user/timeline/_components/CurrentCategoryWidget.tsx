'use client'
import React, { useState, useEffect } from "react"

type RunnningApiResponse =
  | { running: false }
  | {
    running: true
    log: {
      id: string
      categoryId: string
      activityName: string
      colorToken: string
      startAt: string
    }
  }

type Props = {
  currentCategoryID: string
}

export default function CurrentCategoryWidget({ currentCategoryID }: Props) {
  const [data, setData] = useState<RunnningApiResponse | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isLoading, setIsloading] = useState(true);

  const fetchRunning = async () => {
    setIsloading(true)
    const res = await fetch('/api/timeline/running')
    const json = await res.json()
    setData(json)
    setIsloading(false)
  }

  useEffect(() => {
    fetchRunning()
  }, [])

  // 選択されたcategoryの計測を開始する
  useEffect(() => {
    if (!currentCategoryID) return // 選択されていなければなにもしない

    const start = async () => {
      await fetch('/api/timeline/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId: currentCategoryID })
      })
      fetchRunning()
    }
    start()
  }, [currentCategoryID])


  // 経過時間の表示
  useEffect(() => {
    if (!data?.running) return // running中でなければなにもしない

    const timer = setInterval(() => {
      const now = new Date()
      const start = new Date(data.log.startAt)
      const minutes = Math.floor((now - start) / 60000)
      setElapsed(minutes);
    }, 60000) // 1分ごと

    return () => clearInterval(timer)
  }, [data])

  return (
    <div>
      <div className="widget-card">
        <h2 className="section-title">現在のCategory</h2>
        {!isLoading
          ? (
            <div>
              < div className="flex flex-col gap-3 bg-rose-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 rounded-full shadow-sm flex-shrink-0 ${log-colorToken}" />
                  <div className="flex flex-col">
                    {data?.running
                      ? (
                        <div className="flex flex-col">
                          <span>{data.log.activityName}</span>
                          <span className="text-xs text-gray-500">開始: {new Date(data.log.startAt).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} </span>
                          <span className="text-xs text-gray-500">経過: {elapsed}分</span>
                        </div>
                      )
                      : (<span>実行中なし</span>)
                    }
                  </div>
                </div>

                {data?.running &&
                  <div className="">
                    <button
                      className="button bg-rose-200 hover:bg-rose-300 text-rose-800 w-full mt-1"
                      disabled={!data?.running}
                      onClick={async () => {
                        await fetch('/api/timeline/end', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ categoryId: data?.running && data.log.categoryId }),
                        })
                        setData({ running: false })
                      }}
                    >停止</button>
                    < div className="relative mt-4 ">
                      <textarea
                        className="w-full h-24 bg-gray-50 rounded-xl p-4 text-gray-700 border-rose-100 border-2 focus:outline-none focus:ring-2 focus:ring-rose-100 placeholder-gray-400"
                        placeholder="(任意)終了時にメモを残します"
                      />
                    </div>
                  </div>
                }
              </div>
            </div >
          )
          : (<p>読み込み中…</p>)
        }
      </div>
    </div>
  )
}