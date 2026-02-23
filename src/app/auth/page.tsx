'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';

import PageLoading from '@/shared/components/feedback/PageLoading';
import { LogoLink } from '@/shared/components/ui/logoLink/LogoLink';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Suspense fallback={<PageLoading />}>
      <div className="grid min-h-screen grid-cols-3">
        <div className="border-appText/5 col-span-3 flex h-full flex-col justify-between border-r bg-appBackground text-appText lg:col-span-2">
          <div className="flex flex-col items-center justify-center gap-3 overflow-hidden text-lg text-appText">
            <div className="h-full">
              <Image
                src="/honrado.jpeg"
                alt="Tsundoku"
                width={1920}
                height={1024}
                className="min-w-screen min-h-screen object-cover opacity-35"
              />
            </div>

            <div className="absolute flex flex-col items-center justify-center gap-2">
              <LogoLink />
              <span className="font-semibold text-appText">
                Light Novels e Mangás
              </span>
              <footer className="text-center text-sm">
                Tsundoku &copy; - {new Date().getFullYear()}
              </footer>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center bg-appListBackground">
          <p
            onClick={() => setIsLogin(!isLogin)}
            className="absolute right-4 top-4 cursor-pointer text-sm text-appText"
          >
            {isLogin ? 'Não possui uma conta?' : 'Já possui uma conta?'}
          </p>
          <>{isLogin ? <SignIn /> : <SignUp />}</>
        </div>
      </div>
    </Suspense>
  );
}
