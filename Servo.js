import webopi
from RPIO import PWM
import time

GPIO = webiopi.GPIO
servo = PWM.Servo()
SERVO_PIN = 14

servo.set_servo(SERVO_PIN, 600)
time.sleep(1)
servo.set_servo(SERVO_PIN, 1450)
time.sleep(1)
servo.set_servo(SERVO_PIN, 950)
time.sleep(1)
servo.set_servo(SERVO_PIN, 1450)
time.sleep(1)

servo.set_servo(SERVO_PIN, 600)
time.sleep(0.2)
servo.set_servo(SERVO_PIN, 1450)
time.sleep(0.2)
servo.set_servo(SERVO_PIN, 600)
time.sleep(0.2)
servo.set_servo(SERVO_PIN, 1450)
time.sleep(0.2)











