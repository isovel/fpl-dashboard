import styled from 'styled-components'
import useTitle from '../hooks/useTitle'
import lang from '../lang'

const NavBar = () => {
  const title = useTitle().title

  return (
    <Container>
      <Logo />
      <Title>{lang.DASHBOARD_TITLE}</Title>
      <Subtitle>{title}</Subtitle>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 64px;
  padding: 16px 2rem;
  gap: 16px;
  background-color: rgba(var(--brand-neutral-dark-rgb), 1);
`

const Logo = styled.div`
  width: 2em;
  height: 2em;
  background: url('./images/logo.png') no-repeat center center / contain;
`

const Title = styled.h1`
  height: 36px;
  font-size: 2rem;
  font-weight: 700;
`

const Subtitle = styled.h2`
  height: 24px;
  font-weight: 500;
`

export default NavBar
