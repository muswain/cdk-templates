import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { EventBus, Rule } from 'aws-cdk-lib/aws-events';
import { CloudWatchLogGroup } from 'aws-cdk-lib/aws-events-targets';
import { PolicyStatement, Effect, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class EventBridgeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Event Bus
    const eventBus = new EventBus(this, 'CentralEventBus', {
      eventBusName: 'central-event-bus',
    });

    // Event Monitoring Log Group
    const eventMonitoringLogs = new LogGroup(this, 'EventMonitoringLogs', {
      logGroupName: 'monitoring-log-group',
      retention: RetentionDays.ONE_MONTH,
    });
    new CfnOutput(this, 'eventMonitoringLogsArn', { value: eventMonitoringLogs.logGroupArn });

    // Rule to send message to Event Monitoring Log group
    const eventMonitoringLogRule = new Rule(this, 'EventMonitoringLogRule', {
      ruleName: 'event-monitoring-rule',
      description: `Rule to send message to event monitoring log group`,
      eventBus: eventBus,
      eventPattern: {
        source: [''],
        detailType: [''], // filters on these specific events
      },
      targets: [new CloudWatchLogGroup(eventMonitoringLogs)],
    });
    new CfnOutput(this, 'eventMonitoringLogRule', { value: eventMonitoringLogRule.ruleArn });

    // To allow EventBridge to create the log stream and log the events, CloudWatch Logs must include a resource-based policy that enables EventBridge to write to CloudWatch Logs.
    const eventMonitoringCWLogPolicy = new PolicyStatement({
      actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
      effect: Effect.ALLOW,
      principals: [new ServicePrincipal('events.amazonaws.com'), new ServicePrincipal('delivery.logs.amazonaws.com')],
      resources: [eventMonitoringLogs.logGroupArn],
      sid: 'TrustEventsToStoreLogEvent',
    });
    eventMonitoringLogs.addToResourcePolicy(eventMonitoringCWLogPolicy);
  }
}
