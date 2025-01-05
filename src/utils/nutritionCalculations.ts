import { Product, TotalNutrition } from "../types";


// MonthlyDate.tsxで使用する
// 配列から月間の総栄養素を計算する関数
// 理想の結果は...
//        {totalEnergy: 300, totalProtein: 300, totalFat: 3000...}
// {totalEnergy: 300, totalProtein: 300, totalFat: 3000...}を別のファイルtypes/index.tsで定義しておく
export function nutritionCalculations(products: Product[]): TotalNutrition {
  return products.reduce((acc, product) => {
    acc.totalEnergy += product.energy;
    acc.totalProtein += product.protein;
    acc.totalFat += product.fat;
    acc.totalCarbo += product.carbo;
    acc.totalSalt += product.salt;
    acc.totalCalcium += product.calcium;  
    return acc;
  },{totalEnergy: 0, totalProtein: 0, totalFat: 0, totalCarbo: 0, totalSalt: 0, totalCalcium: 0})
}

// Calendar.tsxで使用する
// １日ごとの日付をキーとした栄養素を計算する関数
// 理想は下の形
//       {
//         "2024-12-24": {totalEnergy: 200, totalProtein: 300, totalFat: 300, totalCarbo: 300, totalSalt: 300, totalCalcium: 300},
//         "2024-12-25": {totalEnergy: 200, totalProtein: 300, totalFat: 300, totalCarbo: 300, totalSalt: 300, totalCalcium: 300},
//       }
// 返す値が上のものと決まったので、Record<key, value>の形をとる
// 初期値が未定でtsのエラーが出るので、reduceの後に再度返す型を<>で囲む
export function dailyNutritionCalculations(products: Product[]): Record<string, TotalNutrition> {
  return products.reduce<Record<string, TotalNutrition>>((acc, product) => {
    const day = product.date;
    if(!acc[day]) {
      acc[day] = {totalEnergy: 0, totalProtein: 0, totalFat: 0, totalCarbo: 0, totalSalt: 0, totalCalcium: 0}
    } 
    acc[day].totalEnergy += product.energy;
    acc[day].totalProtein += product.protein;
    acc[day].totalFat += product.fat;
    acc[day].totalCarbo += product.carbo;
    acc[day].totalSalt += product.salt;
    acc[day].totalCalcium += product.calcium;
    return acc;
  }, {})
}