describe('Design Forms using Data Dictionary & Online Designer', () => {

	before(() => {
		//Reset the projects back to what they should be
		cy.mysql_db('projects/pristine')
		
	})

    describe('Online Designer', () => {

    	before(() => {
    		cy.set_user_type('standard')
			
			//Visit Classic Database 
			cy.visit_version({page: 'Design/online_designer.php', params: "pid=13"})
    	})


		it('Should contain Project Setup permisisons for current user', () => {


		})

		it('Should show the project without surveys', () => {

		})

		it ('Should show the project in development mode', () => {
			cy.get('div').contains('Project status').parent().within(($s) => {
				expect($s).to.contain('Development')
			})

		})

		it('Should show the appropriate options for viewing and designing your data collection instruments', () => {
			cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=13"})
			cy.get('span').contains('Design your data collection instruments').parent().parent().within(($td) => {
				expect($td).to.contain('Online Designer')
				expect($td).to.contain('Data Dictionary')
				expect($td).to.contain('REDCap Shared Library')
				expect($td).to.contain('Download PDF of all instruments')
				expect($td).to.contain('Download the current data dictionary')
				expect($td).to.contain('Check for identifiers')
			})
			// Online Designer
			// Data Dictionary
			// REDCap Shared Library
			// Download PDF of all instruments
			// Download current data dictionary
			// Check for identifiers
		})

		describe('Data Collection Instruments', () => {

			before(() => {
				cy.visit_version({page: 'Design/online_designer.php', params: 'pid=13'})
			})

			it('Should allow a new instrument to be created', () => {
				cy.get('div').contains('Data Collection Instruments').parent().within(() => {
					cy.get('button').should(($b) => {
						expect($b).to.contain('Create')
					})
				})
			})

			it('Should allow an instrument to be renamed', () => {
				cy.get('button').contains('Choose action').click().then(($b) => {
					cy.get('ul#formActionDropdown').should(($ul) => {
						expect($ul).to.contain('Rename')
					})
				})
			})

			it('Should allow an instrument to be deleted', () => {
				cy.get('button').contains('Choose action').click().then(($b) => {
					cy.get('ul#formActionDropdown').should(($ul) => {
						expect($ul).to.contain('Delete')
					})
				})
			})

			it('Should allow instruments to be reordered', () => {
				cy.get('tr#row_1').should(($tr) => {
					expect($tr).to.contain('td.dragHandle')
				})
			})

			describe('Field Types', () => {


				it('Should contain all of expected field types', () => {
					cy.get('a').contains('Demographics').click()
					cy.get('input[value="Add Field"]').click().then(() => {
						cy.get('select#field_type').should(($s) => {
							expect($s).to.contain('Text Box')
							expect($s).to.contain('Notes Box')
							expect($s).to.contain('Calculated Field')
							expect($s).to.contain('Multiple Choice – Drop Down')
							expect($s).to.contain('Multiple Choice – Radio')
							expect($s).to.contain('Checkboxes')
							expect($s).to.contain('Signature')
							expect($s).to.contain('File Upload')
							expect($s).to.contain('Descriptive Text')
							expect($s).to.contain('Begin New Section')
						})
					})

					// Text Box
					// Notes Box
					// Calculated Field
					// Multiple Choice – Drop Down
					// Multiple Choice – Radio Buttons
					// Checkboxes
					// Signature
					// File Upload
					// Descriptive Text
					// Begin New Section				
				})

				it('Should not allow invalid names', () => {
				
				})

				it('Should allow reordering of fields', () => {
					
				})

				it('Should allow renaming of a field', () => {
					
				})

				it('Should allow copying of a field', () => {
					
				})

				it('Should allow a field to be marked as an identifier', () => {
					
				})

				describe('Text Box', () => {

					it('Should allow the creation of this field type', () => {

					})

				})

				describe('Notes', () => {

					it('Should allow the creation of this field type', () => {

					})

				})

				describe('Calculated Field', () => {

					it('Should allow the creation of this field type', () => {

					})

				})

				describe('Calculated Field', () => {

					it('Should allow the creation of this field type', () => {

					})		

				})

				describe('Multiple Choice', () => {

					describe('Dropdown', () => {
						it('Should allow the creation of this field type', () => {

						})		

						it('Should automatically populate raw values for choices', () => {

						})
					})

					describe('Radio', () => {
						it('Should allow the creation of this field type', () => {

						})	

						it('Should automatically populate raw values for choices', () => {

						})	
					})
					
				})

				describe('Checkboxes', () => {

					it('Should allow the creation of this field type', () => {

					})	

					it('Should automatically populate raw values for choices', () => {

					})

				})

				describe('Signature', () => {

					it('Should allow the creation of this field type', () => {

					})	

				})


				describe('File Upload', () => {

					it('Should allow the creation of this field type', () => {

					})	

				})

				describe('Descriptive Text', () => {
					
					it('Should allow the creation of this field type', () => {

					})	

					it('Should allow an attached image', () => {

					})	


					it('Should allow an attached audio clip', () => {

					})	

				})

				describe('Begin New Section', () => {

					it('Should allow the creation of this field type', () => {

					})	

					it('Should not allow this to be the first field of the form', () => {

					})	

				})
			})
		})
    })

	describe ('Data Dictionary', () => {

		it ('Should contain a Data Dictionary that matches the initial expectation', () => {

		})

		it ('Should add a new field to the project if you contribute a new row to the Data Dictionary file', () => {
			
		})

	})
})