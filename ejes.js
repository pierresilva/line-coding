var bit_code = document.getElementById("bit-code").value;//"1011010010";
var bit_arr = bit_code.split("");
var bit_length = bit_arr.length;

var x_axis = 800;
var y_axis = 200;

var x_max = bit_length;
var y_max = 3;

var x_scale = x_axis / (x_max);
var y_scale = y_axis / (y_max);

var x_steep = x_scale;

var x_offset = x_axis + 0.5; // location on canvas
var y_offset = y_axis + 0.5; // of graph's origin

function validate_bit_code() {
    var validate_binary = /^[0-1]+$/;

    if (!validate_binary.test(bit_code)) {
        alert("Debe ingresar solo ceros y unos!");
        //throw new Error("Codigo binario no valido!");
    } else {
        bit_code = document.getElementById("bit-code").value;
        bit_arr = bit_code.split("");
        bit_length = bit_arr.length;
        x_max = bit_length;
        x_scale = x_axis / (x_max);
        y_scale = y_axis / (y_max);
        x_steep = x_scale;
        draw();
        graph();
    }
}

function draw() {
    var canvasN = document.getElementsByClassName("axes");

    for (var index = 0; index < canvasN.length; index++) {
        var element = canvasN[index];
        if (element.getContext) {
            element.width = x_axis;
            element.height = y_axis * 2;
            var ctx = element.getContext("2d");

            drawAxes(ctx);
        }
    }
}

function drawAxes(ctx) {
    ctx.font = "14px sans-serif";
    ctx.strokeStyle = 'blue';
    ctx.strokeText('V+', 14, y_axis - 30);
    ctx.strokeText('V-', 14, y_axis + 30);
    ctx.strokeStyle = '#aaa';
    ctx.font = "12px sans-serif";
    ctx.lineWidth = 1;

    // draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, y_offset);
    ctx.lineTo(x_axis, y_offset);
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    ctx.moveTo(x_axis + 0.5, y_axis + 0.5);
    ctx.lineTo(x_axis + 0.5 - 8, y_axis + 0.5 - 3);
    ctx.lineTo(x_axis + 0.5 - 8, y_axis + 0.5 + 3);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // write (t)
    ctx.font = "16px sans-serif";
    ctx.strokeStyle = 'blue';
    ctx.strokeText('(t)', x_axis - 30, y_axis - 30);
    ctx.font = "12px sans-serif";
    // draw x time lines
    cnt = 0;
    x_mark = 0;
    ctx.setLineDash([5, 15]);
    while (x_mark <= x_axis) {
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.moveTo(x_mark, y_offset + y_axis);
        ctx.lineTo(x_mark, y_offset - y_axis);
        ctx.stroke();
        ctx.closePath();

        x_mark = x_mark + x_scale;
        cnt++;
    }
    ctx.setLineDash([]);
    // write x time values
    cnt = 0;
    x_mark = 0;
    while (x_mark <= x_axis) {
        ctx.strokeStyle = '#aaa';
        ctx.font = "12px sans-serif";
        ctx.strokeText(cnt, x_mark + 14, y_axis - 14);
        ctx.strokeStyle = 'orange';
        ctx.strokeText(bit_arr[cnt], x_mark + 14, y_axis - 186);
        x_mark = x_mark + x_scale;
        cnt++;
    }

    // draw y-axis
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, y_axis * 2);
    ctx.stroke();
    ctx.closePath();

}

function offsetX(v) {
    return x_offset + (v * x_scale);
}

function offsetY(v) {
    return y_offset - (v * y_scale);
}

