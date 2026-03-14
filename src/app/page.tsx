'use client'

import Link from 'next/link'

// figmaからコピー&ペースト。今後、修正予定。
export default function Home() {
  return (
    <div className="w-[1440px] h-[2155px] relative bg-[radial-gradient(ellipse_46.87%_22.48%_at_18.00%_8.00%,_var(--45-16%,_rgba(93,_134,_108,_0.16))_0%,_var(--45-0%,_rgba(93,_134,_108,_0))_60%)]">
      <div className="w-[1440px] h-20 left-0 top-[2070px] absolute border-t border-13-12%/10">
        <div className="w-28 h-6 left-[20px] top-[30px] absolute">
          <div className="w-6 h-6 left-0 top-0 absolute bg-[radial-gradient(ellipse_75.00%_75.00%_at_35.00%_30.00%,_var(--95-95%,_rgba(245,_245,_240,_0.95))_0%,_var(--95-0%,_rgba(245,_245,_240,_0))_60%)] rounded-[10px] shadow-[0px_12px_22px_0px_rgba(29,36,31,0.12)] border border-13-12%/10" />
          <div className="w-20 h-4 left-[36px] top-[4.50px] absolute justify-center text-13-58%/60 text-base font-bold font-['Roboto']">OneTrack</div>
        </div>
        <div className="w-52 h-5 left-[618px] top-[32px] absolute">
          <div className="w-8 h-5 left-0 top-0 absolute">
            <div className="w-8 h-4 left-0 top-[3px] absolute justify-center text-13-62%/60 text-base font-normal font-['Roboto']">機能</div>
          </div>
          <div className="w-12 h-5 left-[46px] top-0 absolute">
            <div className="w-12 h-4 left-0 top-[3px] absolute justify-center text-13-62%/60 text-base font-normal font-['Roboto']">使い方</div>
          </div>
          <div className="w-28 h-5 left-[108.37px] top-0 absolute">
            <div className="w-28 h-4 left-0 top-[3px] absolute justify-center text-13-62%/60 text-base font-normal font-['Roboto']">こんな悩みに</div>
          </div>
        </div>
        <div className="w-32 h-4 left-[1299px] top-[35px] absolute justify-center text-13-52%/50 text-base font-normal font-['Roboto']">© 2025 OneTrack</div>
      </div>
      <div className="w-[1140px] py-8 left-[150px] top-[85px] absolute inline-flex flex-col justify-start items-start gap-24">
        <div className="self-stretch h-[485.64px] relative">
          <div className="w-[572.30px] left-[4px] top-0 absolute inline-flex flex-col justify-start items-start gap-4">
            <div className="w-80 h-9 relative bg-95-78%/80 rounded-[999px] shadow-[0px_6px_18px_0px_rgba(29,36,31,0.06)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
              <div className="w-2.5 h-2.5 left-[13px] top-[14px] absolute bg-45 rounded-[999px] shadow-[0px_0px_0px_6px_rgba(93,134,108,0.14)]" />
              <div className="w-72 h-3.5 left-[33px] top-[12px] absolute justify-center text-13-64%/60 text-sm font-normal font-['Roboto']">タスク・ルーティン・メモが “時間に紐づく”</div>
            </div>
            <div className="w-[545.01px] h-40 justify-center text-13 text-5xl font-bold font-['Roboto'] leading-[53.57px]">記録が散らからない。<br />タスクと習慣が、時間に<br />結びつく。</div>
            <div className="self-stretch h-24 relative">
              <div className="w-[534px] h-20 left-0 top-[8.36px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">チェックボックスのタスク管理、毎日/毎週/毎月のルーティン、<br /> そしてタイムトラッキングごとのメモ。<br />「やること」と「使った時間」が分離しないから、振り返りが速い。</div>
            </div>
            <div className="w-64 h-12 relative">
              <div className="w-28 h-12 left-0 top-0 absolute bg-gradient-to-b from-45-92%/90 to-45-76%/75 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-45-35%/30">
                <div className="w-20 h-4 left-[15px] top-[16px] absolute text-center justify-center text-color-grey-95 text-base font-extrabold font-['Roboto']">今すぐ使う</div>
              </div>
              <div className="w-32 h-12 left-[121.13px] top-0 absolute bg-95-78%/80 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-24 h-4 left-[15px] top-[16px] absolute text-center justify-center text-13 text-base font-extrabold font-['Roboto']">使い方を見る</div>
              </div>
            </div>
            <div className="self-stretch h-20 relative">
              <div className="w-52 h-9 left-0 top-0 absolute bg-95-72%/70 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-48 h-3.5 left-[11px] top-[12px] absolute justify-center text-13-70%/70 text-sm font-normal font-['Roboto']">☑ タスクはチェックで終わる</div>
              </div>
              <div className="w-48 h-9 left-[225.34px] top-0 absolute bg-95-72%/70 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-44 h-3.5 left-[11px] top-[12px] absolute justify-center text-13-70%/70 text-sm font-normal font-['Roboto']">↻ ルーティンは頻度で管理</div>
              </div>
              <div className="w-60 h-9 left-0 top-[48px] absolute bg-95-72%/70 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-52 h-3.5 left-[11px] top-[12px] absolute justify-center text-13-70%/70 text-sm font-normal font-['Roboto']">✎ メモはトラッキングに紐づく</div>
              </div>
            </div>
          </div>
          <div className="w-[520px] h-[485px] left-[618px] top-0 absolute bg-font-family-色 rounded-2xl shadow-[0px_10px_24px_0px_rgba(31,31,31,0.08)] outline outline-1 outline-offset-[-1px] outline-65-75%/75 overflow-hidden">
            <div className="w-[520px] h-16 left-0 top-0 absolute bg-83-55%/60 shadow-[0px_10px_24px_0px_rgba(31,42,36,0.08)] outline outline-1 outline-offset-[-1px] outline-14-14%/10 backdrop-blur-[5px]">
              <div className="w-9 h-9 left-[25.10px] top-[16px] absolute bg-gradient-to-b from-45-95%/95 to-45-70%/70 rounded-2xl shadow-[0px_10px_18px_0px_rgba(93,134,108,0.18)] outline outline-1 outline-offset-[-1px] outline-14-12%/10">
                <div className="w-4 h-4 left-[10px] top-[10px] absolute">
                  <div className="w-2 h-2 left-[5.25px] top-[5.25px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-95-90%/90" />
                  <div className="w-1 h-0.5 left-[6.75px] top-[8.25px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-95-90%/90" />
                </div>
              </div>
              <div className="w-20 h-4 left-[73px] top-[27px] absolute justify-center text-14 text-base font-bold font-['Roboto'] leading-4 tracking-tight">OneTrack</div>
              <div className="w-20 h-9 left-[389px] top-[17px] absolute bg-color-grey-95-60%/60 rounded-2xl outline outline-1 outline-offset-[-1px] outline-65-55%/60">
                <div className="w-4 h-4 left-[13px] top-[10px] absolute">
                  <div className="w-2.5 h-3.5 left-[2.67px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-14-70%/70" />
                  <div className="w-0 h-1.5 left-[8px] top-[4.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-14-60%/60" />
                </div>
                <div className="w-6 h-3 left-[37px] top-[12px] absolute justify-center text-14-82%/80 text-xs font-normal font-['Roboto'] tracking-tight">Free</div>
              </div>
              <div className="w-9 h-9 left-[468px] top-[17px] absolute bg-stone-200 rounded-2xl outline outline-1 outline-offset-[-1px] outline-65-55%/60">
                <div className="w-5 h-5 left-[8px] top-[8px] absolute">
                  <div className="w-3.5 h-1.5 left-[3.33px] top-[10.83px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-72%/70" />
                  <div className="w-1.5 h-1.5 left-[6.67px] top-[4.17px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-72%/70" />
                </div>
              </div>
            </div>
            <div className="w-[520px] h-12 left-0 top-[78px] absolute bg-95-65%/60 rounded-[999px] shadow-[0px_6px_18px_0px_rgba(31,31,31,0.08)] outline outline-1 outline-offset-[-1px] outline-65-75%/75">
              <div className="left-[22px] top-[9px] absolute inline-flex justify-center items-center gap-3">
                <div className="w-4 h-4 relative">
                  <div className="w-0 h-0.5 left-[4.67px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-7-62%/60" />
                  <div className="w-0 h-0.5 left-[11.33px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-7-62%/60" />
                  <div className="w-2.5 h-0 left-[2.67px] top-[5.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-7-62%/60" />
                  <div className="w-2.5 h-3 left-[2.67px] top-[3.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-7-62%/60" />
                </div>
                <div className="w-11 h-4 justify-center text-12 text-lg font-bold font-['Roboto'] tracking-tight">2025</div>
                <div className="w-1.5 h-4 opacity-30 justify-center text-12 text-base font-bold font-['Roboto'] tracking-tight">/</div>
                <div className="w-11 h-7 relative bg-color-white--15%/20 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-65-75%/75">
                  <div className="w-9 h-3.5 left-[8.58px] top-[6.50px] absolute justify-center text-12 text-sm font-bold font-['Roboto'] tracking-tight">W52</div>
                </div>
                <div className="w-8 h-8 relative bg-stone-100 rounded-[999px] shadow-[0px_6px_18px_0px_rgba(31,31,31,0.08)] outline outline-1 outline-offset-[-1px] outline-65-75%/75">
                  <div className="w-4 h-4 left-[8px] top-[8px] absolute">
                    <div className="w-1 h-2 left-[6px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-35" />
                  </div>
                </div>
                <div className="w-8 h-8 relative bg-stone-100 rounded-[999px] shadow-[0px_6px_18px_0px_rgba(31,31,31,0.08)] outline outline-1 outline-offset-[-1px] outline-65-75%/75">
                  <div className="w-4 h-4 left-[8px] top-[8px] absolute">
                    <div className="w-1 h-2 left-[6px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-35" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[520px] h-[852px] left-0 top-[136px] absolute bg-neutral-100 rounded-2xl shadow-[0px_6px_18px_0px_rgba(31,31,31,0.08)] outline outline-1 outline-offset-[-1px] outline-65-65%/60 overflow-hidden">
              <div className="w-[520px] px-4 left-0 top-[16px] absolute inline-flex justify-start items-center gap-2.5">
                <div className="justify-center text-35-95%/95 text-sm font-black font-['Noto_Sans_JP'] leading-5 tracking-tight">タイムログ</div>
              </div>
              <div className="w-[474px] h-12 px-1.5 py-1 left-[45px] top-[37px] absolute bg-color-white-solid rounded-2xl outline outline-1 outline-offset-[-1px] outline-65-65%/60 inline-flex justify-center items-center gap-6">
                <div className="w-10 self-stretch p-1 inline-flex flex-col justify-center items-center overflow-hidden">
                  <div className="text-center justify-center text-35%/30 text-base font-bold font-['Roboto']">07</div>
                  <div className="text-center justify-center text-45%/40 text-xs font-normal font-['Roboto'] lowercase tracking-wide">mon</div>
                  <div className="w-0.5 h-2.5 bg-35%/30 rounded-sm" />
                </div>
                <div className="w-10 self-stretch p-1 inline-flex flex-col justify-center items-center overflow-hidden">
                  <div className="text-center justify-center text-35%/30 text-base font-bold font-['Roboto']">08</div>
                  <div className="text-center justify-center text-45%/40 text-xs font-normal font-['Roboto'] lowercase tracking-wide">mon</div>
                  <div className="w-0.5 h-2.5 bg-35%/30 rounded-sm" />
                </div>
                <div className="w-10 self-stretch p-1 inline-flex flex-col justify-center items-center overflow-hidden">
                  <div className="text-center justify-center text-35%/30 text-base font-bold font-['Roboto']">09</div>
                  <div className="text-center justify-center text-45%/40 text-xs font-normal font-['Roboto'] lowercase tracking-wide">mon</div>
                  <div className="w-0.5 h-2.5 bg-35%/30 rounded-sm" />
                </div>
                <div className="w-10 self-stretch p-1 inline-flex flex-col justify-center items-center overflow-hidden">
                  <div className="text-center justify-center text-35%/30 text-base font-bold font-['Roboto']">10</div>
                  <div className="text-center justify-center text-45%/40 text-xs font-normal font-['Roboto'] lowercase tracking-wide">mon</div>
                  <div className="w-0.5 h-2.5 bg-35%/30 rounded-sm" />
                </div>
                <div className="w-10 self-stretch p-1 inline-flex flex-col justify-center items-center overflow-hidden">
                  <div className="text-center justify-center text-35%/30 text-base font-bold font-['Roboto']">11</div>
                  <div className="text-center justify-center text-45%/40 text-xs font-normal font-['Roboto'] lowercase tracking-wide">mon</div>
                  <div className="w-0.5 h-2.5 bg-35%/30 rounded-sm" />
                </div>
                <div className="w-10 self-stretch p-1 inline-flex flex-col justify-center items-center overflow-hidden">
                  <div className="text-center justify-center text-35%/30 text-base font-bold font-['Roboto']">12</div>
                  <div className="text-center justify-center text-45%/40 text-xs font-normal font-['Roboto'] lowercase tracking-wide">mon</div>
                  <div className="w-0.5 h-2.5 bg-35%/30 rounded-sm" />
                </div>
                <div className="w-10 h-10 p-1 bg-45-14%/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-45-28%/30 inline-flex flex-col justify-center items-center overflow-hidden">
                  <div className="w-5 h-5 text-center justify-center text-90%/90 text-base font-bold font-['Roboto']">13</div>
                  <div className="w-5 h-2.5 text-center justify-center text-45%/40 text-xs font-normal font-['Roboto'] lowercase tracking-wide">sun</div>
                  <div className="w-0.5 h-2.5 bg-35%/30 rounded-sm" />
                </div>
              </div>
              <div className="w-[520px] h-[1170px] left-0 top-[105px] absolute bg-font-family-色 rounded-2xl outline outline-1 outline-offset-[-1px] outline-65-55%/60">
                <div className="py-3.5 left-0 top-0 absolute inline-flex flex-col justify-center items-center gap-2.5">
                  <div className="w-11 px-1.5 flex flex-col justify-center items-center gap-9">
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">10:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">11:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">12:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">13:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">14:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">15:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">16:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">17:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">18:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">19:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">20:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">21:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">22:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">23:00</div>
                    <div className="self-stretch h-3 justify-center text-35-85%/90 text-xs font-bold font-['Noto_Sans_JP'] leading-3">24:00</div>
                  </div>
                </div>
                <div className="w-px h-[1160px] left-[45px] top-[5px] absolute bg-65-80%/80 rounded-[999px]" />
                <div className="w-[474px] py-5 left-[46px] top-[1px] absolute bg-color-white-solid rounded-2xl outline outline-1 outline-offset-[-1px] outline-65-65%/60 inline-flex justify-between items-center">
                  <div className="w-[474px] h-[1119px] px-[3px] flex justify-between items-center">
                    <div className="w-16 self-stretch relative">
                      <div className="w-14 h-11 left-[5px] top-[1px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-5 px-[5px] left-[5px] top-[65px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                      <div className="w-14 h-16 left-[5px] top-[127px] absolute bg-slate-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                    </div>
                    <div className="w-16 self-stretch relative">
                      <div className="w-14 h-11 left-[5.17px] top-[44px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-5 px-[5px] left-[5.17px] top-[96px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                      <div className="w-14 h-44 px-[3px] py-2.5 left-[5.17px] top-[124px] absolute bg-gray-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                    </div>
                    <div className="w-16 self-stretch relative">
                      <div className="w-14 h-7 px-[5px] left-[5px] top-[31px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                      <div className="w-14 h-16 left-[5px] top-[65px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-24 left-[5px] top-[133px] absolute bg-slate-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                    </div>
                    <div className="w-16 self-stretch relative">
                      <div className="w-14 h-32 left-[5px] top-[1px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-16 left-[5px] top-[316px] absolute bg-slate-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-5 px-[5px] left-[5px] top-[564px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                      <div className="w-14 h-44 px-[3px] py-2.5 left-[4.50px] top-[145px] absolute bg-gray-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                    </div>
                    <div className="w-16 self-stretch relative">
                      <div className="w-14 h-14 left-[5px] top-[12px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-7 px-[5px] left-[5px] top-[79px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                      <div className="w-14 h-16 left-[5px] top-[114px] absolute bg-slate-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                    </div>
                    <div className="w-16 self-stretch relative">
                      <div className="w-14 h-32 left-[5px] top-[1px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-7 px-[5px] left-[5px] top-[563px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                      <div className="w-14 h-24 left-[4.83px] top-[151px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                    </div>
                    <div className="w-16 self-stretch relative">
                      <div className="w-14 h-20 left-[5px] top-[19px] absolute bg-gray-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-20 left-[5px] top-[205px] absolute bg-gray-400 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-14 left-[5px] top-[391px] absolute bg-76 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)] border border-6%/5" />
                      <div className="w-14 h-4 px-[5px] left-[5px] top-[563px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                      <div className="w-14 h-20 px-[5px] left-[5px] top-[106px] absolute bg-78 rounded shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] border border-6%/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-96 h-16 px-2 py-2.5 left-[16px] top-[996px] absolute bg-stone-200 outline outline-1 outline-offset-[-1px] outline-font-family-枠線 inline-flex justify-center items-start gap-1.5">
              <div className="flex-1 h-12 relative bg-45-30%/30 rounded-2xl outline outline-1 outline-offset-[-1px] outline-45-70%/70">
                <div className="w-7 h-7 left-[27px] top-[11px] absolute bg-45-14%/10 rounded-xl outline outline-1 outline-offset-[-1px] outline-45-22%/20">
                  <div className="w-5 h-5 left-[4px] top-[4px] absolute">
                    <div className="w-[1.67px] h-[5px] left-[10px] top-[6.67px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-3.5 h-3.5 left-[2.50px] top-[2.50px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                  </div>
                </div>
              </div>
              <div className="flex-1 h-12 relative rounded-2xl outline outline-1 outline-offset-[-1px] outline-0%/0">
                <div className="w-7 h-7 left-[27px] top-[11px] absolute bg-45-14%/10 rounded-xl outline outline-1 outline-offset-[-1px] outline-45-22%/20">
                  <div className="w-5 h-5 left-[4px] top-[4px] absolute">
                    <div className="w-0 h-3 left-[3.33px] top-[4.17px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-3.5 h-0 left-[3.33px] top-[15.83px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-0 h-1 left-[6.67px] top-[9.17px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-0 h-1.5 left-[10px] top-[6.67px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-0 h-1 left-[13.33px] top-[9.17px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                  </div>
                </div>
              </div>
              <div className="flex-1 h-12 relative rounded-2xl outline outline-1 outline-offset-[-1px] outline-0%/0">
                <div className="w-7 h-7 left-[27px] top-[11px] absolute bg-45-14%/10 rounded-xl outline outline-1 outline-offset-[-1px] outline-45-22%/20">
                  <div className="w-5 h-5 left-[4px] top-[4px] absolute">
                    <div className="w-2.5 h-2 left-[7.50px] top-[3.33px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-3.5 h-3.5 left-[2.50px] top-[2.50px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                  </div>
                </div>
              </div>
              <div className="flex-1 h-12 relative rounded-2xl outline outline-1 outline-offset-[-1px] outline-0%/0">
                <div className="w-7 h-7 left-[27px] top-[11px] absolute bg-45-14%/10 rounded-xl outline outline-1 outline-offset-[-1px] outline-45-22%/20">
                  <div className="w-5 h-5 left-[4px] top-[4px] absolute">
                    <div className="w-3 h-1.5 left-[3.33px] top-[3.33px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-3 h-1.5 left-[5.28px] top-[10px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-[5px] h-[5px] left-[11.67px] top-[3.33px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                    <div className="w-[5px] h-[5px] left-[3.33px] top-[11.67px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-7-68%/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-1 flex flex-col justify-start items-start gap-4">
          <div className="w-52 h-8 justify-center text-13 text-3xl font-bold font-['Roboto']">3つの特徴</div>
          <div className="w-[1140px] h-10 relative">
            <div className="w-[684.92px] h-10 left-0 top-0 absolute">
              <div className="w-[598.18px] left-0 top-[2.36px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">タスク（チェック）／ルーティン（頻度）／メモ（トラッキング紐づけ）。<br />「やる・回す・残す」を1つに。</div>
            </div>
            <div className="w-32 h-9 left-[994px] top-[4.36px] absolute bg-95-78%/80 rounded-[999px] shadow-[0px_6px_18px_0px_rgba(29,36,31,0.06)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
              <div className="w-2.5 h-2.5 left-[13px] top-[14px] absolute bg-45 rounded-[999px] shadow-[0px_0px_0px_6px_rgba(93,134,108,0.14)]" />
              <div className="w-24 h-3.5 left-[33px] top-[12px] absolute justify-center text-13-64%/60 text-sm font-normal font-['Roboto']">迷いを減らす</div>
            </div>
          </div>
          <div className="inline-flex justify-start items-center gap-2.5">
            <div className="w-96 p-5 bg-95-72%/70 rounded-2xl shadow-[0px_10px_24px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-10%/10 inline-flex flex-col justify-start items-start gap-3">
              <div className="w-24 h-8 relative bg-83-55%/60 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-16 h-3.5 left-[11px] top-[11px] absolute justify-center text-13-74%/75 text-sm font-extrabold font-['Roboto']">タスク管理</div>
              </div>
              <div className="self-stretch h-4 justify-center text-13 text-base font-bold font-['Roboto']">チェックボックスで “終わらせる”</div>
              <div className="w-80 h-9 justify-center text-13-64%/60 text-base font-normal font-['Roboto']">今日やることを3〜7個に絞り、<br />チェックで消す。</div>
              <div className="self-stretch h-16 relative">
                <div className="w-80 h-5 left-[18px] top-0 absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-32 h-4 left-0 top-[3px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">☑ クリックで完了</div>
                </div>
                <div className="w-80 h-5 left-[18px] top-[21px] absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-36 h-4 left-0 top-[3px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">今日のリストが主役</div>
                </div>
                <div className="w-80 h-5 left-[18px] top-[42px] absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-32 h-4 left-0 top-[3px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">必要なら1行メモ</div>
                </div>
              </div>
            </div>
            <div className="w-96 p-5 bg-95-72%/70 rounded-2xl shadow-[0px_10px_24px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-10%/10 inline-flex flex-col justify-start items-start gap-3">
              <div className="w-24 h-8 relative bg-83-55%/60 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-16 h-3.5 left-[11px] top-[11px] absolute justify-center text-13-74%/75 text-sm font-extrabold font-['Roboto']">ルーティン</div>
              </div>
              <div className="self-stretch h-4 justify-center text-13 text-base font-bold font-['Roboto']">毎日/毎週/毎月を同じ場所で</div>
              <div className="w-80 h-9 justify-center text-13-64%/60 text-base font-normal font-['Roboto']">習慣は頻度で管理して、<br />抜け漏れを減らす。</div>
              <div className="self-stretch h-16 relative">
                <div className="w-80 h-5 left-[18px] top-0 absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-60 h-4 left-[0.34px] top-[3.36px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">毎日：☑ クリックで完了</div>
                </div>
                <div className="w-80 h-5 left-[18px] top-[21px] absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-60 h-4 left-[0.34px] top-[3.36px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">毎週：曜日ごとにタスク管理</div>
                </div>
                <div className="w-80 h-5 left-[18px] top-[42px] absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-52 h-4 left-[0.34px] top-[3.36px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">毎月：忘れがちな月末タスク</div>
                </div>
              </div>
            </div>
            <div className="w-96 p-5 bg-95-72%/70 rounded-2xl shadow-[0px_10px_24px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-10%/10 inline-flex flex-col justify-start items-start gap-3">
              <div className="w-24 h-8 relative bg-83-55%/60 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-16 h-3.5 left-[11px] top-[11px] absolute justify-center text-13-74%/75 text-sm font-extrabold font-['Roboto']">メモ機能</div>
              </div>
              <div className="self-stretch h-4 justify-center text-13 text-base font-bold font-['Roboto']">メモを “時間” に固定する</div>
              <div className="w-80 h-9 justify-center text-13-64%/60 text-base font-normal font-['Roboto']">日記にも、作業メモにも。<br />短く残し、あとで振り返る</div>
              <div className="self-stretch h-16 relative">
                <div className="w-80 h-5 left-[18px] top-0 absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-64 h-4 left-[-0.32px] top-[3.36px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">トラッキング単位で紐づく</div>
                </div>
                <div className="w-80 h-5 left-[18px] top-[21px] absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-80 h-4 left-[-0.32px] top-[3.36px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">小さな気づきもメモで残す</div>
                </div>
                <div className="w-80 h-5 left-[18px] top-[42px] absolute">
                  <div className="w-1.5 h-5 left-0 top-[2px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']"> </div>
                  <div className="w-56 h-4 left-[-0.32px] top-[3.36px] absolute justify-center text-13-72%/70 text-base font-normal font-['Roboto']">振り返りが速くなる</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-1 flex flex-col justify-start items-start gap-4">
          <div className="w-80 h-8 justify-center text-13 text-3xl font-bold font-['Roboto']">使い方（4ステップ）</div>
          <div className="w-[1100px] h-96 relative bg-95-72%/70 rounded-3xl shadow-[0px_10px_24px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-10%/10">
            <div className="w-[1070px] h-20 left-[15px] top-[15px] absolute bg-83-45%/40 rounded-2xl outline outline-1 outline-offset-[-1px] outline-13-8%/10">
              <div className="w-8 h-8 left-[15px] top-[15px] absolute bg-color-grey-95-75%/75 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-2.5 h-4 left-[12.55px] top-[8.50px] absolute text-center justify-center text-13-72%/70 text-base font-bold font-['Roboto']">1</div>
              </div>
              <div className="w-32 h-4 left-[61px] top-[18px] absolute justify-center text-13 text-base font-black font-['Roboto']">タスクを追加する</div>
              <div className="w-96 h-4 left-[61px] top-[43px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">今日やることを3〜7個。粒度は30〜90分が目安。</div>
            </div>
            <div className="w-[1070px] h-20 left-[15px] top-[103px] absolute bg-83-45%/40 rounded-2xl outline outline-1 outline-offset-[-1px] outline-13-8%/10">
              <div className="w-8 h-8 left-[15px] top-[15px] absolute bg-color-grey-95-75%/75 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-2.5 h-4 left-[12.55px] top-[8.50px] absolute text-center justify-center text-13-72%/70 text-base font-bold font-['Roboto']">2</div>
              </div>
              <div className="w-56 h-4 left-[61px] top-[18px] absolute justify-center text-13 text-base font-black font-['Roboto']">タイムトラッキングを開始する</div>
              <div className="w-96 h-4 left-[61px] top-[43px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">タスク or ルーティンを選んで開始。</div>
            </div>
            <div className="w-[1070px] h-20 left-[15px] top-[191px] absolute bg-83-45%/40 rounded-2xl outline outline-1 outline-offset-[-1px] outline-13-8%/10">
              <div className="w-8 h-8 left-[15px] top-[15px] absolute bg-color-grey-95-75%/75 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-2.5 h-4 left-[12.55px] top-[8.50px] absolute text-center justify-center text-13-72%/70 text-base font-bold font-['Roboto']">3</div>
              </div>
              <div className="w-20 h-4 left-[61px] top-[18px] absolute justify-center text-13 text-base font-black font-['Roboto']">メモを残す</div>
              <div className="w-96 h-4 left-[61px] top-[43px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">「何をしたか / 詰まり / 次」を1〜3行で。時間と一緒に保存。</div>
            </div>
            <div className="w-[1070px] h-20 left-[15px] top-[279px] absolute bg-83-45%/40 rounded-2xl outline outline-1 outline-offset-[-1px] outline-13-8%/10">
              <div className="w-8 h-8 left-[15px] top-[15px] absolute bg-color-grey-95-75%/75 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-2.5 h-4 left-[12.55px] top-[8.50px] absolute text-center justify-center text-13-72%/70 text-base font-bold font-['Roboto']">4</div>
              </div>
              <div className="w-40 h-4 left-[61px] top-[18px] absolute justify-center text-13 text-base font-black font-['Roboto']">ルーティンを設定する</div>
              <div className="w-96 h-4 left-[61px] top-[43px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">毎日/毎週/毎月を選ぶだけ。頻度で回るから忘れない。</div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-1 flex flex-col justify-start items-start gap-4">
          <div className="w-56 h-8 justify-center text-13 text-3xl font-bold font-['Roboto']">こんな悩みに</div>
          <div className="w-[1131.99px] h-40 relative">
            <div className="w-96 h-40 left-0 top-0 absolute bg-95-72%/70 rounded-2xl shadow-[0px_10px_24px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-10%/10">
              <div className="w-28 h-8 left-[19px] top-[19px] absolute bg-83-55%/60 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-24 h-3.5 left-[11px] top-[11px] absolute justify-center text-13-74%/75 text-sm font-extrabold font-['Roboto']">個人開発 / 勉強</div>
              </div>
              <div className="w-44 h-4 left-[19px] top-[68px] absolute justify-center text-13 text-base font-bold font-['Roboto']">詰まりを資産にしたい</div>
              <div className="w-80 h-9 left-[19px] top-[96.36px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">詰まり→メモ→次の一手が時間と紐づくと改善が速い。</div>
            </div>
            <div className="w-96 h-40 left-[380.66px] top-0 absolute bg-95-72%/70 rounded-2xl shadow-[0px_10px_24px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-10%/10">
              <div className="w-24 h-8 left-[19px] top-[19px] absolute bg-83-55%/60 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-16 h-3.5 left-[11px] top-[11px] absolute justify-center text-13-74%/75 text-sm font-extrabold font-['Roboto']">在宅ワーク</div>
              </div>
              <div className="w-40 h-4 left-[19px] top-[68px] absolute justify-center text-13 text-base font-bold font-['Roboto']">やることが散らかる</div>
              <div className="w-80 h-9 left-[19.34px] top-[96.36px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">チェックリストを主役にして、タスクの摩擦を下げる。</div>
            </div>
            <div className="w-96 h-40 left-[761.33px] top-0 absolute bg-95-72%/70 rounded-2xl shadow-[0px_10px_24px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-10%/10">
              <div className="w-16 h-8 left-[19px] top-[19px] absolute bg-83-55%/60 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
                <div className="w-11 h-3.5 left-[11px] top-[11px] absolute justify-center text-13-74%/75 text-sm font-extrabold font-['Roboto']">習慣化</div>
              </div>
              <div className="w-36 h-4 left-[19px] top-[68px] absolute justify-center text-13 text-base font-bold font-['Roboto']">毎週/毎月を忘れる</div>
              <div className="w-80 h-9 left-[18.67px] top-[96.36px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">頻度で管理して、抜け漏れのストレスを消す。</div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-28 relative bg-[radial-gradient(ellipse_50.09%_212.39%_at_20.00%_15.00%,_var(--45-22%,_rgba(93,_134,_108,_0.22))_0%,_var(--45-0%,_rgba(93,_134,_108,_0))_62%)] rounded-[32px] shadow-[0px_22px_60px_0px_rgba(93,134,108,0.14)] outline outline-1 outline-offset-[-1px] outline-45-32%/30">
          <div className="w-[673.56px] h-8 left-[21px] top-[30px] absolute justify-center text-13 text-3xl font-bold font-['Roboto']">タスク・ルーティン・メモを、時間に束ねる。</div>
          <div className="w-[454.20px] h-4 left-[21px] top-[76px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">散らばった記録は、ひとつに。</div>
          <div className="w-28 h-12 left-[850.75px] top-[34px] absolute bg-gradient-to-b from-45-92%/90 to-45-76%/75 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-45-35%/30">
            <div className="w-20 h-4 left-[15px] top-[16px] absolute text-center justify-center text-color-grey-95 text-base font-extrabold font-['Roboto']">今すぐ使う</div>
          </div>
          <div className="w-32 h-12 left-[971.88px] top-[34px] absolute bg-95-78%/80 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-13-12%/10">
            <div className="w-24 h-4 left-[15px] top-[16px] absolute text-center justify-center text-13 text-base font-extrabold font-['Roboto']">使い方を見る</div>
          </div>
        </div>
      </div>
      <div className="w-[1440px] h-20 left-0 top-0 absolute bg-95-72%/70 border-b border-13-12%/10 backdrop-blur-blur">
        <div className="w-[1435.42px] h-20 left-[2.29px] top-0 absolute">
          <div className="w-28 h-8 left-[16px] top-[19.50px] absolute">
            <div className="w-8 h-8 left-0 top-0 absolute bg-[radial-gradient(ellipse_56.25%_56.25%_at_35.00%_30.00%,_var(--95-95%,_rgba(245,_245,_240,_0.95))_0%,_var(--95-0%,_rgba(245,_245,_240,_0))_60%)] rounded-xl shadow-[0px_12px_22px_0px_rgba(29,36,31,0.12)] border border-13-12%/10" />
            <div className="w-20 h-4 left-[44px] top-[8.50px] absolute justify-center text-13 text-base font-bold font-['Roboto'] tracking-tight">OneTrack</div>
          </div>
          <div className="w-64 h-10 left-[581.71px] top-[16px] absolute">
            <div className="w-12 h-10 left-0 top-0 absolute rounded-xl">
              <div className="w-8 h-4 left-[10px] top-[13px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">機能</div>
            </div>
            <div className="w-16 h-10 left-[66px] top-0 absolute rounded-xl">
              <div className="w-12 h-4 left-[10px] top-[13px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">使い方</div>
            </div>
            <div className="w-32 h-10 left-[148.37px] top-0 absolute rounded-xl">
              <div className="w-28 h-4 left-[10px] top-[13px] absolute justify-center text-13-64%/60 text-base font-normal font-['Roboto']">こんな悩みに</div>
            </div>
          </div>
          <div className="w-64 h-12 left-[1171.16px] top-[13px] absolute">
            <div className="w-32 h-12 left-0 top-0 absolute rounded-2xl outline outline-1 outline-offset-[-1px] outline-13-12%/10">
              <div className="w-24 h-4 left-[15px] top-[16px] absolute text-center justify-center text-13-64%/60 text-base font-extrabold font-['Roboto']">使い方を見る</div>
            </div>
            <div className="w-28 h-12 left-[137.13px] top-0 absolute bg-gradient-to-b from-45-92%/90 to-45-76%/75 rounded-2xl shadow-[0px_10px_18px_0px_rgba(29,36,31,0.08)] outline outline-1 outline-offset-[-1px] outline-45-35%/30">
              <div className="w-20 h-4 left-[15px] top-[16px] absolute text-center justify-center text-color-grey-95 text-base font-extrabold font-['Roboto']">今すぐ使う</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
