import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Teams from '../components/Teams';
import { americanLeague } from '../js/teamIds';

describe("Teams component", () => {

    it('renders', () => {
        
        const { asFragment } = render(
            <Teams callBack={() => { }} teamsArray={americanLeague} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('calls prop/function on click', () => {
        const mockFunc = jest.fn();

        const { getAllByAltText } = render(
            <Teams callBack={mockFunc} teamsArray={americanLeague} />
        );
        const nodes = getAllByAltText("test");

        fireEvent.click(nodes[0]);

        expect(mockFunc).toHaveBeenCalled();
    });
});
