import React from 'react';
import { render } from '@testing-library/react';
import Roster from '../components/Roster';
import tstRoster from '../js/testRoster';
 

describe("Roster", () => {

    it('renders', () => {
        const { asFragment } = render(
            <Roster roster={tstRoster} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('displays players', () => {
        const { getAllByRole } = render (
            <Roster roster={tstRoster} />
        );

        const buttons = getAllByRole('button');

        expect(buttons).toBeTruthy();
        expect(buttons[0]).toHaveTextContent('Pete Alonso 20');
        expect(buttons[1]).toHaveTextContent('Dellin Betances 68');
    });
});