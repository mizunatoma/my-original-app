'use client'
import { useState, useEffect } from 'react';
import { TodoListsAPI } from '@/types/api';
import useSWR from "swr";

interface TodoPanelProps {
  isCollapsed: boolean
  isTodoPanelOpen: boolean
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function TodoPanel({ isCollapsed, isTodoPanelOpen }: TodoPanelProps) {
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [todo, setTodo] = useState("")
  const { data, isLoading, mutate } = useSWR<TodoListsAPI.Get.Response>('/api/todo-lists', fetcher)

  const handleAddSave = async (title: string) => {
    console.log(selectedListId)
    await fetch(`/api/todo-lists/${selectedListId}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    mutate()
    setTodo("")
  }

  useEffect(() => {
    if (data) setSelectedListId(data.todoLists[0].id)
  }, [data])

  return (
    <aside
      className={`fixed  top-0 bottom-0 z-20 overflow-auto bg-[#FCFAF7] transition-all duration-300
      ${isCollapsed ? 'left-[80px]' : 'left-[160px]'}
      ${isTodoPanelOpen ? 'w-[300px] border border-[#EFEDE6]' : 'w-[0px]'}`}
    >

      {data?.todoLists.map((list) => (
        <button
          key={list.id}
          className={`inline-flex items-center px-3 py-1 rounded-t-lg text-sm font-medium bg-orange-100 text-orange-800 
            ${list.id === selectedListId && 'border-orange-200 border-2'}`}
          onClick={() => setSelectedListId(list.id)}
        >
          {list.name}
        </button>
      ))}

      <div className='flex'>
        <input
          className='boder border-gray-100 rounded '
          placeholder='新しいTodo'
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button
          className='rounded-lg p-1 text-center text-sm text-[#5A8B7D] border border-[#5A8B7D] hover:bg-[#F2F0E9]'
          onClick={() => handleAddSave(todo)}
        >
          追加
        </button>
      </div>

      <div>selectedList's todos</div>
    </aside >
  )
}
