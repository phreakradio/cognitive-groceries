# cognitive-groceries
IBM Poughkeepsie Hackathon 2016 submission

## 2nd Place Winners : Demian "Alejandro" Velasco & Dmytro Malaniouk ##

### Abstract ###:
Using IBM's Watson and open source technology, we were able to setup a skeleton backend system that
visually detects the food in a user's fridge and identifies the state of it. For lack of a better 
description, a food ledger that leverages the power of IBM's Machine Learning Cloud platform

- `camera.py`
	Python script runs locally on s Raspberry Pi with Camera attachment. 
	When user clicks a button attached to RPi's GPIO pins, a picture is 
	taken, stored, and sent to backend server. Of course we were aware of 
	node.js containing a Camera package, but for purposes of this event and
	difficulties setting it up, we switched to python
	
- `app.js`
	Node.js backend server instance grabs image and sends it to Cloudant platform
	Cloudant then performs an assessment to determine what it can recognize in the
	pictures.
	
- `curr.jpg`
	Test image. Given state of Cloudant and available developer ML APIs at time of
	hackathon, image would not always return accurate results. 