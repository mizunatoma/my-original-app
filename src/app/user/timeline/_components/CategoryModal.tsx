'use client'
import React, { useState } from "react";

type Props = {
  title: string,
  placeholder?: string,
  initialName?: string,
  onSave: (name: string, color: string) => void,
  onCancel: () => void
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

export default function CategoryModal({ title, placeholder, initialName, onSave, onCancel }: Props) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg flex flex-col gap-4 p-6">
        <h2 className="text-lg font-bold text-gray-600">{title}</h2>

        <input
          className="border border-gray-400 rounded w-full p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
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
            onClick={() => onCancel()}
          >キャンセル</button>
          <button
            className="rounded  border bg-red-400 text-white px-3"
            onClick={() => onSave(name, color)}
          >保存</button>
        </div>
      </div>
    </div>
  )
}