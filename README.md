# Simple Event Loop in TypeScript: For Study Purposes Only

**🚨 Disclaimer: This project is for educational purposes and is not intended for production use.**

## About the Project
This repository contains a simplified event loop implementation written in TypeScript. The primary goal is to provide a basic understanding of how an event loop works. The event loop here is minimalistic and supports the addition of tasks, which are simple functions in this context.

### Features
- Written in TypeScript
- Simple API to add tasks (functions)
- Basic event loop functionality
- Designed to run on Deno

### Running

```bash
deno task start
```

### Testing

```bash
deno test
```

The code in `src/index.ts` shows how to use the Event Loop:

```typescript
// src/index.ts

import { EventLoop } from '@/event_loop.ts'

const eventLoop = new EventLoop()

eventLoop.enqueueTask(() => {
  console.log('Task 1')
})

eventLoop.enqueueDelayedTask(() => {
  console.log('Task 2')
}, 2000)

eventLoop.enqueueTask(() => {
  console.log('Task 3')
})

eventLoop.run()

// Output:
// Task 1
// Task 3
// Task 2
```