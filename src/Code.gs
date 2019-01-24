/**
 * @author Jens Rosemeier <github@jens79.de>
 * @github  https://github.com/ljay79/jira-tools
 * @copyright Jens Rosemeier, 2017-2019
 * 
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 *
 * ToDo/Notes:
 * - use google auth with token based Jira RESTful API vs. cleartext password
 */

var BUILD = '1.0.7';

// Node required code block
const ScriptApp = require("../test/mocks/ScriptApp.js");
const PropertiesService = require("../test/mocks/PropertiesService.js");
const SpreadsheetApp = require('../test/mocks/SpreadsheetApp.js');
const debug = require('./debug.gs');
const environmentConfiguration = require('./environmentConfiguration.gs');
// End of Node required code block

/**
 * Simple JSON object used for environment configuration e.g. Debugging / Feature Switches
 */
var environmentConfiguration = {
  "name": "Test",
};

/** 
 * Add a nice menu option for the users.
 */
function onOpen(e) {
  addMenu();
};

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Add "Jira" Menu to UI.
 * @OnlyCurrentDoc
 */
function addMenu() {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Re-Calculate all formulas in active sheet', 'recalcCustomFunctions')
    .addItem('Update Ticket Key Status "KEY-123 [Done]"', 'dialogRefreshTicketsIds')
    .addItem('Show Jira Field Map', 'sidebarJiraFieldMap')
    
    .addSeparator()
    .addItem('List Issues from Filter', 'dialogIssueFromFilter')
    .addItem('Create Time Report', 'dialogTimesheet')

    .addSeparator()
    .addItem('Settings', 'dialogSettings')
    .addItem('Configure Custom Fields', 'dialogCustomFields')
    .addItem('About', 'dialogAbout')

    .addToUi();
}

// Node required code block
module.exports = {
  onOpen: onOpen,
}
// End of Node required code block