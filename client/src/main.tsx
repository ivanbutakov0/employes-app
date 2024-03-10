import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Paths from './paths.ts'
import { store } from './redux/store'

const router = createBrowserRouter([
	{
		path: '/',
		element: <h1>Hello world</h1>,
	},
	{
		path: Paths.login,
		element: <h1>Login</h1>,
	},
	{
		path: Paths.register,
		element: <h1>Register</h1>,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
