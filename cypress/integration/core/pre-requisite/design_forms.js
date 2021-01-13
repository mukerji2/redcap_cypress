describe('Design Forms using Data Dictionary & Online Designer', () => {

	before(() => {
		//Reset the projects back to what they should be
		cy.mysql_db('projects/pristine')
		cy.visit_version({page: 'Design/online_designer.php', params: "pid=1"})
		cy.get('input[value="Enter Draft Mode"]').click({force:true})

		
	})

    describe('Online Designer', () => {

    	before(() => {
    		//cy.set_user_type('standard')
			
			//Visit Classic Database 
			cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
    	})


		it('Should contain Project Setup permisisons for current user', () => {


		})

		it('Should show the project without surveys', () => {
			cy.get('div').contains('Use surveys').should(($p) => {
				expect($p).to.contain('Enable')
			})
		})

		it ('Should show the project in development mode', () => {
			cy.get('div').contains('Project status').parent().within(($s) => {
				expect($s).to.contain('Development')
			})

		})

		it('Should show the appropriate options for viewing and designing your data collection instruments', () => {
			cy.get('span').contains('Design your data collection instruments').parent().parent().should(($td) => {
				expect($td).to.contain('Data Dictionary')
				expect($td).to.contain('REDCap Shared Library')
				expect($td).to.contain('Download PDF of all instruments')
				expect($td).to.contain('Download the current Data Dictionary')
				expect($td).to.contain('Check For Identifiers')
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
				cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
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
				cy.get('tr#row_1').should(($t) => {
					expect($t).to.contain('td.dragHandle')
				})
			})

			describe('Field Types', () => {


				it('Should contain all of expected field types', () => {
					cy.get('a').contains('Demographics').click().then(() => { 
						cy.get('input#btn-patient_document-f').click().then(() => {
						cy.get('select').contains('Select a Type').parent().should(($s) => {
							expect($s).to.contain('Text Box')
							expect($s).to.contain('Notes Box')
							expect($s).to.contain('Calculated Field')
							expect($s).to.contain('Multiple Choice - Drop-down List')
							expect($s).to.contain('Multiple Choice - Radio Buttons')
							expect($s).to.contain('Checkboxes')
							expect($s).to.contain('Signature')
							expect($s).to.contain('File Upload')
							expect($s).to.contain('Descriptive Text')
							expect($s).to.contain('Begin New Section')
						})
					})
				})
							
				})

				it('Should not allow invalid names', () => {
					cy.get('select#field_type').select('text')
						cy.get('input#field_name').type('h?i')
						cy.get('button').contains('Save').click().then(() => {
							cy.get('table#draggable').should(($t) => {
								expect($t).to.contain('Variable: h_i')
							})
						})
					})
				

				it('Should allow reordering of fields', () => {
					
				})

				it('Should allow renaming of a field', () => {
					cy.get('table#design-last_name').within(() => {
						cy.get('img[title="Edit"]').click()
					})
					cy.get('textarea#field_label').type('s')
					cy.get('button').contains('Save').click().then(() => {
						cy.get('table#design-last_name').should(($t) => {
							expect($t).to.contain('Last Names')
						})
					})
					})
				

				it('Should allow copying of a field', () => {
					cy.get('table#design-last_name').within(() => {
						cy.get('img[title="Copy"]').click()
							
						
					})
					cy.get('button').contains('Copy field').click()
					cy.get('table#draggable').should(($t) => {
						expect($t).to.contain('Variable: last_name_2')
					})
				})

				it('Should allow a field to be marked as an identifier', () => {
					cy.get('table#design-last_name').within(() => {
						cy.get('img[title="Edit"]').click()
					})
					cy.get('input#field_phi1').click()
					cy.get('button').contains('Save').click()
				})

				describe('Text Box', () => {

					it('Should allow the creation of this field type', () => {
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('text')
							cy.get('input#field_name').type('new_text_box')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New Text Box')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('Variable: new_text_box')
								})
							})
						})

					})

				})

				describe('Notes', () => {

					it('Should allow the creation of this field type', () => {
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('textarea')
							cy.get('input#field_name').type('new_note_box')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New Note Box')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('Variable: new_note_box')
								})
							})
						})
					})

				})

				describe('Calculated Field', () => {

					it('Should allow the creation of this field type', () => {
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('calc')
							cy.get('input#field_name').type('new_calc_field')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New Calc Field')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('Variable: new_calc_field')
								})
							})
						})
					})

				})


				describe('Multiple Choice', () => {

					describe('Dropdown', () => {
						it('Should allow the creation of this field type', () => {
							cy.get('input#btn-patient_document-f').click().then(() => {
								cy.get('select#field_type').select('select')
								cy.get('input#field_name').type('new_drop_down')
								cy.get('input#field_label_rich_text_checkbox').uncheck()
								cy.get('textarea#field_label').type('New Drop Down')
								//cy.get('input#dropdown_autocomplete').check()
								//cy.get('textarea#element_enum').type('Option 1{enter}Option 2')
								//cy.get('button').contains('Save').click().then(() => { 
								//cy.get('button.ui-button ui-corner-all ui-widget').contains('Close').click().then(() => {
								cy.get('button').contains('Save').click().then(() => {
									cy.get('table#draggable').should(($t) => {
										expect($t).to.contain('Variable: new_drop_down')
									})
								})
							})
						})
						//})
						//})		

						it('Should automatically populate raw values for choices', () => {

						})
					})

					describe('Radio', () => {
						it('Should allow the creation of this field type', () => {
							cy.get('input#btn-patient_document-f').click().then(() => {
								cy.get('select#field_type').select('radio')
								cy.get('input#field_name').type('new_radio')
								cy.get('input#field_label_rich_text_checkbox').uncheck()
								cy.get('textarea#field_label').type('New Radio')
								//cy.get('input#dropdown_autocomplete').check()
								//cy.get('textarea#element_enum').type('Option 1{enter}Option 2')
								cy.get('button').contains('Save').click()
								//cy.get('button').contains('Close').click().then(() => {
									cy.get('table#draggable').should(($t) => {
										expect($t).to.contain('Variable: new_radio')
									})
								})
							})
						//})	

						it('Should automatically populate raw values for choices', () => {

						})	
					})
					
				})

				describe('Checkboxes', () => {

					it('Should allow the creation of this field type', () => {
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('checkbox')
							cy.get('input#field_name').type('new_check_box')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New Check Box')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('Variable: new_check_box')
								})
							})
						})
					})	

					it('Should automatically populate raw values for choices', () => {

					})

				})

				describe('Signature', () => {

					it('Should allow the creation of this field type', () => {
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('Signature (draw signature with mouse or finger)')
							cy.get('input#field_name').type('new_sign')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New Sign')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('Variable: new_sign')
								})
							})
						})
					})	

				})


				describe('File Upload', () => {

					it('Should allow the creation of this field type', () => {
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('File Upload (for users to upload files)')
							cy.get('input#field_name').type('new_file_upload')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New File Upload')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('Variable: new_file_upload')
								})
							})
						})
					})	

				})

				describe('Descriptive Text', () => {
					
					it('Should allow an attached image', () => {
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('descriptive')
							cy.get('input#field_name').type('new_desc_text')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New Desc Text')
							cy.get('div#righthand_fields').should(($d) => {
							expect($d).to.contain('Attach an image')
						})
					})	
				})
					it('Should allow an attached audio clip', () => {
						cy.get('div#righthand_fields').should(($d) => {
							expect($d).to.contain('Embed an external video')
						})
						//cy.get('button').contains('Save').click()
						//cy.get('button').contains('Cancel').click()
					})
					it('Should allow the creation of this field type', () => {
						//cy.get('input#btn-patient_document-f').click().then(() => {
							//cy.get('select#field_type').select('descriptive')
							//cy.get('input#field_name').type('new_desc_text')
							//cy.get('input#field_label_rich_text_checkbox').uncheck()
							//cy.get('textarea#field_label').type('New Desc Text')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('Variable: new_desc_text')
								})
							})
						})
					//})	

					


						

				})

				describe('Begin New Section', () => {

					it('Should allow the creation of this field type', () => {
						//cy.get('button').contains('Cancel').click()
						cy.get('input#btn-patient_document-f').click().then(() => {
							cy.get('select#field_type').select('section_header')
							//cy.get('input#field_name').type('new_section')
							cy.get('input#field_label_rich_text_checkbox').uncheck()
							cy.get('textarea#field_label').type('New Section')
							cy.get('button').contains('Save').click().then(() => {
								cy.get('table#draggable').should(($t) => {
									expect($t).to.contain('New Section')
								})
							})
						})
					})	

					it('Should not allow this to be the first field of the form', () => {
						cy.get('input#btn-date_enrolled-sh-f').click().then(() => {
							cy.get('select#field_type').should(($s) => {
								expect($s).not.to.contain('Begin New Section ')
							})
						})
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