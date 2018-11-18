# Mars Rover Kata (Java)

## Goal
Practice Classicist TDD (state verification, no mocks) and familiarize with common code smells, refactoring steps, design patterns and principles.

## Description
Develop an api that moves a rover around on a grid.

* You are given the initial starting point (x, y) of a rover and the direction (North, South, East, West) it is facing.
* The rover receives a list of commands.
* Implement commands that move the rover forward / backward.
* Implement commands that turn the rover left / right.
* Make sure rover doesn't move if it receives an unknown command

Sample api:
```
Rover rover = new Rover(0, 0, 'N');
rover.move("FFBLFR")
```

## Implementation
Recommended approach to solve this kata is by using TDD.

Useful resource: https://sourcemaking.com

