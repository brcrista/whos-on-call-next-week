'use strict';
const _ = require('lodash');
const pdClient = require('node-pagerduty');

async function run(inputs) {
    const pd = new pdClient(inputs.pagerDutyToken);
    const scheduleResponse = await pd.schedules.getSchedule(
        inputs.scheduleId,
        {
            time_zone: 'UTC',
            since: new Date('2020-07-06'),
            until: new Date('2020-07-13')
        });

    const schedule = JSON.parse(scheduleResponse.body).schedule;
    const finalSchedule = schedule.final_schedule;
    const scheduledUsers = _.uniqBy(finalSchedule.rendered_schedule_entries, x => x.user.id);

    console.log("Scheduled users:");
    console.log(JSON.stringify(scheduledUsers));
}

module.exports.run = run;