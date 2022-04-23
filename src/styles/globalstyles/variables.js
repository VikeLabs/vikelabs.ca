import { css } from "@emotion/react"

export const v = {
  sidebarWidth: `210px`,
  smSpacing: `8px`,
  mdSpacing: `16px`,
  lgSpacing: `24px`,
  xlSpacing: `32px`,
  xxlSpacing: `48px`,
  borderRadius: `6px`,
}
export const m = {
  menuToggleSize: `24px`,
}
export const btnReset = css`
  font-family: inherit;
  outline: none;
  border: none;
  background: none;
  letter-spacing: inherit;
  color: inherit;
  font-size: inherit;
  text-align: inherit;
  padding: 0;
`
const breakpoints = [400, 850]

export const maxq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
export const minq = breakpoints.map(
  bp => `@media (min-width: ${bp + 1}px)`
)