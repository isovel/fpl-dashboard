import { useMemo, useState } from 'react'
import styled from 'styled-components'

import Column from '../../components/Column'
import Row from '../../components/Row'
import lang from '../../lang'
import {
  Contestant,
  Division,
  generateRandomLeaderboard,
  Region,
} from '../../lib/leaderboard'

// API data model mockup
const leaderboards = {
  [Division.S]: generateRandomLeaderboard(10, Region.NA, Division.S),
  [Division.A]: generateRandomLeaderboard(100, Region.NA, Division.A),
  [Division.B]: generateRandomLeaderboard(500, Region.NA, Division.B),
}

const calcNumPages = (leaderboard: Contestant[]) =>
  Math.floor(leaderboard.length / 10 + 1) - 1

const LeaderboardPage = () => {
  const [cursor, setCursor] = useState(0)
  const [div, setDiv] = useState(Division.S)
  const [reg, setReg] = useState(Region.NA)
  const leaderboard = useMemo(() => leaderboards[div], [div])
  const numPages = useMemo(() => calcNumPages(leaderboard), [leaderboard])

  return (
    <PageContainer>
      <SideContainer>
        <TabSelectorContainer>
          <SelectedContainer>
            <h1>{lang.get(`DIVISION_${div}_LABEL`)}</h1>
          </SelectedContainer>
          <TabButtonContainer>
            <TabButton
              disabled={div === Division.S}
              onClick={() => setDiv(Division.S)}
            >
              {lang.DIVISION_S_LABEL}
            </TabButton>
            <TabButton
              disabled={div === Division.A}
              onClick={() => setDiv(Division.A)}
            >
              {lang.DIVISION_A_LABEL}
            </TabButton>
            <TabButton
              disabled={div === Division.B}
              onClick={() => setDiv(Division.B)}
            >
              {lang.DIVISION_B_LABEL}
            </TabButton>
          </TabButtonContainer>
        </TabSelectorContainer>
        <TabSelectorContainer>
          <SelectedContainer>
            <h1>{lang.get(`REGION_${reg}_LABEL`)}</h1>
          </SelectedContainer>
          <TabButtonContainer>
            <TabButton
              disabled={reg === Region.NA}
              onClick={() => setReg(Region.NA)}
            >
              {lang.REGION_NA_LABEL}
            </TabButton>
            <TabButton
              disabled={reg === Region.EU}
              onClick={() => setReg(Region.EU)}
            >
              {lang.REGION_EU_LABEL}
            </TabButton>
          </TabButtonContainer>
        </TabSelectorContainer>
      </SideContainer>
      <SideContainer>
        <LeaderboardContainer>
          <LeaderboardHeader>
            <span>{lang.get('LEADERBOARD_HEADER_POSITION_LABEL')}</span>
            <span>{lang.get('LEADERBOARD_HEADER_NAME_LABEL')}</span>
            <span>{lang.get('LEADERBOARD_HEADER_SCORE_LABEL')}</span>
          </LeaderboardHeader>
          {leaderboard.slice(cursor, cursor + 10).map((entry, i) => (
            <LeaderboardEntry key={i}>
              <span>{entry.position}</span>
              <span>{entry.embarkId}</span>
              <span>{entry.kdr}</span>
            </LeaderboardEntry>
          ))}
        </LeaderboardContainer>
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
      </SideContainer>
    </PageContainer>
  )
}

export default LeaderboardPage

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 32px;
  width: 100%;
  padding: 8px;
`

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:first-of-type {
    flex: 3;
  }

  &:last-of-type {
    flex: 7;
  }
`

const LeaderboardContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  padding: 8px;
  margin: 0;
  list-style: none;
`

const LeaderboardHeader = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 36px;
  width: 100%;
  border-radius: 4px;
  color: var(--brand-neutral-light);
  text-shadow: 0 0 4px var(--brand-neutral-dark);
  font-size: 1.25em;
  font-weight: 700;
  font-family: 'Saira Extra Condensed';
  font-style: italic;
  text-align: center;
  user-select: none;

  & > span {
    &:first-of-type {
      width: 15%;
    }

    &:nth-of-type(2) {
      width: 70%;
      text-align: left;
    }

    &:last-of-type {
      width: 15%;
    }
  }
`

const LeaderboardEntry = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 40px;
  width: 100%;
  height: 36px;
  border-radius: 4px;
  background-color: rgba(var(--brand-neutral-dark-rgb), 0.5);
  color: var(--brand-neutral-light);
  font-size: 0.9em;
  font-weight: 700;
  font-family: 'Saira Extra Condensed';
  font-style: italic;
  text-transform: uppercase;
  text-align: center;
  user-select: none;

  & > span {
    &:first-of-type {
      width: 15%;
    }

    &:nth-of-type(2) {
      width: 70%;
      text-align: left;
    }

    &:last-of-type {
      width: 15%;
    }
  }
`

const FButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--brand-neutral-dark);
  font-size: 1em;
  font-weight: 500;
  font-family: 'Saira Extra Condensed';
  font-style: italic;
  color: var(--brand-neutral-light);
  cursor: pointer;
  user-select: none;

  &:disabled {
    cursor: not-allowed;

    opacity: 0.5;
    z-index: -1;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover,
    &:focus,
    &:focus-visible {
      outline: none;
      border-color: white;
      box-shadow: 0 0 0 1px var(--brand-neutral-light),
        0 0 0 2px var(--button-glow-color),
        0 0 16px 8px var(--button-glow-color);
      z-index: 1;
    }
  }
`

const TabSelectorContainer = styled(Column)`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 16px;
`

const SelectedContainer = styled(Row)`
  justify-content: flex-start;
  width: 100%;
  border-bottom: 2px solid var(--brand-neutral-light);
`

const TabButton = styled(FButton)`
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

  &:disabled {
    opacity: 1;
    border-color: var(--brand-color-secondary);
    background-color: rgba(var(--brand-neutral-dark-rgb), 0.5);
    transform: translateY(4px);

    &::before {
      top: -6px;
    }
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
