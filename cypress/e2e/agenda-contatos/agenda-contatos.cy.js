describe('Testes da Agenda de Contatos', () => {
    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
        
        // Adiciona um contato para garantir que teremos um para editar
        // cy.get('input[placeholder="Nome"]').type('Contato Teste')
        // cy.get('input[placeholder="E-mail"]').type('teste@example.com')
        // cy.get('input[placeholder="Telefone"]').type('11999999999')
        // cy.get('button.adicionar').click()
    })

    it('Deve incluir um novo contato', () => {
        // Preenche o formulário
        cy.get('input[placeholder="Nome"]').type('Novo Contato')
        cy.get('input[placeholder="E-mail"]').type('novo@example.com')
        cy.get('input[placeholder="Telefone"]').type('11999998888')
        
        // Submete o formulário
        cy.get('button.adicionar').click()
        
        // Verifica se o contato aparece na lista
        cy.contains('.contato', 'Novo Contato').should('exist')
        cy.contains('.contato', 'novo@example.com').should('exist')
        cy.contains('.contato', '11999998888').should('exist')
    })

    it('Deve alterar um contato existente corretamente', () => {
        // 1. Encontra o contato na lista e clica no botão editar
        cy.contains('.contato', 'Novo Contato')
            .find('.sc-gueYoa > .edit')
            .click()
            
        // 2. Altera os campos do formulário
        cy.get('input[placeholder="Nome"]').clear().type('Contato Editado')
        cy.get('input[placeholder="E-mail"]').clear().type('editado@example.com')
        cy.get('input[placeholder="Telefone"]').clear().type('11888888888')
        
        // 3. Clica no botão salvar
        cy.get('button.alterar').click()
        
        // Verifica se o contato foi alterado na lista
        cy.contains('.contato', 'Contato Editado').should('exist')
        cy.contains('.contato', 'editado@example.com').should('exist')
        cy.contains('.contato', '11888888888').should('exist')
        
        // Verifica que o contato original não existe mais
        cy.contains('.contato', 'Contato Teste').should('not.exist')
    })

    it('Deve remover um contato existente', () => {
        // Encontra o contato de teste e clica no botão deletar
        cy.contains('.contato', 'Contato Editado')
        .find('.delete')
        .click()
        
        // Verifica se o contato foi removido
        cy.contains('.contato', 'Contato Editado').should('not.exist')
    })
    
})
