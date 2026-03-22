'use client'
import { useState, useEffect } from 'react';
import { TodoListsAPI, TodoItemsAPI } from '@/types/api';
import useSWR from "swr";

interface TodoPanelProps {
  isCollapsed: boolean
  isTodoPanelOpen: boolean
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function TodoPanel({ isCollapsed, isTodoPanelOpen }: TodoPanelProps) {
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState("")
  const [editingList, setEditingList] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const { data: list, mutate: mutateList } = useSWR<TodoListsAPI.Get.Response>('/api/todo-lists', fetcher)
  const { data: todos, mutate: mutateTodo } = useSWR<TodoItemsAPI.Get.Response>(`/api/todo-lists/${selectedListId}/todos`, fetcher)

  // todoの追加
  const handleAddTodo = async (title: string) => {
    await fetch(`/api/todo-lists/${selectedListId}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    mutateTodo()
    setEditingTodo("")
  }

  // listの追加
  const handleAddList = async (name: string) => {
    await fetch(`/api/todo-lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    mutateList()
    mutateTodo()
    setEditingList("")
  }

  useEffect(() => {
    if (list) setSelectedListId(list.todoLists[0].id)
  }, [list])

  return (
    <aside
      className={`fixed  top-0 bottom-0 z-20 overflow-auto bg-[#FCFAF7] transition-all duration-300
      ${isCollapsed ? 'left-[80px]' : 'left-[160px]'}
      ${isTodoPanelOpen ? 'w-[300px] border border-[#EFEDE6]' : 'w-[0px]'}`}
    >

      {list?.todoLists.map((list) => (
        <button
          key={list.id}
          className={`inline-flex items-center px-3 py-1 rounded-t-lg text-sm font-medium bg-orange-100 text-orange-800 
            ${list.id === selectedListId && 'border-orange-200 border-2'}`}
          onClick={() => setSelectedListId(list.id)}
        >
          {list.name}
        </button>
      ))}

      <button
        className='inline-flex items-center px-3 py-1 rounded-t-lg text-sm font-medium bg-orange-200 text-orange-800'
        onClick={() => setIsOpen(true)}
      >
        +
      </button>

      {isOpen &&
        <div>
          <input
            className='border border-gray-400 rounded p-2'
            placeholder='新しいTodoList'
            onChange={(e) => setEditingList(e.target.value)}
            value={editingList}
          />
          <button
            className='rounded-lg p-1 text-center text-sm text-[#5A8B7D] border border-[#5A8B7D] hover:bg-[#F2F0E9]'
            disabled={!editingList.trim()}
            onClick={() => {
              handleAddList(editingList)
              setIsOpen(false)
            }}

          >
            追加
          </button>
        </div>}

      <div className='flex'>
        <input
          className='boder border-gray-100 rounded'
          placeholder='新しいTodo'
          onChange={(e) => setEditingTodo(e.target.value)}
          value={editingTodo}
        />
        <button
          className='rounded-lg p-1 text-center text-sm text-[#5A8B7D] border border-[#5A8B7D] hover:bg-[#F2F0E9]'
          onClick={() => handleAddTodo(editingTodo)}
        >
          追加
        </button>
      </div>

      {(todos?.todos || []).map((todo) => (
        <ul>
          <li>{todo.title}</li>
        </ul>
      ))}
    </aside >
  )
}
