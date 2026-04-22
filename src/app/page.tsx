'use client'

import Link from 'next/link'
import { TimerReset, Sparkles, Layers } from 'lucide-react'

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

export default function Home() {
  return (
    <>
      <body>
        <header className="border px-8 py-6">
          <nav className="container mx-auto flex items-center justify-between">
            <div className="text-2xl">OneTrack</div>

            <div className="flex gap-4">
              <a
                href=""
                className="rounded-full border border-gray-400 px-8 py-4 transition-all duration-300 hover:text-green-500"
              >
                Login
              </a>
              <a
                href=""
                className="rounded-full bg-[#5A8B7D] px-6 py-4 text-white transition-all duration-300 hover:bg-green-500/50"
              >
                Get Started
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className="container mx-auto">
            <div className="flex flex-col items-center gap-4 px-16 py-8 md:flex-row">
              <div className="">
                <div className="p-8">
                  <h1 className="text-6xl font-bold">
                    シンプルなタイムトラッキング
                  </h1>
                  <p>複雑な設定は不要。時間を可視化し、一日を振り返る。</p>
                </div>
                <div className="flex gap-4">
                  <button className="rounded-full border bg-[#5A8B7D] px-8 py-4 text-white transition-all duration-300 hover:bg-green-500/50">
                    今すぐ使う
                  </button>
                  <button className="rounded-full border border-gray-400 px-8 py-4 transition-all duration-300 hover:text-green-500">
                    ゲストログイン
                  </button>
                </div>
              </div>
              <div>
                <img
                  className="rounded-2xl border"
                  src="/images/LP_dashboard.png"
                  alt="dashboard"
                />
              </div>
            </div>
          </section>

          <section className="container mx-auto flex flex-col gap-2 bg-[#F4F4EF] px-8 py-16">
            <h1 className="flex justify-center text-2xl underline underline-offset-8">
              こんな方に
            </h1>
            <ul className="m-4 grid grid-flow-col gap-4">
              {forPeople.map((item) => (
                <li className="flex flex-col gap-2 rounded-lg bg-white p-6">
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

          <section className="container mx-auto p-8">
            <div className="flex">
              <div className="border md:flex">
                <div>
                  <img
                    className="m-8"
                    src="/images/LP_chart.png"
                    alt="chart"
                    width="276"
                    height="254"
                  />
                  <img
                    className="m-8"
                    src="/images/LP_chart.png"
                    alt="chart"
                    width="276"
                    height="254"
                  />
                </div>
                <div>
                  <img
                    className="m-8"
                    src="/images/LP_task_planning.png"
                    alt="task_planning"
                    width="276"
                    height="286"
                  />
                  <img
                    className="m-8"
                    src="/images/LP_task_planning.png"
                    alt="task_planning"
                    width="276"
                    height="286"
                  />
                </div>
              </div>
              <div>
                <h1>主な機能</h1>
                <ul>
                  <li className="flex">
                    <h1>01</h1>
                    <div>
                      <h1>シンプルなタイムトラッキング</h1>
                      <p>
                        直感的な操作で、作業開始から終了まで迷わず記録。ストレスのないユーザー体験を提供しまうす。
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <h1>01</h1>
                    <div>
                      <h1>シンプルなタイムトラッキング</h1>
                      <p>
                        直感的な操作で、作業開始から終了まで迷わず記録。ストレスのないユーザー体験を提供しまうす。
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <h1>01</h1>
                    <div>
                      <h1>シンプルなタイムトラッキング</h1>
                      <p>
                        直感的な操作で、作業開始から終了まで迷わず記録。ストレスのないユーザー体験を提供しまうす。
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="container m-8 mx-auto flex grid-rows-2 justify-center rounded-lg border bg-[#7D9C88] p-8">
            <h1 className="text-4xl font-medium text-[#173324]">
              あなたの時間を、もっと自由に
            </h1>
            <button className="rounded-full bg-[#173324] px-8 py-4 text-white/100">
              まずはゲストログインで試してみる
            </button>
          </section>
        </main>
      </body>
    </>
  )
}
