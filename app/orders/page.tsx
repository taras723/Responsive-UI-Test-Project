//app/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { CurrencyDropdown, LanguageDropdown } from '@/components/Dropdown';

interface Order {
    id: number;
    transactionId: number;
    date: string;
    status: string;
    gameName: string;
    gameId: number;
    amount: number;
    goods: { item1: number; count: number; plusCount: number; total: number, itemDiscount:number };
}

// Variants for list and detail view animations
const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const detailVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function OrdersPage() {
    const router = useRouter();
    const { currency, language } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/orders');
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load orders');
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center p-4 text-white">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

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

            {/* Orders List or Detail View */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-3 w-full px-3 py-3"
            >
                {selectedOrder ? (
                    <motion.div
                        variants={detailVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-card  px-3 py-3 rounded-2xl relative"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className=" cursor-pointer w-6 h-6" onClick={() => setSelectedOrder(null)} >
                                <img src={'/images/close.svg'} width={24} height={24} className='w-6 h-6' alt='close' />
                            </div>
                            <h2 className="text-xl font-bold text-white ">#{selectedOrder.transactionId}</h2>
                        </div>
                        <div className="space-y-2 bg-[#1F242C] px-4 py-[12px] rounded-[16px]">
                            <div className="flex justify-between gap-1">
                                <div className="flex flex-col gap-2 min-w-[85px]">
                                    <div className='text-white opacity-50'>Transaction ID</div>
                                    <div className='text-white'>#{selectedOrder.id}</div>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[85px]">
                                    <div className='text-white opacity-50'>Date</div>
                                    <div className='text-white'>{selectedOrder.date}</div>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[85px]">
                                    <div className='text-white opacity-50'>Status</div>
                                    <div className='text-white flex gap-1'><div className='w-3 h-3 border rounded-full border-[#FFFFFF3D] bg-[#11B174]'></div>{selectedOrder.status}</div>
                                </div>
                            </div>
                            <div className='my-3 border border-[#FFFFFF] opacity-10'></div>
                            <div className="flex justify-between gap-1">
                                <div className="flex flex-col gap-2 min-w-[85px]">
                                    <div className='text-white opacity-50'>Game Name</div>
                                    <div className='text-white'>{selectedOrder.gameName}</div>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[85px]">
                                    <div className='text-white opacity-50'>Game ID</div>
                                    <div className='text-white'>{selectedOrder.gameId}</div>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[85px]">
                                    <div className='text-white opacity-50'>Amount</div>
                                    <div className='text-white flex gap-1'>${selectedOrder.amount}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between">
                                <h3 className="text-lg text-white">Your Goods:</h3>
                                <div className="flex gap-2">
                                    <h3 className="text-lg text-white">1</h3>
                                    <h3 className="text-lg text-white">-</h3>
                                    <h3 className="text-lg text-white">${selectedOrder.goods.item1.toLocaleString()}</h3>
                                </div>
                            </div>
                            <div className="bg-[#FFFFFF1F] flex items-center justify-center px-4 py-6 rounded-[16px] mt-2 text-white">
                                <div className="flex flex-col gap-[19px] ">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className='' style={{fontWeight: 700, fontSize: '16px'}} >{selectedOrder.goods.count.toLocaleString()}</div>
                                        <div className="bg-[#FFFFFF1F] p-2 h-[28px] flex justify-center items-center rounded-[24px]" style={{fontWeight: 700, fontSize: '12px'}} >
                                            +{selectedOrder.goods.plusCount.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className='' style={{fontWeight: 700, fontSize: '14px'}} >{selectedOrder.goods.item1.toLocaleString()}$</div>
                                        <div className='line-through opacity-50' style={{fontWeight: 700, fontSize: '12px'}} >{selectedOrder.goods.itemDiscount.toLocaleString()}$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full bg-white text-black rounded-full py-6 mt-6">
                            Ask ?
                        </Button>
                    </motion.div>
                ) : (
                    <div className="space-y-4 w-full  px-3 py-2">
                        <div className="flex items-center space-x-2">
                            <div onClick={() => router.push('/')} className="text-white cursor-pointer">
                                <img src={'/images/fi_2732652.svg'} alt='fi_2732652' />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Orders</h1>
                        </div>
                        {orders.map((order, index) => (
                            <motion.div
                                key={index}
                                variants={listVariants}
                                initial="hidden"
                                animate="visible"
                                className="bg-[#1F242C] px-4 py-[12px] rounded-[16px] cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="flex justify-between gap-1">
                                    <div className="flex flex-col gap-2 min-w-[85px]">
                                        <div className='text-white opacity-50'>Transaction ID</div>
                                        <div className='text-white'>#{order.id}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 min-w-[85px]">
                                        <div className='text-white opacity-50'>Date</div>
                                        <div className='text-white'>{order.date}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 min-w-[85px]">
                                        <div className='text-white opacity-50'>Status</div>
                                        <div className='text-white flex gap-1'><div className='w-3 h-3 border rounded-full border-[#FFFFFF3D] bg-[#11B174]'></div>{order.status}</div>
                                    </div>
                                </div>
                                <div className='my-3 border border-[#FFFFFF] opacity-10'></div>
                                <div className="flex justify-between gap-1">
                                    <div className="flex flex-col gap-2 min-w-[85px]">
                                        <div className='text-white opacity-50'>Game Name</div>
                                        <div className='text-white'>{order.gameName}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 min-w-[85px]">
                                        <div className='text-white opacity-50'>Game ID</div>
                                        <div className='text-white'>{order.gameId}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 min-w-[85px]">
                                        <div className='text-white opacity-50'>Amount</div>
                                        <div className='text-white flex gap-1'>${order.amount}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}