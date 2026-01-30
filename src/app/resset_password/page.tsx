'use client'

import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useForm } from 'react-hook-form'
import { FormLabel } from '../_components/form/FormLabel';
import { FormInput } from '../_components/form/FormInput';
import { FormButton } from '../_components/form/FormButton';

type Form = {
  password: string
  confirmPassword: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Form>();

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
      return
    }

    reset()
    alert('パスワードを更新しました')
  }

  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] space-y-6">
        <div>
          <FormLabel htmlFor='password'>新しいパスワード</FormLabel>
          <FormInput
            type="password"
            id="password"
            loading={isSubmitting}
            {...register('password', { required: true })}
            placeholder="••••••••"
          />
        </div>
        <div>
          <FormLabel htmlFor='password'>新しいパスワード(確認)</FormLabel>
          <FormInput
            type="password"
            id="confirmPassword"
            loading={isSubmitting}
            {...register('confirmPassword', { required: true })}
            placeholder="••••••••"
          />
        </div>
        <FormButton loading={isSubmitting} label='更新' />
      </form>
    </div>
  )
}
