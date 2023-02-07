import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { EventBridgeStack } from './event-bridge-stack';

describe('EventBridgeStack', () => {
  describe('synthesizes the EventBridgeStack as we expect', () => {
    const app = new App();
    const eventMonitoringStack = new EventBridgeStack(app, 'EventBridgeStack');

    // Prepare the stack for assertions.
    const template = Template.fromStack(eventMonitoringStack);

    it(`should create an event bus named "central-event-bus"`, () => {
      template.resourceCountIs('AWS::Events::EventBus', 1);
      template.hasResourceProperties('AWS::Events::EventBus', {
        Name: 'central-event-bus',
      });
    });
  });
});
