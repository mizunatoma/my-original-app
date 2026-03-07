'use client'
import React, { useState, useEffect } from "react";
import { Trash2, SquarePen } from 'lucide-react';


type ActivitiesResponse = {
  activities: {
    id: string
    name: string
    colorToken?: string
  }[]
};

type Props = {
  onSelectActivity: (id: string) => void
}

const COLOR_OPTIONS = [
  "bg-rose-400",
  "bg-teal-400",
  "bg-indigo-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-pink-400",
]

export default function ActivitiseListWidget({ onSelectActivity }: Props) {
  const [activities, setActivities] = useState<ActivitiesResponse['activities']>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  // activity編集用useState ↓
  const [editedName, setEditedName] = useState("")  // 編集後の名前(編集ボタンクリック時の初期値)
  const [editingActivity, setEditingActivity] = useState(null) // 編集中の内容

  // Activityリストの取得
  const fetchActivities = async () => {
    const res = await fetch('/api/timeline/activities')
    const json = await res.json()
    setActivities(json.activities)
  }

  // Activityの削除
  const handleDelete = async (id) => {
    await fetch(`/api/timeline/activities/${id}`, {
      method: 'DELETE',
    })
    fetchActivities()
  }

  // Activityの編集
  const handleActivityName = async (activity) => {
    setIsEditingOpen(true)
    setEditingActivity(activity) // 初期値 (設定済みの内容)
    setEditedName(activity.name) // 編集中の状態を描画
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <div className="widget-card">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Activities</h2>
        <div className="felx gap-2">
          <button
            className="button bg-red-100 hover:bg-red-200 text-red-800"
            onClick={() => setIsOpen(true)}
          >追加</button>
        </div>
      </div>

      {/* Activityリスト */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <div
            className="activity-button"
            key={activity.name}
            onClick={() => onSelectActivity(activity.id)}> {/* 兄弟のCurrentActivityWidgetへ渡す */}
            <div className={`activity-name ${activity.colorToken}`}></div>
            <span className="text">{activity.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()  // 親のonClickを止める
                handleActivityName(activity)
              }}><SquarePen size={16} /></button>
            <button
              onClick={(e) => {
                e.stopPropagation()  // 親のonClickを止める
                handleDelete(activity.id)
              }}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>

      {/* activity追加のモーダル*/}
      {
        isOpen &&
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          {/*activity名の入力*/}
          <div className="bg-white rounded-lg flex flex-col gap-4 p-6">
            <h2 className="text-lg font-bold text-gray-600">New Activity</h2>
            <input
              className="border border-gray-400 rounded w-full p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Activity's name"
            />

            {/*色選択*/}
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((c) => {
                return (
                  <div
                    key={c}
                    className={`${c} w-6 h-6 rounded-full ${c === color ? "border-2 border-gray-500" : ""}`}
                    onClick={() => { setColor(c) }}
                  />)
              })}
            </div>

            {/*キャンセル・保存ボタン*/}
            <div className="justify-between flex w-full">
              <button
                className="rounded  border border-gray-400 px-3"
                onClick={() => {
                  setIsOpen(false)
                  setName("")
                }}
              >キャンセル</button>

              <button
                className="rounded  border bg-red-400 text-white px-3"
                onClick={async () => {
                  await fetch('/api/timeline/activities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, colorToken: color })
                  })
                  fetchActivities()
                  setIsOpen(false)
                  setName("")
                }}
              >保存</button>
            </div>
          </div>
        </div>
      }

      {/* activity編集のモーダル*/}
      {
        isEditingOpen &&
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          {/*activity名の入力*/}
          <div className="bg-white rounded-lg flex flex-col gap-4 p-6">
            <h2 className="text-lg font-bold text-gray-600">Activity</h2>
            <input
              className="border border-gray-400 rounded w-full p-2"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder={editedName}
            />

            {/*色選択*/}
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((c) => {
                return (
                  <div
                    key={c}
                    className={`${c} w-6 h-6 rounded-full ${c === color ? "border-2 border-gray-500" : ""}`}
                    onClick={() => { setColor(c) }}
                  />)
              })}
            </div>

            {/*キャンセル・保存ボタン*/}
            <div className="justify-between flex w-full">
              <button
                className="rounded  border border-gray-400 px-3"
                onClick={() => {
                  setIsEditingOpen(false)
                  setEditingActivity(null) // 編集中のstateをクリアしてキャンセル
                }}
              >キャンセル</button>

              <button
                className="rounded  border bg-red-400 text-white px-3"
                onClick={async () => {
                  await fetch(`/api/timeline/activities/${editingActivity.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: editedName })
                  })
                  fetchActivities()
                  setIsEditingOpen(false)
                  setEditingActivity(null)
                }}
              >保存</button>
            </div>
          </div>
        </div>
      }
    </div >
  )
}