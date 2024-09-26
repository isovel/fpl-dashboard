import { useLayoutEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Column from '../../../components/Column'
import lang from '../../../lang'
import { calcNumPages, Contestant } from '../../../lib/leaderboard'
import PaginationControls from './Pagination'
import RegionTag from './RegionTag'

const LBHeaderLang = [
  lang.LEADERBOARD_HEADER_POSITION_LABEL,
  lang.LEADERBOARD_HEADER_EMBARKID_LABEL,
  lang.LEADERBOARD_HEADER_ELIMINATIONS_LABEL,
  lang.LEADERBOARD_HEADER_DEATHS_LABEL,
  lang.LEADERBOARD_HEADER_KDR_LABEL,
  lang.LEADERBOARD_HEADER_MATCHES_PLAYED_LABEL,
]

const Leaderboard = (props: { leaderboard: Contestant[] }) => {
  const { leaderboard } = props
  const [cursor, setCursor] = useState(0)
  const numPages = useMemo(() => calcNumPages(leaderboard), [leaderboard])

  useLayoutEffect(() => {
    setCursor(0)
  }, [leaderboard])

  return (
    <LeaderboardContainer>
      <LeaderboardList>
        <LeaderboardHeader>
          {LBHeaderLang.map((langKey, i) => (
            <span key={i}>{langKey}</span>
          ))}
        </LeaderboardHeader>
        {leaderboard.slice(cursor, cursor + 10).map((entry, i) => (
          <LeaderboardEntry key={i}>
            <LeaderboardValue>{entry.position}</LeaderboardValue>
            <LeaderboardValue>
              <RegionTag region={entry.region} /> {entry.embarkId}
            </LeaderboardValue>
            <LeaderboardValue>{entry.eliminations}</LeaderboardValue>
            <LeaderboardValue>{entry.deaths}</LeaderboardValue>
            <LeaderboardValue>{entry.kdr}</LeaderboardValue>
            <LeaderboardValue>{entry.matchesPlayed}</LeaderboardValue>
          </LeaderboardEntry>
        ))}
      </LeaderboardList>
      <PaginationControls
        numPages={numPages}
        cursor={cursor}
        onChange={setCursor}
      />
    </LeaderboardContainer>
  )
}

export default Leaderboard

const LeaderboardContainer = styled(Column)`
  gap: 16px;
  width: 100%;
`

const LeaderboardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  margin: 0;
  list-style: none;
`

const LeaderboardHeader = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 32px 0 36px;
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
    width: 64px;
    text-align: center;

    &:nth-of-type(2) {
      text-align: left;
    }
  }
`

const LeaderboardEntry = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px;
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
`

const LeaderboardValue = styled.span`
  width: 64px;
  text-align: left;

  /* Position */
  &:first-of-type {
    text-align: right;
  }

  /* Embark ID */
  &:nth-of-type(2) {
    width: 128px;
  }
`
