import React from 'react'
import { MainBanner } from '../components/MainBanner'
import { Categories } from '../components/Categories'
import { BestSeller } from '../components/BestSeller'
import { BottomBanner } from '../components/BottomBanner'
import { Newsletter } from '../components/Newsletter'

export const Home = () => {
  return (
    <div>
        <MainBanner/>
        <Categories/>
        <BestSeller/>
        <BottomBanner/>
        <Newsletter/>
    </div>
  )
}
