#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkTemplatesStack } from '../lib/cdk-templates-stack';

const app = new cdk.App();
new CdkTemplatesStack(app, 'CdkTemplatesStack');
