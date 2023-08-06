/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import { render, fireEvent, screen } from '@testing-library/react'
import { MatchesBurned } from '../MatchesBurned'
import React from 'react'

let data: Array<{
  averagePower: number
  totalJoules: number
  totalTime: number
  vals?: number[]
  startTime?: string
}>

describe('MatchesBurned', () => {
  beforeEach(() => {
    data = [
      {
        averagePower: 250,
        totalJoules: 1000,
        totalTime: 4,
      },
      {
        averagePower: 300,
        totalJoules: 3000,
        totalTime: 10,
      },
    ]
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders', () => {
    const json = renderer.create(<MatchesBurned data={data} />).toJSON()
    expect(json).toMatchSnapshot()
  })

  it('clicks full screen button to changes state to true', async () => {
    const setStateMock = jest.fn()
    let button: HTMLElement
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    const { queryByTestId } = render(<MatchesBurned data={data} />)
    button = queryByTestId('matches-burned-fullscreen')!
    fireEvent.click(button)
    expect(setStateMock).toHaveBeenCalledWith(true)
  })

  it('clicks full screen button it renders the modal', async () => {
    render(<MatchesBurned data={data} />)
    const button = screen.queryByTestId('matches-burned-fullscreen')!
    fireEvent.click(button)
    const modal = screen.queryByTestId('matches-modal')
    expect(modal).toMatchSnapshot()
  })

  it('doesnt render modal on initial load', async () => {
    render(<MatchesBurned data={data} />)
    const modal = screen.queryByTestId('matches-modal')
    expect(modal).toBe(null)
  })
})
