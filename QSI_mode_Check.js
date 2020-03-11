/* Java Script */

//
// Tests the QSI readout mode toggle by using the m_csExCameraMode string
//
// Ken Sturrock
// March 26, 2017
//

var preExpTime = "";
var postExpTime = "";
var readOutMode = "";
var specificCamera = "";

ccdsoftCamera.Asynchronous = false;     // We are going to wait for it
ccdsoftCamera.ExposureTime = 5;         // Set the exposure to five seconds
ccdsoftCamera.AutoSaveOn = true;        // Keep the image
ccdsoftCamera.ImageReduction = 0;	       // Don't do autodark, change this if you do want some other calibration
ccdsoftCamera.Frame = 1;                // It's a light frame
ccdsoftCamera.Delay = 1;                // Pause one second before taking the picture
ccdsoftCamera.Subframe = false;         // Not a subframe, shoot the whole frame


function doImage()
//
// Report time & mode, take an image, re-report time and info from FITS header
//
{
	RunJavaScriptOutput.writeLine("------------------------------------------------------");
	RunJavaScriptOutput.writeLine("Reported Readout Mode (m_csExCameraMode): " + ccdsoftCamera.PropStr("m_csExCameraMode"));
	RunJavaScriptOutput.writeLine("");

	RunJavaScriptOutput.writeLine("Pre-Exposure Timestamp: " + Date());

	ccdsoftCamera.TakeImage();

	RunJavaScriptOutput.writeLine("Post-Exposure Timestamp: " + Date());
	RunJavaScriptOutput.writeLine("");

	ccdsoftCameraImage.AttachToActive();

	specificCamera = ccdsoftCameraImage.FITSKeyword ("INSTRUME");	

	if ( SelectedHardware.cameraModel == "QSI Camera  " ) 
	//
	// Are we running the QSI Universal Driver? We may not have a valid READOUTM keyword if not.
	// I could have read this from the INSTRUME keyword but was too lazy to parse.
	//
	// Yes, the ending space in "QSI " is reported by the driver and required.
	//
	{

		readOutMode = ccdsoftCameraImage.FITSKeyword ("READOUTM");

	} else {

		readOutMode = "Not a QSI";
	}

	RunJavaScriptOutput.writeLine("Specific Camera: " + specificCamera);
	RunJavaScriptOutput.writeLine("Reported Readout Mode (FITS Keyword): " + readOutMode);
	RunJavaScriptOutput.writeLine("------------------------------------------------------");
	RunJavaScriptOutput.writeLine("");
}

//
// Start main program
//

RunJavaScriptOutput.writeLine("QSI Readout Mode Tester");
RunJavaScriptOutput.writeLine("------------------------------------------------------");

// What system are we using?
RunJavaScriptOutput.writeLine("Operating System (1=Windows, 2=Macintosh): " + Application.operatingSystem);
RunJavaScriptOutput.writeLine("SkyX Build: " + Application.build);
RunJavaScriptOutput.writeLine("------------------------------------------------------");
RunJavaScriptOutput.writeLine("");

// Set the camera mode to fast, take the image
RunJavaScriptOutput.writeLine("Initial camera mode.");
RunJavaScriptOutput.writeLine("");

ccdsoftCamera.setPropStr("m_csExCameraMode", "Faster Image Downloads");
doImage();

// Set the camera to high quality, take the image
RunJavaScriptOutput.writeLine("Changing camera mode.");
RunJavaScriptOutput.writeLine("");

ccdsoftCamera.setPropStr("m_csExCameraMode", "Higher Image Quality");
doImage();

