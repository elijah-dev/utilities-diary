import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/button/button';

describe('Button', () => {
    it('displays button', () => {
        render(<Button />);
        screen.debug();
        expect(screen.getByText('Button')).toBeInTheDocument();
    });
});
