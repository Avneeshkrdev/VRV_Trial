
        import React from 'react';
import Sidebar from '@/components/Sidebar';
        export default function withSidebar(Component: React.ComponentType) {
            return function WrappedComponent() {
                return (
                    <div className="flex h-screen bg-gray-100">
                    <Sidebar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
                      <Component/>
                    </main>
                  </div>
                )
            }
        }