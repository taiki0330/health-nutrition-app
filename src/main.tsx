// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // TODO: useEffectのconsole.log()がストリクトモードのせいで2回吐き出されるので一時的にコメントアウト！
  // <StrictMode>
    <App />
  // </StrictMode>,
)
