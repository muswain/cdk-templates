import { CfnOutput } from 'aws-cdk-lib';
import { KeyGroup, PublicKey } from 'aws-cdk-lib/aws-cloudfront';
import { KeyPair, PublicKeyFormat } from 'cdk-ec2-key-pair';
import { Construct } from 'constructs';

/**
 * Generates Cloudfront Signing Keys
 */
export class SigningKey extends Construct {
  readonly keyPair: KeyPair;
  readonly keyGroup: KeyGroup;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.keyPair = new KeyPair(this, 'cfn-key-pair', {
      name: 'cfn-signing-key',
      description: 'Cloudfront private key to be used for generating signed urls and cookies',
      exposePublicKey: true,
      publicKeyFormat: PublicKeyFormat.PEM,
    });

    const pubKey = new PublicKey(this, 'cfn-public-key', {
      encodedKey: this.keyPair.publicKeyValue,
    });

    this.keyGroup = new KeyGroup(this, 'cfn-key-group', {
      items: [pubKey],
    });

    new CfnOutput(this, 'CFNSigningPrivateKeyArn', { value: this.keyPair.privateKeyArn });
  }
}
