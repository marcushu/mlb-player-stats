import React from 'react';
import { render } from '@testing-library/react';
import PlayerDetails from '../components/PlayerDetails';

import { hitting, seasonHitting, pitching, seasonPitching } from '../js/PlayerDetailsMock';

describe('PlayerDetails', () => {

    it('renders', () => {
        const { asFragment } = render(
            <PlayerDetails
                hitting={hitting}
                pitching={pitching}
                seasonHitting={seasonHitting}
                seasonPitching={seasonPitching}
                />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('displays the details', () => {
        const { getByText } = render(
            <PlayerDetails
                hitting={hitting}
                pitching={pitching}
                seasonHitting={seasonHitting}
                seasonPitching={seasonPitching}
                />
        );

        expect(getByText('.273')).not.toBeEmpty();
    })
});