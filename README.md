# Who's On Call Next Week?

[![GitHub Actions build badge](https://github.com/brcrista/whos-on-call-next-week/workflows/build-test/badge.svg)](https://github.com/brcrista/whos-on-call-next-week/actions?query=workflow%3Abuild-test)

GitHub Action to look up who's on call next week.

**Note:** I am no longer maintaining this.  Please fork it if you would like to make changes.

## Example

```yml
- uses: brcrista/whos-on-call-next-week@dev
  id: oncallSchedule
  with:
    scheduleId: PVHAB95
    pagerDutyToken: ${{ secrets.PAGERDUTY_API_KEY }}

# Check that the output parameter has been set.
- run: echo $ONCALLNEXTWEEK
  env:
    ONCALLNEXTWEEK: ${{ steps.oncallSchedule.outputs.oncallNextWeek }}
```

## Contributing

### Running tests

```bash
export PAGERDUTY_API_KEY="your PagerDuty API key"
export PAGERDUTY_SCHEDULE_ID="your PagerDuty schedule ID"
npm run test
```
