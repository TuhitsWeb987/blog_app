import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DashboardProps } from '@/types/posts';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({userPosts}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='py-12'>
                <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                    <div className='overflow-hidden bg-white shadow-sm sm:rounded-lg'>
                        <div className='p-6'>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className='text-2xl font-semibold text-gray-900'>
                                    Mes publications
                                </h2>
                                <Link href={route('posts.create')}>
                                    Créer un post
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
