import React from 'react'
import { ProductCategory } from '../../types';
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CakeIcon from '@mui/icons-material/Cake';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

const IconComponents: Record<ProductCategory, JSX.Element> = {
  食事: <FastfoodIcon fontSize='small'/>,
  お菓子: <CakeIcon fontSize='small'/>,
  飲み物: <LocalDrinkIcon fontSize='small'/>,
  軽食: <LocalPizzaIcon fontSize='small'/>,
  パン: <BakeryDiningIcon fontSize='small'/>,
}

export default IconComponents