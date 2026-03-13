# Waiting - Backlog

## No input validation at resolver boundary

The spec requires AJV validation before service calls. No validation exists — resolvers pass raw inputs directly to services with no schema checking or error shaping.

## No standardized error handling

Resolvers have no try/catch and don't format errors. Clients receive raw unstructured JavaScript errors with no predictable shape.

3. Structured logging

A thin logger module (wrapping console initially, easily swappable) that logs every mutation with entity type + id +  
 outcome, and every error with full context. Hook it into resolvers and the error formatter.
