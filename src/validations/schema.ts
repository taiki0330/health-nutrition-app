import {z} from "zod";

// バリデーションチェック
export const transactionSchema = z.object({
  date: z.string().min(1, {message: "日付は必須です"}),
  amount: z.number().min(1, {message: "金額は１円以上必須です"}),
  content: z.string().min(1, {message: "内容を入力してください"}).max(50, {message: "内容は50文字以内です"}),
  category: z.union([z.enum(["食事", "お菓子", "飲み物", "軽食", "パン", ""]), z.literal("")]).refine((val) => val !== "", {message: "カテゴリーを選択してください"}),
  energy: z.number().optional(),
  protein: z.number().optional(),
  fat: z.number().optional(),
  carbo: z.number().optional(),
  salt: z.number().optional(),
  calcium: z.number().optional(),
})

// バリデーションから型を生成
export type Schema = z.infer<typeof transactionSchema >
