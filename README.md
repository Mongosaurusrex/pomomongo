# Mongo README

This is the README for the extension "Pomomongo". 
The aim is to create a useful "pomodoro"-type extension to supercharge and maximize your focus whilst never leaving VsCode.<br>
Read about the Pomodoro method [here](https://www.techtarget.com/whatis/definition/pomodoro-technique)

## Features

- Simple pomodoro timer
- Simple configurations to tailor the pomodoro timer to your preferences
- Possibility to play sounds whenever the timer is finished or a new focus time is started

## Basic usage

There are two states that the timer can be in
#### Running
![Pomomongo running state](/assets/running.png "Pomomongo running state")

*Here the remaining time is visualized by MM:SS*
#### Standby
![Pomomongo standby state](/assets/standby.png "Pomomongo standby state")

*The timer is waiting to be started*
<br><br>
To start the timer just make sure that you setup the timer with the desired extension settings and then just press the timer to begin the cycle of focus time and rest time.

**Bear in mind** that if you press the timer while it is running then you will reset the whole thing, that means if you then start it again you will have to begin from the beginning again. Nevermind how many iterations that you've previously finished.

## Extension Settings

This extension contributes the following settings:

* `pomomongo.pomodoroTime` [`number`] : Specifies the time for being focused
* `pomomongo.restTime` [`number`]: Specifies the time for resting
* `pomomongo.iterations` [`number`]: Specifies the amount of iterations n * (focus time + rest time) to execute
* `pomomongo.restTime` [`boolean`]: Should play sounds f.e when the timer is finished

## Known Issues

- The timer for a split second shows -1 in the time before switching between focus time and rest time
- If the last focus time is finished then the timer should just reset, but for now it continues to do the last rest sequence

If you experience issues that are not listed here, please report them [here](https://github.com/Mongosaurusrex/pomomongo/issues)

## Planned improvements
#### Soon
- Better way to visually distinguish between a resting period and a focus period
- Notifications to tell the user about when there is a switch in periods

#### Later
- Pause the timer rather than to reset it upon press

## Release Notes

### 0.1.0
First release of the Pomomongo pomodoro timer, basic functionality included




---
