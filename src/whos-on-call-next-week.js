'use strict';
const _ = require('lodash');
const pdClient = require('node-pagerduty');

async function run(inputs) {
    if (!inputs.scheduleId) {
        throw new Error("The `scheduleId` input must be set.")
    }

    if (!inputs.pagerDutyToken) {
        throw new Error("The `pagerDutyToken` input must be set.")
    }

    const pd = new pdClient(inputs.pagerDutyToken);

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    const scheduleResponse = await pd.schedules.getSchedule(
        inputs.scheduleId,
        {
            time_zone: 'UTC',
            since: oneWeekFromNow,
            until: oneWeekFromNow
        });

    const schedule = JSON.parse(scheduleResponse.body).schedule;
    const finalSchedule = schedule.final_schedule;
    const scheduledUserIds = _.uniq(finalSchedule.rendered_schedule_entries.map(x => x.user.id));
    const scheduledUserResponses = await Promise.all(scheduledUserIds.map(pd.users.getUser));
    const scheduledUserEmailAddresses = scheduledUserResponses.map(response => JSON.parse(response.body).user.email);

    // All users in GitHub's PagerDuty account should have a `@github.com` email address.
    // Trust, but verify.
    const [githubEmails, otherEmails] = _.partition(scheduledUserEmailAddresses, x => x.endsWith('@github.com'));
    if (otherEmails.length > 0) {
        [
            '[WARNING]: some PagerDuty users on the schedule do not have a @github.com email address in PagerDuty.',
            'These users will not be returned from this action because their GitHub handle cannot be determined:',
            ...otherEmails
        ].map(_.unary(console.error));
    }

    const githubHandles = githubEmails.map(x => x.split('@')[0]);
    [
        "Scheduled users:",
        ...githubHandles
    ].map(_.unary(console.log));
}

module.exports.run = run;