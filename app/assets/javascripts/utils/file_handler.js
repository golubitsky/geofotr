function handleFiles(files) {
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    // you need to send e.target.result in your $.ajax request
    console.log(this.result);
  }
  reader.readAsDataURL(file);
}
