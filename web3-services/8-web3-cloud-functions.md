# Web3 Cloud Functions

## Introduction

Apillon's Cloud Function service provides developers with the ability to deploy decentralized computing tasks across a distributed network of mobile devices. This ensures that applications and scripts can run in a secure, unstoppable manner, avoiding reliance on centralized infrastructure. By utilizing Acurast's decentralized compute architecture, Apillon offers an alternative to traditional cloud services, ensuring privacy, resilience, and global scalability.

## What is Acurast?

Acurast the phone powered decentralized serverless cloud. Leveraging the advantages of mobile phones provided by the Acurast community across the globe, Acurast enables verifiable and confidential computations. Developers can deploy applications without needing to rely on centralized systems, ensuring privacy and data verifiability throughout the entire process.

Through Acurast, developers can run decentralized applications that interact seamlessly with both Web3 and Web2 systems. Acurast matches computational jobs to a network of Processors providing the requested compute power using through the Acurast protocol, ensuring secure and efficient deployments. [Learn more](https://docs.acurast.com/).

## Core Features of Apillon's Cloud Function Service

1. **Script Deployment and Execution**
Apillon Cloud Functions offer developers a familiar environment similar to centralized cloud providers like AWS or Google Cloud. Developers can deploy scripts (e.g., JavaScript or Node.js) as on-demand functions or long-running tasks. These scripts can handle tasks like calling APIs or hosting continuous services such as Discord bots. Apillon also supports scheduled executions through cron expressions, enabling automatic execution without manual intervention.

2. **Decentralized, Verifiable Compute**
Apillon leverages Acurast’s execution layer, which includes both the Acurast Secure Hardware Runtime (ASHR) and Zero-Knowledge Proof (ZKP)-based runtimes. This setup allows for secure, tamper-proof execution of sensitive computations. Developers can store secrets like API keys or wallet private keys in encrypted environments, which are used as part of their cloud function deployments without the risk of exposure.

3. **Unstoppable Application Execution**
Apillon ensures that once a cloud function is deployed on the decentralized network, it remains unstoppable by any central authority. By distributing the execution across multiple processors, Apillon guarantees that a single point of failure cannot disrupt the task. This makes Apillon especially suitable for decentralized applications (dApps) that require continuous, reliable execution.

4. **Cross-Chain and Web3 Integration**
The Cloud Function service integrates smoothly with various blockchain ecosystems, including Ethereum, Tezos, and others. Developers can specify where the results of their computations are delivered, whether to a blockchain or a Web2 system. This cross-chain functionality allows Web3 developers to build highly interoperable, decentralized applications.

## How It Works

1. **Cloud Function Creation**: Developers can create cloud functions via Apillon by providing parameters like the function name, description, and project UUID. This is done either through a simple API call or through Apillon’s developer console. Once created, the cloud function is registered on the decentralized network and ready to be executed on available processors.

2. **Job Creation and Matching**: After creating a cloud function, developers define specific tasks or jobs. These jobs include parameters like memory usage, storage needs, and scheduling details. Once a job is created, Acurast’s consensus layer matches it with appropriate processors based on their capabilities and reputation. Apillon automates aspects of job creation, such as uploading and pinning the script file to IPFS. Apillon also monitors job status, ensuring it is successfully matched with a processor, simplifying the entire deployment process.

3. **Job Execution**: Once matched, processors execute the jobs within Acurast’s secure hardware or ZKP-based runtimes. Apillon provides a dedicated API gateway for developers to trigger job executions, making it easy to initiate compute tasks just like with centralized cloud services. This seamless access eliminates the need for direct interaction with Acurast’s underlying infrastructure.

4. **Environment Management**: Developers can set up and manage runtime environments by defining environment variables, which are fully encrypted and securely handled by Apillon. If a new job is deployed under the same cloud function, Apillon automatically transfers the environment variables, ensuring continuity in execution without manual intervention.

5. **Execution Control and Monitoring**: Apillon offers real-time monitoring and execution control. Developers can track usage statistics, success rates, and deployment health through a dashboard. In the case of processor failure, Apillon’s health check mechanism automatically redeploys jobs to new processors, ensuring continuous execution without downtime.

6. **Job Versioning**: Apillon supports versioning, allowing developers to maintain multiple versions of their cloud functions. They can switch between versions or roll back to previous versions without disrupting the API endpoint. This ensures flexibility in managing application updates.

7. **Load Balancing**: Apillon implements a load balancing mechanism that distributes jobs across multiple processors. If a processor becomes overloaded or inaccessible, Apillon automatically switches to an alternative processor, ensuring uninterrupted service and optimal performance.

## Cloud Function Performance and Scalability

Apillon Cloud Functions are designed to offer robust performance and scalability to meet the needs of various applications. Here are the key details regarding the computational power and parallel execution capabilities:

1. **CPU and RAM Specifications**:
Each cloud function's CPU and RAM are fully dependent on the phone's capacity, allowing for flexible resource allocation. The Acurast protocol guarantees full uptime and ensures timely execution, with no maximum bundle sizes for applications.
Developers can specify the required CPU and RAM for their functions during the deployment process, ensuring that the allocated resources match the needs of their applications.

2. **Parallel Execution**:
Apillon supports the parallel execution of cloud functions across multiple devices, similar to AWS Lambda. This means that a single function can be executed simultaneously on different processors, enhancing performance and reducing execution time.
The number of devices that can run in parallel depends on the availability of processors in the decentralized network. Apillon's load balancing mechanism ensures optimal distribution of tasks across available devices, maximizing efficiency and reliability.

3. **Scalability**:
The decentralized nature of Apillon's Cloud Function service allows it to scale dynamically based on demand. Scalability is achieved by deploying to multiple instances and executing in parallel automatically, similar to AWS Lambda. As more devices join the network, the overall computational capacity increases, enabling the system to handle larger workloads and more concurrent executions.
Apillon's architecture ensures that even during peak usage times, the system can maintain high performance and responsiveness by leveraging the distributed network of processors.

## Using Cloud Functions

### Deploying a Cloud Function

To get started with Apillon Cloud Functions, you can use our developer console and access the [Cloud Functions service](https://app.apillon.io/dashboard/service/cloud-functions).
Alternatively, you can use the [Cloud Functions API](/build/11-cloud-functions-api.md), our [Cloud Functions SDK](/build/5-apillon-sdk.html#cloud-functions), or our [CLI tool](/build/6-apillon-cli.html#cloud-function-commands) to create, deploy and manage your cloud functions.

We have created a [sample project](https://github.com/Apillon/cloud-function-template) that provides you with a boilerplate example of a cloud function you can deploy.
You are able to modify, build and deploy this template based on your needs. You may also browse through other examples provided by Acurast on their [GitHub repository](https://github.com/Acurast/acurast-example-apps).

All the code details are available in the project's [README](https://github.com/Apillon/cloud-function-template/blob/main/README.md).

You can read more about cloud function deployment on the [Acurast documentation](https://docs.acurast.com/developers/on-demand-deployments).

### Monitoring and Managing Cloud Functions

You can monitor and manage your cloud functions via the [Cloud Functions service](https://app.apillon.io/dashboard/service/cloud-functions) in the developer console.
Apillon offers you a way to view the status of your cloud functions, view the deployment history, roll back to an older version and view the usage graph which also shows the number of executions and the error rate.

## Conclusion

Apillon’s Cloud Function service provides a groundbreaking solution for developers seeking decentralized computing. By leveraging mobile devices and Acurast’s secure, verifiable compute architecture, Apillon allows developers to deploy unstoppable, cross-chain applications in a simple, seamless manner. Key benefits include easy integration with Web3 platforms, real-time monitoring, environment management, job versioning, and load balancing—all ensuring a reliable, privacy-focused, and scalable solution for decentralized computing.
