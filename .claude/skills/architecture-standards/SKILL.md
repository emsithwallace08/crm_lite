---
description: Architecture and design standards for planning features, reviewing system structure, and evaluating technical approaches.  
---

# Architecture Standards

When designing or reviewing a feature:

1. Understand the existing architecture before proposing changes.
2. Prefer existing project patterns over introducing new abstractions.
3. Identify boundaries between UI, application logic, domain logic, and infrastructure.
4. Minimize coupling between modules.
5. Prefer simple solutions over speculative abstraction.
6. Identify security, performance, maintainability, and scalability implications.
7. Identify files and components likely to change.
8. Do not modify code while performing architecture analysis.

## Required Output

Return:

- Problem summary
- Existing architecture
- Proposed approach
- Files/components affected
- Data flow
- Risks and edge cases
- Implementation sequence
- Verification strategy