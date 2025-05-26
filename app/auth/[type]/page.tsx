//app/auth/[type]/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/store/auth';
import { CurrencyDropdown, LanguageDropdown } from '@/components/Dropdown';

// Variants for form animation
const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
};

export default function AuthPage() {
    const { type } = useParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [useSocial, setUseSocial] = useState(false);
    const { login, register, currency, language } = useAuthStore();

    const isLogin = type === 'login';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError(null); // Clear previous errors
        startTransition(async () => {
            try {
                if (isLogin) {
                    await login(email, password);
                } else {
                    await register(email, password);
                }
                setSuccess(true);
                setTimeout(() => router.push('/'), 1000);
            } catch (err) {
                console.log(err);
                setError('Authentication failed');
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#01060F] relative flex flex-col my-auto max-w-xl mx-auto items-center font-helvetica text-[12px] font-normal leading-[100%] tracking-[0.03em] m-auto">
            {/* Currency and Language Selection */}
            {/* <div className="flex justify-end w-full mb-6 space-x-2">
                <CurrencyDropdown />
                <LanguageDropdown />
            </div> */}

            {/* Auth Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[16px] w-full max-w-md bg-[#20242C]"
            >
                <div className="flex justify-between items-center gap-6 mb-6">
                    <div className="flex h-10 max-w-[224px] bg-[#FFFFFF1F] w-full gap-1 rounded-[24px] text-white p-1 justify-center items-center">
                        <Button
                            onClick={() => router.push('/auth/login')}
                            className={`rounded-[20px] w-[106px] px-6 py-2 h-8 ${isLogin ? 'bg-white text-black' : 'bg-transparent text-white'}`}
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => router.push('/auth/register')}
                            className={`rounded-[20px] w-[106px] px-6 py-2 h-8 ${!isLogin ? 'bg-white text-black' : 'bg-transparent text-white'}`}
                        >
                            Registration
                        </Button>
                    </div>
                    <div
                        className="cursor-pointer w-6 h-6"
                        onClick={() => router.push('/')}
                    >
                        <img src={'/images/close.svg'} width={24} height={24} className='w-6 h-6' alt='close' />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.form
                        key={isLogin ? 'login' : 'register'}
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <Input
                            type="text"
                            placeholder="Email or Mobile"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-[#111419] rounded-[16px] text-white border border-[#FFFFFF1F] pl-3 py-4"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-[#111419] rounded-[16px] text-white border border-[#FFFFFF1F] pl-3 py-4"
                        />
                        {!isLogin && (
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-[#111419] rounded-[16px] text-white border border-[#FFFFFF1F] pl-3 py-4"
                            />
                        )}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="social" className='rounded-[4px] border-[#FFFFFF] border' checked={useSocial} onCheckedChange={(checked) => setUseSocial(!!checked)} />
                            <label htmlFor="social" className="text-sm text-gray-400">
                                Use social networks
                            </label>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-white text-black rounded-full h-11 py-6"
                        >
                            {isPending ? 'Loading...' : isLogin ? 'Login' : 'Registration'}
                        </Button>
                        <div className="flex flex-col gap-3 mt-6 justify-center space-x-3 mx-auto items-center">
                            <p>Use social networks</p>
                            <div className="flex gap-2">
                                <div>
                                    <img src={'/images/google.svg'} />
                                </div>
                                <div>
                                    <img src={'/images/apple.svg'} />
                                </div>
                                <div>
                                    <img src={'/images/facebook.svg'} />
                                </div>
                                <div>
                                    <img src={'/images/discord.svg'} />
                                </div>
                                <div>
                                    <img src={'/images/telegram.svg'} />
                                </div>
                            </div>
                        </div>
                        {isLogin && (
                            <p className="text-center text-sm text-gray-400 mt-6 underline cursor-pointer">
                                Forgot password?
                            </p>
                        )}
                    </motion.form>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}