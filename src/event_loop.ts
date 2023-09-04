type Task = () => void

export class EventLoop {
  taskQueue: Task[] = []

  timerQueue: { time: number; task: Task }[] = []

  enqueueTask(task: Task) {
    this.taskQueue.push(task)
  }

  enqueueDelayedTask(task: Task, delay: number) {
    const time = Date.now() + delay
    this.timerQueue.push({ task, time })
    this.timerQueue.sort((a, b) => a.time - b.time)
  }

  run() {
    while (true) {
      const currentTime = Date.now()

      while (this.taskQueue.length > 0) {
        const task = this.taskQueue.shift()!
        task()
      }

      while (
        this.timerQueue.length > 0 &&
        this.timerQueue[0].time <= currentTime
      ) {
        const { task } = this.timerQueue.shift()!
        task()
      }

      if (this.taskQueue.length === 0 && this.timerQueue.length === 0) {
        break
      }
    }
  }
}
