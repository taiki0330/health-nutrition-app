import { useEffect, useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import AppLayout from './components/layout/AppLayout'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme'
import { CssBaseline } from '@mui/material'
import { Product, User } from './types'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from './firebase'
import { formatMonth } from './utils/formatting'
import { Schema } from './validations/schema'

function App() {
  // Firestoreエラーかどうかを判定する型ガードを設定....Firestoreエラーの場合code,messageが返ってくる
  function isFireStoreError(error: unknown): err is {code: string, message: string} {
    return typeof error === "object" && error !== null && "code" in error;
  }

  // 購入品をstateで管理・・・・・・初期値は空配列とし、この中にfirestoreから取得したデータを格納
  // 型はtypes/index.tsで指定したデータの型
  const [products, setProducts] = useState<Product[]>([]);

  // アプリではすべての月のデータから今月分だけを取り出すので、stateで管理する
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ユーザー情報をstateで管理
  const [users, setUsers] = useState<User[]>([]);


  // ユーザーデータをfirestoreから取得する処理
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Query a reference to a subcollection
        const querySnapshot = await getDocs(collection(db, "Users"));
        // データを{...}ではなく、[{...},]の形にする
        const usersData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as User;
        })
        console.log("userDataは", usersData);
        setUsers(usersData);
      } catch (error) {
        // error
        if(isFireStoreError(error)) {
          console.error("Firestoreのエラーは", error);
        } else {
          console.error("一般的なエラーは", error)
        }
      }
    }
    fetchUsers();
  }, [])
  // console.log(users);

  // データは初回レンダリング時一回のみ取得したいのでuseEffect()を利用する
  useEffect(() => {
    // useEffectにasyncは使えないので関数を作ってtrycatchを囲む
    const fetchProducts = async() => {
      try {
          // データを取り出してくる
          const querySnapshot = await getDocs(collection(db, "Products"));
          // querySnapshot.docsに入っているデータを配列として下の形で取り出す
          const productsData = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            } as Product
          });
          setProducts(productsData);
      } catch (error) {
        // error
        if(isFireStoreError(error)) {
          console.error("Firestoreのエラーは", error);
        } else {
          console.error("一般的なエラーは", error)
        }
      }
    }
    fetchProducts();
  }, []);
  // console.log(products);


  // productsの中から今月のデータのみを抽出する。utils/formatting.tsで作成したフォーマット関数を使う
  const monthlyProducts = products.filter((product) => {
    return product.date.startsWith(formatMonth(currentMonth));
  })

  // firestoreにデータを登録
  const handleSaveProduct = async (product: Schema) => {
    console.log(product);
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Products"), product);
      console.log("Document written with ID: ", docRef.id);

      // リロードせずに反映させるためにstateで管理するproductsに新しく追加するデータを入れて管理する
      const newProduct = {
        id: docRef.id,
        ...product
      } as Product;
      setProducts((prevProduct) => [...prevProduct, newProduct])
    } catch (error) {
      // error
      if(isFireStoreError(error)) {
        console.error("Firestoreのエラーは", error);
      } else {
        console.error("一般的なエラーは", error)
      }
    }
  }

  // firestoreからデータを削除->TransactionForm.tsxまで渡す
  const handleDeleteProduct = async(productId: string) => {
    try {
      // firestoreからデータを削除
      await deleteDoc(doc(db, "Products", productId));
      // リロードせずに画面に反映->stateで管理しているproductsをフィルタリングする
      const filteredProducts = products.filter((product) => {
        return product.id !== productId;
      })
      setProducts(filteredProducts);
    } catch (error) {
      // error
      if(isFireStoreError(error)) {
        console.error("Firestoreのエラーは", error);
      } else {
        console.error("一般的なエラーは", error)
      }
    }
  }

  // firestoreで更新処理
  const handleUpdateProduct = async(product: Schema, productId: string) => {
    try {
      // firestore更新処理
      const docRef = doc(db, "Products", productId);
      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, product);
      // リロードせずに画面に反映させる->stateで管理しているproductsからmap関数で
      const updatedProducts = products.map((p) => {
        return p.id === productId ? {...p, ...product} : p;
      })
      // 上記のコードは以下のように説明
      // 更新前
      // let p = {id: 1, date: "2025-1-1", amount: 300}
      // 更新後
      // let product = {date: "2025-1-1", amount: 400}
      // 合体
      // {id: 1, date: "2025-1-1", amount: 400}
      setProducts(updatedProducts);
    } catch (error) {
      // error
      if(isFireStoreError(error)) {
        console.error("Firestoreのエラーは", error);
      } else {
        console.error("一般的なエラーは", error)
      }
    }
  }


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Router >
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={
            <Home 
              monthlyProducts={monthlyProducts}
              setCurrentMonth={setCurrentMonth}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              onUpdateProduct={handleUpdateProduct}
              users={users}
            />}/>
            <Route path='*' element={<NoMatch />}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
