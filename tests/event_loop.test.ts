import { assertEquals } from 'assert'

import { EventLoop } from '@/event_loop.ts'

Deno.test('enqueueTask should add tasks to taskQueue', () => {
  const eventLoop = new EventLoop()

  eventLoop.enqueueTask(() => {
    console.log('task 1')
  })

  assertEquals(eventLoop.taskQueue.length, 1)

  eventLoop.enqueueTask(() => {
    console.log('task 2')
  })

  assertEquals(eventLoop.taskQueue.length, 2)
})

Deno.test('enqueueDelayedTask should add tasks to timerQueue', () => {
  const eventLoop = new EventLoop()
  const originalDateNow = Date.now
  Date.now = () => 1693789670000

  eventLoop.enqueueDelayedTask(() => {
    console.log('task 1')
  }, 2000)

  assertEquals(eventLoop.timerQueue.length, 1)
  assertEquals(eventLoop.timerQueue[0].time, 1693789672000)

  eventLoop.enqueueDelayedTask(() => {
    console.log('task 2')
  }, 1000)

  assertEquals(eventLoop.timerQueue.length, 2)
  assertEquals(eventLoop.timerQueue[0].time, 1693789671000)
  Date.now = originalDateNow
})

Deno.test(
  'The queues should be empty after running the eventLoop',
  async () => {
    const eventLoop = new EventLoop()

    eventLoop.enqueueTask(() => {
      console.log('Task 1')
    })

    eventLoop.enqueueTask(() => {
      console.log('Task 2')
    })

    eventLoop.enqueueDelayedTask(() => {
      console.log('Task 3')
    }, 2000)

    eventLoop.run()
    await new Promise(resolve => setTimeout(resolve, 2000))

    assertEquals(eventLoop.taskQueue.length, 0)
    assertEquals(eventLoop.timerQueue.length, 0)
  },
)
