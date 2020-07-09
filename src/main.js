'use strict';
const core = require('@actions/core');
const whosOnCallNextWeek = require('./whos-on-call-next-week');

async function main() {
    try {
        await whosOnCallNextWeek.run({
            scheduleId: core.getInput('scheduleId'),
            pagerDutyToken: core.getInput('pagerDutyToken')
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports.main = main;

main().catch(console.error);