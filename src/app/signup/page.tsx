'use client'

import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useForm } from 'react-hook-form';
import { FormLabel } from '../_components/form/FormLabel';
import { FormInput } from '../_components/form/FormInput';
import { FormButton } from '../_components/form/FormButton';
import AuthIllustration from '../_components/AuthIllustration';
import Link from "next/link";
import OrDivider from '../_components/form/OrDivider';

type LoginForm = {
  email: string,
  password: string,
  confirmPassword: string,
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
    <div className="auth-container">
      <AuthIllustration />
      <div className='auth-form-section'>
        <div className='auth-card'>
          <h1 className='auth-title'>Sign up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <FormInput
                type="email"
                id="email"
                loading={isSubmitting}
                {...register('email', { required: true })}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <FormLabel htmlFor='password'>パスワード</FormLabel>
              <FormInput
                type="password"
                id="password"
                loading={isSubmitting}
                {...register('password', { required: true })}
                placeholder="password"
              />
            </div>
            <div>
              <FormLabel htmlFor='confirmPassword'>パスワード(確認)</FormLabel>
              <FormInput
                type="password"
                id="confirmPassword"
                loading={isSubmitting}
                {...register('confirmPassword', { required: true })}
                placeholder="password"
              />
            </div>

            <FormButton variant="primary" loading={isSubmitting} label='新規登録' />
            <OrDivider />
            <FormButton variant="secondary" loading={isSubmitting} label='Googleで続行' />

            <p className='text-center text-sm mt-4 text-gray-600'>
              アカウントをお持ちの方は<Link href='/login' className='hover:underline ml-1 text-[#5A8B7D]'>こちら</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}