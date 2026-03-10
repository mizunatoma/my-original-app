'use client'

import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useForm } from 'react-hook-form'
import { FormLabel } from '../_components/form/FormLabel';
import { FormInput } from '../_components/form/FormInput';
import { FormButton } from '../_components/form/FormButton';
import AuthIllustration from '../_components/AuthIllustration';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

type Form = {
  password: string
  confirmPassword: string
}

export default function Page() {
  const router = useRouter();
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
    router.replace('/user/timeline')
  }

  return (
    <div className="auth-container">
      <AuthIllustration />
      <div className='auth-form-section'>
        <div className='auth-card'>
          <h1 className='auth-title'> Update password</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <FormButton loading={isSubmitting} label='再設定' />
            <div className='mt-2 text-center'>
              <Link href='/login' className='text text-[#5A8B7D] hover:underline'>ログイン画面へ</Link>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
