import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'


export async function getServerSideProps(context : NextPageContext) {
    const session = await getSession(context)

    if(!session){
      return {
        redirect :{
          destination:'/auth',
          permanent: false
        }
      }
    }
    return {
      props:{}
    }
}

const profiles = () => {
    const {data:user}= useCurrentUser()
    const router = useRouter()
  return (
     <div className="flex items-center h-full justify-center">
        <div className="flex flex-col">
            <h1 className='text-3xl text-white text-center md:text-6xl'>Who is watching?</h1>
             <div className="flex items-center gap-8 justify-center mt-10">
                <div onClick={()=>{router.push('/')}}>
                   <div className="group flex-row w-44 mx-auto">
                      <div className="w-44 h-44 rounded-md flex items-center justify-center
                       border-2 border-transparent group-hover:border-white 
                       group-hover:cursor-pointer overflow-hidden">
                        <img src="/images/default-green.png" alt="profiles" />
                       </div>
                       <div className="mt-4 text-gray-400 text-center group-hover:text-white">
                          {user?.name}
                       </div>
                   </div>
                </div>
             </div>
        </div>
     </div>
  )
}

export default profiles