function graph() {

    var canvas2 = document.getElementById("unipolar-nrz");
    if (canvas2.getContext) {
        canvas2.width = x_axis;
        canvas2.height = y_axis * 2;
        var ctx2 = canvas2.getContext("2d");
        ctx2.strokeStyle = 'green';
        ctx2.font = "18px sans-serif";
        ctx2.strokeText('UNIPOLAR NRZ', 25, 45);
        ctx2.lineWidth = 2;
        ctx2.strokeStyle = '#ee0000';

        var x = x_axis - x_axis;
        var y = y_axis;

        for (let index = 0; index < bit_arr.length; index++) {
            const element = bit_arr[index];

            if (bit_arr[index] == 1) {
                ctx2.beginPath();
                ctx2.moveTo(x, y - 100);
                ctx2.lineTo(x + (x_steep), y - 100);
                ctx2.stroke();
                ctx2.closePath();

                x = x + (x_steep);

                if (bit_arr[index + 1] == 0) {
                    ctx2.beginPath();
                    ctx2.moveTo(x, y - 100);
                    ctx2.lineTo(x, y);
                    ctx2.stroke();
                    ctx2.closePath();
                }
            }

            if (bit_arr[index] == 0) {
                ctx2.beginPath();
                ctx2.moveTo(x, y);
                ctx2.lineTo(x + (x_steep), y);
                ctx2.stroke();
                ctx2.closePath();

                x = x + (x_steep)

                if (bit_arr[index + 1] == 1) {
                    ctx2.beginPath();
                    ctx2.moveTo(x, y - 100);
                    ctx2.lineTo(x, y);
                    ctx2.stroke();
                    ctx2.closePath();
                }
            }

        }

    }

    var canvas4 = document.getElementById("unipolar-rz");
    if (canvas4.getContext) {
        canvas4.width = x_axis;
        canvas4.height = y_axis * 2;
        var ctx4 = canvas4.getContext("2d");
        ctx4.strokeStyle = 'green';
        ctx4.font = "18px sans-serif";
        ctx4.strokeText('UNIPOLAR RZ', 25, 45);
        ctx4.lineWidth = 2;
        ctx4.strokeStyle = '#ee0000';

        var x = x_axis - x_axis;
        var y = y_axis;

        for (let index = 0; index < bit_arr.length; index++) {
            const element = bit_arr[index];

            if (bit_arr[index] == 1) {
                ctx4.beginPath();
                ctx4.moveTo(x, y - 100);
                ctx4.lineTo(x + (x_steep / 2), y - 100);
                ctx4.stroke();
                ctx4.closePath();

                x = x + (x_steep / 2);

                ctx4.beginPath();
                ctx4.moveTo(x, y - 100);
                ctx4.lineTo(x, y);
                ctx4.stroke();
                ctx4.closePath();

                ctx4.beginPath();
                ctx4.moveTo(x, y);
                ctx4.lineTo(x + (x_steep / 2), y);
                ctx4.stroke();
                ctx4.closePath();

                x = x + (x_steep / 2);

                if (bit_arr[index + 1] == 1) {
                    ctx4.beginPath();
                    ctx4.moveTo(x, y);
                    ctx4.lineTo(x, y - 100);
                    ctx4.stroke();
                    ctx4.closePath();
                }
            }

            if (bit_arr[index] == 0) {

                ctx4.beginPath();
                ctx4.moveTo(x, y);
                ctx4.lineTo(x + (x_steep / 2), y);
                ctx4.stroke();
                ctx4.closePath();

                x = x + (x_steep / 2)

                ctx4.beginPath();
                ctx4.moveTo(x, y);
                ctx4.lineTo(x + (x_steep / 2), y);
                ctx4.stroke();
                ctx4.closePath();

                x = x + (x_steep / 2)

                if (bit_arr[index + 1] == 1) {
                    ctx4.beginPath();
                    ctx4.moveTo(x, y - 100);
                    ctx4.lineTo(x, y);
                    ctx4.stroke();
                    ctx4.closePath();
                }
            }

        }

    }

    var canvas3 = document.getElementById("polar-nrz");
    if (canvas3.getContext) {
        canvas3.width = x_axis;
        canvas3.height = y_axis * 2;
        var ctx3 = canvas3.getContext("2d");
        ctx3.strokeStyle = 'green';
        ctx3.font = "18px sans-serif";
        ctx3.strokeText('POLAR NRZ', 25, 45);

        var x = x_axis - x_axis;
        var y = y_axis;

        ctx3.lineWidth = 2;
        ctx3.strokeStyle = '#ee0000';

        for (let index = 0; index < bit_arr.length; index++) {
            const element = bit_arr[index];
            if (bit_arr[index] == 1) {
                ctx3.beginPath();
                ctx3.moveTo(x, y - 100);
                ctx3.lineTo(x + (x_steep), y - 100);
                ctx3.stroke();
                ctx3.closePath();

                x = x + (x_steep);

                if (bit_arr[index + 1] == 0) {
                    ctx3.beginPath();
                    ctx3.moveTo(x, y - 100);
                    ctx3.lineTo(x, y + 100);
                    ctx3.stroke();
                    ctx3.closePath();
                }
            }

            if (bit_arr[index] == 0) {
                ctx3.beginPath();
                ctx3.moveTo(x, y + 100);
                ctx3.lineTo(x + (x_steep), y + 100);
                ctx3.stroke();
                ctx3.closePath();

                x = x + (x_steep)

                if (bit_arr[index + 1] == 1) {
                    ctx3.beginPath();
                    ctx3.moveTo(x, y + 100);
                    ctx3.lineTo(x, y - 100);
                    ctx3.stroke();
                    ctx3.closePath();
                }
            }
        }

    }

    var canvas5 = document.getElementById("polar-rz");
    if (canvas5.getContext) {
        canvas5.width = x_axis;
        canvas5.height = y_axis * 2;
        var ctx5 = canvas5.getContext("2d");
        ctx5.strokeStyle = 'green';
        ctx5.font = "18px sans-serif";
        ctx5.strokeText('POLAR RZ', 25, 45);

        var x = x_axis - x_axis;
        var y = y_axis;

        ctx5.lineWidth = 2;
        ctx5.strokeStyle = '#ee0000';

        for (let index = 0; index < bit_arr.length; index++) {
            const element = bit_arr[index];

            if (bit_arr[index] == 1) {
                ctx5.beginPath();
                ctx5.moveTo(x, y - 100);
                ctx5.lineTo(x + (x_steep / 2), y - 100);
                ctx5.stroke();
                ctx5.closePath();

                x = x + (x_steep / 2);

                ctx5.beginPath();
                ctx5.moveTo(x, y - 100);
                ctx5.lineTo(x, y);
                ctx5.stroke();
                ctx5.closePath();

                ctx5.beginPath();
                ctx5.moveTo(x, y);
                ctx5.lineTo(x + (x_steep / 2), y);
                ctx5.stroke();
                ctx5.closePath();

                x = x + (x_steep / 2);

                if (bit_arr[index + 1] == 0) {
                    ctx5.beginPath();
                    ctx5.moveTo(x, y);
                    ctx5.lineTo(x, y + 100);
                    ctx5.stroke();
                    ctx5.closePath();
                }

                if (bit_arr[index + 1] == 1) {
                    ctx5.beginPath();
                    ctx5.moveTo(x, y);
                    ctx5.lineTo(x, y - 100);
                    ctx5.stroke();
                    ctx5.closePath();
                }
            }

            if (bit_arr[index] == 0) {

                ctx5.beginPath();
                ctx5.moveTo(x, y + 100);
                ctx5.lineTo(x + (x_steep / 2), y + 100);
                ctx5.stroke();
                ctx5.closePath();

                x = x + (x_steep / 2)

                ctx5.beginPath();
                ctx5.moveTo(x, y + 100);
                ctx5.lineTo(x, y);
                ctx5.stroke();
                ctx5.closePath();

                ctx5.beginPath();
                ctx5.moveTo(x, y);
                ctx5.lineTo(x + (x_steep / 2), y);
                ctx5.stroke();
                ctx5.closePath();

                x = x + (x_steep / 2)

                if (bit_arr[index + 1] == 1) {
                    ctx5.beginPath();
                    ctx5.moveTo(x, y);
                    ctx5.lineTo(x, y - 100);
                    ctx5.stroke();
                    ctx5.closePath();
                }

                if (bit_arr[index + 1] == 0) {
                    ctx5.beginPath();
                    ctx5.moveTo(x, y);
                    ctx5.lineTo(x, y + 100);
                    ctx5.stroke();
                    ctx5.closePath();
                }
            }

        }

        var canvas6 = document.getElementById("polar-ami");
        if (canvas6.getContext) {
            canvas6.width = x_axis;
            canvas6.height = y_axis * 2;
            var ctx6 = canvas6.getContext("2d");
            ctx6.strokeStyle = 'green';
            ctx6.font = "18px sans-serif";
            ctx6.strokeText('POLAR AMI', 25, 45);

            var x = x_axis - x_axis;
            var y = y_axis;
            var v = 1;

            ctx6.lineWidth = 2;
            ctx6.strokeStyle = '#ee0000';

            for (let index = 0; index < bit_arr.length; index++) {
                const element = bit_arr[index];

                if (bit_arr[index] == 1) {

                    v = v * -1;

                    ctx6.beginPath();
                    ctx6.moveTo(x, y + (100 * v));
                    ctx6.lineTo(x + (x_steep), y + (100 * v));
                    ctx6.stroke();
                    ctx6.closePath();

                    x = x + (x_steep);

                    if (bit_arr[index + 1] == 1) {
                        ctx6.beginPath();
                        ctx6.moveTo(x, y + (100 * v));
                        ctx6.lineTo(x, y - ((100 * v)));
                        ctx6.stroke();
                        ctx6.closePath();
                    }

                    if (bit_arr[index + 1] == 0) {
                        ctx6.beginPath();
                        ctx6.moveTo(x, y + (100 * v));
                        ctx6.lineTo(x, y);
                        ctx6.stroke();
                        ctx6.closePath();
                    }
                }

                if (bit_arr[index] == 0) {

                    ctx6.beginPath();
                    ctx6.moveTo(x, y);
                    ctx6.lineTo(x + (x_steep), y);
                    ctx6.stroke();
                    ctx6.closePath();

                    x = x + (x_steep)

                    if (bit_arr[index + 1] == 1) {
                        ctx6.beginPath();
                        ctx6.moveTo(x, y);
                        ctx6.lineTo(x, y + (100 * (v * -1)));
                        ctx6.stroke();
                        ctx6.closePath();
                    }
                }

            }
        }

        var canvas7 = document.getElementById("manchester");
        if (canvas7.getContext) {
            canvas7.width = x_axis;
            canvas7.height = y_axis * 2;
            var ctx7 = canvas7.getContext("2d");
            ctx7.strokeStyle = 'green';
            ctx7.font = "18px sans-serif";
            ctx7.strokeText('MANCHESTER', 25, 45);

            var x = x_axis - x_axis;
            var y = y_axis;

            ctx7.lineWidth = 2;
            ctx7.strokeStyle = '#ee0000';

            for (let index = 0; index < bit_arr.length; index++) {
                const element = bit_arr[index];

                if (bit_arr[index] == 1) {

                    ctx7.beginPath();
                    ctx7.moveTo(x, y + 100);
                    ctx7.lineTo(x + (x_steep / 2), y + 100);
                    ctx7.stroke();
                    ctx7.closePath();

                    x = x + (x_steep / 2);

                    ctx7.beginPath();
                    ctx7.moveTo(x, y + 100);
                    ctx7.lineTo(x, y - 100);
                    ctx7.lineTo(x, y - 100);
                    ctx7.lineTo(x + (x_steep / 2), y - 100);
                    ctx7.stroke();
                    ctx7.closePath();

                    x = x + (x_steep / 2);

                    if (bit_arr[index + 1] == 1) {
                        ctx7.beginPath();
                        ctx7.moveTo(x, y - 100);
                        ctx7.lineTo(x, y + 100);
                        ctx7.stroke();
                        ctx7.closePath();
                    }

                }

                if (bit_arr[index] == 0) {

                    ctx7.beginPath();
                    ctx7.moveTo(x, y - 100);
                    ctx7.lineTo(x + (x_steep / 2), y - 100);
                    ctx7.stroke();
                    ctx7.closePath();

                    x = x + (x_steep / 2);

                    ctx7.beginPath();
                    ctx7.moveTo(x, y - 100);
                    ctx7.lineTo(x, y + 100);
                    ctx7.lineTo(x, y + 100);
                    ctx7.lineTo(x + (x_steep / 2), y + 100);
                    ctx7.stroke();
                    ctx7.closePath();

                    x = x + (x_steep / 2);

                    if (bit_arr[index + 1] == 0) {
                        ctx7.beginPath();
                        ctx7.moveTo(x, y + 100);
                        ctx7.lineTo(x, y - 100);
                        ctx7.stroke();
                        ctx7.closePath();
                    }
                }

            }
        }

        var canvas8 = document.getElementById("manchester-dif");
        if (canvas8.getContext) {
            canvas8.width = x_axis;
            canvas8.height = y_axis * 2;
            var ctx8 = canvas8.getContext("2d");
            ctx8.strokeStyle = 'green';
            ctx8.font = "18px sans-serif";
            ctx8.strokeText('MANCHESTER DIFERENCIAL', 25, 45);
            var v;
            if (bit_arr[0] == 0) {
                v = -1;
            } else {
                v = 1;
            }
            var x = x_axis - x_axis;
            var y = y_axis;

            ctx8.lineWidth = 2;
            ctx8.strokeStyle = '#ee0000';

            for (let index = 0; index < bit_arr.length; index++) {
                const element = bit_arr[index];

                if (bit_arr[index] == 1) {

                    ctx8.beginPath();
                    ctx8.moveTo(x, y - (100 * v));
                    ctx8.lineTo(x + (x_steep / 2), y - (100 * v));
                    ctx8.stroke();
                    ctx8.closePath();
                    x = x + (x_steep / 2)

                    ctx8.beginPath();
                    ctx8.moveTo(x, y - (100 * v));
                    ctx8.lineTo(x, y + (100 * v));
                    ctx8.stroke();
                    ctx8.closePath();

                    ctx8.beginPath();
                    ctx8.moveTo(x, y + (100 * v));
                    ctx8.lineTo(x + (x_steep / 2), y + (100 * v));
                    ctx8.stroke();
                    ctx8.closePath();

                    x = x + (x_steep / 2)

                    if (bit_arr[index + 1] == 0) {
                        ctx8.beginPath();
                        ctx8.moveTo(x, y - (100 * v));
                        ctx8.lineTo(x, y + (100 * v));
                        ctx8.stroke();
                        ctx8.closePath();
                    }

                    if (bit_arr[index + 1] == 1) {

                        v = v * -1;
                    }

                }

                if (bit_arr[index] == 0) {

                    ctx8.beginPath();
                    ctx8.moveTo(x, y - (100 * v));
                    ctx8.lineTo(x + (x_steep / 2), y - (100 * v));
                    ctx8.stroke();
                    ctx8.closePath();
                    x = x + (x_steep / 2)

                    ctx8.beginPath();
                    ctx8.moveTo(x, y - (100 * v));
                    ctx8.lineTo(x, y + (100 * v));
                    ctx8.stroke();
                    ctx8.closePath();

                    ctx8.beginPath();
                    ctx8.moveTo(x, y + (100 * v));
                    ctx8.lineTo(x + (x_steep / 2), y + (100 * v));
                    ctx8.stroke();
                    ctx8.closePath();

                    x = x + (x_steep / 2)

                    if (bit_arr[index + 1] == 0) {
                        ctx8.beginPath();
                        ctx8.moveTo(x, y - (100 * v));
                        ctx8.lineTo(x, y + (100 * v));
                        ctx8.stroke();
                        ctx8.closePath();
                    }

                    if (bit_arr[index + 1] == 1) {

                        v = v * -1;
                    }
                }

            }
        }

        var canvas9 = document.getElementById("B8ZS");
        if (canvas9.getContext) {
            canvas9.width = x_axis;
            canvas9.height = y_axis * 2;
            var ctx9 = canvas9.getContext("2d");
            ctx9.strokeStyle = 'green';
            ctx9.font = "18px sans-serif";
            ctx9.strokeText('B8ZS', 25, 45);

            var x = x_axis - x_axis;
            var y = y_axis;
            var v = false;
            var par = false;

            if (bit_arr[0] == 0) {
                par = false;
            } else {
                par = true;
            }

            ctx9.lineWidth = 2;
            ctx9.strokeStyle = '#ee0000';

            B8ZS = false;

            var nceros = 0;
            var index_p = null;
            var index_t = null;
            var index_a = null;
            var narray = [];

            for (let index = 0; index < bit_arr.length; index++) {
                const element = bit_arr[index];

                x = x_steep * (index);

                if (bit_arr[index] == 1) {
					
					if (v === false) {
						v = 1;
					} else {
						v = v * -1;
					}
					
					console.log('v = ',v);

                    ctx9.beginPath();
                    ctx9.moveTo(x, y - (100 * v));
                    ctx9.lineTo(x, y);
                    ctx9.stroke();
                    ctx9.closePath();

                    ctx9.beginPath();
                    ctx9.moveTo(x, y - (100 * v));
                    ctx9.lineTo(x + (x_steep), y - (100 * v));
                    ctx9.stroke();
                    ctx9.closePath();

                    x = x + (x_steep);

                    if (bit_arr[index + 1] == 1) {
                        ctx9.beginPath();
                        ctx9.moveTo(x, y - (100 * v));
                        ctx9.lineTo(x, y + ((100 * v)));
                        ctx9.stroke();
                        ctx9.closePath();
                    }

                    if (bit_arr[index + 1] == 0) {
                        ctx9.beginPath();
                        ctx9.moveTo(x, y - (100 * v));
                        ctx9.lineTo(x, y);
                        ctx9.stroke();
                        ctx9.closePath();
                    }

                    if (bit_arr[index] === 0) {
                        ctx9.beginPath();
                        ctx9.moveTo(x, y);
                        ctx9.lineTo(x + (x_steep), y);
                        ctx9.stroke();
                        ctx9.closePath();
                    }
                }

                if (bit_arr[index] == 0 && (bit_arr[index + 1] || bit_arr[index + 1] === undefined)) {
                    nceros++;
                    index_t = index;
                    if (nceros == 8) {

                        index_p = index - 7;
                        index_a = -1;
                        if (bit_arr[index - 8] == 0) {
                            index_a = -1;
                        }
                        if (bit_arr[index - 8] == 1) {
                            index_a = 1;
                        }
                        drawB8ZS(index_p, index_t, v);
                        
                        ctx9.lineWidth = 2;
                        ctx9.strokeStyle = '#ee0000';
                        narray = bit_arr.slice(index_p, index_t);
                        nceros = 0;
                    }
                } else {
                    nceros = 0;
                }

                if (bit_arr[index] == 0) {
                    ctx9.beginPath();
                    ctx9.moveTo(x, y);
                    ctx9.lineTo(x + (x_steep), y);
                    ctx9.stroke();
                    ctx9.closePath();
                }
            }
        }

        var canvas10 = document.getElementById("HDB3");
        if (canvas10.getContext) {
            canvas10.width = x_axis;
            canvas10.height = y_axis * 2;
            var ctx10 = canvas10.getContext("2d");
            ctx10.strokeStyle = 'green';
            ctx10.font = "18px sans-serif";
            ctx10.strokeText('HDB3', 25, 45);

            var x = x_axis - x_axis;
            var y = y_axis;
            var v = -1;
            var parity = false;

            if (bit_arr[0] == 0) {
                parity = true;
            } else {
                parity = false;
            }

            ctx10.lineWidth = 2;
            ctx10.strokeStyle = '#ee0000';

            HDB3 = false;

            var nceros = 0;
            var index_p = null;
            var index_t = null;
            var index_a = null;
            var narray = [];

            for (let index = 0; index < bit_arr.length; index++) {
                const element = bit_arr[index];
                x = x_steep * (index);
                if (bit_arr[index] == 1) {

                    parity = !parity;

                    ctx10.beginPath();
                    ctx10.moveTo(x, y + (100 * v));
                    ctx10.lineTo(x, y);
                    ctx10.stroke();
                    ctx10.closePath();

                    ctx10.beginPath();
                    ctx10.moveTo(x, y + (100 * v));
                    ctx10.lineTo(x + (x_steep), y + (100 * v));
                    ctx10.stroke();
                    ctx10.closePath();

                    x = x + (x_steep);

                    if (bit_arr[index + 1] == 1) {
                        ctx10.beginPath();
                        ctx10.moveTo(x, y + (100 * v));
                        ctx10.lineTo(x, y - ((100 * v)));
                        ctx10.stroke();
                        ctx10.closePath();
                    }

                    if (bit_arr[index + 1] == 0) {
                        ctx10.beginPath();
                        ctx10.moveTo(x, y + (100 * v));
                        ctx10.lineTo(x, y);
                        ctx10.stroke();
                        ctx10.closePath();
                    }

                    if (bit_arr[index] == 0) {
                        ctx10.beginPath();
                        ctx10.moveTo(x, y);
                        ctx10.lineTo(x + (x_steep), y);
                        ctx10.stroke();
                        ctx10.closePath();
                    }
                    
					v = v * -1;
                }                

                if (bit_arr[index] == 0 && (bit_arr[index + 1] || bit_arr[index + 1] === undefined)) {
                    nceros++;
                    //console.log(nceros);
                    index_t = index;
                    if (nceros == 4) {

                        index_p = index - 3;
                        index_a = -1;
                        parity = !parity;
                        console.log('dibujar plantilla HDB3 comenzando en [' + index_p + '], terminando en [' + index_t + '] paridad de unos [' + parity + '] V anterior [' + v + ']');
                        drawHDB3(index_p, index_t, index_a, parity, v);
                        ctx10.lineWidth = 2;
                        ctx10.strokeStyle = '#ee0000';
                        if (!parity) {
                            parity = !parity;							
                        } else {
                            v = v * -1;
                        }
                        narray = bit_arr.slice(index_p, index_t);
                        nceros = 0;
                    }
                } else {
                    nceros = 0;
                }

                if (bit_arr[index] == 0) {
                    ctx10.beginPath();
                    ctx10.moveTo(x, y);
                    ctx10.lineTo(x + (x_steep), y);
                    ctx10.stroke();
                    ctx10.closePath();
                }

            }
        }
    }
}

