
import getAllCategory from '@/Api/AllCategory'
import CategorySwiper from '@/FileClientComponent/CategorySwiper'

import React from 'react'

export default async function Category() {
  const data = await getAllCategory()

  return (
    <div className='mb-3'>
       <h2 className='text-2xl sm:text-3xl font-semibold text-black p-4 text-center'>Popular Categories</h2>
     <CategorySwiper  Categories={data}/>
    </div>
  )
}

