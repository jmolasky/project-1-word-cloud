$(function(){
    // constants
    const BASE_URL = 'https://quickchart.io/wordcloud';

    // variables
    let cloudData;
    let inputText;
    let fileText;
    let fontFamily;
    let padding;
    let minWordLength;
    
    // cached element references
    const $form = $('form');
    const $formContents = $('#form-contents');
    const $txtInput = $('input[type="text"]');
    const $fileInput = $('input[type="file"]');
    const $charSelect = $('#minWordLength');
    const $removeCommonWords = $('#removeCommonWords');
    const $main = $('main');
    const $hidebtn = $('#collapse');
    const $showbtn = $('#show-inputs');

    // event listeners
    $form.on('submit', handleSubmit);
    $fileInput.on('change', handleChange);
    $hidebtn.on('click', collapseInput);
    $showbtn.on('click', showInput);

    // functions
    function collapseInput(evt) {
        evt.preventDefault();
        $formContents.fadeOut();
        $showbtn.fadeIn();

    }

    function showInput(evt) {
        evt.preventDefault();
        $showbtn.css('display', 'none');
        $formContents.fadeIn();
    }

    function handleSubmit(evt) {
        evt.preventDefault();
    
        if($txtInput.val()) {
            inputText = $txtInput.val();
        } else {
            inputText = fileText;
        }
        minWordLength = $charSelect.val();
        let w = window.innerWidth - 15;
        let h = w;
        const params = {
            text: inputText,
            width: w,
            height: h,
            fontFamily: "helvetica",
            fontScale: "55",
            backgroundColor: "#ffffff00",
            padding: "3",
            minWordLength: minWordLength,
            rotation: "45",
        }
        if($removeCommonWords.val() === "true") {
            params.removeStopwords = "true";
        }
        $.ajax({
            url: BASE_URL,
            data: params,
            dataType: 'html',
            success: function(data) {  
                cloudData = data;       
                render();
            },
            error: function(error) {
                console.log("bad request: ", error);
            }
        });
        $txtInput.val('');
    }

    function handleChange(evt) {
        const file = evt.target.files[0];
        if(file) processFile(file);

    }

    function processFile(file) {
        const fr = new FileReader();
        fr.onload = function() {
            fileText = fr.result;
        }
        fr.readAsText(file);
    }

    function render() {
        console.log(cloudData);
        $main.html(cloudData);
        //$main.append(cloudData);
    }
});

// compare word clouds with each other?
// show or hide the form by clicking?
// have size of word cloud (width and height) adjust according to the size of the screen?
