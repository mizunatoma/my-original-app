'use client'
import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useForm } from 'react-hook-form'

type Form = {
  password: string
  confirmPassword: string
}

export default function Page() {
  const { register, handleSubmit, reset } = useForm<Form>()

  const onSubmit = async (data: Form) => {
    const { password, confirmPassword } = data

    if (password !== confirmPassword) {
      alert('パスワードが一致しません')
      return
    }

    const { error } = await supabaseBrowser.auth.updateUser({
      password,
    })

    if (error) {
      alert('パスワードの更新に失敗しました')
    } else {
      reset()
      alert('パスワードを更新しました')
    }
  }

  return (
    <div className="flex justify-center pt-[240px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[400px]"
      >
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            新しいパスワード
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            新しいパスワード（確認）
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          更新
        </button>
      </form>
    </div>
  )
}
