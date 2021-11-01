$(function(){
    // constants

    const BASE_URL = 'https://quickchart.io/wordcloud';

    // variables

    let cloudData;
    let inputText;
    let fileText;
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

    // Generates the word cloud
    $form.on('submit', handleSubmit);
    // Handles the file upload
    $fileInput.on('change', handleChange);
    // Hides the form input on click
    $hidebtn.on('click', collapseInput);
    // Shows hidden form input on click
    $showbtn.on('click', showInput);

    // functions

    function collapseInput(evt) {
        evt.preventDefault();
        $formContents.fadeOut();
        $showbtn.fadeIn();

    }

    function showInput(evt) {
        evt.preventDefault();
        // I had to make the button disappear immediately to make 
        // the transition appear more smooth
        $showbtn.css('display', 'none');
        $formContents.fadeIn();
    }

    // The main function that handles the AJAX request
    function handleSubmit(evt) {
        evt.preventDefault();

        // Text in the input field takes precedence over a file
        if($txtInput.val()) {
            inputText = $txtInput.val();
            // Clears input field
            $txtInput.val('');
        } else {
            inputText = fileText;
        }
        minWordLength = $charSelect.val();
        // Set width and height of cloud to the width of the window minus 15px
        let w = window.innerWidth - 15;
        let h = w;
        // Parameters to be passed as an object to the data setting of the request
        const params = {
            text: inputText,
            width: w,
            height: h,
            fontFamily: "helvetica",
            fontScale: "35",
            backgroundColor: "#ffffff00",
            padding: "3",
            minWordLength: minWordLength,
            rotation: "45",
        }
        // Add a key value pair to params based on user input
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
                alert("API call unsuccessful. The file you uploaded is probably too big.")
            }
        });
    }

    // Function that handles file upload
    function handleChange(evt) {
        const file = evt.target.files[0];
        if(file) processFile(file);

    }

    // Helper function to handle file upload
    function processFile(file) {
        const fr = new FileReader();
        fr.onload = function() {
            // Passes text string read from .txt file to variable
            fileText = fr.result;
        }
        fr.readAsText(file);
    }

    function render() {
        $main.html(cloudData);
    }
});