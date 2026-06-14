# Output Example

## 1. Task Restatement

- **Target outcome:** Review an appointment booking redesign before implementation.
- **Specialized industry/domain:** Dental clinic management software.
- **Key assumptions:** The booking flow serves patients, reception staff, and clinicians; appointment type and chair availability matter.
- **Known constraints:** Existing patient records and reminder workflows must keep working.

## 2. First-Pass Expert Review

- **Domain/Product Expert**
  - Recommendation: Model bookings around provider, chair, appointment type, and required prep time, not just open calendar slots.
  - Main concern: Hygiene turnaround, emergency holds, and treatment duration differences can make a simple slot picker unsafe.
  - Would reject: A generic calendar UI that lets patients book any visible gap without clinic rules.

- **Principal UI/UX Designer**
  - Recommendation: Split patient self-booking from staff scheduling, with clearer copy for treatment type and confirmation state.
  - Main concern: Patients may not know whether they need a checkup, hygiene visit, or urgent appointment.
  - Would reject: A dense staff-style scheduler exposed directly to patients.

- **Principal Software Architect**
  - Recommendation: Keep scheduling rules in a server-side availability service and expose a narrow API to clients.
  - Main concern: Duplicating booking rules across frontend and backend will create inconsistent availability.
  - Would reject: Client-side slot filtering as the source of truth.

- **QA/Security/Ops Lead**
  - Recommendation: Add tests for double booking, canceled slots, reminder triggers, and authorization boundaries.
  - Main concern: Calendar race conditions could create duplicate appointments.
  - Would reject: Shipping without concurrency tests and rollback instructions.

## 3. Cross-Correction Round

- **Domain/Product -> UX:** Do not ask patients to choose internal chair or provider constraints; translate those rules into available times.
- **UX -> Architecture:** The API should return user-safe explanations for unavailable times rather than exposing raw scheduling rules.
- **Architecture -> QA/Ops:** Race-condition protection belongs in the booking transaction, not only in tests.
- **QA/Ops -> Domain/Product:** Emergency hold rules need monitoring because staff may override them under pressure.

## 4. Synthesis

- **Best option:** Build a server-owned availability and booking flow with separate patient and staff interfaces.
- **Why it wins:** It preserves clinic rules while keeping the patient experience simple.
- **What was rejected:** A generic calendar-only redesign and frontend-owned slot validation.
- **Main tradeoff:** More backend work before visible UI progress.
- **Remaining risk:** Existing reminder and cancellation workflows may hide edge cases.

## 5. Implementation Plan

- **Files/modules likely affected:** Booking API, availability service, appointment model, patient booking UI, staff scheduler, reminder tests.
- **Step-by-step implementation order:** Audit current booking rules; design availability API; add transaction-safe booking; update patient flow; update staff flow; add tests; prepare rollback.
- **Tests/checks to run:** Unit tests for availability rules, integration tests for booking conflicts, accessibility checks for the patient flow, regression tests for reminders.
- **Rollback or safety plan:** Feature flag the new flow and keep the existing booking path available until clinic staff validate live behavior.

## 6. Final Decision

- **Decision:** Proceed with a server-owned availability redesign behind a feature flag.
- **Confidence:** Medium
- **Blocking questions:** Confirm whether hygienist, dentist, and chair resources are modeled separately today.
- **Next action:** Inspect the current booking model and availability code before implementation.
