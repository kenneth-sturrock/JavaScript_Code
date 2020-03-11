/* Java Script */
/* Socket Start Packet */


var TargetList	= [];
var parameterString = "$000";	
var FindStatus	= "Success";	
var targetRA 	= 0;		
var targetDEC 	= 0;
var altitude = "0";
var out = "";
var cr = "\n";	

TargetList = parameterString.split(",");

TargetList.forEach(function(Target) 
{
	try
	//
	// Try to find the target and catch the error if it fails.
	//
	{ 
		sky6StarChart.Find(Target);  
	}

		catch (repErr)
		//
		//	If error, report it. 	
		// 
		{
			FindStatus = "fail";
		} 


	if ( FindStatus == "fail" )
	{
		out += Target + " cannot be found." + cr;

	} else {

		// Pull the RA value 
		sky6ObjectInformation.Property(54); 				
			targetRA = sky6ObjectInformation.ObjInfoPropOut.toFixed(2); 		

		// Pull the DEC value 
		sky6ObjectInformation.Property(55); 				
			targetDEC = sky6ObjectInformation.ObjInfoPropOut.toFixed(2); 		

		// Pull the Altitude value 
		sky6ObjectInformation.Property(59);  
    			altitude = sky6ObjectInformation.ObjInfoPropOut.toFixed(2);
	
		out += Target + ", " + targetRA + ", " + targetDEC + ", " + altitude + cr;

	}

}); 



out;

/* Socket End Packet */
