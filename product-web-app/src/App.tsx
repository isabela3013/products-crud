import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { requireAuth } from './guards/requireAuth.tsx';

const ProductPage = lazy(() => import('./pages/product/ProductPage.tsx'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage.tsx'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage.tsx'));

const MyProductsPage = lazy(() => import('./pages/my-products/MyProductsPage.tsx'));

function App() {
  return (
    <Suspense
      fallback={
        <>
          <p className="text-xl text-gray-400 dark:text-white">
            Cargando...
          </p>
        </>
      }
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProductPage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />

              <Route path="my-products" element={requireAuth(<MyProductsPage />)} />
            </Route>

            {/* Catch-all for 404 */}
            <Route path="*" element={
              <div className="w-full h-full items-center content-center justify-center">
                <h3>404 - Not Found</h3>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
