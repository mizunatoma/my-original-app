'use client'
import React, { useState, useEffect } from "react";
import { Trash2, SquarePen } from 'lucide-react';
import { CategoryAPI } from '@/types/api';
import CategoryModal from './CategoryModal';
import PreviousMap_ from "postcss/lib/previous-map";
import { Dispatch, SetStateAction } from "react"

type Props = {
  onSelectCategory: Dispatch<SetStateAction<{ id: string, count: number }>>
}

export default function CategoriesListWidget({ onSelectCategory }: Props) {
  const [categories, setCategories] = useState<CategoryAPI.Get.Response['category'][]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null)
  const [isLoading, setIsloading] = useState(true);

  // categoryリストの取得
  const fetchCategories = async () => {
    setIsloading(true)
    const res = await fetch('/api/timeline/activities')
    const json = await res.json()
    setIsloading(false)
    setCategories(json.activities)
  }

  // categoryの削除
  const handleDelete = async (id) => {
    await fetch(`/api/timeline/activities/${id}`, {
      method: 'DELETE',
    })
    fetchCategories()
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="widget-card">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Categories</h2>
        <div className="flex gap-2">
          <button
            className="button bg-red-100 hover:bg-red-200 text-red-800"
            onClick={() => setIsOpen(true)}
          >追加</button>
        </div>
      </div>

      {!isLoading
        ? (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            {categories.map((category) => (
              <div
                className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer h-16"
                key={category.name}
                onClick={() => onSelectCategory(s => ({ id: category.id, count: s.count + 1 }))}> {/* 兄弟のCurrentCategoryWidgetへ渡す */}

                <div className="flex justify-between w-full p-4">
                  <div className="flex gap-2 items-center">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${category.colorToken}`}></div>
                    <span className="text">{category.name}</span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()  // 親のonClickを止める
                        setEditingCategory(category)
                      }}><SquarePen size={16} /></button>
                    <button
                      className="text-red-400"
                      onClick={(e) => {
                        e.stopPropagation()  // 親のonClickを止める
                        handleDelete(category.id)
                      }}><Trash2 size={16} /></button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )
        : (<p>読み込み中...</p>)
      }


      {/* category追加モーダル*/}
      {isOpen &&
        <CategoryModal
          title="New Category"
          placeholder="Category's name"
          onSave={async (name, color) => {
            await fetch('/api/timeline/activities', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, colorToken: color })
            })
            fetchCategories()
            setIsOpen(false)
          }}
          onCancel={() => {
            setIsOpen(false)
          }}
        />
      }

      {/* category編集モーダル*/}
      {editingCategory &&
        <CategoryModal
          title="Category"
          initialName={editingCategory.name}
          onSave={async (name, color) => {
            await fetch(`/api/timeline/activities/${editingCategory.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name })
            })
            fetchCategories()
            setEditingCategory(null)
          }}
          onCancel={() => {
            setEditingCategory(null)
          }}
        />
      }
    </div >
  )
}