'use client'
import Image from 'next/image'
import React, { useState,useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaRegBell } from 'react-icons/fa'
import { FaRegCircleUser } from 'react-icons/fa6'
import { MdVideoCameraFront } from 'react-icons/md'
import Modal from './Modal'
import VideoForm from './VideoForm'
import Link from 'next/link'
import { useAppDispatch } from '../redux/hooks'
import { setSearchTerm } from '../redux/slices/searchSlice';
import { fetchVideos, resetFilteredVideos } from '../redux/slices/videoSlice'


const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    const [term, setTerm] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (term.trim() === '') {
    
            dispatch(resetFilteredVideos());
        } else {
         
            dispatch(setSearchTerm(term));
        }
    }, [term, dispatch]); 

    return (
        <nav className='flex justify-between items-center w-full gap-10 mx-auto top-0 fixed shadow-md h-[80px] pl-10 bg-white z-40'>
            <Link href={'/'}><Image src='/sample-logo.png' width={120} height={120} className='p-4' alt='logo' /></Link>
            <div className="mx-auto flex gap-12">
              
                    <form className="flex rounded-full w-[27rem] justify-between px-4 py- border border-[#1319B9CC] items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            className="outline-none w-full bg-transparent"
                        />
                        <button type="submit" aria-label="Search">
                            <BiSearch className='h-5 w-5' />
                        </button>
                    </form>

             
                <div
                    className="flex gap-2 px-4 items-center bg-[#F92D2DD9] rounded-full py-1.5 cursor-pointer"
                    onClick={handleOpenModal}
                >
                    <MdVideoCameraFront className='h-5 w-5 text-white' />
                    <p className='text-white'>Create</p>
                </div>
            </div>
            <div className="mx-auto flex gap-4 items-center">
                <FaRegBell className='h-5 w-5' />
                <FaRegCircleUser className='h-8 w-8' />
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <VideoForm />
            </Modal>
        </nav>
    )
}

export default NavBar
