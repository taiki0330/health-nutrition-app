import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { Product } from '../types';
import { nutritionCalculations } from '../utils/nutritionCalculations';



interface DailyNutritionProps {
	dailyProducts: Product[], // Home.tsx->TransactionMenu.tsxから受け取り
}


// コンポーネント
const DailyNutrition = ({dailyProducts}: DailyNutritionProps) => {


	// 別コンポーネントで作成した栄養素計算関数をもってきて、分割代入をしている。
	const {totalEnergy, totalProtein, totalFat, totalCarbo, totalSalt, totalCalcium} = nutritionCalculations(dailyProducts);


	return (
		<Box>
			<Grid container spacing={1}>
				{/* エネルギー */}
				<Grid item xs={4} display={'flex'}>
					<Card
						sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
					>
						<CardContent>
							<Typography variant="body2" noWrap textAlign="center">
								エネルギー
							</Typography>
							<Typography
								color={(theme) => theme.palette.energyColor.main}
								textAlign="right"
								fontWeight="fontWeightBold"
								sx={{ wordBreak: 'break-all' }}
							>
								{totalEnergy}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{/* タンパク質 */}
				<Grid item xs={4} display={'flex'}>
					<Card
						sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
					>
						<CardContent>
							<Typography variant="body2" noWrap textAlign="center">
								タンパク質
							</Typography>
							<Typography
								color={(theme) => theme.palette.proteinColor.main}
								textAlign="right"
								fontWeight="fontWeightBold"
								sx={{ wordBreak: 'break-all' }}
							>
								{totalProtein}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{/* 脂質 */}
				<Grid item xs={4} display={'flex'}>
					<Card
						sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
					>
						<CardContent>
							<Typography variant="body2" noWrap textAlign="center">
								脂質
							</Typography>
							<Typography
								color={(theme) => theme.palette.fatColor.main}
								textAlign="right"
								fontWeight="fontWeightBold"
								sx={{ wordBreak: 'break-all' }}
							>
								{totalFat}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{/* 炭水化物 */}
				<Grid item xs={4} display={'flex'}>
					<Card
						sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
					>
						<CardContent>
							<Typography variant="body2" noWrap textAlign="center">
								炭水化物
							</Typography>
							<Typography
								color={(theme) => theme.palette.carboColor.main}
								textAlign="right"
								fontWeight="fontWeightBold"
								sx={{ wordBreak: 'break-all' }}
							>
								{totalCarbo}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{/* 食塩相当量 */}
				<Grid item xs={4} display={'flex'}>
					<Card
						sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
					>
						<CardContent>
							<Typography variant="body2" noWrap textAlign="center">
								食塩相当量
							</Typography>
							<Typography
								color={(theme) => theme.palette.saltColor.main}
								textAlign="right"
								fontWeight="fontWeightBold"
								sx={{ wordBreak: 'break-all' }}
							>
								{totalSalt}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{/* カルシウム */}
				<Grid item xs={4} display={'flex'}>
					<Card
						sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
					>
						<CardContent>
							<Typography variant="body2" noWrap textAlign="center">
								カルシウム
							</Typography>
							<Typography
								color={(theme) => theme.palette.calciumColor.main}
								textAlign="right"
								fontWeight="fontWeightBold"
								sx={{ wordBreak: 'break-all' }}
							>
								{totalCalcium}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};
export default DailyNutrition;
