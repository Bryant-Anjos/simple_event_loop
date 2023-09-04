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
