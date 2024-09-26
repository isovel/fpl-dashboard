import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import styled from 'styled-components'

import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import HomePage from './features/home/HomePage'
import LeaderboardPage from './features/leaderboard/LeaderboardPage'

const Layout = () => (
  <LayoutContainer>
    <NavBar />
    <ErrorBoundary>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </ErrorBoundary>
    <Footer />
  </LayoutContainer>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
    ],
  },
])

const ProviderScaffold = () => (
  <ErrorBoundary fallbackComponent={<h1>aksdnaksdn</h1>}>
    <RouterProvider router={router} />
  </ErrorBoundary>
)

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: initial;
  align-items: initial;
  height: 100vh;
`

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  padding: 24px;
`

export default ProviderScaffold
