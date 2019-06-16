/**
 * Makes a new InputObserver.
 */
function InputObserver(){
	this.isAcceptingInput = true;
}

InputObserver.prototype.isPausePressed = function(){
	return me.input.isKeyPressed('pause') || gamepadStatus.isStartPressed;
};

InputObserver.prototype.isShootPressed = function(){
	return me.input.isKeyPressed('shoot') || gamepadStatus.isAPressed;
};

InputObserver.prototype.isJumpPressed = function(){
	return me.input.isKeyPressed('jump') || gamepadStatus.isBPressed;
};

InputObserver.prototype.isUpPressed = function(){
	return me.input.isKeyPressed('up') || gamepadStatus.isUpPressed || gamepadStatus.isStickUpPressed;
}

InputObserver.prototype.isDownPressed = function(){
	return me.input.isKeyPressed('down') || gamepadStatus.isDownPressed || gamepadStatus.isStickDownPressed;
}

InputObserver.prototype.isLeftPressed = function(){
	return me.input.isKeyPressed('left') || gamepadStatus.isLeftPressed || gamepadStatus.isStickLeftPressed;
}

InputObserver.prototype.isRightPressed = function(){
	return me.input.isKeyPressed('right') || gamepadStatus.isRightPressed || gamepadStatus.isStickRightPressed;
}

InputObserver.prototype.resetState = function(){
	gamepadStatus.isStartPressed      = false;
	gamepadStatus.isAPressed          = false;
	gamepadStatus.isBPressed          = false;
	gamepadStatus.isUpPressed         = false;
	gamepadStatus.isDownPressed       = false;
	gamepadStatus.isLeftPressed       = false;
	gamepadStatus.isRightPressed      = false;
	gamepadStatus.isStickUpPressed    = false;
	gamepadStatus.isStickDownPressed  = false;
	gamepadStatus.isStickLeftPressed  = false;
	gamepadStatus.isStickRightPressed = false;
}