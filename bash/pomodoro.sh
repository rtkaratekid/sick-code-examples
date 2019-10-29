#!/bin/bash
for i in `seq 1 4`;
do
	paplay /usr/share/sounds/freedesktop/stereo/complete.oga && zenity --warning --text="Starting a 4 Pomodoro round, you ready?"
	sleep 1500 && paplay /usr/share/sounds/freedesktop/stereo/complete.oga && notify-send "Your pomodoro session just ended. Have a well deserved 5 minutes break"
	sleep 300 && paplay /usr/share/sounds/freedesktop/stereo/complete.oga && notify-send "Roll up your sleeves, it's time for another Pomodoro"
done
