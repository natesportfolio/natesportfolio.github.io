$('#mobi').on('click', function(e) {
  e.preventDefault();
  $("#mobi-overlay").css("display", "block");
  $('body').css("overflow", "hidden");
  whichMobi = "mobi";
});
$('#mobit').on('click', function(e) {
  e.preventDefault();
  $("#mobit-overlay").css("display", "block");
  $('body').css("overflow", "hidden");
  whichMobi = "mobit";
});

$('#close-mobi').on('click', function(e) {
  e.preventDefault();
  reset();
  $("#mobi-overlay").css("display", "none");
  $('body').css("overflow", "visible");
  whichMobi = null;
});
$('#close-mobit').on('click', function(e) {
  e.preventDefault();
  reset();
  $("#mobit-overlay").css("display", "none");
  $('body').css("overflow", "visible");
  whichMobi = null;
});

$('.active-link').click(function(event){
   event.preventDefault();
});

function reset() {
  setQuantity(1);
  $('#' + activeSizeID).removeClass('size-button-active');
  setTotal(0);
  activeSizeID = null;
}

var activeSizeID = '';
var whichMobi;

function inputTriggered() {
  setTotal($("#" + activeSizeID).attr('class').split(' ')[2]);
};

$('.size-icon').on('click', setSizeActive);

function setSizeActive() {
  $('#' + activeSizeID).removeClass('size-button-active');
  activeSizeID = $(this).attr('id');
  $('#' + activeSizeID).addClass('size-button-active');
  setTotal($(this).attr('class').split(' ')[2]);
}

function setTotal(price) {
  $("#" + whichMobi + "-price").html("Total: $" + (price * getQuantity()));
}

function getQuantity() {
  return $("#" + whichMobi + "-quantity").val();
}

function setQuantity(newVal) {
  $("#" + whichMobi + "-quantity").val(newVal);
}
