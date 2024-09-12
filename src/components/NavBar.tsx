import styled from 'styled-components'
import lang from '../lang'

const NavBar = () => {
  return (
    <Container>
      <Logo />
      <Title>{lang.DASHBOARD_TITLE}</Title>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
  width: 100vw;
  height: 64px;
  background-color: rgba(var(--brand-neutral-dark-rgb), 1);
`

const Logo = styled.div`
  width: 2em;
  height: 2em;
  margin-right: 1rem;
  background: url('./images/logo.png') no-repeat center center / contain;
`

const Title = styled.h1`
  font-size: 2rem;
  color: var(--brand-neutral-light);
  user-select: none;
`

export default NavBar
