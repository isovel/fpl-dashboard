import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ProviderScaffold from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderScaffold />
  </StrictMode>
)
