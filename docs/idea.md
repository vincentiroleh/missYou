# Memorial Web Application

## Core Features 

- Authentication and authorization
- Memorial page creation
- Memorial page template
- Memorial page sharing
- Notification


# Users

This application would have three types of users:

- **The Customer**
- **Guests**
- **The Admin**

**Functional Requirements (Customer)**

- Customer should be able to sign up with name and email. (reCAPTCHA integration required)
- Customer should be able to set a password.
- Customer should be able to log in with email and password.
- Customer should be able to create a memorial web page for their deceased loved ones.
- Customer should be able to share memorial page to their social networks.
- Customer should be able to donate 💰 (Payment integration required)
- Customer should be able to receive a welcoming mail on registration
- Customer should be able to receive a mail on every tribute or photo added by guests on the memorial page the created

**Functional Requirements (Guests)**

- Guests should be able to add tribute to a memorial page (reCAPTCHA integration required)
- Guests should be able to add photos to a memorial page (reCAPTCHA integration required)

**Functional Requirements (Admin)**

- The admin should be to login with email and password
- The admin should be able to see number of users on the platform
- The admin should be able to see number of memorial web pages created on the platform
- The admin should be able to see countries with number of memorial pages from the platform
- The admin should be able to delete unsolicited message (spam) tributes or photos on memorial web page

## DATA MODELS

**CUSTOMER COLLECTION**

```bash
- name
- email
- password
- donation
```

**MEMORIAL COLLECTION**

```bash

- firstname
- lastname
- gender        #(example: Male or Female)
- relationship #(dropdown with list relationship options)
- dateOfBirth
- countryOfBirth #(dropdown with list country options)
- stateOfBirth #(dropdown with list state options base on the country selected)
- cityOfBirth
- dateOfDeath
- countryOfDeath #(dropdown with list country options)
- stateOfDeath #(dropdown with list state options base on the country selected)
- cityOfDeath
- specialDesignation #(example: COVID-19 Victim, Military veteran)
- webAddress
- image 
- about 
- biography
- tributes: [String],        #not required on while creating memorial page
- gallery: [gallerySchema], #not required on while creating memorial page
- user: { ref: 'User'},    #user's id

```

```bash
# gallerySchema

- photos: [String],
- videos: [String],
- audios: [String],
- createdAt,

```
