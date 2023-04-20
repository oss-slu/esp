function createInvisElement(file, text){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(text)); element.setAttribute('download', file);

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function downloadWord()
{
    document.getElementById("downloadButton").addEventListener("click", function() {
      var filename = document.getElementById("fileNameInput").value;
      var text = "this is a test file";

      createInvisElement(filename, text)
    }, false);
}

function uploadFile()
{
    const url ='process.php'
    const form = document.querySelector('form')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const files = document.querySelector('[type=file]').files
        const formData = new FormData()

        for (let i = 0; i < files.length; i++){
            let file = files[i]

            formData.append('files[]', file)
        }
        fetch(url, {
            method: 'POST',
            body: formData,
        }).then((response) => {
            console.log(response)
        })
    })
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
}