function drawHDB3(index_p, index_t, index_a, parity, v) {
    var x = index_p * x_steep;
    var canvas10 = document.getElementById("HDB3");
    var ctx10 = canvas10.getContext("2d");
    ctx10.lineWidth = 4;
    ctx10.strokeStyle = "green";

    if (parity) {
        if (v == 1) {
            ctx10.beginPath();

            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x, y_axis + 100);

            ctx10.moveTo(x, y_axis + 100);
            ctx10.lineTo(x + (x_steep), y_axis + 100);
            x = x + (x_steep);

            ctx10.moveTo(x, y_axis + 100);
            ctx10.lineTo(x, y_axis);

            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x + (x_steep * 2), y_axis);
            x = x + (x_steep * 2);

            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x, y_axis + 100);

            ctx10.moveTo(x, y_axis + 100);
            ctx10.lineTo(x + (x_steep), y_axis + 100);
            x = x + (x_steep);

            ctx10.moveTo(x, y_axis + 100);
            ctx10.lineTo(x, y_axis);

            ctx10.stroke();
            ctx10.closePath();
        }
        if (v == -1) {
            ctx10.beginPath();

            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x, y_axis - 100);

            ctx10.moveTo(x, y_axis - 100);
            ctx10.lineTo(x + (x_steep), y_axis - 100);
            x = x + (x_steep);

            ctx10.moveTo(x, y_axis - 100);
            ctx10.lineTo(x, y_axis);

            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x + (x_steep * 2), y_axis);
            x = x + (x_steep * 2);

            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x, y_axis - 100);

            ctx10.moveTo(x, y_axis - 100);
            ctx10.lineTo(x + (x_steep), y_axis - 100);
            x = x + (x_steep);

            ctx10.moveTo(x, y_axis - 100);
            ctx10.lineTo(x, y_axis);

            ctx10.stroke();
            ctx10.closePath();
        }
    } else {
        if (v == 1) {
            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x + (x_steep * 3), y_axis);
            x = x + (x_steep * 3);   
            
            ctx10.moveTo(x, y_axis - 100);
            ctx10.lineTo(x, y_axis);

            ctx10.moveTo(x, y_axis - 100);
            ctx10.lineTo(x + (x_steep), y_axis - 100);
            x = x + (x_steep);

            ctx10.moveTo(x, y_axis - 100);
            ctx10.lineTo(x, y_axis);

            ctx10.stroke();
            ctx10.closePath();            
        }
        if (v == -1) {
            ctx10.moveTo(x, y_axis);
            ctx10.lineTo(x + (x_steep * 3), y_axis);
            x = x + (x_steep * 3);

            ctx10.moveTo(x, y_axis + 100);
            ctx10.lineTo(x, y_axis);

            ctx10.moveTo(x, y_axis + 100);
            ctx10.lineTo(x + (x_steep), y_axis + 100);
            x = x + (x_steep);

            ctx10.moveTo(x, y_axis + 100);
            ctx10.lineTo(x, y_axis);

            ctx10.stroke();
            ctx10.closePath();
        }
    }
}

