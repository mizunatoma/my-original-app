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

  const [selectedListId, setSelectedListId] = useState("");
  const { data, isLoading, mutate } = useSWR<TodoListsAPI.Get.Response>('/api/todo-lists', fetcher)

  useEffect(() => {

  }, [])


  return (
    <aside
      className={`fixed  top-0 bottom-0 z-20 overflow-auto bg-[#FCFAF7] transition-all duration-300
      ${isCollapsed ? 'left-[80px]' : 'left-[160px]'}
      ${isTodoPanelOpen ? 'w-[300px] border border-[#EFEDE6]' : 'w-[0px]'}`}
    >


    </aside >
  )
}
