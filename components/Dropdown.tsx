// app/components/Dropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const flags: { [key: string]: string } = {
  EN: '🇬🇧',
  UA: '🇺🇦',
  USD: '🇺🇸',
  UAH: '🇺🇦',
  EUR: '🇪🇺',
};

export function CurrencyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useAuthStore();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { value: 'USD', label: 'USD', flag: flags.USD },
    { value: 'UAH', label: 'UAH', flag: flags.UAH },
    { value: 'EUR', label: 'EUR', flag: flags.EUR },
  ];

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false); // Close dropdown when pathname changes
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 py-2 cursor-pointer pl-2 pr-4 rounded-[32px] h-9 border-none bg-[#FFFFFF0A] text-white"
      >
        <span className="w-5 h-5 rounded-full bg-[#1273EB] flex items-center justify-center">
          <img src={'/images/dollar.svg'} alt="Currency Icon" />
        </span>
        <span>{currency}</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute w-[74px] bg-[#2C4451] rounded-[12px] top-full mt-2 shadow-lg z-10"
          >
            {currencies.map((curr, index) => (
              <li
                key={curr.value}
                className={`${curr.value === currency && 'bg-[#FFFFFF29]'} ${
                  index !== 0 && index !== currencies?.length - 1 ? 'border-b border-[#FFFFFF1F]' : ''
                } ${index === 0 && 'rounded-t-[12px]'} ${index === currencies?.length - 1 && 'rounded-b-[12px]'}`}
              >
                <Button
                  variant="ghost"
                  className="w-full text-left p-2 gap-1 text-white flex items-center space-x-2"
                  onClick={() => {
                    setCurrency(curr.value);
                    setIsOpen(false);
                  }}
                >
                  <span className="w-5 h-5 rounded-full bg-[#1273EB] flex items-center justify-center">
                    <img src={'/images/dollar.svg'} alt="Currency Icon" />
                  </span>
                  <span>{curr.label}</span>
                </Button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useAuthStore();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: 'EN', label: 'EN', flag: flags.EN },
    { value: 'UA', label: 'UA', flag: flags.UA },
  ];

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false); // Close dropdown when pathname changes
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-1" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 py-2 cursor-pointer pl-2 pr-4 rounded-[32px] h-9 border-none bg-[#FFFFFF0A] text-white"
      >
        <span>
          <img className="" src={`/images/${language}_flag.svg`} alt={language} />
        </span>
        <span>{language}</span>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer p-2 w-9 h-9 rounded-full border-none bg-[#FFFFFF0A] text-white">
        <span>
          <img className="" src={`/images/${language}_flag.svg`} alt={language} />
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute w-[65px] bg-[#2C4451] rounded-[12px] top-full mt-2 shadow-lg z-10"
          >
            {languages.map((lang, index) => (
              <li
                key={lang.value}
                className={`${lang.value === language && 'bg-[#FFFFFF29]'} ${
                  index !== 0 && index !== languages?.length - 1 ? 'border-b border-[#FFFFFF1F]' : ''
                } ${index === 0 && 'rounded-t-[12px]'} ${index === languages?.length - 1 && 'rounded-b-[12px]'}`}
              >
                <Button
                  variant="ghost"
                  className="w-full text-left p-2 gap-1 text-white flex items-center space-x-2"
                  onClick={() => {
                    setLanguage(lang.value);
                    setIsOpen(false);
                  }}
                >
                  <span>
                    <img src={`/images/${lang.value}_flag.svg`} alt={lang.value} />
                  </span>
                  <span>{lang.label}</span>
                </Button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}