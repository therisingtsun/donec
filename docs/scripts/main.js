const dateTimeFormat = "YYYY-MM-DDThh:mm:ss";
const dateTimeFormatStore = "YYYY-MM-DD hh:mm:ss A";

document.addEventListener("DOMContentLoaded", function() {
	let state = {
		title: "1 hour timer",
		time: moment().add(1, "hours").format(dateTimeFormatStore),
		desc: "This is the default 1 hour timer..."
	};

	if (window.location.hash) {
		try {
			state = JSON.parse(LZString.decompressFromBase64(window.location.hash.substring(1)));
		} catch {
			console.error("Invalid URL, using defaults");
		}
	}

	function updateHash() {
		window.location.hash = LZString.compressToBase64(JSON.stringify(state));
	}
	
	$("#input-datetime")
		.on("change", function() {
			console.log(state);
			let _targetMoment = moment($(this).val());
			if (_targetMoment.isBefore(moment())) alert("Cannot set timer to the past! Please input again...");
			else state.time = _targetMoment.format(dateTimeFormatStore);
			$(this).val(moment(state.time).format(dateTimeFormat));
			updateHash();
		})
		.val(moment(state.time).format(dateTimeFormat));
	$("#timer-title")
		.on("input", function() {
			state.title = $(this).text();
			updateHash();
		})
		.text(state.title);
	$("#timer-desc")
		.on("input", function() {
			state.desc = $(this).text();
			updateHash();
		})
		.text(state.desc);

	updateTimer(state.time);
	setInterval(() => updateTimer(state.time), 1000);
	
});

function updateTimer(targetMoment) {
	const current = moment();
	targetMoment = moment(targetMoment);
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