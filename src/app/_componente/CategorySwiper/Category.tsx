
import getAllCategory from '@/Api/AllCategory'
import CategorySwiper from '@/FileClientComponent/CategorySwiper'

import React from 'react'

export default async function Category() {
  const data = await getAllCategory()
  console.log(data)

  return (
    <div className='mb-3 '>
       <h2 className='sm:text-3xl text-black p-4 text-center'>Show Popular Categories</h2>
     <CategorySwiper  Categories={data}/>
    </div>
  )
}

