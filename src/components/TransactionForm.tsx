import {
  Box,
  Button,
  // ButtonGroup,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import CakeIcon from '@mui/icons-material/Cake';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Category } from "@mui/icons-material";
import { Product, ProductCategory } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";
import { set } from "date-fns";


// 受け取るプロップスを型定義
interface TransactionFormProps {
  isFormActive: boolean, // Home.tsxから受け取り
  onCloseForm: () => void, // Home.tsxから受け取り  
  currentDay: string, // Home.tsxから受け取り
  onSaveProduct: (product: Schema) => Promise<void>, // App.tsx->Home.tsxから受け取り
  selectedProduct: Product | null, // Home.tsxから受け取り
  onDeleteProduct: (productId: string) => Promise<void>, // App.tsx->Home.tsxから受け取り
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>, // Home.tsxから受け取り
  onUpdateProduct: (product: Schema, productId: string) => Promise<void>, // App.tsx->Home.tsxから受け取り
}

// カテゴリーの型定義(下のカテゴリー配列で指定する)
interface CategoryType {
  label: ProductCategory;
  icon: JSX.Element;
}


// コンポーネント
const TransactionForm = ({isFormActive, onCloseForm, currentDay, onSaveProduct, selectedProduct, onDeleteProduct, setSelectedProduct, onUpdateProduct}: TransactionFormProps) => {
  const formWidth = 320;

  // カテゴリーを配列で定義
  const categoriesArray: CategoryType[] = [
    {label: "食事", icon: <FastfoodIcon fontSize="small"/>},
    {label: "お菓子", icon: <CakeIcon fontSize="small"/>},
    {label: "飲み物", icon: <LocalDrinkIcon fontSize="small"/>},
    {label: "軽食", icon: <LocalPizzaIcon fontSize="small"/>},
    {label: "パン", icon: <BakeryDiningIcon fontSize="small"/>}
  ]


  // MUIとreact-hook-formを統合する?またフォームの初期値を設定する
  const { control, setValue, formState: {errors}, handleSubmit, reset } = useForm<Schema>({
    defaultValues: {
      date: currentDay,
      amount: 0, 
      category: "",
      content: "",
      energy: 0,
      protein: 0,
      fat: 0,
      carbo: 0,
      salt: 0,
      calcium: 0,
    },
    resolver: zodResolver(transactionSchema),
  })

  // 日付を管理してカレンダーで選択した日付をフォームに反映させる
  useEffect(() => {
    setValue("date", currentDay)
  }, [currentDay]);

  // 送信処理を定義
  const onSubmit: SubmitHandler<Schema> = (data) => {
    // console.log(data);

    // 更新処理はカードが選択されているときに実行。逆に選択されていないときは新規登録となる
    if(selectedProduct) {
      // App.tsxで定義したhandleUpdateProductを持ってきている。更新が実行された後にフォームをリセットしたいのでthenメソッドを使う
      onUpdateProduct(data, selectedProduct.id)
      .then(() => {
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error(error);
      })
    } else {
      // 新規登録している。App.tsxで定義したhandelSaveProductを持ってきている
      onSaveProduct(data)
      .then(() => {
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error(error);
      })
    }

    // 送信後にフォーム欄をリセットする(指定した日付をそのまま選択した日付にする)
    reset({ 
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
      energy: 0,
      protein: 0,
      fat: 0,
      carbo: 0,
      salt: 0,
      calcium: 0,
    })
  }

  // 選択したカードをフォームに反映させる。購入品が選択させたタイミングで処理を実装したいので、useEffectを使う
  useEffect(() => {
    if(selectedProduct) {
      setValue("date", selectedProduct.date);
      setValue("amount", selectedProduct.amount);
      setValue("category", selectedProduct.category);
      setValue("content", selectedProduct.content);
      setValue("energy", selectedProduct.energy);
      setValue("protein", selectedProduct.protein);
      setValue("fat", selectedProduct.fat);
      setValue("carbo", selectedProduct.carbo);
      setValue("salt", selectedProduct.salt);
      setValue("calcium", selectedProduct.calcium);
    } else {
      reset({
        date: currentDay,
        amount: 0,
        category: "",
        content: "",
        energy: 0,
        protein: 0,
        fat: 0,
        carbo: 0,
        salt: 0,
        calcium: 0,});
    }
  }, [selectedProduct]);

  // カードを削除する処理
  const handleDelete = () => {
    if (selectedProduct) {
      // App.tsxで定義したhandleDeleteProductを持ってきている
      onDeleteProduct(selectedProduct.id);
      // 削除するとフォームの中身を消す
      setSelectedProduct(null);
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isFormActive ? formWidth : "-15%", // フォームの位置を調整
        width: 500,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ flex: 1, overflowY: "auto", pb: 8 }}>
        <Stack spacing={2}>

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />

          {/* カテゴリ */}
          <Controller 
            name="category"
            control={control}
            render={({field}) => (
              <TextField {...field} id="カテゴリ" label="カテゴリ" select error={!!errors.category}
              helperText={errors.category?.message}>
                {categoriesArray.map((category) => (
                  <MenuItem key={category.label} value={category.label}>
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller 
            name="amount"
            control={control}
            render={({field}) => (
              <TextField 
                {...field} 
                value={field.value === 0 ? "" : field.value} 
                onChange={(e) => {
                  const newValue = parseInt(e.target.value) || 0;
                  field.onChange(newValue);
                }}
                label="金額" 
                type="number"
                error={!!errors.amount}
                helperText={errors.amount?.message} 
              />
            )}
          />

          {/* 内容 */}
          <Controller 
            name="content"
            control={control}
            render={({field}) => (
              <TextField {...field} label="内容" type="text" error={!!errors.content}
              helperText={errors.content?.message}/>
            )}
          />

          <Grid container spacing={2}>
            <Grid item xs={5}>
              {/* エネルギー */}
              <Controller 
                name="energy"
                control={control}
                render={({field}) => (
                  <TextField 
                    {...field} 
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      field.onChange(newValue);
                    }}
                    label="エネルギー" 
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              {/* タンパク質 */}
              <Controller 
                name="protein"
                control={control}
                render={({field}) => (
                  <TextField 
                    {...field} 
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      field.onChange(newValue);
                    }}
                    label="たんぱく質" 
                    type="number"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={5}>            
              {/* 脂質 */}
              <Controller 
                name="fat"
                control={control}
                render={({field}) => (
                  <TextField 
                    {...field} 
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      field.onChange(newValue);
                    }}
                    label="脂質" 
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              {/* 炭水化物 */}
              <Controller 
                name="carbo"
                control={control}
                render={({field}) => (
                  <TextField 
                    {...field} 
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      field.onChange(newValue);
                    }}
                    label="炭水化物" 
                    type="number"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={5}>
              {/* 食塩相当量 */}
              <Controller 
                name="salt"
                control={control}
                render={({field}) => (
                  <TextField 
                    {...field} 
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      field.onChange(newValue);
                    }}
                    label="食塩相当量" 
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              {/* カルシウム */}
              <Controller 
                name="calcium"
                control={control}
                render={({field}) => (
                  <TextField 
                    {...field} 
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      field.onChange(newValue);
                    }}
                    label="カルシウム" 
                    type="number"
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={"primary"} fullWidth>
            {selectedProduct ? "更新" : "保存"}
          </Button>
          {/* 削除ボタン（カードが選択されている場合のみ表示） */}
          {selectedProduct && (
          <Button onClick={handleDelete} variant="outlined" color={"secondary"} fullWidth>
            削除
          </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
