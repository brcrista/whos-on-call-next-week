const whosOnCallNextWeek = require('../src/whos-on-call-next-week');

test('Run the action end-to-end through its API', async () => {
    expect(process.env['PAGERDUTY_SCHEDULE_ID']).toBeDefined();
    expect(process.env['PAGERDUTY_API_KEY']).toBeDefined();

    await whosOnCallNextWeek.run({
        scheduleId: process.env['PAGERDUTY_SCHEDULE_ID'],
        pagerDutyToken: process.env['PAGERDUTY_API_KEY']
    });
});
