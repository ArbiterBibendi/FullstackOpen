```mermaid
sequenceDiagram
    participant Client
    participant Server

    note right of Client: Note is added to the list and Notes are re-rendered
    Client->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server->>Client: Status Message
    deactivate Server
```