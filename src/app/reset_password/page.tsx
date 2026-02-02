'use client'

import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useForm } from 'react-hook-form'
import { FormLabel } from '../_components/form/FormLabel';
import { FormInput } from '../_components/form/FormInput';
import { FormButton } from '../_components/form/FormButton';
import AuthIllustration from '../_components/AuthIllustration';
import Link from 'next/link';

type ResetPasswordForm = {
  email: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    const { email } = data

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: location.origin + '/update_password',  // email記載リンクから、飛ぶリンク先を指定
    })

    if (error) {
      console.error(error)
      alert('リセットメールの送信に失敗しました')
      return
    }

    reset()
    alert('パスワード再設定用のメールを送信しました。\nメールボックスを確認してください。')
  }

  return (
    <div className="auth-container">
      <AuthIllustration />
      <div className='auth-form-section'>
        <div className='auth-card'>
          <h1 className='auth-title'>Reset password</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] space-y-6">
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
            <p className='flex text-xs text-gray-500 whitespace-pre-wrap leading-relaxed'>
              {`登録したメールアドレスに、パスワード再設定用のリンクを送ります。\n※届かない場合は、迷惑メールも確認してください。`}
            </p>
            <FormButton loading={isSubmitting} label='再設定リンクを送信' />
            <div className='mt-2 text-center'>
              <Link href='/login' className='text text-[#5A8B7D] hover:underline'>ログインに戻る</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
