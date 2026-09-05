# Katel Capital platform architecture

This repository preserves the existing public React website and introduces a typed application layer for identity, portals, and the connected Katel operating journey.

## Runtime flow

`React + TypeScript -> Apollo Client -> NestJS GraphQL -> domain services -> Prisma -> PostgreSQL`

REST remains available for health checks, uploads, webhooks, and future signed-storage operations. Redis supports refresh-session cache, BullMQ jobs, and future application caching.

## Identity and authorization

- One `User` is the central identity across Academy, Professional, Client, and Staff experiences.
- Each user has one principal `Role`.
- `RolePermission` provides defaults.
- `UserPermissionOverride` can explicitly grant or deny a permission.
- Backend permission checks are authoritative; frontend guards only improve navigation and usability.
- Refresh sessions store only hashed refresh tokens. Rotation revokes the previous token.

## Core relationship summary

```text
User -> Role -> RolePermission -> Permission
  |       \-> UserPermissionOverride
  |-> RefreshSession / EmailVerificationToken / PasswordResetToken / LoginHistory
  |-> AcademyEnrollment -> AcademyCourse -> AcademyResult / AcademyCompletion -> AcademyCertificate
  |-> ProfessionalProfile -> Education / Experience / Skills / Languages / Certifications / Availability
  |                         -> AssessmentSession -> CriterionScore
  |                         -> VettingCase -> ReadinessApproval
  |-> OrganizationUser -> ClientOrganization -> ClientContact
                                      |-> TalentRequest -> RequiredSkills / Requirements / StatusHistory
                                                          |-> MatchCandidate -> Shortlist -> Interview
                                                                                -> Selection -> Onboarding
                                                                                             -> Engagement
                                                                                                  -> SupportCase
  |-> Message / Notification / Document / AuditLog / Payment
```

## Historical-record rules

- Human-facing codes are unique public identifiers, never relational primary keys.
- Academy completion, professional status, request status, readiness, interviews, selection, onboarding, and engagement records preserve history.
- Critical business transitions record actor, timestamp, and reason.
- Destructive cascade behavior is limited to dependent join/detail rows. Business history uses `Restrict` or nullable actor relationships.
- Client organization visibility is scoped in backend services, never inferred from hidden frontend controls.

## Milestone 1 boundary

Milestone 1 makes PostgreSQL, Redis, NestJS, GraphQL, secure authentication, roles, permissions, seeded development accounts, protected routes, and database-driven dashboards operational. Deep LMS delivery remains intentionally outside this milestone, while its relational foundation is included.
