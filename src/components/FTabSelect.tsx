import { useMemo } from 'react'
import styled, { css } from 'styled-components'
import Column from '../components/Column'
import FButton from '../components/FButton'
import Row from '../components/Row'
import { OnChangeFcn } from '../lib/types'

type FTabSelectItem<T> = {
  label: string
  selectedLabel?: string
  value: T
  selected?: boolean
  disabled?: boolean
}

type FTabSelectProps<T> = {
  label: string
  items: FTabSelectItem<T>[]
  selectedIndex: number
  onChange: OnChangeFcn<T>
}

const FTabSelectDefaultItem: FTabSelectItem<undefined> = {
  label: 'Unknown',
  value: void 0,
  selected: false,
  disabled: true,
}

const FTabSelect = <T,>(props: FTabSelectProps<T>) => {
  const { label, items, selectedIndex, onChange } = props
  const selectedItem = useMemo(
    () =>
      selectedIndex > -1 && items.length > selectedIndex
        ? items.at(selectedIndex) ?? FTabSelectDefaultItem
        : FTabSelectDefaultItem,
    [items, selectedIndex]
  )
  return (
    <TabSelectContainer>
      <SelectedContainer>
        <h2>{label}</h2>
        <h1>{selectedItem.selectedLabel ?? selectedItem.label}</h1>
      </SelectedContainer>
      <TabButtonContainer>
        {items.map((item, i) => (
          <TabButton
            key={i}
            $selected={selectedIndex === i || item.selected || item.disabled}
            onClick={() => {
              onChange(item.value)
            }}
          >
            {item.label}
          </TabButton>
        ))}
      </TabButtonContainer>
    </TabSelectContainer>
  )
}

export default FTabSelect

const TabSelectContainer = styled(Column)`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 16px;
`

const SelectedContainer = styled(Row)`
  justify-content: flex-start;
  width: 100%;
  border-bottom: 2px solid var(--brand-neutral-light);

  & > h1 {
    font-size: 2em;
  }

  & > h2 {
    font-size: 1.25em;
    margin: 0 2px 8px 0;
  }
`

const TabButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: fit-content;
`

const TabButton = styled(FButton)<{
  $selected?: boolean
}>`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  white-space: nowrap;
  border-top: 2px solid var(--brand-neutral-dark);
  transition: transform 100ms ease-in-out, border-color 100ms ease-in-out;

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 4px;
    background-color: var(--brand-neutral-light);
    top: -4px;
    transition: top 100ms ease-in-out;
  }

  &:hover {
    opacity: 1;
    transform: translateY(2px);
  }

  ${({ $selected }) =>
    $selected &&
    css`
      border-color: var(--brand-color-secondary);
      background-color: var(--brand-neutral-light);
      color: var(--brand-neutral-dark);
      transform: translateY(4px);

      &::before {
        top: -6px;
      }
    `}
`
