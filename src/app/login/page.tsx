'use client'

import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { FormLabel } from '../_components/form/FormLabel';
import { FormInput } from '../_components/form/FormInput';
import { FormButton } from '../_components/form/FormButton';

type LoginForm = {
  email: string,
  password: string,
}

export default function Page() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const { email, password } = data

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('ログインに失敗しました')
      return
    }

    router.replace('/user/timeline')
  }
  return (
    <div className="flex justify-center pt-[240px]">
      <form method="POST" onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] space-y-6">
        <div>
          <FormLabel htmlFor='email'>メールアドレス</FormLabel>
          <FormInput
            type="email"
            id="email"
            loading={isSubmitting}
            {...register('email', { required: true })}
            placeholder="name@company.com"
          />
        </div>
        <div>
          <FormLabel htmlFor='password'>パスワード</FormLabel>
          <FormInput
            type="password"
            id="password"
            loading={isSubmitting}
            {...register('password', { required: true })}
            placeholder="••••••••"
          />
        </div>
        <FormButton loading={isSubmitting} label='ログイン' />
      </form>
    </div>
  )
}

