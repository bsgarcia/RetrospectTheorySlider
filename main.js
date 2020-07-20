// When the page is fully loaded, the main function will be called
$(document).ready(main);


function main() {
    let initValue = range(25, 75, 5)[Math.floor(Math.random() * 10)];
    let clickEnabled = true;
    // generate html
    let sliderHTML = SliderManager.generateSlider({min: 0, max: 100, step: 5, initValue: initValue, n: 1});
    let buttonHTML = SliderManager.generateSubmitButton(1);
    let imgHTML = SliderManager.generateImg('img/index.png')
    // insert in html
    SliderManager.displayImg('Stage', imgHTML);
    SliderManager.displaySlider('Stage', sliderHTML);
    SliderManager.displaySubmitButton('GameButton', buttonHTML);

    // listen on events
    SliderManager.listenOnSlider({}, function (event) {
        if (clickEnabled) {
            // they can click only once
            // clickEnabled = false;
            let choice = event.data.slider.val();
            SliderManager.clickEvent(choice);
        }
    });
}


class SliderManager {
    // class using static functions (i.e. each func can be extracted
    // from the class directly, there are no public members) to manage the slider

    static displayImg(divId, img) {
        $(`#${divId}`).append(img);
    }

    static displaySlider(divId, slider) {
        $(`#${divId}`).append(slider);
    }

    static displaySubmitButton(divId, button) {
        $(`#${divId}`).html(button);
    }

    static generateSlider({
                              min = 0, max = 100, step = 5,
                              initValue = 0, percent = true,
                              n = 1, classname = 'slider'
                          } = {}) {
        let slider = `<main style="flex-basis: 100%">
            <form id="form_${n}" class="${classname}">
            <div class="range">
            <input id="slider_${n}" name="range" type="range" value="${initValue}" min="${min}" max="${max}" step="${step}">
            <div class="range-output">
            <output id="output_${n}" class="output" name="output" for="range">
            ${initValue + ['', '%'][+(percent)]}
             </output>
             </div>
             </div>
            </form>
            </main>`;

        return slider;
    }

    static generateSubmitButton(n) {
        return `<button id="ok_${n}" class="btn custom-button">Submit</button>`;
    }

    static generateImg(src) {
       return  `<img class="border rounded stim"
                style="width: 100%; height: auto; max-width:200px;" src="${src}">`;
    }

    static listenOnSlider(clickArgs, clickFunc, percent = true, n = 1) {

        rangeInputRun();

        let slider = $('#slider_' + n);
        let output = document.getElementById('output_' + n);
        let form = document.getElementById('form_' + n);

        form.oninput = function () {
            output.value = slider.val();
            output.innerHTML += ['', "%"][+(percent)];
        };

        clickArgs.slider = slider;

        let ok = $('#ok_' + n);
        ok.click(clickArgs, clickFunc);
    }

    static clickEvent(choice) {
        alert(`Value is ${choice}`);
    }
}

// simple range function
function range(start, stop, step) {
    let a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
}
