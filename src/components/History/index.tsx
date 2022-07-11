import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

import { HistoryStyled, HistoryHeading, Divider, HistoryContent, HistoryItem } from './styles'

import { HistoryProps } from './interfaces'

export class History extends Component<HistoryProps> {
  render() {
    return (
      <HistoryStyled>
        <HistoryHeading>History</HistoryHeading>
        <Divider />
        <HistoryContent data-cy="history-list">
          {this.props.historyData.map((expr) => (
            <HistoryItem key={uuid()}>{expr}</HistoryItem>
          ))}
        </HistoryContent>
      </HistoryStyled>
    )
  }
}
