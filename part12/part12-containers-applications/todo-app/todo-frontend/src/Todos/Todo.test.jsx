import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo', () => {
    const todo = {
        text: 'A test todo',
        done: false
    }
    
    render(<Todo 
        todo={todo} 
        onComplete={() => {}} 
        onDelete={() => {}}
    />)

    const element = screen.getByText('A test todo')
    expect(element).toBeInTheDocument()
})