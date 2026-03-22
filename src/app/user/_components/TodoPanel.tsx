'use client'
import { useState, useEffect } from 'react';
import { TodoListsAPI, TodoItemsAPI } from '@/types/api';
import useSWR from "swr";
import { Trash2, SquarePen } from 'lucide-react';

interface TodoPanelProps {
  isCollapsed: boolean
  isTodoPanelOpen: boolean
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function TodoPanel({ isCollapsed, isTodoPanelOpen }: TodoPanelProps) {
  const [selectedListId, setSelectedListId] = useState<string | null>(null);  // 開いているlist
  const [isOpen, setIsOpen] = useState(false);                                // List追加ブロックの開閉
  const [newList, setNewList] = useState("");                                 // 新規追加のList

  const [editingId, setEditingId] = useState<string | null>(null); // 編集中のtodo id
  const [editingTitle, setEditingTitle] = useState("");            // 編集中のtodo title
  const [newTodo, setNewTodo] = useState("");                      // 新規追加のtodo

  const { data: list, mutate: mutateList } = useSWR<TodoListsAPI.Get.Response>('/api/todo-lists', fetcher)
  const { data: todos, mutate: mutateTodo } = useSWR<TodoItemsAPI.Get.Response>(`/api/todo-lists/${selectedListId}/todos`, fetcher)

  // listの追加
  const handleAddList = async (name: string) => {
    await fetch(`/api/todo-lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    mutateList()
    mutateTodo()
    setNewList("")
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
      body: JSON.stringify({ title })
    })
    mutateTodo()
    setNewTodo("")
  }

  // todoの編集
  const toggleTodoStatus = async (id: string, title: string, isDone: boolean) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, isDone })
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
      className={`fixed  top-0 bottom-0 z-20 overflow-auto bg-[#FCFAF7] transition-all duration-300
      ${isCollapsed ? 'left-[80px]' : 'left-[160px]'}
      ${isTodoPanelOpen ? 'w-[300px] border border-[#EFEDE6]' : 'w-[0px]'}`}
    >

      {/*listチップ一覧*/}
      {list?.todoLists?.map((list) => (
        <button
          key={list.id}
          className={`inline-flex items-center px-3 py-1 rounded-t-lg text-sm font-medium bg-orange-100 text-orange-800 
            ${list.id === selectedListId && 'border-orange-200 border-2'}`}
          onClick={() => setSelectedListId(list.id)}
        >{list.name}</button>
      ))}

      {/*list追加*/}
      <button
        className='inline-flex items-center px-3 py-1 rounded-t-lg text-sm font-medium bg-orange-200 text-orange-800'
        onClick={() => setIsOpen(true)}
      >+</button>

      {isOpen &&
        <div>
          <input
            className='border border-gray-400 rounded p-2'
            placeholder='新しいTodoList'
            onChange={(e) => setNewList(e.target.value)}
            value={newList}
          />
          <button
            className='rounded-lg p-1 text-center text-sm text-[#5A8B7D] border border-[#5A8B7D] hover:bg-[#F2F0E9]'
            disabled={!newList.trim()}
            onClick={() => {
              handleAddList(newList)
              setIsOpen(false)
            }}>追加</button>
        </div>}

      {/*todo追加*/}
      {selectedListId !== null &&
        <div className='flex'>
          <input
            className='boder border-gray-100 rounded'
            placeholder='新しいTodo'
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button
            className='rounded-lg p-1 text-center text-sm text-[#5A8B7D] border border-[#5A8B7D] hover:bg-[#F2F0E9]'
            onClick={() => handleAddTodo(newTodo)}
            disabled={!newTodo.trim()}
          >追加</button>
        </div>
      }

      {/*todo一覧*/}
      <ul>
        {(todos?.todos || []).map((todo) => (
          <li key={todo.id} className="flex items-center gap-2 py-1">
            {editingId !== todo.id

              ? (
                /* 通常モードの表示 */
                <>
                  <label>
                    <input
                      type='checkbox'
                      checked={todo.isDone}
                      onChange={() => toggleTodoStatus(todo.id, todo.title, !todo.isDone)}
                    />
                    <span className={`${todo.isDone ? 'line-through text-gray-400' : ''}`}>
                      {todo.title}
                    </span>
                  </label>
                  <button onClick={() => {
                    setEditingId(todo.id);       // 編集モードにセット
                    setEditingTitle(todo.title); // 今のタイトル初期値をセット
                  }}>
                    <SquarePen size={16} className="text-gray-500 hover:text-orange-200" />
                  </button>
                  <button className="text-red-400" onClick={() => handleDeleteTodo(todo.id)}>
                    <Trash2 size={16} />
                  </button>
                </>

              ) : (
                /* 編集モードの表示 */
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="border rounded px-2 py-1 flex-1"
                    autoFocus
                  />
                  <button
                    onClick={async () => {
                      await toggleTodoStatus(todo.id, editingTitle, todo.isDone);
                      setEditingId(null); // 編集モード終了
                    }}
                  >
                    保存
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    キャンセル
                  </button>
                </div>
              )}
          </li>
        ))}
      </ul>

      {/*list削除*/}
      {selectedListId !== null &&
        <button
          className="text-red-400 text-right w-full"
          onClick={(e) => handleDeleteList()}
        >
          このリストを削除する<Trash2 size={16} />
        </button>
      }

    </aside >
  )
}
