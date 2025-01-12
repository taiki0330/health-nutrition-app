import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import fontWeightBold from '../theme/theme';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import AnimationIcon from '@mui/icons-material/Animation';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import { Product, User } from '../types';
import { nutritionCalculations } from '../utils/nutritionCalculations';

// プロップスで受け取るデータを型定義
interface MonthlyDataProps {
  monthlyProducts: Product[];   // App.tsx -> Home.tsxからの受け取り
	users: User[]; // App.tsx->Home.tsxから受け取り
}


// コンポーネント 
const MonthlyData = ({monthlyProducts, users}: MonthlyDataProps) => {
  // 月々の栄養素を計算する関数をutils/nutritionCalculations.tsから持ってきて、今月分のデータを入れて計算し、分割代入している。
  const {totalEnergy, totalProtein, totalFat, totalCarbo, totalSalt, totalCalcium} = nutritionCalculations(monthlyProducts);
  console.log("monthlyProductsは", monthlyProducts);

	return (
    <>
		{/* ユーザーデータを表示 */}
		<Card sx={{ minWidth: 275, mb: 2 }}>
			{users.map((user) => (
				<CardContent key={user.id}>
					<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
						name: {user.name}
					</Typography>
					<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>weight: {user.weight}</Typography>
					<Typography sx={{ color: 'text.secondary'}}>height: {user.height}</Typography>
					<CardActions>
						<Button>編集する</Button>
					</CardActions>
				</CardContent>
			))}
    </Card>
		{/* 月間栄養素を表示 */}
		<Grid container spacing={{xs: 1, sm: 2}} marginBottom={{xs: 1, sm: 2}}>
      {/* それぞれのグリッドアイテム */}
      {/* 月間エネルギー */}
			<Grid item xs={4} display={"flex"} flexDirection={"column"}>
        {/* カード枠 */}
				<Card sx={{ bgcolor: (theme) => theme.palette.energyColor.main, color: 'white', borderRadius: '10px', flexGrow: 1 }}>
          {/* カードの内容 */}
					<CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            {/* カード内の上部 */}
						<Stack direction={'row'}>
							<ElectricBoltIcon sx={{ fontSize: '2rem' }} />
							<Typography>総エネルギー</Typography>
						</Stack>
            {/* カード内の下部 */}
						<Typography
							textAlign={'right'}
							variant="h5"
							fontWeight={'fontWeightBold'}
							sx={{ wordBreak: 'break-word', fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"}}}
						>
							{totalEnergy}cal
						</Typography>
					</CardContent>
				</Card>
			</Grid>

      {/* 月間タンパク質 */}
			<Grid item xs={4} display={"flex"} flexDirection={"column"}>
        {/* カード枠 */}
				<Card sx={{ bgcolor: (theme) => theme.palette.proteinColor.main, color: 'white', borderRadius: '10px', flexGrow: 1 }}>
          {/* カードの内容 */}
					<CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            {/* カード内の上部 */}
						<Stack direction={'row'}>
							<AccessibilityIcon sx={{ fontSize: '2rem' }} />
							<Typography>総タンパク質</Typography>
						</Stack>
            {/* カード内の下部 */}
						<Typography
							textAlign={'right'}
							variant="h5"
							fontWeight={'fontWeightBold'}
							sx={{ wordBreak: 'break-word', fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"}}}
						>
						{totalProtein}cal
						</Typography>
					</CardContent>
				</Card>
			</Grid>

      {/* 月間脂質 */}
			<Grid item xs={4} display={"flex"} flexDirection={"column"}>
        {/* カード枠 */}
				<Card sx={{ bgcolor: (theme) => theme.palette.fatColor.main, color: 'white', borderRadius: '10px', flexGrow: 1 }}>
          {/* カードの内容 */}
					<CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            {/* カード内の上部 */}
						<Stack direction={'row'}>
							<AppleIcon sx={{ fontSize: '2rem' }} />
							<Typography>総脂質</Typography>
						</Stack>
            {/* カード内の下部 */}
						<Typography
							textAlign={'right'}
							variant="h5"
							fontWeight={'fontWeightBold'}
							sx={{ wordBreak: 'break-word', fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"}}}
						>
							{totalFat}cal
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>

    <Grid container spacing={{xs: 1, sm: 2}} mb={2}>
      {/* 月間炭水化物 */}
			<Grid item xs={4} display={"flex"} flexDirection={"column"}>
        {/* カード枠 */}
				<Card sx={{ bgcolor: (theme) => theme.palette.carboColor.main, color: 'white', borderRadius: '10px', flexGrow: 1 }}>
          {/* カードの内容 */}
					<CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            {/* カード内の上部 */}
						<Stack direction={'row'}>
							<AndroidIcon sx={{ fontSize: '2rem' }} />
							<Typography>総炭水化物</Typography>
						</Stack>
            {/* カード内の下部 */}
						<Typography
							textAlign={'right'}
							variant="h5"
							fontWeight={'fontWeightBold'}
							sx={{ wordBreak: 'break-word', fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"}}}
						>
							{totalCarbo}cal
						</Typography>
					</CardContent>
				</Card>
			</Grid>

      {/* 月間食塩相当量 */}
			<Grid item xs={4} display={"flex"} flexDirection={"column"}>
        {/* カード枠 */}
				<Card sx={{ bgcolor: (theme) => theme.palette.saltColor.main, color: 'white', borderRadius: '10px', flexGrow: 1 }}>
          {/* カードの内容 */}
					<CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            {/* カード内の上部 */}
						<Stack direction={'row'}>
							<AnimationIcon sx={{ fontSize: '2rem' }} />
							<Typography>総食塩相当量</Typography>
						</Stack>
            {/* カード内の下部 */}
						<Typography
							textAlign={'right'}
							variant="h5"
							fontWeight={'fontWeightBold'}
							sx={{ wordBreak: 'break-word', fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"}}}
						>
							{totalSalt}cal
						</Typography>
					</CardContent>
				</Card>
			</Grid>

      {/* 月間カルシウム */}
			<Grid item xs={4} display={"flex"} flexDirection={"column"}>
        {/* カード枠 */}
				<Card sx={{ bgcolor: (theme) => theme.palette.calciumColor.main, color: 'white', borderRadius: '10px', flexGrow: 1 }}>
          {/* カードの内容 */}
					<CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            {/* カード内の上部 */}
						<Stack direction={'row'}>
							<BatteryCharging50Icon sx={{ fontSize: '2rem' }} />
							<Typography>総カルシウム</Typography>
						</Stack>
            {/* カード内の下部 */}
						<Typography
							textAlign={'right'}
							variant="h5"
							fontWeight={'fontWeightBold'}
							sx={{ wordBreak: 'break-word', fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"}}}
						>
							{totalCalcium}cal
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>

    </>
	);
};

export default MonthlyData;
