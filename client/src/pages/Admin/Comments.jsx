import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

const Comments = () => {
    const [filter, setFilter] = useState('Approved');
    const { value } = useAppContext();
    const { axios } = value;

    const fetchComments = async (axios) => {
        const { data } = await axios.get('/api/admin/comments');
        if (!data.success) throw new Error(data.message);
        return data.comments;
    };

    const {
        data: comments = [],
        isLoading: commentsLoading,
        error: commentsError,
        refetch: refetchComments
    } = useQuery({
        queryKey: ['adminComments'],
        queryFn: () => fetchComments(axios),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10
    });

    if (commentsLoading) return <div>Loading...</div>;
    if (commentsError) return <div className="text-red-400">{commentsError.message}</div>;

    return (
        <div className="ml-64 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className='flex justify-between items-center max-w-3xl mb-8'>
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Comments</h1>
                <div className='flex gap-4'>
                    <button
                        onClick={() => setFilter('Approved')}
                        className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${filter === 'Approved' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent scale-105' : 'bg-white/10 text-zinc-200 border-white/20 hover:bg-indigo-100/10 hover:text-indigo-300'}`}
                    >
                        Approved
                    </button>
                    <button
                        onClick={() => setFilter('Not Approved')}
                        className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${filter === 'Not Approved' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent scale-105' : 'bg-white/10 text-zinc-200 border-white/20 hover:bg-indigo-100/10 hover:text-indigo-300'}`}
                    >
                        Not Approved
                    </button>
                </div>
            </div>
            <div className='relative max-w-4xl overflow-x-auto shadow-2xl rounded-2xl scrollbar-hide bg-white/10 backdrop-blur-md border border-white/20'>
                <table className='w-full text-sm text-zinc-200'>
                    <thead className='text-xs text-zinc-300 text-left uppercase bg-white/5'>
                        <tr>
                            <th scope="col" className="px-4 py-4">Blog Title and Comments</th>
                            <th scope="col" className="px-4 py-4">Date</th>
                            <th scope="col" className="px-4 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.filter((comment) => {
                            if (filter === 'Approved') {
                                return comment.isApproved === true;
                            } else {
                                return comment.isApproved === false;
                            }
                        }).map((comment, index) => {
                            return <CommentTableItem key={comment._id} comment={comment} fetchComments={refetchComments} index={index + 1} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Comments