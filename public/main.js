// @ts-check

import { APIWrapper, API_EVENT_TYPE } from "./api.js";
import { addMessage,
      animateGift,
      isPossiblyAnimatingGift,
      isAnimatingGiftUI } from "./dom_updates.js";

const api = new APIWrapper();

var sayi = 0;

setInterval(function () {

  // if (sayi <= 50) {
  //   var div = document.getElementById('text-total');
  //   div.innerHTML += sayi;
  //   sayi++;
    
  // }
}, 2000);



class Queue {
  constructor(list = []) {
    this.list = list
    this.shownIdList = []
    this.current = null
    this.timer = null
  }

  sort(list) {
    const sortedList = [...list]
    sortedList.sort(function (a, b) {
      if (a.type === API_EVENT_TYPE.ANIMATED_GIFT) return -1
      else return 1
    })
    return sortedList
  }

  show() {
    if (!this.current) return
    addMessage(this.current)
    this.current.type === API_EVENT_TYPE.ANIMATED_GIFT && animateGift(this.current)
    this.shownIdList.push(this.current.id)
  }

  change() {
    this.remove(this.current)

    // Find possible to shown event
    this.current = this.list.find((event) => {
      if (event.type !== API_EVENT_TYPE.ANIMATED_GIFT) return true
      else if (!isPossiblyAnimatingGift() && !isAnimatingGiftUI()) return true
      else return false
    })
    this.show()
  }

  isAllreadyShown(item) {
    return this.shownIdList.some(id => id === item.id)
  }

  handleList() {
    this.list = this.list.filter(item => !this.isAllreadyShown(item) || (item.type === API_EVENT_TYPE.MESSAGE && new Date() - item.timestamp < 20000))
  }

  start(newList = []) {
    const sortedList = this.sort(newList)
    this.list = [...this.list, ...sortedList]
    // Also has started only need add to que
    if (this.timer) return

    this.timer = setInterval(() => {
      // Clear allready showned items from list
      this.handleList()
      // Clear interval when empty list
      if (!this.list.length) return stop()
      this.change()
    }, 500);
  }

  stop() {
    clearInterval(this.timer)
  }

  remove(item) {
    if (!item) return
    const index = this.list.findIndex(item => item.id === item.id)
    this.list.splice(index, 1);
  }
}

const shownQueue = new Queue()

api.setEventHandler((events) => {
  shownQueue.start(events)
})

// NOTE: UI helper methods from `dom_updates` are already imported above.
