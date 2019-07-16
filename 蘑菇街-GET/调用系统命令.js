var exec = require('child_process').exec; 
exec("node tryed.js", (err, stdout, stderr) => {
	console.log(err, stdout, stderr);
})
