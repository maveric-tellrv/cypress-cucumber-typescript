Feature: Perform actions on knative service
    As a user I want to perform edit or delete operations and Set Traffic Distribution on knative Service in topology page

Background:
   Given open shift cluster is installed with Serverless operator
   And user is at developer perspecitve
   And open project namespace "aut-create-knative-actions-service"


@regression, @smoke
Scenario Outline: Knative service menu options: Kn-04-TC01
   Given knative service name "<service_name>" is higlighted on topology page
   When user right click on the knative service "<service_name>"
   Then user able to see the options like Edit Application Grouping, Set Traffic Distribution, Edit Health Checks, Edit Labels, Edit Annotations, Edit Service, Delete Service, "<service_name>"

Examples:
    | service_name    | 
    | nodejs-ex-git-1 |


@regression
Scenario: Edit labels popup details : Kn-04-TC02
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Labels" option from context menu of knative service "nodejs-ex-git-1"
   Then popup displays with header name "Edit Labels"
   And save button is disabled


@regression, @smoke
Scenario: Add label to the exisitng labels list : Kn-04-TC03
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Labels" option from context menu of knative service "nodejs-ex-git-1"
   And add the label "app=label" to exisitng labels list in Edit Labels popup
   And clicks save button on the "Edit Labels" popup
   Then the label "app=label" display in "nodejs-ex-git-1" service side pane details


@regression
Scenario: Remove label from exisitng labels list : Kn-04-TC04
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Labels" option from context menu of knative service "nodejs-ex-git-1"
   And removes the label "app=label" from exisitng labels list in Edit Labels popup
   And clicks save button on the "Edit Labels" popup
   Then the label "app=label" will not display in "nodejs-ex-git-1" service side pane details


@regression
Scenario: Add labels to exisitng labels list and cancel it : Kn-04-TC05
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Labels" option from context menu of knative service "nodejs-ex-git-1"
   And add the label "app=label" to exisitng labels list in Edit Labels popup
   And clicks cancel button on the "Edit Labels" popup
   Then the label "app=label" will not display in side pane details


@regression
Scenario: Edit Annotation popup details : Kn-04-TC11
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Annotaions" option from context menu of knative service "nodejs-ex-git-1"
   Then popup displays with header name "Edit Annotaions"
   And key, value columns are displayed with respecitve text fields
   And Add more link is enabled
   And save button is disabled


@regression, @smoke
Scenario: Add annotation to the exisitng annonations list : Kn-04-TC12
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   And number of annotations are "5" present in "nodejs-ex-git-1" service side pane details tab
   When user selects "Edit Annotaions" option from context menu of knative service "nodejs-ex-git-1"
   And clicks Add button on the Edit Annotaions popup
   And types annotation key as "serving.knative.dev/creator "
   And types annotation value as "kube:admin" 
   And clicks save button on the "Edit Annotaions" popup
   Then number of annotaions increased to "6" in "nodejs-ex-git-1" service side pane details


Scenario: perform cancel action after Edit Annotations : Kn-04-TC14
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   And number of annotations are "6" present in side pane - details tab- annotation section
   When user selects "Edit Annotations" option from context menu of knative service "nodejs-ex-git-1"
   And click on remove icon for the annotation with key "serving.knative.dev/creator" present in Edit Annotaions popup
   And clicks cancel button on the "Edit Annotaions" popup
   Then number of annotaions remains same in side pane details


@regression
Scenario: Remove annotation from exisitng annonations list : Kn-04-TC13
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   And number of annotations are "6" present in side pane - details tab
   When user selects "Edit Annotaions" option from context menu of knative service "nodejs-ex-git-1"
   And click on remove icon for the annotation with key "serving.knative.dev/creator" present in Edit Annotaions popup
   And clicks save button on the "Edit Annotaions" popup
   Then number of annotaions decreased to "5" in side pane details


@regression
Scenario: Edit the service from yaml editor: Kn-04-TC15
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Service" option from context menu of knative service "nodejs-ex-git-1"
   And modify the Yaml file of the Revision details page 
   And click save button on yaml page
   Then message should display as "{service name} has been updated to version {nnnnnn}"
   And another message should display as "This object has been updated."


@regression
Scenario Outline: Update the service to different application group existing in same project : Kn-04-TC07
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Application Grouping" option from context menu of knative service "nodejs-ex-git-1"
   And select the "<application_name>" from "application" drop down present in "Edit Application Grouping" popup
   And clicks save button on the "Edit Application Grouping" popup
   And search for application name "<application_name>" 
   And click on "<application_name>" on topology page
   Then updated service is present in side pane

