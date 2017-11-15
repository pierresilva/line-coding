var x_axis = 200;
var y_axis = 200;

var x_max = 3;
var y_max = 3;

var x_scale = x_axis / (x_max + 1);
var y_scale = y_axis / (y_max + 1);

var x_offset = x_axis + 0.5; // location on canvas
var y_offset = y_axis + 0.5; // of graph's origin

var canvas = document.getElementById("axes");
if (canvas.getContext) {
	canvas.width  = x_axis * 2;
	canvas.height = y_axis * 2;
	var ctx = canvas.getContext("2d");

	drawAxes(ctx);
}

function drawAxes(ctx) {
	ctx.font = "20px sans-serif";
	ctx.strokeText('0', x_axis - 5, y_axis + 8);
	ctx.font = "14px sans-serif";
	ctx.strokeText('Y', x_axis - 25, 15);
	ctx.strokeText('X', x_axis * 2 - 10, y_axis + 30);

	ctx.font = "12px sans-serif";
	ctx.lineWidth = 1;

	// draw x-axis
	ctx.beginPath();
	ctx.moveTo(0, y_offset);
	ctx.lineTo(x_axis*2, y_offset);
	ctx.stroke();
	ctx.closePath();

	// draw arrow
	ctx.beginPath();
	ctx.moveTo(x_axis*2+0.5, y_axis+0.5);
	ctx.lineTo(x_axis*2+0.5 - 8, y_axis+0.5 - 3);
	ctx.lineTo(x_axis*2+0.5 - 8, y_axis+0.5 + 3);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

	// draw x values
	j = -x_max;
	while (j <= x_max) {
		x = j * x_scale;
		ctx.strokeStyle = '#aaa';
		ctx.beginPath();
		ctx.moveTo(x + x_offset, y_offset);
		ctx.lineTo(x + x_offset, y_offset + 10);
		ctx.stroke();
		ctx.closePath();

		ctx.strokeStyle = '#666';
		ctx.strokeText(j, x + x_offset - 5, y_offset + 30);
	
		j++;
		if (j == 0) { j++; }
	}

	// draw y-axis
	ctx.beginPath();
	ctx.moveTo(x_offset, 0);
	ctx.lineTo(x_offset, y_axis*2);
	ctx.stroke();
	ctx.closePath();

	// draw arrow
	ctx.beginPath();
	ctx.moveTo(x_axis+0.5, 0.5);
	ctx.lineTo(x_axis+0.5 - 3, 0.5 + 8);
	ctx.lineTo(x_axis+0.5 + 3, 0.5 + 8);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

	// draw y values
	j = -y_max;
	while (j <= y_max) {
		y = j * y_scale;
		ctx.strokeStyle = '#aaa';
		ctx.beginPath();
		ctx.moveTo(x_offset, y + y_offset);
		ctx.lineTo(x_offset - 10, y + y_offset);
		ctx.stroke();
		ctx.closePath();

		ctx.strokeStyle = '#666';
		ctx.strokeText(-j, x_offset - 25, y + y_offset + 5);

		j++;
		if (j == 0) { j++; }
	}
}

function offsetX(v) {
	return x_offset + (v * x_scale);
}

function offsetY(v) {
	return y_offset - (v * y_scale);
}