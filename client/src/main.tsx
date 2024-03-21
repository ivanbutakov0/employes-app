import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store.ts'
import Layout from './components/layout/index.tsx'
import Auth from './features/auth/auth.tsx'
import './index.css'
import CreateEmployee from './pages/create-employee/index.tsx'
import Employees from './pages/employees/index.tsx'
import Login from './pages/login/index.tsx'
import Register from './pages/register/index.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Employees />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/employees/create',
				element: <CreateEmployee />,
			},
			{
				path: '/employees/:id',
				element: 'Employee',
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
