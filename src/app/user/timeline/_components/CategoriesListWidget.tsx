'use client'
import React, { useState, useEffect } from "react";
import { Trash2, SquarePen } from 'lucide-react';
import { CategoryAPI } from '@/types/api';

type Props = {
  onSelectCategory: (id: string) => void
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

export default function ActivitiseListWidget({ onSelectCategory }: Props) {
  const [categories, setCategories] = useState<CategoryAPI.Get.Response['category'][]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  // category編集用useState ↓
  const [editedName, setEditedName] = useState("")  // 編集後の名前(編集ボタンクリック時の初期値)
  const [editingCategory, setEditingCategory] = useState(null) // 編集中の内容

  // categoryリストの取得
  const fetchCategories = async () => {
    const res = await fetch('/api/timeline/activities')
    const json = await res.json()
    setCategories(json.activities)
  }

  // categoryの削除
  const handleDelete = async (id) => {
    await fetch(`/api/timeline/activities/${id}`, {
      method: 'DELETE',
    })
    fetchCategories()
  }

  // categoryの編集
  const handleCategoryName = async (category) => {
    setIsEditingOpen(true)
    setEditingCategory(category) // 初期値 (設定済みの内容)
    setEditedName(category.name) // 編集中の状態を描画
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="widget-card">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Categories</h2>
        <div className="felx gap-2">
          <button
            className="button bg-red-100 hover:bg-red-200 text-red-800"
            onClick={() => setIsOpen(true)}
          >追加</button>
        </div>
      </div>

      {/* Categoryリスト */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            className="category-button"
            key={category.name}
            onClick={() => onSelectCategory(category.id)}> {/* 兄弟のCurrentCategoryWidgetへ渡す */}
            <div className={`category-name ${category.colorToken}`}></div>
            <span className="text">{category.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()  // 親のonClickを止める
                handleCategoryName(category)
              }}><SquarePen size={16} /></button>
            <button
              onClick={(e) => {
                e.stopPropagation()  // 親のonClickを止める
                handleDelete(category.id)
              }}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>

      {/* category追加のモーダル*/}
      {
        isOpen &&
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          {/*category名の入力*/}
          <div className="bg-white rounded-lg flex flex-col gap-4 p-6">
            <h2 className="text-lg font-bold text-gray-600">New Category</h2>
            <input
              className="border border-gray-400 rounded w-full p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category's name"
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
                  fetchCategories()
                  setIsOpen(false)
                  setName("")
                }}
              >保存</button>
            </div>
          </div>
        </div>
      }

      {/* category編集のモーダル*/}
      {
        isEditingOpen &&
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          {/*category名の入力*/}
          <div className="bg-white rounded-lg flex flex-col gap-4 p-6">
            <h2 className="text-lg font-bold text-gray-600">Category</h2>
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
                  setEditingCategory(null) // 編集中のstateをクリアしてキャンセル
                }}
              >キャンセル</button>

              <button
                className="rounded  border bg-red-400 text-white px-3"
                onClick={async () => {
                  await fetch(`/api/timeline/activities/${editingCategory.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: editedName })
                  })
                  fetchCategories()
                  setIsEditingOpen(false)
                  setEditingCategory(null)
                }}
              >保存</button>
            </div>
          </div>
        </div>
      }
    </div >
  )
}