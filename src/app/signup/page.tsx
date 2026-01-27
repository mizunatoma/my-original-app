'use client'

import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useForm } from 'react-hook-form';

type LoginForm = {
  email: string,
  password: string,
}

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const { email, password } = data

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert('登録に失敗しました')
      return
    }

    reset()
    alert('確認メールを送信しました')
  }

  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[400px]">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            disabled={isSubmitting}
            {...register('email', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            disabled={isSubmitting}
            {...register('password', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="••••••••"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isSubmitting ? '送信中...' : '登録'}
          </button>
        </div>
      </form>
    </div>
  )
}