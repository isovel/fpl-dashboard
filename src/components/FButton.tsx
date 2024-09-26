import styled from 'styled-components'

const FButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 36px;
  transform: scale(1);
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--brand-neutral-dark);
  font-size: 1em;
  font-weight: 400;
  font-family: 'Saira Condensed';
  color: var(--brand-neutral-light);
  cursor: pointer;
  user-select: none;
  transition: transform 50ms ease-in-out, box-shadow 50ms ease-in-out,
    border-color 50ms ease-in-out;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    z-index: 0;
  }

  &:not(:disabled) {
    &:active,
    &:focus,
    &:focus-visible,
    &:hover {
      outline: none;
      border-color: white;
      box-shadow: 0 0 2px 1px var(--brand-neutral-light),
        0 0 4px 2px var(--button-glow-color);
      transform: scale(1.05);
      animation: button-glow 500ms infinite alternate;
      z-index: 1;
    }
  }
`

export default FButton
