import styled from 'styled-components'
import type { Region } from '../../../lib/leaderboard'

const RegionTag = (props: { region: Region }) => (
  <RegionLabel>{props.region}</RegionLabel>
)

export default RegionTag

const RegionLabel = styled.span`
  height: 5em;
  font-family: 'Saira Condensed';
  font-size: 0.8em;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--brand-color-secondary);
  text-shadow: 0 0 2px var(--brand-neutral-dark);
  vertical-align: middle;
  margin-right: 2px;
`
