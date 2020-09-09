const canadianDolar = 0.91;

function roundTwo(amount) {
	return Math.round(amount * 100) / 100;
}

exports.canadianToUs = canadian => roundTwo(canadian * canadianDolar);
exports.canadianToUs = us => roundTwo(us / canadianDolar);