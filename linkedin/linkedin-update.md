# LinkedIn update: copy pack

> **Edit LinkedIn by hand.** This file is paste-ready text only. Do not automate, script or scrape LinkedIn.
>
> **Reconcile dates first.** LinkedIn shows the Levio AI role starting **Jan 2025**. The site shows Levio AI engagements from **Apr 2024** (MCN, Apr–Jul 2024; RSDE-CSPRP, Aug 2024 onward). Pick one source of truth and align both before publishing.
>
> Client names are deliberately left out of everything below. Resolve every `[TODO: ...]` before pasting.

---

## Headline

```text
AI Architect | Governed RAG & GraphRAG for Regulated Enterprises | Agentic Retrieval · Haystack · AWS · Terraform
```

---

## About

```text
I started as a .NET developer, moved into DevOps and cloud infrastructure, and now design AI systems. That path is why my work starts with how a system will be run, governed and maintained, not only how it retrieves.

I'm currently the architect and a hands-on engineer on a governed RAG/GraphRAG platform for a major Canadian financial institution. The hard part isn't retrieval. It's governance: access control, lineage, taxonomy ownership, approval workflows and auditability that fit existing infrastructure and departments that don't share a taxonomy. I designed the model and built most of it with Haystack 3, AWS and Terraform, including an agent that consumes the platform's retrieval endpoints.

Earlier, I built RAG systems for Quebec public-sector clients on AWS Bedrock and GCP Vertex AI, and ingestion pipelines for legacy code. [TODO: add Haystack contribution sentence only if PR merged]

I set technical direction for a team of 4-5 and mentor developers. [TODO: "Open to: ..." line]
```

Note on the Haystack TODO: PR #685 (streaming_callback serialization fix in AmazonBedrockChatGenerator) is **merged**. PR #1061 (Bedrock Converse support / tool calling) was **closed without merging** and superseded by a maintainer's PR (#1219). If you want a sentence, a status-accurate option is:

```text
I've also contributed to Haystack's Amazon Bedrock integration.
```

---

## Experience: Vooban

- **Title:** Développeur Agentique
- **Company:** Vooban
- **Employment type:** Permanent
- **Dates:** Jul 2026 – Present

```text
- Architect and hands-on engineer on a governed RAG/GraphRAG knowledge platform for a major Canadian financial institution (in development).
- Designed the access-control model, and designed and implemented lineage, taxonomy ownership, approval workflows and auditability, integrated with the client's existing infrastructure and organization.
- Designed a multi-taxonomy model that lets taxonomies be split and reorganized across departments that don't coordinate.
- Designed an agent that consumes the platform's retrieval endpoints using multiple retrieval techniques.
- Set technical direction and mentored a team of 4-5 developers.
- [TODO: add one countable figure, e.g. teams in pilot / taxonomies in test / data sources]
```

**Skills for this position:** Haystack, AWS, Terraform, Python

---

## Experience: Levio (AI)

- **Dates:** [TODO: reconcile with site; LinkedIn currently shows Jan 2025 start] – Jul 2026

```text
- Designed and built a RAG assistant for personal-data-protection compliance (Quebec public sector): AWS infrastructure in Terraform, Bedrock and LangChain, Flutter front end with Cognito authentication.
- Designed and built a multi-format ingestion foundation for a RAG/GraphRAG knowledge base, including video and legacy IBM i/AS400 code (GCP Vertex AI, Google ADK, Spanner).
- Optimized LLM orchestration for a generative-AI chatbot in an AWS Landing Zone Accelerator. Built a test bench to measure answer quality and latency, and trained the support team.
```

---

## Experience: Levio (DevOps)

```text
- Deployed and managed Azure resources for a Quebec government ministry, with performance analysis through Azure monitoring and logging.
- Built a tool that removes redundancy between pipeline variables and infrastructure as code.
- Defined access-control strategies for versioning and deployment, and designed CI/CD pipelines aligned with enterprise governance at a major Quebec financial institution.
```

---

## Education

- **School:** UQAC (Université du Québec à Chicoutimi)
- **Degree:** Bachelor of Applied Science
- **Field of study:** Video Game Design & Development
- **End year:** 2017

[TODO: confirm exact wording against diploma]

---

## Skills to pin

In priority order:

1. RAG
2. Haystack
3. Terraform
4. GraphRAG
5. Agentic AI
6. Solution Architecture
7. Data Governance
8. AWS Bedrock
9. Google ADK

---

## Projects: Haystack

- **Name:** Haystack: Amazon Bedrock integration
- **Associated with:** [TODO: Levio or none]
- **Links:**
  - https://github.com/deepset-ai/haystack-core-integrations/pull/685
  - https://github.com/deepset-ai/haystack-core-integrations/pull/1061

```text
Contributor to Haystack's Amazon Bedrock integration: fixed streaming_callback serialization in AmazonBedrockChatGenerator (merged, #685). Proposed Bedrock Converse support to enable tool calling (#1061, not merged; Converse support later landed upstream in a separate PR).
```

[TODO: PR status confirmed by me]. Status as checked on 2026-11-21: #685 merged 2024-04-24; #1061 closed 2024-12-10, "Superseded by #1219".
