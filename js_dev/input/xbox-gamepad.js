//https://github.com/kallaspriit/HTML5-JavaScript-Gamepad-Controller-Library

var XboxController = {
	FaceButtons : {
		A_BUTTON: "FACE_1",
		B_BUTTON: "FACE_2",
		X_BUTTON: "FACE_3",
		Y_BUTTON: "FACE_4"
	},
	
	ControlButtons: {
		START_BUTTON:  "START_FORWARD",
		SELECT_BUTTON: "SELECT_BACK"
	},
	
	ShoulderButtons: {
		TOP_LEFT_SHOULDER_BUTTON:     "LEFT_TOP_SHOULDER",
		TOP_RIGHT_SHOULDER_BUTTON:    "RIGHT_TOP_SHOULDER",
		BOTTOM_LEFT_SHOULDER_BUTTON:  "LEFT_BOTTOM_SHOULDER",
		BOTTOM_RIGHT_SHOULDER_BUTTON: "RIGHT_BOTTOM_SHOULDER"
	},
	
	DirectionalPad: {
		UP:    "DPAD_UP",
		RIGHT: "DPAD_RIGHT",
		DOWN:  "DPAD_DOWN",
		LEFT:  "DPAD_LEFT"
	},
	
	Joystick: {
		LeftStick: {
			X: "LEFT_STICK_X",
			Y: "LEFT_STICK_Y"
		}, 
		RightStick: {
			X: "RIGHT_STICK_X",
			Y: "RIGHT_STICK_Y"
		}
	}
}

var gamepad = new Gamepad();
var gamepadStatus = {
	isAPressed: false,
	isBPressed: false,
	isUpPressed: false,
	isDownPressed: false,
	isLeftPressed: false,
	isRightPressed: false,
	isStartPressed: false,
	isStickLeftPressed: false,
	isStickRightPressed: false,
	isStickUpPressed: false,
	isStickDownPressed: false
}

gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
});

gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
	// gamepad disconnected
});

gamepad.bind(Gamepad.Event.UNSUPPORTED, function(device) {
	// an unsupported gamepad connected (add new mapping)
});

gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
	// e.control of gamepad e.gamepad pressed down
	if (e.control === XboxController.FaceButtons.A_BUTTON){
		gamepadStatus.isAPressed = true;
	} else if (e.control === XboxController.FaceButtons.B_BUTTON){
		gamepadStatus.isBPressed  = true;
	} else if (e.control === XboxController.DirectionalPad.LEFT){
		gamepadStatus.isLeftPressed  = true;
	} else if (e.control === XboxController.DirectionalPad.RIGHT){
		gamepadStatus.isRightPressed = true;
	} else if (e.control === XboxController.DirectionalPad.UP){
		gamepadStatus.isUpPressed    = true;
	} else if (e.control === XboxController.DirectionalPad.DOWN){
		gamepadStatus.isDownPressed  = true;
	} else if (e.control === XboxController.ControlButtons.START_BUTTON){
		gamepadStatus.isStartPressed = true;
	}
	
});

gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
	if (e.control === XboxController.DirectionalPad.UP){
		gamepadStatus.isUpPressed    = false;
	} else if (e.control === XboxController.DirectionalPad.DOWN){
		gamepadStatus.isDownPressed  = false;
	} else if (e.control === XboxController.DirectionalPad.LEFT){
		gamepadStatus.isLeftPressed  = false;
	} else if (e.control === XboxController.DirectionalPad.RIGHT){
		gamepadStatus.isRightPressed = false;
	} else if (e.control === XboxController.ControlButtons.START_BUTTON){
		gamepadStatus.isStartPressed = false;
	} else if (e.control === XboxController.FaceButtons.A_BUTTON){
		gamepadStatus.isAPressed = false;
	} else if (e.control === XboxController.FaceButtons.B_BUTTON){
		gamepadStatus.isBPressed = false;
	}
});

gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
	if (e.axis === XboxController.Joystick.LeftStick.X){
		gamepadStatus.isStickLeftPressed  = e.value < -.9;
		gamepadStatus.isStickRightPressed = e.value > .9 ;
	} else if (e.axis === XboxController.Joystick.LeftStick.Y){
		gamepadStatus.isStickUpPressed    = e.value < -.9;
		gamepadStatus.isStickDownPressed  = e.value > .9;
	}
});

gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
	// gamepads were updated (around 60 times a second)
});

if (!gamepad.init()) {
	// Your browser does not support gamepads, get the latest Google Chrome or Firefox
}