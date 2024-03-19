import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store.ts'
import Layout from './components/layout/index.tsx'
import Auth from './features/auth/auth.tsx'
import './index.css'
import Login from './pages/login/index.tsx'
import Register from './pages/register/index.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: 'Employees',
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth>
				<RouterProvider router={router} />
			</Auth>
		</Provider>
	</React.StrictMode>
)
