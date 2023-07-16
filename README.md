# Sanavi: An Open-Source Clinical Information System

Sanavi is an ambitious personal project I've undertaken in my spare time. I've often heard complaints about hospital systems being slow, cumbersome, and not particularly user-friendly. Through this project, I'm aiming to explore and tackle the challenges in creating an efficient, user-friendly, and robust Clinical Information System (CIS).

## About
The goal of Sanavi is to build a modular, scalable, and highly responsive CIS that can cater to the diverse needs of hospitals. Built on the Nuxt.js framework, it focuses on delivering a seamless user experience without compromising on performance.

Despite being a personal project, I'm dedicated to following best practices and maintaining a professional level of project organization. This project also serves as a great opportunity for me to enhance my technical skills and broaden my understanding of the complex healthcare domain.

## Project Modules
Sanavi is designed to be a comprehensive solution, encompassing various aspects of hospital management. The key modules in the pipeline are:

1. Patient Management: Handling patient registration, medical history, appointment scheduling, and a patient portal.
2. Medical Records: Implementing Electronic Health Records (EHRs) with robust access control and interoperability.
3. Prescription & Medication Management: Managing drug databases, digital prescriptions, and drug interaction checks.
4. Billing & Insurance: Managing detailed billing information and insurance claims.
5. Laboratory Information System: Managing lab orders and results.
6. Radiology Information System: Managing imaging orders and results.
7. Staff Management: Managing a staff database and role-based access.
8. Analytics and Reporting: Generating detailed reports and providing decision support.

Each module is being developed iteratively, with a focus on integration and interoperability.

## Contributions

tbd, maybe if the project becomes more mature (not sure if it is going anywhere jet), but if you are interested please feel free to reach out

Please adhere to the code of conduct and respect all contributors. Remember, we're all here to learn, grow, and build something useful.

# Note
While this project aims to simulate a realistic Clinical Information System, it is not intended for real-world usage at its current stage. More so, it's an exploratory project aiming to understand the complexities and challenges of building efficient hospital systems.

# Getting Started

## Database Migration

```bash
knex init

# Create migration file for table
knex migrate:make create_patient_table

# fill in needed details in the newly created migrations/... file

knex migrate:latest
```