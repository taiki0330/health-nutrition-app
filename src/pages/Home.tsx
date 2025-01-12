import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlyData from '../components/MonthlyData'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Product, User } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'

// プロップスで受け取るデータを型定義
interface HomeProps {
  monthlyProducts: Product[],  // App.tsxからの受け取り
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>, // App.tsxから受け取り
  onSaveProduct: (product: Schema) => Promise<void>, // App.tsxから受け取り
  onDeleteProduct: (productId: string) => Promise<void>, // App.tsxから受け取り
  onUpdateProduct:  (product: Schema, productId: string) => Promise<void>, // App.tsxから受け取り
  users: User[], // App.tsxから受け取り
}

// コンポーネント
const Home = ({monthlyProducts, setCurrentMonth, onSaveProduct, onDeleteProduct, onUpdateProduct, users}: HomeProps) => {

  // 現在の日付をstateで管理
  const today = format(new Date(), 'yyyy-MM-dd');
  const [currentDay, setCurrentDay] = useState(today);

  // formの開閉のためにbooleanで管理
  const [isFormActive, setIsFormActive] = useState(false);

  // 選択したproductカードをstateで管理
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // その日のデータを取得
  const dailyProducts = monthlyProducts.filter((product) => {
    return product.date === currentDay;
  })
  console.log("選択した日付のProductsは", dailyProducts);
  console.log("currentDayは", currentDay);

  // ×ボタンでフォームを閉じる処理
  const closeForm = () => {
    setIsFormActive(!isFormActive);
    setSelectedProduct(null);
  }

  // フォームの開閉処理(内訳追加ボタンを押したとき)
  const handleTransactionForm = () => {
    if(selectedProduct) {
      setSelectedProduct(null);
    } else {
      setIsFormActive(!isFormActive);
    }
  }

  // カードが選択された時の処理
  const handleSelectProduct = (product: Product) => {
    // 上と同じだが常に表示するのでtrue
    setIsFormActive(true);
    setSelectedProduct(product);
  }


  return (
    <Box sx={{display: "flex"}}>

      {/* 左側に表示するコンテンツ */}
      <Box sx={{flexGrow: 1}}>
        {/* 上部に表示する部分 */}
        <MonthlyData monthlyProducts={monthlyProducts} users={users}/>
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
          selectedProduct={selectedProduct}
          onDeleteProduct={onDeleteProduct}
          setSelectedProduct={setSelectedProduct}
          onUpdateProduct={onUpdateProduct}
        />
    </Box>

    </Box>
  )
}

export default Home