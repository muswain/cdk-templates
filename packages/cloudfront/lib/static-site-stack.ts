import { Stack, StackProps } from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { SigningKey } from './constructs/signing-key';

export class StaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new SigningKey(scope, 'cfn-signing-key');
  }
}