Examples:
| application_name |
| openshift-app    |


Scenario Outline: Perform cancel operation while editing application group : Kn-04-TC08
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Application Grouping" option from context menu of knative service "nodejs-ex-git-1"
   And  select the "openshift-app" option from "application" drop down present in "Edit Application Grouping" popup
   And clicks cancel button on the "Edit Application Grouping" popup
   And search for application name "<application_name>" 
   And click on "<application_name>" on topology page
   Then updated service should not display in side pane

Examples:
| application_name |
| openshift-app    |


@regression
Scenario Outline: Update the service to new application group : Kn-04-TC06
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Application Grouping" option from context menu of knative service "nodejs-ex-git-1"
   And select the "Create Application" option from "application" drop down present in "Edit Application Grouping" popup
   And type "<application_name>" into the "Application Name" text box
   And clicks save button on the "Edit Application Grouping" popup
   And search for application name "<application_name>" 
   And click on "<application_name>" on topology page 
   Then updated service is present in side pane

Examples:
| application_name |
| openshift-app-1  |


@regression
Scenario: Set traffic distribution greater than 100% for the Revisions of the Knative Service : Kn-04-TC17
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   And service should have at least 1 revision 
   When user selects "Set Traffic Distribution" option from context menu of knative service "nodejs-ex-git-1"
   And click on "Add Revision" button present in "Set Traffic Dsitribution" popup
   And type "50" into the "Split" text box of new revision
   And select the "Revision" option from "revision" drop down
   And clicks save button on the "Set Traffic Dsitribution" popup
   Then error message displays as "validation failed: Traffic targets sum to 150, want 100: spec.traffic"


@regression
Scenario: Set traffic distribution less than 100% for the Revisions of the Knative Service : Kn-04-TC18
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   And service should have at least 1 revision 
   When user selects "Set Traffic Distribution" option from context menu of knative service "nodejs-ex-git-1"
   And type "25" into the "Split" text box
   And click on "Add Revision" button present in "Set Traffic Dsitribution" popup
   And type "50" into the "Split" text box of new revision
   And select the "Revision" option from "revision" drop down
   And clicks save button on the "Set Traffic Dsitribution" popup
   Then error message displays as "validation failed: Traffic targets sum to 75, want 100: spec.traffic"


@regression, @smoke
Scenario: Set traffic distribution equal to 100% for the Revisions of the Knative Service : Kn-04-TC19
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   And service should have at least 1 revision 
   When user selects "Set Traffic Distribution" option from context menu of knative service "nodejs-ex-git-1"
   And type "50" into the "Split" text box
   And click on "Add Revision" button present in "Set Traffic Dsitribution" popup
   And type "50" into the "Split" text box of new revision
   And select the "Revision" option from "revision" drop down
   And clicks save button on the "Set Traffic Dsitribution" popup
   Then number of routes should get increased in side pane - resources tab - routes section


Scenario: Perform cancel opeartion on Edit Health Checks for a service : Kn-04-TC10
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Health Checks" option from context menu of knative service "nodejs-ex-git-1"
   And click cancel button on "Edit Health Checks" page
   Then user redirects to Topology page


@regression
Scenario: Edit Health Checks for a service: Kn-04-TC09
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit Health Checks" option from context menu of knative service "nodejs-ex-git-1"
   And 
   Then 


Scenario: Perform cancel opeartion on Edit NameOfWorkload for a service : Kn-04-TC21
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Edit nodejs-ex-git-1" option from context menu of knative service "nodejs-ex-git-1"
   And click cancel button on "Edit Service" page
   Then user redirects to Topology page


@regression
Scenario: Edit NameOfWorkload for a service [TBD] : Kn-04-TC20
   Given knative service name "nodejs-ex-git-1" is higlighted on topology pagee
   When user selects "Edit nodejs-ex-git-1" option from context menu of knative service "nodejs-ex-git-1"
   And select the "Application -1" option from "Application" drop down
   And click on "Save" button
   Then 


@regression, @smoke
Scenario: Delete service : Kn-04-TC16
   Given knative service name "nodejs-ex-git-1" is higlighted on topology page
   When user selects "Delete Service" option from context menu of knative service "nodejs-ex-git-1"
   Then popup displayed with header name "Delete Service?"
   And modal get closed on clicking Delete button
   And "nodejs-ex-git-1" service should not be displayed in project
