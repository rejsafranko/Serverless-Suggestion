import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class MlAutocompleteApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dockerFunc = new lambda.DockerImageFunction(this, "DockerFunc", {
      code: lambda.DockerImageCode.fromImageAsset("./image"),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      architecture: lambda.Architecture.X86_64,
    });

    const functionUrl = dockerFunc.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedMethods: [lambda.HttpMethod.POST],
        allowedHeaders: ["*"],
        allowedOrigins: ["*"],
      },
    });
  }
}