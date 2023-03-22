import * as React from 'react'

export const CardGrid: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      flex: '1 0 300px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'min-content',
      gridGap: 12,
      height: 'auto'
    }}
  >
    {children}
  </div>
)
