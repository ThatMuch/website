import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQHome from './FAQHome';
import '@testing-library/jest-dom';

describe('FAQHome', () => {
  const mockTitle = 'FAQ Title';
  const mockDescription = '<p>FAQ Description</p>';
  const mockQuestions = [
    {
      title: 'Question 1',
      description: '<p>Answer 1</p>',
    },
    {
      title: 'Question 2',
      description: '<p>Answer 2</p>',
    },
  ];

  test('renders title and description', () => {
    render(
      <FAQHome
        title={mockTitle}
        description={mockDescription}
        questions={mockQuestions}
      />
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText('FAQ Description')).toBeInTheDocument();
  });

  test('renders questions', () => {
    render(
      <FAQHome
        title={mockTitle}
        description={mockDescription}
        questions={mockQuestions}
      />
    );

    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  test('sanitizes unsafe HTML in description', () => {
    const unsafeDescription = '<div data-testid="unsafe-desc"><img src="x" onerror="alert(1)" /></div>';
    render(
      <FAQHome
        title={mockTitle}
        description={unsafeDescription}
        questions={mockQuestions}
      />
    );

    const unsafeDiv = screen.getByTestId('unsafe-desc');
    const img = unsafeDiv.querySelector('img');
    // Expect unsafe attribute to be removed (this will fail before fix)
    expect(img).not.toHaveAttribute('onerror');
  });

  test('sanitizes unsafe HTML in expanded question', () => {
    const unsafeQuestionDescription = '<div data-testid="unsafe-q-desc"><img src="x" onerror="alert(1)" /></div>';
    const questions = [{
        title: 'Unsafe Question',
        description: unsafeQuestionDescription
    }];

    render(
      <FAQHome
        title={mockTitle}
        description={mockDescription}
        questions={questions}
      />
    );

    // Click to expand
    fireEvent.click(screen.getByText('Unsafe Question'));

    const unsafeDiv = screen.getByTestId('unsafe-q-desc');
    const img = unsafeDiv.querySelector('img');
    // Expect unsafe attribute to be removed (this will fail before fix)
    expect(img).not.toHaveAttribute('onerror');
  });
});
