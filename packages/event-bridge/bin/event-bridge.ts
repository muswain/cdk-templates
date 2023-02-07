#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { EventBridgeStack } from '../lib/event-bridge-stack';

const app = new cdk.App();
Tags.of(app).add('name', 'mj'); // Adds tag for the complete application
new EventBridgeStack(app, 'EventBridgeStack');
