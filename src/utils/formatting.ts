import { format } from "date-fns";

// 月のデータを'2025-02'のようにフォーマットする関数
export function formatMonth(date: Date) {
  return format(date, "yyyy-MM");
}