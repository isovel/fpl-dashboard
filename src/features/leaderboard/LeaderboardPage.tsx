import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import Column from '../../components/Column'
import FTabSelect from '../../components/FTabSelect'
import Row from '../../components/Row'
import useTitle from '../../hooks/useTitle'
import lang from '../../lang'
import {
  Division,
  generateRandomLeaderboard,
  Region,
} from '../../lib/leaderboard'
import Leaderboard from './components/Leaderboard'

// TODO: Write an actual API connector + state management system
const leaderboards = {
  [Division.S]: generateRandomLeaderboard(50, Division.S),
  [Division.A]: generateRandomLeaderboard(100, Division.A),
  [Division.B]: generateRandomLeaderboard(500, Division.B),
}

const divisions = Object.keys(leaderboards) as Division[] // Active divisions
const regions = [Region.EU, Region.NA]

const LeaderboardPage = () => {
  const { setTitle } = useTitle()
  const [div, setDiv] = useState(divisions[0])
  const [reg, setReg] = useState(regions[0])
  const leaderboard = useMemo(() => leaderboards[div], [div])

  useEffect(() => {
    setTitle(lang.LEADERBOARD_TITLE)
  }, [setTitle])

  return (
    <Container>
      {/* Filters */}
      <SideContainer>
        <FTabSelect
          label={lang.DIVISION_TITLE}
          items={divisions.map((division) => ({
            label: lang.get(`DIVISION_${division}_LABEL`),
            selectedLabel: division,
            value: division,
          }))}
          selectedIndex={divisions.findIndex((division) => div === division)}
          onChange={setDiv}
        />
        <FTabSelect
          label={lang.REGION_TITLE}
          items={regions.map((region) => ({
            label: lang.get(`REGION_${region}_LABEL`),
            value: region,
          }))}
          selectedIndex={regions.findIndex((region) => reg === region)}
          onChange={setReg}
        />
      </SideContainer>

      {/* Leaderboard + Pagination */}
      <SideContainer>
        <Leaderboard leaderboard={leaderboard} />
      </SideContainer>
    </Container>
  )
}

export default LeaderboardPage

const Container = styled(Row)`
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
  padding: 32px;

  backdrop-filter: blur(16px);
  border-radius: 16px;
  overflow: hidden;
`

const SideContainer = styled(Column)`
  gap: 8px;
  height: 100%;

  &:first-of-type {
    flex: 1;
    justify-content: flex-start;
  }

  &:last-of-type {
    flex: 5;
  }
`
