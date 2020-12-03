/// <reference types="cypress" />

context("todo taks", () => {
    beforeEach(() => {
        cy.visit('http://todomvc.com/examples/vue/')
        cy.get('.new-todo').as('input')
    })

    it('Debe agregar todo', () => {
        cy.get('@input').type('Estudiar examen programacion {enter}')
        cy.get('@input').type('Estudiar examen calculo {enter}')

        cy.get('.todo:nth-child(1) label').should('have.text', 'Estudiar examen programacion')
        cy.get('.todo:nth-child(2) label').should('have.text', 'Estudiar examen calculo')

        cy.get('.todo-count').should('contain', '2')
    })

    it('Debe marcar como completado el todo', () => {
        cy.get('@input').type('Estudiar examen programacion {enter}')
        cy.get(':nth-child(1) > .view > .toggle').click()
        cy.get(':nth-child(1) > .view > .toggle').should('be.checked')
        cy.get('.todo-count').should('contain', '0')
    })

    it('Debe limpiar los todo completados', () => {
        cy.get('@input').type('Estudiar examen programacion {enter}')
        cy.get(':nth-child(1) > .view > .toggle').click()
        cy.get(':nth-child(1) > .view > .toggle').should('be.checked')
        cy.get('.todo-count').should('contain', '0')
        cy.get('.clear-completed').click()
        cy.get('.todo-list').should('not.be.visible')
    })

    it('Debe permitir editar un todo', () => {
        cy.get('@input').type('Estudiar examen programacion {enter}')
        cy.get('.todo:nth-child(1) label').dblclick()
        cy.get('.todo:nth-child(1) > .edit').type('{backspace}'.repeat(12) + '{enter}')
        cy.get('.todo:nth-child(1) label').should('have.text', 'Estudiar examen')

    })


    it('Debe permitir eliminar un todo', () => {
        cy.get('@input').type('Estudiar examen programacion {enter}')
        // cy.wait(1000)
        cy.get('.todo-list .todo:nth-child(1) .destroy').click({ force: true })
        cy.get('.todo-list .todo:nth-child(1)').should('not.exist')
    })

    it('Debe permitir ingresar varios todo y mostrarlos en el filtro de los activos', () => {
        cy.get('@input').type('prueba1 {enter}')
        cy.get('@input').type('prueba2 {enter}')
        cy.get('@input').type('prueba3 {enter}')
        cy.get('@input').type('prueba4 {enter}')
        cy.get('@input').type('prueba5 {enter}')
        cy.get(':nth-child(1) > .view > .toggle').check()
        cy.get(':nth-child(2) > .view > .toggle').check()
        cy.get('.filters > :nth-child(2) > a').click()
        cy.get('.todo').should('have.length', 3);
    })

    it('Debe permitir ingresar varios todo y mostrarlos en el filtro de los completado', () => {
        cy.get('@input').type('prueba1 {enter}')
        cy.get('@input').type('prueba2 {enter}')
        cy.get('@input').type('prueba3 {enter}')
        cy.get('@input').type('prueba4 {enter}')
        cy.get('@input').type('prueba5 {enter}')
        cy.get(':nth-child(1) > .view > .toggle').check()
        cy.get(':nth-child(2) > .view > .toggle').check()
        cy.get('.filters > :nth-child(3) > a').click()
        cy.get('.todo').should('have.length', 2)
    })
})