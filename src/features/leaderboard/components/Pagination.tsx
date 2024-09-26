import styled from 'styled-components'
import FButton from '../../../components/FButton'
import { OnChangeFcn } from '../../../lib/types'

const PaginationControls = (props: {
  numPages: number
  cursor: number
  onChange: OnChangeFcn<number>
}) => {
  const { numPages, cursor, onChange: setCursor } = props
  return (
    <PaginationContainer>
      <PageButton
        disabled={cursor < 10}
        onClick={() => setCursor(cursor - 10)}
      />
      <PageIndicator>
        {cursor / 10 + 1}/{numPages}
      </PageIndicator>
      <PageButton
        disabled={cursor / 10 + 1 === numPages}
        onClick={() => setCursor(cursor + 10)}
      />
    </PaginationContainer>
  )
}

export default PaginationControls

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 4px;
  background-color: rgba(var(--brand-neutral-dark-rgb), 0.5);
`

const PageIndicator = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 4em;
  height: 100%;
  border: none;

  user-select: none;
  font-size: 1.25em;
  font-weight: 700;
  font-family: 'Saira Extra Condensed';
  font-style: italic;
`

const PageButton = styled(FButton)`
  width: 36px;
  height: 36px;
  padding: 0;

  &:after {
    content: '';
    display: block;
    width: 0.5em;
    height: 0.5em;
    background-color: transparent;
  }

  &:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &:after {
      border-left: 2px solid var(--brand-neutral-light);
      border-bottom: 2px solid var(--brand-neutral-light);
      transform: translate(0.125em, 0) rotate(45deg);
    }
  }

  &:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:after {
      border-right: 2px solid var(--brand-neutral-light);
      border-top: 2px solid var(--brand-neutral-light);
      transform: translate(-0.125em, 0) rotate(45deg);
    }
  }
`
