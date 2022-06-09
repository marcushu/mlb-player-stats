describe('basic usage', () => {
  it('load a team roster when a team is selected', () => {
    window.cy.visit('http://localhost:3000/');

    window.cy.get(`.pt-4 > :nth-child(1) > :nth-child(1) > img`).click();

    window.cy.contains('Baltimore Orioles');
  });

  it('loads a players stats when selected', () => {
    window.cy.get(`:nth-child(1) > :nth-child(1) > button`).click();

    window.cy.contains("Career");
  })
})