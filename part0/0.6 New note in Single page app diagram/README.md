```mermaid
sequenceDiagram
    participant Client
    participant Server

    note left of Client: Note is added to the list and Notes are re-rendered
    Client->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    note right of Server: Note is appended to DB
    Server->>Client: Status Message
    deactivate Server
```