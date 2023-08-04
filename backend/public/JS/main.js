$(document).ready(function () {
  let pen = 0;
  setInterval(() => {
    pen = pen + 1;
    round(pen);
    if (pen > 1) {
      pen = 0;
    }
  }, 1000);

  function round(n) {
    if (n == 1) {
      setTimeout(() => {
        $(".content-right img").css("transform", "rotate(30deg)");
      }, 1000);
    } else if (n == 2) {
      setTimeout(() => {
        $(".content-right img").css("transform", "rotate(-30deg)");
      }, 1000);
    }
  }

  setTimeout(() => {
    $("#right-article-1").slideUp(1000);
  }, 4000);

  let slide_index = 0;
  setInterval(() => {
    slide_index = slide_index + 1;
    display(slide_index);
    if (slide_index > 2) {
      slide_index = 0;
    }
  }, 5000);

  function display(n) {
    setTimeout(() => {
      $("#right-article-1").slideUp(1000);
      $("#right-article-2").slideUp(1000);
      $("#right-article-3").slideUp(1000);
    }, 4000);

    if (n == 1) {
      $("#right-article-1").css("display", "none");
      $("#right-article-2").css("display", "flex");
      $("#right-article-3").css("display", "none");
    } else if (n == 2) {
      $("#right-article-1").css("display", "none");
      $("#right-article-2").css("display", "none");
      $("#right-article-3").css("display", "flex");
    } else {
      $("#right-article-1").css("display", "flex");
      $("#right-article-2").css("display", "none");
      $("#right-article-3").css("display", "none");
    }
  }

  let slide = 0;
  let carouselnterval;

  setCarousalInterval();
  function setCarousalInterval() {
    carouselnterval = setInterval(() => {
      slide = slide + 1;
      carousel(slide);
      if (slide > 3) {
        slide = 0;
      }
    }, 5000);
  }

  function carousel(n) {
    if (n == 1) {
      $(".first-blog-content").css("display", "none");
      $(".second-blog-content").css("display", "block");
      $(".third-blog-content").css("display", "none");
      $(".fourth-blog-content").css("display", "none");
    } else if (n == 2) {
      $(".first-blog-content").css("display", "none");
      $(".second-blog-content").css("display", "none");
      $(".third-blog-content").css("display", "block");
      $(".fourth-blog-content").css("display", "none");
    } else if (n == 3) {
      $(".first-blog-content").css("display", "none");
      $(".second-blog-content").css("display", "none");
      $(".third-blog-content").css("display", "none");
      $(".fourth-blog-content").css("display", "block");
    } else {
      $(".first-blog-content").css("display", "block");
      $(".second-blog-content").css("display", "none");
      $(".third-blog-content").css("display", "none");
      $(".fourth-blog-content").css("display", "none");
    }
  }

  $(".read").click(function () {
    $(".para").slideToggle();

    if ($(".read").hasClass("pause")) {
      $(".read").removeClass("pause");
      $(".read").text("Read More");

      setCarousalInterval();
    } else {
      $(".read").addClass("pause");
      $(".read").text("Read Less");

      clearInterval(carouselnterval);
    }
  });

  $(".search i").click(function () {
    if ($(".search").hasClass("show")) {
      $(".search").removeClass("show");
    } else {
      $(".search").addClass("show");
      $(".search input").css("display", "block");
      $(".search button").css("display", "block");
      $(".search i").css("display", "none");
    }
  });



  $(".result").css("display", "none");
/*
  $(".btn-contact").click(function () {
    const nameCheck = name_check();
    const emailCheck = email_check();
    const numberCheck = number_check();
    const messageCheck = message_check();
    if (nameCheck && emailCheck && numberCheck && messageCheck) {
      $(".result").css("display", "block");
    }
  });
  $(".result-btn").click(function () {
    $(".result").css("display", "none");
    $("#form-container")[0].reset();
  });

  $(".name").hide();
  $(".email").hide();
  $(".number").hide();
  $(".messege").hide();


  let name_no_err = true;
  let email_no_err = true;
  let number_no_err = true;
  let messege_no_err = true;

  $("#input-name").keyup(function () {
    name_check();
  });
  function name_check() {
    let user_value = $("#input-name").val(); //input field value

    if (user_value.length == "") {
      $(".name").show();
      $(".name").html("Required field");
      $(".name").css("color", "red");
      name_no_err = false;
      return false;
    } else {
      $(".name").hide();
      name_no_err = true;
      return true;
    }
  }

  $("#input-number").keyup(function () {
    number_check();
  });
  function number_check() {
    let pwd_value = $("#input-number").val();
    if (pwd_value.length == "") {
      $(".number").show();
      $(".number").html("Required field");
      $(".number").css("color", "red");
      $(".number").focus();

      number_no_err = false;
      return false;
    } else {
      $(".number").hide();
      number_no_err = true;
      return true;
    }
  }

  $("#input-email").keyup(function () {
    email_check();
  });
  function email_check() {
    let email_value = $("#input-email").val();
    if (email_value.length == "") {
      $(".email").show();
      $(".email").html("Required field");
      $(".email").css("color", "red");
      $(".email").focus();

      email_no_err = false;
      return false;
    } else {
      $(".email").hide();
      email_no_err = true;
      return true;
    }
  }
  $("#input-message").keyup(function () {
    message_check();
  });
  function message_check() {
    let email_value = $("#input-message").val();
    if (email_value.length == "") {
      $(".message").show();
      $(".message").html("Required field");
      $(".message").css("color", "red");
      $(".message").focus();

      email_no_err = false;
      return false;
    } else {
      $(".message").hide();
      email_no_err = true;
      return true;
    }
  }
  */
});
