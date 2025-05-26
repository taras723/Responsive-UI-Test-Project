// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CurrencyDropdown, LanguageDropdown } from '@/components/Dropdown';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#01060F] flex flex-col max-w-xl mx-auto items-center font-helvetica text-[12px] font-normal leading-[100%] tracking-[0.03em] m-auto">
      <div className="bg-[#FFFFFF0A] w-full h-[52px] flex justify-between px-3 py-2">
        <div className='w-20 h-9 rounded-3xl p-2 gap-2 bg-white opacity-10'>
        </div>
        <div className='gap-1 flex'>
          <CurrencyDropdown />
          <LanguageDropdown />

        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-4 w-full py-40 max-w-md"
      >
        <Button
          onClick={() => router.push('/auth/register')}
          className="bg-white mx-14 text-black rounded-full py-6"
        >
          Registration
        </Button>
        <Button
          onClick={() => router.push('/auth/login')}
          className="bg-white mx-14 text-black rounded-full py-6"
        >
          Login
        </Button>
        <Button
          onClick={() => router.push('/orders')}
          className="bg-white mx-6 mt-6 text-black rounded-full py-6"
        >
          Orders
        </Button>
      </motion.div>
    </div>
  );
}