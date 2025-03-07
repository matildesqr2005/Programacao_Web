function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


function scrollToContact(){
  var contact_form = document.getElementById("contact_form");
  contact_form.scrollIntoView({block:"center"});
}