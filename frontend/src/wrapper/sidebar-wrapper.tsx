
        import React from 'react';
import Sidebar from '@/components/Sidebar';
        export default function withSidebar(Component: React.ComponentType) {
            return function WrappedComponent() {
                return (
                            <div className="flex flex-col h-screen bg-gray-100">
                                {/* <header className="bg-white shadow-sm h-16 flex items-center px-4 md:px-6 pl-16 md:pl-6">
                                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                                </header> */}
                                <div className="flex flex-1 overflow-hidden">
                                    <Sidebar />
                                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6 mt-16 md:mt-0">
                                        <Component  />
                                    </main>
                                </div>
                            </div>
                )
            }
        }