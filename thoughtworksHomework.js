function Valid(command){
	try{
		var lines = command.split("\n");
	}catch(err){
		console.log("Incorrect command format.");
		return false;
	}
	let firstLine = lines[0];
	let secondLine = lines[1];
	let arr = firstLine.split(" ");
	let x = arr[0];
	let y = arr[1];
	let array = secondLine.split(";");
	secondLine+=";";
	let firstPattern = /^\d+\s\d+$/;
	let secondPattern = /^(\d+,\d+\s\d+,\d+;)+$/;
	if(lines.length==2&&arr.length==2){
		if(!firstPattern.test(firstLine)){
			if(x/1&&y/1){
				console.log("Number out of range.")
				return false;
			}else{
				console.log("Invalid number format.")
				return false;
			}
		}
		if(!secondPattern.test(secondLine)){
			console.log("Incorrect command format.");
			return false;			
		}
	}else{
		console.log("Incorrect command format.");
		return false;
	}
	return true;
}