function drawB8ZS(index_p, index_t, index_a) {
    x = index_p * x_steep;
    var canvas9 = document.getElementById("B8ZS");
    var ctx9 = canvas9.getContext("2d")
    ctx9.lineWidth = 4;
    ctx9.strokeStyle = 'green';
    if (index_a == 1) {
        ctx9.beginPath();

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x + (x_steep * 3), y_axis);
        x = x + (x_steep * 3);

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x, y_axis - 100);

        ctx9.moveTo(x, y_axis - 100);
        ctx9.lineTo(x + x_steep, y_axis - 100);

        ctx9.moveTo(x + x_steep, y_axis - 100);
        ctx9.lineTo(x + x_steep, y_axis + 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis + 100);
        ctx9.lineTo(x + x_steep, y_axis + 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis + 100);
        ctx9.lineTo(x, y_axis);

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x + x_steep, y_axis);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x, y_axis + 100);

        ctx9.moveTo(x, y_axis + 100);
        ctx9.lineTo(x + x_steep, y_axis + 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis + 100);
        ctx9.lineTo(x, y_axis - 100);

        ctx9.moveTo(x, y_axis - 100);
        ctx9.lineTo(x + x_steep, y_axis - 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis - 100);
        ctx9.lineTo(x, y_axis);

        ctx9.stroke();
        ctx9.closePath();
    }

    if (index_a == -1) {
        ctx9.beginPath();

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x + (x_steep * 3), y_axis);
        x = x + (x_steep * 3);

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x, y_axis + 100);

        ctx9.moveTo(x, y_axis + 100);
        ctx9.lineTo(x + x_steep, y_axis + 100);

        ctx9.moveTo(x + x_steep, y_axis + 100);
        ctx9.lineTo(x + x_steep, y_axis - 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis - 100);
        ctx9.lineTo(x + x_steep, y_axis - 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis - 100);
        ctx9.lineTo(x, y_axis);

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x + x_steep, y_axis);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis);
        ctx9.lineTo(x, y_axis - 100);

        ctx9.moveTo(x, y_axis - 100);
        ctx9.lineTo(x + x_steep, y_axis - 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis - 100);
        ctx9.lineTo(x, y_axis + 100);

        ctx9.moveTo(x, y_axis + 100);
        ctx9.lineTo(x + x_steep, y_axis + 100);
        x = x + (x_steep);

        ctx9.moveTo(x, y_axis + 100);
        ctx9.lineTo(x, y_axis);

        ctx9.stroke();
        ctx9.closePath();

    }
}

document.getElementById("graph").addEventListener("click", function () {
    validate_bit_code();
});