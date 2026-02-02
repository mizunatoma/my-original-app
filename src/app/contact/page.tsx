"use client";

import { useForm } from "react-hook-form";
import { FormLabel } from '../_components/form/FormLabel';
import { FormInput } from '../_components/form/FormInput';
import { FormButton } from '../_components/form/FormButton';
import { FormTextarea } from "../_components/form/FormTextarea";
import AuthIllustration from '../_components/AuthIllustration';
import Link from 'next/link';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        alert("送信しました");
        reset();
      } else {
        alert("送信に失敗しました");
      }
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] space-y-6 mx-auto">
        <h1 className="text-2xl font-bold text-center">お問い合わせ</h1>
        <div>
          <FormLabel htmlFor='name'>お名前</FormLabel>
          <FormInput
            loading={isSubmitting}
            className="focus:border-blue-500 focus:ring focus:ring-blue-200"
            {...register("name", {
              required: "名前は必須です",
              maxLength: { value: 30, message: "30文字以内で入力してください" },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <FormLabel htmlFor='email'>メールアドレス</FormLabel>
          <FormInput
            loading={isSubmitting}
            className="focus:border-blue-500 focus:ring focus:ring-blue-200"
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "正しいメールアドレスを入力してください",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <FormLabel htmlFor="text">本文</FormLabel>
          <FormTextarea
            rows={5}
            loading={isSubmitting}
            {...register("message", { required: "本文は必須です" })}
          />
          {errors.message && (
            <p>{errors.message.message}</p>
          )}
        </div>
        <div className="flex justify-between gap-4">
          <FormButton
            type="submit"
            loading={isSubmitting}
            label="送信"
          />
          <FormButton
            type="button"
            loading={isSubmitting}
            label="クリア"
            onClick={() => reset()}
          />
        </div>
      </form>
    </main>
  );
}
