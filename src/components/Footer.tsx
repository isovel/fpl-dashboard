import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = () => (
  <Container>
    <Link to="/">Home</Link>
    <Seperator />
    <Link to="/leaderboard">Leaderboard</Link>
    <Seperator />
    <Link to="/about">About</Link>
  </Container>
)

const Container = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 32px;
  background-color: rgba(var(--brand-neutral-dark-rgb), 1);
`

const Seperator = styled.div`
  display: inline-block;
  width: 0;
  height: 1rem;
  margin: 0 1rem;
  padding: 0;
  border-left: 1px solid var(--brand-neutral-light);
`

export default Footer
