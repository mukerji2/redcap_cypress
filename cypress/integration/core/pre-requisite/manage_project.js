describe('Manage Project Creation, Deletion, Settings', () => {

	before(() => {
		cy.mysql_db('projects/pristine')
		cy.set_user_type('admin')
	})

	describe('User Interface - General', () => {

		it('Should have the ability to create new projects from a blank slate', () => {
			cy.visit_base({url: 'index.php'})
			cy.get('a').contains('New Project').click()
			cy.get('input#app_title').type('Test')
			cy.get('select#purpose').select('Practice / Just for fun')
			cy.get('input#project_template_radio0').check()
			cy.get('button').contains('Create Project').click()
			cy.get('div#actionMsg').should(($d) => {
				expect($d).to.contain('REDCap project has been created')
			})
		})

		it('Should have the ability to customize / modify existing Project Title', () => {
			cy.visit_base({url: 'index.php'})
			cy.get('a').contains('My Projects').click()
			cy.get('a').contains('Test').click()
			//cy.get('a').contains('Project Setup').click()
			cy.get('button').contains('Modify').click()
			cy.get('input#app_title').clear()
			cy.get('input#app_title').type('TestEdit')
			cy.get('button').contains('Save').click()
			cy.get('div#subheaderDiv2').should(($d) => {
				expect($d).to.contain('TestEdit')
			})

		})

		it('Should have the ability to designate the purpose of the project', () => {
			cy.get('button').contains('Modify').click()
			cy.get('select#purpose').select('Quality Improvement')
			cy.get('button').contains('Save').click()
			cy.get('div#actionMsg').should(($d) => {
				expect($d).to.contain('Success')
			})
		})

		describe('Copy Functionality', () => {
			before(() => {
				cy.get('a').contains('Other Functionality').click()
				cy.get('button').contains('Copy').click()
			})

			it('Should have the ability to copy the project with neither data nor users included', () => {
				cy.get('input#app_title').clear()
				cy.get('input#app_title').type('copy1')
				cy.get('input#copy_users').uncheck()
				cy.get('input#copy_records').uncheck()
				cy.get('button').contains('Copy Project').click()
				cy.visit_base({url: 'index.php'})
				cy.get('a').contains('My Projects').click()
				cy.get('div#proj_table').should(($d) => {
					expect($d).to.contain('copy1')
				})

			})

			it('Should have the ability to copy the project with data included but without users', () => {
				cy.visit_version({page: 'ProjectGeneral/copy_project_form.php', params: 'pid=14'})
				cy.get('input#app_title').clear()
				cy.get('input#app_title').type('copy2')
				cy.get('input#copy_users').uncheck()
				cy.get('input#copy_records').check()
				cy.get('button').contains('Copy Project').click()
				cy.visit_base({url: 'index.php'})
				cy.get('a').contains('My Projects').click()
				cy.get('div#proj_table').should(($d) => {
					expect($d).to.contain('copy2')
				})
			})

			it('Should have the ability to copy the project with both data and users included', () => {
				cy.visit_version({page: 'ProjectGeneral/copy_project_form.php', params: 'pid=14'})
				cy.get('input#app_title').clear()
				cy.get('input#app_title').type('copy3')
				cy.get('input#copy_users').check()
				cy.get('input#copy_records').check()
				cy.get('button').contains('Copy Project').click()
				cy.visit_base({url: 'index.php'})
				cy.get('a').contains('My Projects').click()
				cy.get('div#proj_table').should(($d) => {
					expect($d).to.contain('copy3')
				})
			})
		})		
	})

	describe('User Interface - Longitudinal Project Settings', () => {
		
		/*
		before(() => {
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('div').contains('Scheduling module (longitudinal only)').within(() => {
				cy.get('button').click()
			})
		})
		*/

		it('Should have the ability to enable and disable Longitudinal Data Collection', () => {
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('button#setupLongiBtn').click().then(() => {
				cy.get('span.SavedMsg').should(($s) => {
					expect($s).to.contain('Saved')
				})
			})

		})

		it('Should have the ability to designate data collection instruments for defined events for each arm', () => { 
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('button').contains('Define My Events').click()
			cy.get('input#descrip').type('Event1')
			cy.get('input#addbutton').click()
			//cy.get('input#descrip').type('Event2')
			//cy.get('input#addbutton').click()
			cy.get('a').contains('Designate Instruments').click().then(() => {
			cy.get('button').contains('Begin Editing').click()
			cy.get('td').contains('My First Instrument').parent().within(() => {
				cy.get('input#my_first_instrument--41').check()	
			})
			cy.get('button#save_btn').click().then(() => {
				cy.get('td').contains('My First Instrument').parent().within(($p) => {
					expect($p).to.contain('img#img--my_first_instrument--41')
				})
			})
		})

		})

		it('Should have the ability to define unique event schedules for each arm', () => { 
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('div').contains('Scheduling module (longitudinal only)').within(() => {
				cy.get('button').click()
			})
			cy.get('button').contains('Define My Events').click().then(() => {
				cy.get('table#event_table').should(($t) => {
					expect($t).to.contain('Days Offset')
					expect($t).to.contain('Offset Range')
				})
			})
			
		})

		it('Should have the ability to create repeating events and instruments', () => { 
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('button#enableRepeatingFormsEventsBtn').click()
		})

		it('Should require administrator approval to delete events for longitudinal projects while in Production mode', () => { 

		})		
	})

	describe('User Interface - Survey Project Settings', () => {

		it('Should have the ability to enable and disable survey functionality at the project level', () => { 

		})

		it('Should have the ability to enable and disable each data collection instrument in a project as a survey', () => { 

		})

		it('Should have the ability to set the survye status to active or offline', () => { 

		})

		it('Should have the ability to create repeating surveys', () => { 

		})		
	})

	describe('User Interface - Survey distribution', () => {

		it('Should have the ability to create a public survey link when the survey is in the first instrument position', () => { 

		})

		it('Should have the ability to create a designated email field', () => { 

		})
		
	})

	describe('Control Center', () => {

		before(() => {
			cy.set_user_type('admin')
		})

		it('Should have the ability to limit creation of new projects to administrators', () => {

		})

		it('Should have the ability to limit the moving of projects to production to administrators', () => {

		})

		it('Should have the ability to enable users to edit survey responses', () => {

		})

		it('Should have the ability to enable Draft Mode changes to be automatically approved under certain conditions', () => {

		})

		it('Should have the ability to limit adding or modifying events and arms while in Production mode to administrators', () => {

		})
	})

})
