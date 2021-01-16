const dateTimeFormat = "YYYY-MM-DDThh:mm:ss";

document.addEventListener("DOMContentLoaded", function() {
	let state = {
		title: "1 hour timer",
		time: moment().add(1, "hours"),
		desc: "This is the default 1 hour timer..."
	};

	window.location.hash = LZString.compressToBase64(state)

	$("#input-datetime")
		.on("change", function() {
			let _targetMoment = moment($(this).val());
			if (_targetMoment.isBefore(moment())) alert("Cannot set timer to the past! Please input again...");
			else targetMoment = _targetMoment;
			$(this).val(targetMoment.format(dateTimeFormat));
		})
		.val(targetMoment.format(dateTimeFormat));

	
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