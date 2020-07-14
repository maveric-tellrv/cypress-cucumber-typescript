export const pipelineBuilderObj = {
  title: '.odc-pipeline-builder-header h1',
  name: '#form-input-name-field',
  task: 'foreignObject button',
  sectionTitle: '.odc-pipeline-builder-page h2',
  create: '[data-test-id="submit-button"]',
  cancel: '[data-test-id="reset-button"]',
  addParams: {
    name: '#form-input-params-0-name-field',
    description: '#form-input-params-0-description-field',
    defaultValue: '#form-input-params-0-default-field',
  },
  addResources: {
    name: '#form-input-resources-0-name-field',
    resourceType: '#form-dropdown-resources-0-type-field',
  },
  switchToYamlEditorAlert: {
    alertDialog: 'form[name="form"]',
    title: 'form[name="form"] h2',
    continue: '#confirm-action',
    cancel: '[data-test-id="modal-cancel-action"]',
  },
  yamlCreatePipeline: {
    helpText: 'p.help-block',
    create: '#save-changes',
    cancel: '#cancel',
  },
}

export const pipelineBuilderPage = {
    verifyTitle:() => 
      cy.get(pipelineBuilderObj.title).should('have.text', 'Pipeline Builder'),
  
    verifyDefaultPipelineName: () =>
      cy.get(pipelineBuilderObj.name).should('have.value', 'new-pipeline'),
  
    enterPipelineName: (pipelineName: string) => {
      cy.get(pipelineBuilderObj.name).clear();
      cy.get(pipelineBuilderObj.name).type(pipelineName);
    },
  
    selectTask: (taskName: string = 'kn') => {
      cy.get(pipelineBuilderObj.task).click();
      cy.byTestActionID(taskName).click();
    },
  
    seelctParallelTask:(taskName: string) => {
      // cy.get('.odc-pipeline-vis-task__content').invoke('show')
      // cy.contains('+').click()
      cy.mouseHoverAndClick('.odc-pipeline-vis-task__content', '.odc-plus-node-decorator:nth-child(3) > circle');
      cy.byTestActionID(taskName).click();
    },
  
    addParameters: (
      paramName: string,
      description: string = 'description',
      defaultValue: string = 'value1',
    ) => {
      cy.byButtonText('Add Parameters').click();
      cy.get(pipelineBuilderObj.addParams.name).type(paramName);
      cy.get(pipelineBuilderObj.addParams.description).type(description);
      cy.get(pipelineBuilderObj.addParams.defaultValue).type(defaultValue);
    },
  
    addResource: (resourceName: string) => {
      cy.byButtonText('Add Resources').click();
      cy.get(pipelineBuilderObj.addResources.name).type(resourceName);
      cy.selectByDropDownText('Select resource type', 'Git');
      // cy.get('[data-test-dropdown-menu="git"]').click();
    },
  
    verifySection: () => {
      cy.get(pipelineBuilderObj.sectionTitle).as('sectionTitle');
      cy.get('@sectionTitle').eq(0).should('have.text', 'Tasks');
      cy.get('@sectionTitle').eq(1).should('have.text', 'Parameters');
      cy.get('@sectionTitle').eq(2).should('have.text', 'Resources');
    },
    create:() => cy.get(pipelineBuilderObj.create).click(),
    editYaml:() => cy.byButtonText('Edit YAML').click(),

    createPipelineFromBuilderPage: (pipelineName: string, taskName: string = 'kn') => {
      pipelineBuilderPage.enterPipelineName(pipelineName);
      pipelineBuilderPage.selectTask(taskName);
      pipelineBuilderPage.create();
  },

  createPipelineFromYamlPage: () => {
    pipelineBuilderPage.editYaml();
    cy.get(pipelineBuilderObj.switchToYamlEditorAlert.alertDialog).should('be.visible');
    cy.get(pipelineBuilderObj.switchToYamlEditorAlert.title).should('contain.text', 'Switch to YAML Editor?');
    cy.get(pipelineBuilderObj.switchToYamlEditorAlert.continue).click();
    cy.get(pipelineBuilderObj.yamlCreatePipeline.helpText).should('contain.text', 'YAML or JSON');
    cy.get(pipelineBuilderObj.yamlCreatePipeline.create).click();
  },
}
export const createPipelineWithGitresources = () => {
  
};