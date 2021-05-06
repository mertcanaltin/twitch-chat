
# Sample Project Spec

This project is designed to demonstrate your experience regarding the asynchronous nature of modern web apps. We don't think this project will take much of your time but how long you work on it is **not** an important metric.

You are given an incomplete web app as part of this assignment. Your task is to implement the missing logic according to the [Application Logic](#Application-Logic) below.

You only need to work on the `main.js` file to finish this project. Vanilla javascript should be enough. If you feel more comfortable with them, you can use any superset of javascript (e.g. Typescript), any framework, or any build tool. See [Delivery](#Delivery) below for more info.

You are only required to support the latest Desktop versions of Chrome and/or Safari.


# Application Logic

- You can assume: The user is only a viewer and cannot interact with the page.

- Messages (`.messages`) part of the UI displays UI elements for events with the *all* types (`MESSAGE`, `GIFT`, `ANIMATED_GIFT`). You imagine Gifts and Animated Gifts as a different type of message regarding this part of the UI.

- Animated Gifts have an accompanying full-screen animation. The message UI element and the animation should be in sync. (Both should appear on the screen almost at the same time)

- There can only be at most one gift animation visible on screen at any given time. If there is an ongoing gift animation, other/newer Animated Gifts should wait for it to end.

- The messages (`.messages`) UI should continue to update behind the gift animation. Other types do not need to wait for gift animation to finish.

- Animated Gifts are prioritized over all other types. Animated Gifts should skip ahead of other type events (`MESSAGE`, `GIFT`).
  - For example: If you receive `[APIMessageEvent, APIGiftEvent, APIAnimatedGiftEvent]`, user should see them in *Animated Gift, Message, Gift* order.
  - Hint: Queue**s**

- You are expected to rate limit events when updating the UI.
  - There can only be one event shown to the user per 500ms.
  - Hint: Don't rely on event handler for your own timing.

- Events with the type `MESSAGE` older than 20 seconds should not be shown to the user.
  - You can assume: Client and mock server are in sync.

- Handle duplicate events.
  - You can use `possibleDuplicateEvent=true` for testing.


# Files Provided

NOTE: Code provided is designed to be basic and easy to read. It is not intended to be production-ready and we do not expect you to "fix" it.

## index.html

Includes page layout. Imports the `main.js` and `main.css` files.

## main.js

This is the main file you are expected to edit.

## main.css

CSS for the layout and basic UI.

## api.js

Mock API of this project. Treat it as the networking layer.

NOTE: `JSDoc` type definitions are included here.

## dom_updates.js

Helper methods for dom manipulation.

## assets/*

All static files (e.g. image and video).


# Recommendations

- Start by skimming provided files.
- Make sure to read [Application Logic](#Application-Logic) carefully before coding.
- It might be helpful to set `seed` and `slowMode` params for `APIWrapper` when debugging.


# Delivery

You can send us your work in one of the following ways:

- Public git repo containing all files.
- Public gist (e.g. [Github](https://gist.github.com/)) containing `main.js` and any other additional files you may have modified.
- Email us `main.js` file by itself.

NOTE: If you built or minified your work, please don't forget to also send source files along with compiled/generated files.

