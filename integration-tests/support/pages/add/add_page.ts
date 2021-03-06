import { addOptions, gitAdvancedOptions } from '../../constants/add';
import { topologyPage } from '../topology_page';

export const addPageObj = {
  cardTitle: 'div.catalog-tile-pf-title',
  sectionTitle: '.odc-form-section__heading',
  gitRepoUrl: '#form-input-git-url-field',
  nodeName: '#form-input-name-field',
  appName: '[id$=application-name-field]',
  create: '[data-test-id="submit-button"]',
  cancel: '[data-test-id="reset-button"]',
  gitSection: {
    validatedMessage: '#form-input-searchTerm-field-helper',
  },
  builderSection: {
    builderImageDetected: '[aria-label="Success Alert"]',
    builderImageVersion: '#form-dropdown-image-tag-field',
  },
  pipeline: {
    infoMessage: '[aria-label="Info Alert"]',
    addPipeline: '#form-checkbox-pipeline-enabled-field',
  },
  resources: {
    deployment: '#form-radiobutton-resources-kubernetes-field',
    deploymentConfig: '#form-radiobutton-resources-openshift-field',
    knative: '#form-radiobutton-resources-knative-field'
  },
  advancedOptions: {
    createRoute: '#form-checkbox-route-create-field',
    routing: {
      hostname: '#form-input-route-hostname-field',
      path: '#form-input-route-path-field',
      targetPort: 'button#form-dropdown-route-targetPort-field',
      secureRoute: 'input#form-checkbox-route-secure-field',
      tlsTermination: 'button#form-dropdown-route-tls-termination-field',
      insecureTraffic: 'button#form-dropdown-route-tls-insecureEdgeTerminationPolicy-field',
    },
    buildConfig: {
      webHookBuildTrigger: 'input#form-checkbox-build-triggers-webhook-field',
      buildTriggerImage: 'input#form-checkbox-build-triggers-image-field',
      buildTriggerConfigField: 'input#form-checkbox-build-triggers-config-field',
      // Add Environment Value
      envName: 'input[placeholder="name"]',
      envValue: 'input[placeholder="value"]',
      // Count for Rows in Environment Variables section
      envRows: 'div.row.pairs-list__row',
      deleteRowButton: 'button[data-test-id="pairs-list__delete-btn"]',
    },
    deployment: {
      deploymentTriggerImage: 'input#form-checkbox-deployment-triggers-image-field',
      deploymentImageConfig: 'input#form-checkbox-deployment-triggers-config-field',
      envName: 'input[placeholder="name"]',
      envValue: 'input[placeholder="value"]',
      // Count for Rows in Environment Variables section
      envRows: 'div.row.pairs-list__row',
      deleteRowButton: 'button[data-test-id="pairs-list__delete-btn"]',
    },
    scaling: {
      decrement: 'button[aria-label="Decrement"]',
      increment: 'button[aria-label="Increment"]',
      replicaCount: 'input#form-number-spinner-deployment-replicas-field',
    },
    resourceLimit:{
      cpuRequest: 'input[name="limits.cpu.requestValue"]',
      cpuLimit: 'input[name="limits.cpu.limitValue"]',
      memoryRequest: 'input[name="limits.memory.requestValue"]',
      memoryLimit: 'input[name="limits.memory.limitValue"]',
      cpuRequestHelperText: 'div#form-resource-limit-limits-cpu-request-field-helper',
      cpuLimiHelperText: 'div#form-resource-limit-limits-cpu-limit-field-helper',
      memoryRequestHelperText: 'div#form-resource-limit-limits-memory-request-field-helper',
      memoryLimitHelperText: 'div#form-resource-limit-limits-memory-limit-field-helper',
    },
    labels: 'input#tags-input',
  },
}

