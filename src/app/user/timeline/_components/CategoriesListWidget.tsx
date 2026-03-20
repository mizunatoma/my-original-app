'use client'
import React, { useState, Dispatch, SetStateAction } from "react";
import { Trash2, SquarePen } from 'lucide-react';
import { CategoryAPI, CategoryDTO } from '@/types/api';
import CategoryModal from './CategoryModal';
import useSWR from "swr";


type Props = {
  onSelectCategory: Dispatch<SetStateAction<{ id: string, count: number }>>
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function CategoriesListWidget({ onSelectCategory }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryAPI.Get.Response['category'] | null>(null)
  const { data, isLoading, mutate } = useSWR<{ activities: CategoryDTO[] }>('/api/timeline/activities', fetcher)

  // categoryの削除
  const handleDelete = async (id: string) => {
    await fetch(`/api/timeline/activities/${id}`, {
      method: 'DELETE',
    })
    mutate()
  }

  // categoryの追加
  const handleAddSave = async (name: string, color: string) => {
    await fetch('/api/timeline/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'applications/json' },
      body: JSON.stringify({ name, colorToken: color })
    })
    mutate()
    setIsOpen(false)
  }

  // categoryの編集
  const handleEditSave = async (name: string, color: string) => {
    await fetch(`/api/timeline/activities/${editingCategory!.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'applications/json' },
      body: JSON.stringify({ name, colorToken: color })
    })
    mutate()
    setEditingCategory(null)
  }


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
            {data?.activities?.map((category) => (
              <div
                className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer h-16"
                key={category.id}
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
          onSave={handleAddSave}
          onCancel={() => { setIsOpen(false) }}
        />
      }

      {/* category編集モーダル*/}
      {editingCategory &&
        <CategoryModal
          title="Category"
          initialName={editingCategory.name}
          onSave={handleEditSave}
          onCancel={() => { setEditingCategory(null) }}
        />
      }
    </div >
  )
}