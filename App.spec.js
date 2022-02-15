import React from 'react';
import App from './App';
import {render, fireEvent} from '@testing-library/react-native';

it('Should create an item', () => {
  const {getByText, getByPlaceholderText} = render(<App />);
  const addItemButton = getByText('Add');
  const textInput = getByPlaceholderText('Write something');

  fireEvent.changeText(textInput, 'Todo One');
  fireEvent.press(addItemButton);

  const createdItem = getByText('Todo One');
  expect(createdItem).not.toBeNull();
});

//delete an item
it('Should delete item', () => {
  const {getByText, getByPlaceholderText, queryByText} = render(<App />);

  const addItemButton = getByText('Add');
  const textInput = getByPlaceholderText('Write something');

  const createdItem = 'TODO';

  fireEvent.changeText(textInput, createdItem);
  fireEvent.press(addItemButton);

  const deleteItemButton = getByText('X');
  fireEvent.press(deleteItemButton);

  const deleteItem = queryByText(createdItem);
  expect(deleteItem).toBeNull();
});

//create multiple items

it('Should create multiple item', () => {
  const {getByText, getByPlaceholderText} = render(<App />);
  const addItemButton = getByText('Add');
  const textInput = getByPlaceholderText('Write something');

  fireEvent.changeText(textInput, 'Todo One');
  fireEvent.press(addItemButton);

  fireEvent.changeText(textInput, 'Todo Two');
  fireEvent.press(addItemButton);

  const createdItem1 = getByText('Todo One');
  const createdItem2 = getByText('Todo Two');

  expect(createdItem1).not.toBeNull();
  expect(createdItem2).not.toBeNull();
});

it('should show an error whenever i try to create an invalid TODO', () => {
  const {getByText, queryByText} = render(<App />);
  const addBtn = getByText('Add');
  fireEvent.press(addBtn);

  const errorMessage = queryByText('Please insert a valid text');

  expect(errorMessage).not.toBeNull();
});
//

it('Should remove the error message after creating a valid item', () => {
  const {getByText, getByPlaceholderText, queryByText} = render(<App />);
  const addBtn = getByText('Add');
  const errorMessage = queryByText('Please insert a valid text');
  const textInput = getByPlaceholderText('Write something');

  const createdItem = 'TODO';
  fireEvent.changeText(textInput, createdItem);
  fireEvent.press(addBtn);

  expect(errorMessage).toBeNull();
});
