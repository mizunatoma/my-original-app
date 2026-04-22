'use client'

import Link from 'next/link'
import {
  TimerReset,
  Sparkles,
  Layers,
  BarChart2,
  CircleCheckBig,
} from 'lucide-react'

const forPeople = [
  {
    icon: TimerReset,
    iconColor: 'text-[#5A6745]',
    bgColor: 'bg-[#D7E5BB]',
    title: 'Time Loss',
    context:
      '複数のタスクを抱え、何にどれだけ時間を使っているか把握できていない',
  },
  {
    icon: Sparkles,
    iconColor: 'text-[#173324]',
    bgColor: 'bg-[#C9EAD4]',
    title: 'Lack of Focus',
    context:
      '資格試験の勉強やスキルアップのために、学習時間をきっちり管理したい',
  },
  {
    icon: Layers,
    iconColor: 'text-[#442427]',
    bgColor: 'bg-[#FFDADB]',
    title: 'Overwhelmed',
    context: '日々の活動を視覚化して、整理したい。',
  },
]

const keyFeatures = [
  {
    num: '01',
    title: 'シンプルなタイムトラッキング',
    context: '直感的な操作で、作業の開始から終了まで迷わず記録。',
  },
  {
    num: '02',
    title: '月次アナリティクス',
    context:
      '時間の使い方のクセを可視化。振り返りを通じて、より良い習慣作りをサポートします。',
  },
  {
    num: '03',
    title: 'リスト別 Todo管理',
    context:
      'プロジェクトごとにタスクを整理。次に何をすべきかを明確にし、脳のメモリを開放します。',
  },
]

export default function Home() {
  return (
    <>
      <body>
        {/* ヘッダー */}
        <header className="border border-b-4 border-white px-8 py-6">
          <nav className="container mx-auto flex items-center justify-between">
            <div className="text-2xl">OneTrack</div>

            <div className="flex gap-4">
              <a
                href=""
                className="rounded-full border border-gray-400 px-8 py-4 transition-all duration-300 hover:border-white hover:bg-[#5A8B7D]/50 hover:text-white"
              >
                Login
              </a>
              <a
                href=""
                className="rounded-full bg-[#5A8B7D] px-6 py-4 text-white transition-all duration-300 hover:bg-[#5A8B7D]/50"
              >
                Get Started
              </a>
            </div>
          </nav>
        </header>

        <main>
          {/* メイン */}
          <section className="py-16">
            <div className="flex flex-col items-center gap-4 px-6 py-8 md:flex-row md:px-16">
              <div className="flex flex-[2] flex-col gap-4 p-8">
                <div className="flex flex-col gap-4">
                  <h1 className="text-5xl font-bold">
                    シンプルな
                    <br />
                    タイムトラッキング
                  </h1>
                  <p>複雑な設定は不要。時間を可視化し、一日を振り返る。</p>
                </div>
                <div className="md:justify-left flex gap-4">
                  <button className="rounded-full bg-[#5A8B7D] px-6 py-4 text-white transition-all duration-300 hover:bg-[#5A8B7D]/50">
                    今すぐ使う
                  </button>
                  <button className="rounded-full border border-gray-400 px-8 py-4 transition-all duration-300 hover:border-white hover:bg-[#5A8B7D]/50 hover:text-white">
                    ゲストログイン
                  </button>
                </div>
              </div>
              <div className="flex-[3]">
                <img
                  className="w-full rounded-2xl border-8 border-white"
                  src="/images/LP_dashboard.png"
                  alt="dashboard"
                />
              </div>
            </div>
          </section>

          {/* こんな方に */}
          <section className="flex w-full flex-col gap-2 border-y-4 border-white bg-[#F4F4EF] py-16">
            <h1 className="flex justify-center text-2xl underline underline-offset-8">
              こんな方に
            </h1>
            <ul className="m-4 flex flex-col gap-4 md:flex-row">
              {forPeople.map((item) => (
                <li className="flex flex-1 flex-col gap-2 rounded-md bg-white p-6">
                  <div
                    className={`inline-flex w-fit items-center rounded-md border p-2 ${item.bgColor}`}
                  >
                    <item.icon
                      className={`${item.iconColor} rounded-md`}
                      size={20}
                    />
                  </div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p>{item.context}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 主な機能 */}
          <section className="flex w-full flex-col gap-8 px-6 py-16 py-8 md:flex-row md:px-16">
            <div className="m-4 flex items-center gap-4 md:flex-1">
              <div className="flex flex-1 flex-col gap-4">
                <img
                  className="w-full rounded-lg object-cover"
                  src="/images/LP_chart.png"
                  alt="chart"
                />
                <div className="flex items-center justify-center rounded-lg bg-[#3D5E4E] p-8">
                  <BarChart2 size={48} className="text-white" />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-center rounded-2xl bg-[#D8E8C2] p-8">
                  <CircleCheckBig size={48} className="text-[#3D5E4E]" />
                </div>
                <img
                  className="w-full rounded-lg"
                  src="/images/LP_task_planning.png"
                  alt="task_planning"
                />
              </div>
            </div>
            <div className="flex flex-col gap-8 md:flex-1">
              <h1 className="text-4xl font-semibold">主な機能</h1>
              <ul className="flex flex-col gap-4">
                {keyFeatures.map((item) => (
                  <li className="m-4 flex gap-4">
                    <h2 className="font-mono text-4xl font-bold text-[#476553]/30">
                      {item.num}
                    </h2>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p>{item.context}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="container mx-auto mb-16 flex w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-lg bg-[#7D9C88] p-8 shadow-lg shadow-black/20">
            <h1 className="font-sans text-4xl text-[#173324]">
              あなたの時間を、もっと自由に。
            </h1>
            <button className="rounded-full bg-[#173324] px-6 py-4 text-[#7D9C88] transition-all duration-300 hover:bg-[#173324]/50">
              ゲストログインで 試してみる
            </button>
          </section>
        </main>
      </body>
    </>
  )
}
