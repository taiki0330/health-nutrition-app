// カテゴリーを型で指定する
export type ProductCategory = "食事" | "お菓子" | "飲み物" | "軽食" | "パン";


// 購入品のデータを型定義する
export interface Product {
  id: string,
  amount: number, //値段
  category: ProductCategory,
  content: string,
  date: string, //日付
  energy: number, //エネルギー
  protein: number, //タンパク質
  fat: number, //脂質
  carbo: number, //炭水化物
  salt: number, //食塩相当量
  calcium: number, //カルシウム
}

// 栄養素の結果を型定義しておく
export interface TotalNutrition{
  totalEnergy: number,
  totalProtein: number,
  totalFat: number,
  totalCarbo: number,
  totalSalt: number,
  totalCalcium: number,
}

// カレンダーで使用するデータの型を定義
export interface CalendarContent {
  start: string,
  totalEnergy: number,
  totalProtein: number,
  totalFat: number,
  totalCarbo: number,
  totalSalt: number,
  totalCalcium: number,
}