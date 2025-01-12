import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calendar.css'
import { DateClickArg, DatesSetArg, EventContentArg } from 'fullcalendar/index.js'
import { Product, TotalNutrition, CalendarContent} from '../types'
import { dailyNutritionCalculations } from '../utils/nutritionCalculations'
import interactionPlugin from '@fullcalendar/interaction'
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'

// プロップスで受け取るデータを型定義
interface CalendarProps {
  monthlyProducts: Product[], // Home.tsxから受け取り
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>, // App.tsx -> Home.tsxから受け取り
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>, // Home.tsxから受け取り
  currentDay: string, // Home.tsxから受け取り
  today: string, // Home.tsxから受け取り
}


// コンポーネント
const Calendar = ({ monthlyProducts, setCurrentMonth, setCurrentDay, currentDay, today }: CalendarProps) => {
  // MUIのuseThemeを使用する((theme)=> Palette.energyColor.lightはJSX内でしか使えないため)
  const theme = useTheme()

  // カレンダー内のイベントで使用可能な形
  // const events = [
  //   { title: "Meeting", start: new Date(), totalEnergy: 100, totalProtein: 300, totalFat: 300, totalCarbo: 300, totalSalt: 300, totalCalcium: 300 },
  // ]

  // 月間データ
  // console.log(monthlyProducts);

  // 月間データから日付ごとのデータに変換
  const dailyProduct = dailyNutritionCalculations(monthlyProducts);
  console.log("その月の日々の栄養素は", dailyProduct);

  // 上の日付データをFullCalendarで使用できるようにする関数
  // 現在は以下の形......
  // {
  //   "2024-12-24": {totalEnergy: 200, totalProtein: 300, totalFat: 300, totalCarbo: 300, totalSalt: 300, totalCalcium: 300},
  //   "2024-12-25": {totalEnergy: 200, totalProtein: 300, totalFat: 300, totalCarbo: 300, totalSalt: 300, totalCalcium: 300},
  // }
  // 理想は以下の形.....上のeventsの形に合わせる
  // [
  //   {start: "2024-12-24",totalEnergy: 300, totalProtein: 300, totalFat: 300, totalCarbo: 300, totalSalt: 300, totalCalcium: 300},
  //   {start: "2024-12-25",totalEnergy: 300, totalProtein: 300, totalFat: 300, totalCarbo: 300, totalSalt: 300, totalCalcium: 300},
  // ]
  // Object.keys(dailyData)とすることで、オブジェクトの中のkeyにアクセスすることができる。
  const createCalendarEvents = (dailyData: Record<string, TotalNutrition>): CalendarContent[] => {
    return Object.keys(dailyData).map((date) => {
      // const {energy, protein, fat, carbo, salt, calcium} = dailyData[date]とすることもできる
      return {
        start: date,
        totalEnergy: dailyData[date].totalEnergy,
        totalProtein: dailyData[date].totalProtein,
        totalFat: dailyData[date].totalFat,
        totalCarbo: dailyData[date].totalCarbo,
        totalSalt: dailyData[date].totalSalt,
        totalCalcium: dailyData[date].totalCalcium,
      }
    })
  }
  const calenderEvent = createCalendarEvents(dailyProduct);


  // 選択した日付の背景色を変更するイベントを作成
  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.energyColor.light,
  }
  // スプレッド構文で展開してbackgroundEventの中身を統合する->127行目にもってくる
  // console.log([...calenderEvent, backgroundEvent]);


  // カスタムなデータ表示方法を設定
  const renderEventContent = (eventInfo: EventContentArg) => {
    // console.log(eventInfo);
    return (
      <div>
        {/* カレンダー内のエネルギーの表示 */}
        <div className='nutrition' id='event-energy'>
          {eventInfo.event.extendedProps.totalEnergy}
        </div>
        {/* カレンダー内のたんぱく質の表示 */}
        <div className='nutrition' id='event-protein'>
          {eventInfo.event.extendedProps.totalProtein}
        </div>
        {/* カレンダー内の脂質の表示 */}
        <div className='nutrition' id='event-fat'>
          {eventInfo.event.extendedProps.totalFat}
        </div>
        {/* カレンダー内の炭水化物の表示 */}
        <div className='nutrition' id='event-carbo'>
          {eventInfo.event.extendedProps.totalCarbo}
        </div>
        {/* カレンダー内の食塩相当量の表示 */}
        <div className='nutrition' id='event-salt'>
          {eventInfo.event.extendedProps.totalSalt}
        </div>
        {/* カレンダー内のカルシウムの表示 */}
        <div className='nutrition' id='event-calcium'>
          {eventInfo.event.extendedProps.totalCalcium}
        </div>
      </div>
    )
  }

  // App.tsxからもってきた現在の月を管理するsetCurrentMonthに、選択したデータを表示するdatesetInfoの情報を入れて更新する
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    // isSameMonthで月を比較できる。todayDateには今月のデータも入っている
    if(isSameMonth(todayDate, currentMonth)) {
      // 今日ボタンの処理: datesetInfoには月のデータしか入っていないので、js（Home.tsx）から今日のデータを持ってきてsetCurrentDayで管理する
      setCurrentDay(today);
    };
  }

  // カレンダーをクリックしに付け情報を取得のうえ、currentDayに渡す
  const handleDateClick = (dateInfo: DateClickArg) => {
    // console.log(dateInfo);
    setCurrentDay(dateInfo.dateStr);
  }



  return (
    <FullCalendar 
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      // 上記のフルカレンダー用に変更したデータの形をeventsに設定
      events={[...calenderEvent, backgroundEvent]}
      // 上記のeventsのようにカスタムでプロパティを設定する関係
      eventContent={renderEventContent}
      // 月を変更するボタンを押した処理
      datesSet={handleDateSet}
      // カレンダーをクリック
      dateClick={handleDateClick}
    />
  )
}

export default Calendar