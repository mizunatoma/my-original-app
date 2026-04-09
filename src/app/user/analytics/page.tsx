'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFetch } from '@/app/user/_hooks/useFetch'
import {
  BarChart,
  Bar,
  ResponsiveContainer, // 親要素に合わせて自動リサイズするラッパー
  XAxis,
  YAxis,
  Tooltip, // ホバー時に詳細を表示
  CartesianGrid, // 方眼紙のような目盛を表示
} from 'recharts'

const toJstParts = (date: Date) => {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  return jst.toISOString().split('T')[0]
}

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const dateFrom = toJstParts(currentDate).slice(0, 7) + '-01'
  const dateTo = toJstParts(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
  ) //dateToの末尾「,0」 => 次の月の0日目 => 今月の最終日
  const { data, error, isLoading, mutate, isValidating } = useFetch<{
    byCategory: {
      id: string
      name: string
      colorToken: string | null
      totalMinutes: number
    }[]
  }>(`/api/analytics?from=${dateFrom}&to=${dateTo}`)

  return (
    <div className="flex justify-center pt-[240px]">
      <div className="flex gap-2">
        <button
          onClick={() => {
            const prev = new Date(currentDate)
            prev.setMonth(prev.getMonth() - 1)
            setCurrentDate(prev)
          }}
        >
          <ChevronLeft />
        </button>

        <p>集計期間</p>
        <p>{`/api/analytics?from=${dateFrom}&to=${dateTo}`}</p>

        <button
          onClick={() => {
            const prev = new Date(currentDate)
            prev.setMonth(prev.getMonth() + 1)
            setCurrentDate(prev)
          }}
        >
          <ChevronRight />
        </button>
      </div>

      {/*rechartsの集計棒グラフ*/}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data?.byCategory}>
          <Bar dataKey="totalMinutes" fill="#5D866C99" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
