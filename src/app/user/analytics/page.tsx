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
  Cell, // 各バーに個別のスタイルを当てるためのコンポーネント
  Pie,
  PieChart,
} from 'recharts'

// 日本時刻のYYYY-MM-DDを返す
const toJstParts = (date: Date) => {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  return jst.toISOString().split('T')[0]
}

// 分数を 〇h 〇m に変換する
const formatMinutes = (totalMinutes: number) => {
  const hour = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60
  return mins !== 0 ? `${hour}h ${mins}m` : `${hour}h`
}

// colorTokenの Tailwind クラス名 → HEX 変換テーブル
const COLOR_MAP: Record<string, string> = {
  'bg-rose-400': '#fb7185',
  'bg-teal-400': '#2dd4bf',
  'bg-indigo-400': '#818cf8',
  'bg-amber-400': '#fbbf24',
  'bg-sky-400': '#38bdf8',
  'bg-green-400': '#4ade80',
  'bg-purple-400': '#c084fc',
  'bg-pink-400': '#f472b6',
}

// 円グラフの各スライス内に、数字を表示させる関数 (props要素から各スライスの中央位置を算出する)
const RADIAN = Math.PI / 180
const customizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'middle'}
      dominantBaseline="central"
      fontSize={16}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const dateFrom = toJstParts(currentDate).slice(0, 7) + '-01' // 当月の１日
  const dateTo = toJstParts(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
  ) //dateToの末尾「,0」 => 次の月の0日目 => 今月の最終日
  const { data, error, isLoading } = useFetch<{
    byCategory: {
      id: string
      name: string
      colorToken: string | null
      totalMinutes: number
    }[]
  }>(`/api/analytics?from=${dateFrom}&to=${dateTo}`)

  // 全カテゴリの合計分数をもとに、棒グラフのY軸(h目盛り)の配列を作成
  const allMinutes = data?.byCategory.map((c) => c.totalMinutes) ?? []
  const maxMinutes = Math.max(0, ...allMinutes)
  const yAxisTicks = Array.from(
    { length: Math.ceil(maxMinutes / 60) + 1 },
    (_, i) => i * 60,
  )

  if (isLoading) return <p>読み込み中...</p>
  if (!data) return <p>...</p> // 型 narrowing のため
  if (error) return <p>エラーが発生しました</p>

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="widget-card flex flex-col gap-4">
        {/* ナビゲーション < YYYY-MM > */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              const prev = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1,
              )
              setCurrentDate(prev)
            }}
          >
            <ChevronLeft />
          </button>
          <h2 className="section-title mb-0">
            {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
          </h2>
          <button
            onClick={() => {
              // 月末日ずれ防止のため、常に月初（1日）で Date を生成する
              const prev = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1,
              )
              setCurrentDate(prev)
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/*rechartsの棒グラフ*/}
      {data.byCategory.length === 0 ? (
        <div className="widget-card flex flex-col gap-4">
          <p className="flex justify-center">この月の記録はありません</p>
        </div>
      ) : (
        <div className="widget-card flex flex-col gap-4">
          <div className="widget-card flex flex-col gap-4 border">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data?.byCategory
                  .filter((c) => c.totalMinutes >= 1) // 0分は非表示
                  .sort((a, b) => b.totalMinutes - a.totalMinutes)} // 降順
              >
                <Bar dataKey="totalMinutes">
                  {data?.byCategory
                    .filter((c) => c.totalMinutes >= 1)
                    .sort((a, b) => b.totalMinutes - a.totalMinutes)
                    .map((item) => (
                      <Cell
                        key={item.id}
                        fill={
                          item.colorToken
                            ? COLOR_MAP[item.colorToken] + '99'
                            : '#5D866C99'
                        }
                      />
                    ))}
                </Bar>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatMinutes} ticks={yAxisTicks} />
                <Tooltip
                  formatter={(value) => [formatMinutes(value), '合計時間']}
                />
                <CartesianGrid />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/*rechartsの円グラフ*/}
          <div className="widget-card flex flex-col gap-4 border">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart width={500} height={500}>
                <Pie
                  dataKey="totalMinutes"
                  data={data?.byCategory
                    .filter((c) => c.totalMinutes >= 1)
                    .sort((a, b) => b.totalMinutes - a.totalMinutes)}
                  label={({ name, value }) => {
                    return `${name} ${formatMinutes(value)}`
                  }}
                  labelLine={customizedLabel}
                  startAngle={450} // 12時の軸を基準に
                  endAngle={90}
                >
                  {data?.byCategory
                    .filter((c) => c.totalMinutes >= 1)
                    .sort((a, b) => b.totalMinutes - a.totalMinutes)
                    .map((item) => (
                      <Cell
                        key={item.id}
                        fill={
                          item.colorToken
                            ? COLOR_MAP[item.colorToken] + '99'
                            : '#5D866C99'
                        }
                      />
                    ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
