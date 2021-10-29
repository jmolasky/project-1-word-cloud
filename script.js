$(function(){
    // constants
    const BASE_URL = 'https://quickchart.io/wordcloud';

    // variables
    let cloudData;
    let inputText;
    let fontFamily;
    let padding;
    let minWordLength;
    let removeStopwords = true;
    
    // cached element references
    const $form = $('form');
    const $input = $('input[type="text"]');
    const $main = $('main');

    // event listeners
    $form.on('submit', handleSubmit);

    // functions
    function handleSubmit(evt) {
        evt.preventDefault();
        //text = $input.val();
        inputText = $input.val();
        $.ajax({
            url: BASE_URL,
            data: {
                "text": inputText,
                "fontFamily": "helvetica",
                "fontScale": "55",
                "backgroundColor": "#535388",
                "padding": "3",
                "minWordLength": "2",
                "rotation": "45",
                "removeStopwords": removeStopwords
            },
            dataType: 'html',
            success: function(data) {  
                cloudData = data;       
                render();
            },
            error: function(error) {
                console.log("bad request: ", error);
            }
        });
        $input.val('');
    }

    function render() {
        console.log(cloudData);
        $main.html(cloudData);
        //$main.append(cloudData);
    }
});

// compare word clouds with each other?
// upload files to be analyzed instead of inputting text by typing?
// show or hide the form by clicking?
