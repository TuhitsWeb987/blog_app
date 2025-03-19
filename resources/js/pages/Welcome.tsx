import { PageProps } from '@/types';
import Nav from '@/components/Nav';
import { Post } from '@/types/posts';
import { Head, Link } from '@inertiajs/react';
import ListPost from '@/components/posts/ListPost';

export default function Welcome({auth, posts, canRegister}: PageProps<{posts: Post[], canRegister: boolean}>) {
    return (
        <>
            <Head title='Welcome' />
            <div className='min-h-screen'>
                <Nav /> 
                <div className='bg-white'>
                    <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
                        <div className='text-center'>
                            <h1 className='text-4xl font-black text-gray-800'>
                                <span className='block'>Bienvenu sur</span>
                                <span className='block text-indigo-700'>
                                    Notre Blog Communautaire
                                </span>
                            </h1>
                            <p className='mt-3 max-w-md mx-auto text-gray-500'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, libero itaque beatae fugit possimus porro facere dolorem harum ex repudiandae distinctio suscipit sed fugiat optio atque quasi corporis nobis maxime.
                            </p>
                            {!auth.user && canRegister && (
                                <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
                                    <div className='rounded-md shadow-md'>
                                        <Link href={route('register')} className='inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'>
                                            Commencer
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='max-w-7xl mx-auto px-4 sm:px-6 py-12'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl font-extrabold text-gray-800'>
                            Articles récents
                        </h2>
                        <p className='mt-3 max-w-2xl mx-auto text-xl'>
                            Les derniers articles publiés par nos utilisateurs
                        </p>
                    </div>
                    <ListPost posts={posts}></ListPost>
                </div>
            </div>
        </>
    )
}
