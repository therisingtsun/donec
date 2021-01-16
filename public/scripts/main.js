
document.addEventListener("DOMContentLoaded", function() {

	const targetMoment = moment().add(5, "seconds").add(1, "hours");
	
	updateTimer(targetMoment);
	setInterval(() => updateTimer(targetMoment), 1000);
	
});

function updateTimer(targetMoment) {
	const current = moment();
	if (current.isBefore(targetMoment)) {
		const diff = moment.duration(current.diff(targetMoment));
		const data = Object.assign(Object.create(null), diff._data);
		
		let printCurrent = false;
		
		let dArr = [ "years", "months", "days", "hours", "minutes", "seconds" ];
		dArr.forEach(el => {
			printCurrent = printCurrent || data[el];
			const $display = $(`#display-${el}`);
			if (printCurrent) {
				let displayVal = Math.abs(data[el]).toString();
				if (displayVal.length < 2) displayVal = "0" + displayVal;
				$display.children(".display").html(displayVal);
				$display.removeClass("hidden");
			} else {
				$display.addClass("hidden");
			}
		});;
					
	}
}