export const addPage = {
  verifyNoWorkLoadsText:(text: string) => cy.get('h2.co-hint-block__title').should('contain.text', text),
  verifyTitle: (title: string) => cy.titleShouldBe(title),
  verifyPipelinesSection: (message: string) => {
    cy.get(addPageObj.sectionTitle).eq(5).should('have.text', 'Pipelines');
    cy.get(addPageObj.pipeline.infoMessage).should('have.text', message);
  },
  enterGitUrl: (gitUrl: string) => cy.get(addPageObj.gitRepoUrl).type(gitUrl),
  verifyPipelineCheckBox: () => cy.get(addPageObj.pipeline.addPipeline).should('be.visible'),
  enterAppName:(appName: string) => {
    cy.get(addPageObj.appName).then(($el) => {
      const tag: string = $el.prop("tagName");
      if(tag.includes('button')) {
        cy.get(addPageObj.appName).click();
        cy.get(`li #${appName}-link`).click();
      }
      else {
        cy.get(addPageObj.appName).clear().type(appName)
      }
    });
  },
  enterComponentName: (name: string) => {
    cy.get(addPageObj.nodeName).as('nodeName');
    cy.wait(2000);
    cy.get('@nodeName').clear();
    cy.get('@nodeName').type(name);
    cy.get('@nodeName').should('have.value', name);
  },
  selectResource: (resource: string = 'deployment') => {
    switch (resource) {
      case 'deployment':
      case 'Deployment':
        cy.get(addPageObj.resources.deployment).check();
        break;
      case 'deployment config':
      case 'Deployment Config':
        cy.get(addPageObj.resources.deploymentConfig).check();
        break;
      case 'knative':
      case 'Knative':
        cy.get(addPageObj.resources.knative).check();
        break;
      default:
        throw new Error('Option is not available');
        break;
    }
  },
  selectAdvancedOptions: (opt: gitAdvancedOptions) => {
    switch (opt) {
      case gitAdvancedOptions.Routing:
        cy.byButtonText('Routing').click();
        break;
      case gitAdvancedOptions.BuildConfig:
        cy.byButtonText('Build Configuration').click();
        break;
      case gitAdvancedOptions.Deployment:
        cy.byButtonText('Deployment').click();
        break;
      case gitAdvancedOptions.Scaling:
        cy.byButtonText('Scaling').click();
        break;
      case gitAdvancedOptions.ResourceLimits:
        cy.byButtonText('Resource Limits').click();
        break;
      case gitAdvancedOptions.Labels:
        cy.byButtonText('Labels').click();
        break;
      case gitAdvancedOptions.HealthChecks:
        cy.byButtonText('Health Checks').click();
        break;
      default:
        throw new Error('Option is not available');
        break;
    }
  },
  selectCardFromOptions: (card: addOptions | string) => {
    switch (card) {
      case 'Git':
      case addOptions.Git:
        cy.byLegacyTestID('import-from-git').click();
        cy.titleShouldBe('Import from git');
        break;
      case 'Deploy Image':
      case addOptions.ContainerImage:
        cy.byLegacyTestID('deploy-image').click();
        cy.titleShouldBe('Deploy Image');
        break;
      case 'Import from Dockerfile':
      case addOptions.DockerFile:
        cy.byLegacyTestID('import-from-dockerfile').click();
        cy.titleShouldBe('Import from Dockerfile');
        break;
      case 'Catalog file':
      case addOptions.Catalog:
        cy.byLegacyTestID('dev-catalog').click();
        cy.titleShouldBe('Developer Catalog');
        break;
      case 'Database':
      case addOptions.Database:
        cy.byLegacyTestID('dev-catalog-databases').click();
        cy.titleShouldBe('Developer Catalog');
        break;
      case 'Event Sources':
      case addOptions.EventSource:
        cy.byLegacyTestID('knative-event-source').click();
        cy.titleShouldBe('Event Sources');
        break;
      case 'Helm Chart':
      case addOptions.HelmChart:
        cy.byLegacyTestID('helm').click();
        cy.titleShouldBe('Developer Catalog');
        cy.byTestID('kind-helm-chart').should('be.checked');
        break;
      case 'Operator Backed':
      case addOptions.OperatorBacked:
        cy.byLegacyTestID('operator-backed').click();
        cy.titleShouldBe('Developer Catalog');
        cy.byTestID('kind-cluster-service-version').should('be.checked');
        break;
      case 'Pipelines':
      case addOptions.Pipeline:
        cy.byLegacyTestID('pipeline').click();
        cy.get('h1.odc-pipeline-builder-header__title').should('have.text', 'Pipeline Builder');
        break;
      case 'Yaml':
      case addOptions.YAML:
        cy.byLegacyTestID('import-yaml').click();
        cy.titleShouldBe('Import YAML');
        break;
      default:
        throw new Error('Option is not available');
        break;
    }
  },
  selectAddPipeline: () => cy.get(addPageObj.pipeline.addPipeline).scrollIntoView().check(),
  clicKCreate: () => cy.get(addPageObj.create).click(),
  clickCancel:() => cy.get(addPageObj.cancel).click(),
  verifyValidatedMessage:() => cy.get(addPageObj.gitSection.validatedMessage).should('have.text', 'Validated'),
  verifyBuilderImageDetectedMessage:() => cy.get(addPageObj.builderSection.builderImageDetected).should('be.visible'),
  verifyBuilderImageVersion:() => cy.get(addPageObj.builderSection.builderImageVersion).should('be.visible'),
  verifyCard:(cardName: string) => cy.get(addPageObj.cardTitle).contains(cardName).should('be.visible'),
  createGitWorkload:(gitUrl: string = 'https://github.com/sclorg/nodejs-ex.git', appName: string = 'nodejs-ex-git-app', componentName: string = 'nodejs-ex-git', resourceType: string = 'Deployment') => {
    addPage.selectCardFromOptions(addOptions.Git);
    addPage.enterGitUrl(gitUrl);
    addPage.enterAppName(appName);
    addPage.enterComponentName(componentName);
    addPage.selectResource(resourceType);
    addPage.clicKCreate();
  },
};
