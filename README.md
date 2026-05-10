# DevSecOps Assignment – CI/CD Quality, Security & Governance

## ◆ Steps Performed

### Part 1: Unit Testing & Code Quality
- Implemented unit tests using **Jest** for the Node.js application.
- Integrated test execution into GitHub Actions pipeline.
- Connected **SonarCloud** for static analysis and code quality reporting.
- Fixed issues flagged (hardcoded secret + code smell).

### Part 2: Load Testing (Basic)
- Created a **k6 load test script** simulating 50–100 virtual users.
- Measured response times, throughput, and error rates.
- Verified average latency <1 ms and 0% failures under load.

### Part 3: Security in CI/CD
- Integrated **Trivy** into the pipeline to scan filesystem and Docker images.
- Introduced two vulnerable dependencies (`lodash 4.17.19`, `moment 2.18.0`).
- Trivy detected CVEs (prototype pollution, ReDoS).
- Fixed vulnerabilities by upgrading to safe versions (`lodash 4.17.21`, `moment 2.29.4`) and updating Docker base image.

### Part 4: Secrets Management
- Removed hardcoded secrets from source code.
- Updated application to read secrets from environment variables (`process.env.SECRET_KEY`).
- Configured GitHub Actions to inject secrets securely via repository settings.

### Part 5: Policy as Code (Intro)
- Wrote an **OPA policy (`policy.rego`)** with two rules:
  - Deny Docker images using the `latest` tag.
  - Require Kubernetes containers to define resource limits.
- Simulated policy validation in CI using `opa eval`.
- Produced clear violation messages in logs when rules were broken.

---

## ◆ Tools Used
- **GitHub Actions** – CI/CD automation
- **Jest** – Unit testing framework
- **SonarCloud** – Code quality and static analysis
- **k6** – Load testing tool
- **Trivy** – Vulnerability scanner
- **Open Policy Agent (OPA)** – Policy as Code enforcement
- **Node.js & npm** – Application runtime and dependency management

---

## ◆ Key Learnings
- Automated tests and SonarCloud integration improve reliability and maintainability.
- Load testing validates performance under concurrent user traffic.
- Trivy integration catches vulnerabilities early, enforcing secure builds.
- Secrets should be managed via environment variables, not hardcoded in code.
- OPA policies enforce governance automatically, ensuring compliance with best practices.
- Combining quality, performance, security, and governance in CI/CD strengthens the pipeline end‑to‑end.
