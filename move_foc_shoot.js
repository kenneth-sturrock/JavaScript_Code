/* Java Script */

//
// Move through the focus range taking pictures as you go. 
// There is some INI variable voodoo required to name the files appropriatey.
//
// Written for Andrew Lindsay
//
// Ken Sturrock
// 30May2020

//Make a note of the old autosave formula
oldASFormula = ccdsoftCamera.PropStr("m_csCustomFileNameLight")

// Move the focuser from where we are to the maximum limit.
ccdsoftCamera.focMoveOut(ccdsoftCamera.focMaximumLimit - ccdsoftCamera.focPosition)

while (ccdsoftCamera.focPosition > ccdsoftCamera.focMinimumLimit)
//
// Do a loop until we hit the minimum position
//
{
	RunJavaScriptOutput.writeLine ("Current Position: " + ccdsoftCamera.focPosition)

	ccdsoftCamera.Asynchronous = false;	// We are going to wait for it
	ccdsoftCamera.ExposureTime = 1;		// Set the exposure time 
	ccdsoftCamera.AutoSaveOn = true;		// Keep the image
	ccdsoftCamera.ImageReduction = 0;		// Don't do autodark
	ccdsoftCamera.Frame = 1;					// It's a light frame
	ccdsoftCamera.Subframe = false;		// Not a subframe
	ccdsoftCamera.Delay = 1;					// Set delay to one second

	//Set the autosave name to show the filter position
	ccdsoftCamera.setPropStr("m_csCustomFileNameLight", "_" + ccdsoftCamera.focPosition + "_")
	ccdsoftCamera.TakeImage();

	// Adjust this to the step size that you want
	ccdsoftCamera.focMoveIn(1000);
}

//Restore the old autosave formula.
ccdsoftCamera.setPropStr("m_csCustomFileNameLight", oldASFormula)
