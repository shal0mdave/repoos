

describe('Repoos Test', () => {
    it('Visits Repoos URL', () => {
        cy.visit('http://localhost:3001/').wait(5000)
    })

    it('Should add repos to favourite', () => {        
        [0,1,2,3,4,5].map(i => {
            cy.get('#all-repos #repo-item').eq(i).trigger('mouseover')
            cy.get('button[id="favourite-button"]').eq(i).click({force:true})
            cy.get('#all-repos #repo-item').eq(i).trigger('mouseout')   
        })
    })

    it('Should switch to "Your Favourites" tab', () => {
        cy.get('div[role="tablist"] button').eq(1).click()
    })

    it('Should switch back to "All Repos" tab', () => {
        cy.get('div[role="tablist"] button').eq(0).click().wait(1000)
    })

    it('Should change languages', () => {
        [1,2,3,4,5,0].map(i => {
            cy.get('#filter-form #language-select').select(i).wait(1000);
        })
    })

    it('Should search for repos with "API" in name and description', () =>{
        cy.get('#filter-form #search-input').type('API')
        cy.get('#filter-form #search-button').click()
    })
})