from cloudant.client import Cloudant
from gpiozero import Button
from base64 import b64encode
import time
import picamera
import requests

#Url for local node.js server that interacts with Cloudant
URL = "localhost:3000/work"

#Flag to determine if button is being held down
flag = False

#Setup button
button = Button(18)

#Setup camera
camera = picamera.PiCamera()
camera.hflip = True
camera.vflip = True

while True:
    if button.is_pressed and flag:      #Check if button is pressed and flag for continuation set
        continue                        #Don't do anything
    if not button.is_pressed and flag:  #Check if button is released and flag for continuation set
        flag = False                    #If it is set it to original status
        continue;
    camera.capture('curr.jpg')          #Take a picture
    r = requests.get(URL)               #Send request to node system
    if(r.status_code == 200)            #If node system did its job right, we're all gucci
        print 'wesa gooood eatin'
    else                                #Otherwise fire your node developer
        print 'node system is down. REPEAT NODE SYSTEM IS DOWN'
    flag = True
