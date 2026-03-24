'use client'
import React, { useState, useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { TimelineAPI } from '@/types/api'

type Props = {
  currentCategoryID: { id: string; count: number }
  onPressStopButton: Dispatch<SetStateAction<{ count: number }>>
}

export default function CurrentCategoryWidget({
  currentCategoryID,
  onPressStopButton,
}: Props) {
  const [data, setData] = useState<TimelineAPI.Running.Response | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [isLoading, setIsloading] = useState(true)

  // タイムトラック中のカテゴリを取得
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

  // タイムトラックの開始
  useEffect(() => {
    if (!currentCategoryID.id) return // 選択されていなければなにもしない

    const start = async () => {
      await fetch('/api/timeline/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId: currentCategoryID.id }),
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
      setElapsed(minutes)
    }, 60000) // 1分ごと

    return () => clearInterval(timer)
  }, [data])

  // タイムトラックの停止
  const handleStop = async () => {
    onPressStopButton((s) => ({ count: s.count + 1 }))
    await fetch('/api/timeline/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        activityId: data?.running && data.log.activityId,
      }),
    })
    setData({ running: false })
  }

  return (
    <div>
      <div className="widget-card">
        <h2 className="section-title">現在のCategory</h2>
        {!isLoading ? (
          <div>
            <div className="mb-4 flex flex-col gap-3 rounded-xl bg-[#5D866C]/10 p-4">
              <div className="flex w-full items-center gap-3">
                {data?.running ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 flex-shrink-0 rounded-full shadow-sm ${data.log.colorToken}`}
                      />
                      <span>{data.log.activityName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        開始:{' '}
                        {new Date(data.log.startAt).toLocaleTimeString(
                          'ja-JP',
                          { hour: '2-digit', minute: '2-digit' },
                        )}{' '}
                      </span>
                      <span className="text-xs text-gray-500">
                        経過: {elapsed}分
                      </span>
                    </div>
                  </div>
                ) : (
                  <span>実行中なし</span>
                )}
              </div>

              {data?.running && (
                <div className="">
                  <button
                    className="button mt-1 w-full bg-rose-200 text-rose-800 hover:bg-rose-300"
                    disabled={!data?.running}
                    onClick={handleStop}
                  >
                    停止
                  </button>

                  {/* 今後実装予定
                    < div className="relative mt-4 ">
                      <textarea
                        className="w-full h-24 bg-gray-50 rounded-xl p-4 text-gray-700 border-rose-100 border-2 focus:outline-none focus:ring-2 focus:ring-rose-100 placeholder-gray-400"
                        placeholder="(任意)終了時にメモを残します"
                      />
                    </div>
                    */}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>読み込み中…</p>
        )}
      </div>
    </div>
  )
}
