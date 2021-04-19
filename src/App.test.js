import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App'

test('button has correct initial color', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'})
  expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'})
  fireEvent.click(colorButton)
  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'})
  expect(colorButton.textContent).toBe('Change to Medium Violet Red')
});

test('initital conditions', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'})
  expect(colorButton).toBeEnabled()
  const checkBox = screen.getByRole('checkbox')
  expect(checkBox).not.toBeChecked()
})

test('Checkbox disable button on first click and enables on second click', () => {
  render(<App />)
  const checkBox = screen.getByRole('checkbox', {name: 'Disable button'})
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'})

  fireEvent.click(checkBox)

  expect(colorButton).toBeDisabled()

  fireEvent.click(checkBox)
  expect(colorButton).toBeEnabled()

})

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'})
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'})

  fireEvent.click(colorButton)

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: MidnightBlue')
})

describe('spaces befor camel-case capital letters', () => {
  test('Works for no inner capital letters',() => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})