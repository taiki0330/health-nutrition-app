import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlyData from '../components/MonthlyData'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Product } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'

// プロップスで受け取るデータを型定義
interface HomeProps {
  monthlyProducts: Product[],  // App.tsxからの受け取り
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>, // App.tsxから受け取り
  onSaveProduct: (product: Schema) => Promise<void>, // App.tsxから受け取り
}

// コンポーネント
const Home = ({monthlyProducts, setCurrentMonth, onSaveProduct}: HomeProps) => {

  // 現在の日付をstateで管理
  const today = format(new Date(), 'yyyy-MM-dd');
  const [currentDay, setCurrentDay] = useState(today);

  // formの開閉のためにbooleanで管理
  const [isFormActive, setIsFormActive] = useState(false);

  // その日のデータを取得
  const dailyProducts = monthlyProducts.filter((product) => {
    return product.date === currentDay;
  })
  console.log(dailyProducts);
  console.log(currentDay);

  // ×ボタンでフォームを閉じる処理
  const closeForm = () => {
    setIsFormActive(!isFormActive);
  }

  // フォームの開閉処理
  const handleTransactionForm = () => {
    setIsFormActive(!isFormActive);
  }

  // カードが選択された時の処理
  const handleSelectProduct = (product: Product) => {
    // 上と同じだが常に表示するのでtrue
    setIsFormActive(true);
  }


  return (
    <Box sx={{display: "flex"}}>

      {/* 左側に表示するコンテンツ */}
      <Box sx={{flexGrow: 1}}>
        {/* 上部に表示する部分 */}
        <MonthlyData monthlyProducts={monthlyProducts}/>
        {/* 下部に表示する部分 */}
        <Calendar 
          monthlyProducts={monthlyProducts}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>

    {/* 右側に表示するコンテンツ */}
    <Box >
        {/* 右側に表示する部分 */}
        <TransactionMenu 
          currentDay={currentDay}
          dailyProducts={dailyProducts}
          handleTransactionForm={handleTransactionForm}
          onSelectProduct={handleSelectProduct}
        />

        {/* 内訳ボタンの内容を表示する部分 */}
        <TransactionForm 
          isFormActive={isFormActive}
          onCloseForm={closeForm}
          currentDay={currentDay}
          onSaveProduct={onSaveProduct}
        />
    </Box>

    </Box>
  )
}

export default Home