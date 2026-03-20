'use client'
import { useEffect, useState } from "react";
import useSWR from "swr";
import { TodoListDTO } from "@/types/api";

export default function Page() {
  const { data } = useSWR<{ todoList: TodoListDTO[] }>('/api/todo-lists', fetcher)
  const [selectedListId, setSelectedListId] = useState("")

  useEffect(() => {
    if (data?.list?.[0]) {
      selectedListId(data.lists[0].id)
    }
  }, [data])


  return (
    <div className="flex justify-center pt-[240px]">
      <p>ここはTodoの仮ページです</p>
    </div>
  )
}