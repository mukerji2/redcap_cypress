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
				cy.get('div').contains('Use longitudinal data collection').parent().should(($p) => {
					expect($p).to.contain('Disable')
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
			cy.get('button').contains('Begin Editing').click().then(() => {
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

		})

		it('Should have the ability to define unique event schedules for each arm', () => { 
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('div').contains('Scheduling module (longitudinal only)').within(() => {
				cy.get('button').click({force: true})
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
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('div').contains('Use surveys in this project').within(($p) => {
				expect($p).to.contain('Enable')
				cy.get('button').contains('Enable').click()
			})
		})

		it('Should have the ability to enable and disable each data collection instrument in a project as a survey', () => { 
			cy.get('button').contains('Online Designer').click().then(() => {
				cy.get('tr#row_1').should(($t) => {
					expect($t).to.contain('Enable')
				})
				cy.get('button').contains('Enable').click()
				cy.get('button#surveySettingsSubmit').click()
			})
		})

		it('Should have the ability to set the survye status to active or offline', () => { 
			cy.get('button').contains('Survey settings').click().then(() => {
				cy.get('select').contains('Survey Active').parent().should(($s) => {
					expect($s).to.contain('Survey Offline')
				})
			})
			cy.get('button').contains('Cancel').click()
		})

		it('Should have the ability to create repeating surveys', () => { 
			cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=14'})
			cy.get('td').contains('Enable optional modules').parent().within(($t) => {
				expect($t).to.contain('Repeatable instruments and events')
			})
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
			cy.get('a').contains('Control Center').click()
			cy.get('a').contains('User Settings').click()
			cy.get('tr').contains('create new projects').parent().within(($t) => {
				cy.get('select').should(($s) => {
					expect($s).to.contain('No, only Administrators can create new projects')
				})
			})
			
		})

		it('Should have the ability to limit the moving of projects to production to administrators', () => {
			cy.get('tr').contains('move projects to production').parent().within(($t) => {
				cy.get('select').should(($s) => {
					expect($s).to.contain('No, only Administrators can move projects to production')
				})
			})
		})

		it('Should have the ability to enable users to edit survey responses', () => {
			cy.get('tr').contains('edit survey responses').parent().within(($t) => {
				cy.get('select').should(($s) => {
					expect($s).to.contain('Enabled')
				})
			})
		})

		it('Should have the ability to enable Draft Mode changes to be automatically approved under certain conditions', () => {
			cy.get('tr').contains('Draft Mode changes to be approved automatically').parent().within(($t) => {
				cy.get('select').should(($s) => {
					expect($s).to.contain('Yes, ')
				})
			})
		})

		it('Should have the ability to limit adding or modifying events and arms while in Production mode to administrators', () => {
			cy.get('tr').contains('add or modify events and arms on the Define My Events page').parent().within(($t) => {
				cy.get('select').should(($s) => {
					expect($s).to.contain('No, only Administrators can add/modify events in production')
				})
			})
		})
	})

})
