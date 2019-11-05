#!/bin/bash
zenity --warning --text="Starting a 4 Pomodoro round, you ready?" && paplay /usr/share/sounds/freedesktop/stereo/complete.oga
echo "starting pomodoro rounds"
for i in `seq 1 4`;
do
	echo "25 minute Pomodoro"
	sleep 1500 && paplay /usr/share/sounds/freedesktop/stereo/complete.oga && notify-send "Your pomodoro session just ended. Have a well deserved 5 minutes break"
	echo "-- 5 minute break"
	sleep 300 && paplay /usr/share/sounds/freedesktop/stereo/complete.oga && notify-send "Roll up your sleeves, it's time for another Pomodoro"
done
