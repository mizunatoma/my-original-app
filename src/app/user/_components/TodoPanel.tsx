'use client'
import { useState, useEffect } from 'react';
import useSWR from "swr";
import { TodoListsAPI } from '@/types/api';

interface TodoPanelProps {
  isTodoPanelOpen: boolean
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function TodoPanel({ isTodoPanelOpen }: TodoPanelProps) {
  const [selectedListId, setSelectedListId] = useState("");
  const { data, isLoading, mutate } = useSWR<TodoListsAPI.Get.Response>('/api/todo-lists', fetcher)

  useEffect(() => {

  }, [])


  return (
    <>
      {isTodoPanelOpen &&
        <p>TodoPanel</p>
      }
    </>
  )
}
