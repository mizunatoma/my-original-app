"use client";

import { useForm } from "react-hook-form";

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6 p-6 bg-white shadow-md rounded-md"
      >
        <h1 className="text-2xl font-bold text-center">お問い合わせ</h1>

        {/* 名前 */}
        <div>
          <label className="block font-medium text-gray-700">お名前</label>
          <input
            disabled={isSubmitting}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2
                       focus:border-blue-500 focus:ring focus:ring-blue-200"
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

        {/* メール */}
        <div>
          <label className="block font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            disabled={isSubmitting}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2
                       focus:border-blue-500 focus:ring focus:ring-blue-200"
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

        {/* 本文 */}
        <div>
          <label className="block font-medium text-gray-700">本文</label>
          <textarea
            rows={5}
            disabled={isSubmitting}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2
                       focus:border-blue-500 focus:ring focus:ring-blue-200"
            {...register("message", { required: "本文は必須です" })}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* ボタン */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md
                       hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? "送信中..." : "送信"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="bg-gray-300 px-6 py-2 rounded-md
                       hover:bg-gray-400 disabled:bg-gray-200"
          >
            クリア
          </button>
        </div>
      </form>
    </main>
  );
}
