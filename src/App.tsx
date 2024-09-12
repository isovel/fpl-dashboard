import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import styled from 'styled-components'

import Footer from './components/Footer'
import NavBar from './components/NavBar'
import LeaderboardPage from './features/leaderboard/LeaderboardPage'

const Layout = () => (
  <LayoutContainer>
    <NavBar />
    <ContentContainer>
      <Outlet />
    </ContentContainer>
    <Footer />
  </LayoutContainer>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
    ],
  },
])

const ProviderScaffold = () => <RouterProvider router={router} />

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
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
