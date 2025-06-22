'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function MethodologyModal() {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="ml-2 rounded-full bg-gray-200 dark:bg-gray-700 p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                    title="How is Pain Score calculated?"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    {/* O overlay escuro */}
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                        Pain Score Methodology
                                    </Dialog.Title>
                                    <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                        <p>The Pain Score is a proprietary metric (from 0 to 100) designed to quantify market capitulation and fear for a specific crypto asset.</p>
                                        <p><strong className="text-gray-900 dark:text-white">A higher score means more "pain"</strong>, potentially indicating a better contrarian buying opportunity.</p>
                                        <p>Currently, the score is primarily calculated based on:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><span className="font-semibold">% Drawdown from All-Time High:</span> This is the most significant factor. The larger the drop, the higher the pain.</li>
                                            <li><span className="font-semibold">Recent Price Volatility:</span> Sharp recent drops (like the 24h change) are used to amplify the score, simulating immediate panic.</li>
                                        </ul>
                                        <p className="mt-2 text-xs italic">Disclaimer: This is an experimental tool for entertainment and should not be considered financial advice. DYOR.</p>
                                    </div>
                                    <div className="mt-5">
                                        <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none" onClick={closeModal}>
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}