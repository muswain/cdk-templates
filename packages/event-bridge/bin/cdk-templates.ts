#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EventBridgeStack } from '../lib/event-bridge-stack';

const app = new cdk.App();
new EventBridgeStack(app, 'EventBridgeStack');
