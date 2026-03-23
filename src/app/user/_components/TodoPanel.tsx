'use client'
import { useState, useEffect } from 'react'
import { TodoListsAPI, TodoItemsAPI } from '@/types/api'
import useSWR from 'swr'
import { Trash2, SquarePen, Check, X } from 'lucide-react'

interface TodoPanelProps {
  isCollapsed: boolean
  isTodoPanelOpen: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function TodoPanel({
  isCollapsed,
  isTodoPanelOpen,
}: TodoPanelProps) {
  const [selectedListId, setSelectedListId] = useState<string | null>(null) // 開いているlist
  const [isOpen, setIsOpen] = useState(false) // List追加ブロックの開閉
  const [newList, setNewList] = useState('') // 新規追加のList

  const [editingId, setEditingId] = useState<string | null>(null) // 編集中のtodo id
  const [editingTitle, setEditingTitle] = useState('') // 編集中のtodo title
  const [newTodo, setNewTodo] = useState('') // 新規追加のtodo

  const { data: list, mutate: mutateList } = useSWR<TodoListsAPI.Get.Response>(
    '/api/todo-lists',
    fetcher,
  )
  const { data: todos, mutate: mutateTodo } = useSWR<TodoItemsAPI.Get.Response>(
    `/api/todo-lists/${selectedListId}/todos`,
    fetcher,
  )

  // listの追加
  const handleAddList = async (name: string) => {
    await fetch(`/api/todo-lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    mutateList()
    mutateTodo()
    setNewList('')
  }

  // listの削除
  const handleDeleteList = async () => {
    await fetch(`/api/todo-lists/${selectedListId}`, {
      method: 'DELETE',
    })
    mutateList()
  }

  // todoの追加
  const handleAddTodo = async (title: string) => {
    await fetch(`/api/todo-lists/${selectedListId}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    mutateTodo()
    setNewTodo('')
  }

  // todoの編集
  const toggleTodoStatus = async (
    id: string,
    title: string,
    isDone: boolean,
  ) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, isDone }),
    })
    mutateTodo()
  }

  // todoの削除
  const handleDeleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    mutateTodo()
  }

  useEffect(() => {
    if (list && list.todoLists[0]) setSelectedListId(list.todoLists[0].id)
    else setSelectedListId(null)
  }, [list])

  return (
    <aside
      className={`fixed bottom-0 top-0 z-20 space-y-2 overflow-auto bg-[#FCFAF7] transition-all duration-300 ${isCollapsed ? 'left-[80px]' : 'left-[160px]'} ${isTodoPanelOpen ? 'w-[300px] border border-[#e9e3cc] p-4' : 'w-[0px]'}`}
    >
      {/*listチップ一覧*/}
      <div className="flex flex-wrap gap-1">
        {list?.todoLists?.map((list) => (
          <button
            key={list.id}
            className={`inline-flex items-center rounded-xl border px-2 text-sm font-medium ${list.id === selectedListId ? 'bg-[#5A8B7D]/70 text-white' : 'border border-[#5A8B7D]/70 text-[#5A8B7D]/70 hover:bg-[#5A8B7D]/70 hover:text-white'}`}
            onClick={() => setSelectedListId(list.id)}
          >
            {list.name}
          </button>
        ))}

        {/*list追加*/}
        <button
          className="items-center rounded-xl border-[#5A8B7D]/70 px-2 text-[#5A8B7D] hover:bg-[#5A8B7D]/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          +
        </button>
      </div>

      {isOpen && (
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border-2 border-[#5A8B7D] p-1 focus:outline-none focus:ring-1 focus:ring-[#5A8B7D]"
            placeholder="新しいリスト"
            onChange={(e) => setNewList(e.target.value)}
            value={newList}
          />
          <button
            className="rounded-lg border-2 border-[#5A8B7D] p-2 text-center text-xs text-[#5A8B7D] hover:bg-[#5A8B7D]/70 hover:text-white"
            disabled={!newList.trim()}
            onClick={() => {
              handleAddList(newList)
              setIsOpen(false)
            }}
          >
            作成
          </button>
        </div>
      )}

      {/*todo追加*/}
      {selectedListId !== null && (
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border border-[#5A8B7D] p-1 focus:outline-none focus:ring-1 focus:ring-[#5A8B7D]"
            placeholder="新しいTodo"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button
            className="rounded-lg border border-[#5A8B7D] p-2 text-center text-sm text-[#5A8B7D] hover:bg-[#5A8B7D]/70 hover:text-white"
            onClick={() => handleAddTodo(newTodo)}
            disabled={!newTodo.trim()}
          >
            +
          </button>
        </div>
      )}

      {/*todo一覧*/}
      <ul className="space-y-2">
        {(todos?.todos || []).map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"
          >
            {editingId !== todo.id ? (
              /* 通常モードの表示 */
              <>
                <label className="flex flex-1 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() =>
                      toggleTodoStatus(todo.id, todo.title, !todo.isDone)
                    }
                  />
                  <span
                    className={`${todo.isDone ? 'text-gray-400 line-through' : ''}`}
                  >
                    {todo.title}
                  </span>
                </label>

                <div className="flex justify-end gap-3 p-2 text-right">
                  <button
                    onClick={() => {
                      setEditingId(todo.id) // 編集モードにセット
                      setEditingTitle(todo.title) // 今のタイトル初期値をセット
                    }}
                  >
                    <SquarePen
                      size={16}
                      className="text-gray-500 hover:text-[#5A8B7D]/70"
                    />
                  </button>
                  <button
                    className="text-red-400"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <Trash2
                      size={16}
                      className="text-gray-500 hover:text-red-400"
                    />
                  </button>
                </div>
              </>
            ) : (
              /* 編集モードの表示 */
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 rounded border px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#5A8B7D]"
                  autoFocus
                />
                <button
                  onClick={async () => {
                    await toggleTodoStatus(todo.id, editingTitle, todo.isDone)
                    setEditingId(null) // 編集モード終了
                  }}
                >
                  <Check size={16} className="text-[#5A8B7D]/70" />
                </button>
                <button onClick={() => setEditingId(null)}>
                  <X size={16} className="text-red-400" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/*list削除*/}
      {selectedListId !== null && (
        <button
          className="mt-auto flex w-full justify-end gap-1 p-2 text-right"
          onClick={handleDeleteList}
        >
          <div className="flex items-center text-gray-500 hover:text-red-400">
            <Trash2 size={16} />
            <span>リストを削除</span>
          </div>
        </button>
      )}
    </aside>
  )
}
